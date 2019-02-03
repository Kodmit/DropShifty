<?php

namespace App\Resolver;

use App\ApiService\ChinaBrandsApi;
use App\ApiService\WoocommerceApi;
use App\Entity\Product;
use App\Entity\Shop;
use App\Entity\ShopReseller;
use App\Entity\UserReseller;
use App\Repository\OrderRepository;
use App\Repository\ProductRepository;
use App\Service\CoreService;
use Doctrine\Common\Persistence\ObjectManager;
use Overblog\GraphQLBundle\Definition\Resolver\AliasedInterface;
use Overblog\GraphQLBundle\Definition\Resolver\ResolverInterface;
use Symfony\Component\HttpKernel\Exception\BadRequestHttpException;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use Symfony\Component\Security\Core\Security;


/**
 * Class ProductResolver
 * @package App\Resolver
 */
final class ProductResolver implements ResolverInterface, AliasedInterface
{

    private $productRepository;
    private $chinaBrandsApi;
    private $coreService;
    private $objectManager;
    private $security;
    private $wc;

    public function __construct(ProductRepository $productRepository, ChinaBrandsApi $chinaBrandsApi, CoreService $coreService, ObjectManager $objectManager, Security $security, WoocommerceApi $wc)
    {
        $this->productRepository = $productRepository;
        $this->chinaBrandsApi = $chinaBrandsApi;
        $this->coreService = $coreService;
        $this->coreService->ConnectionNeeded();
        $this->objectManager = $objectManager;
        $this->security = $security;
        $this->wc = $wc;
    }

    /**
     * @return \App\Entity\Product
     */
    public function product(int $id)
    {
        return $this->productRepository->find($id);
    }

    /**
     * @return \App\Entity\Product[]
     */
    public function products()
    {
        return $this->productRepository->findAll();
    }

    public function getCbToken(){
        return $this->chinaBrandsApi->getToken();
    }

    public function getCBProductDetails(int $sku){
        return $this->chinaBrandsApi->getProductDetails($sku);
    }

    public function getCBProductStock(string $sku, string $warehouse){
        $data = $this->chinaBrandsApi->getProductStock($sku, $warehouse);
        return $data["msg"]["page_result"][0]["goods_number"];
    }

    public function getProductDetails(int $id){
        // If ChinaBrands ... Remember to handle other resellers but always output same data
        if($product = $this->objectManager->getRepository(Product::class)->find($id))
            return $product;
        throw new NotFoundHttpException("Product not found.");
    }

    public function importToWc($sku, $cat_id, $type = "simple"){

        // Fetch data
        $fetchedProductData = $this->chinaBrandsApi->getProductDetails($sku);

        if($fetchedProductData["status"] == 0)
            throw new NotFoundHttpException("Product not found on ChinaBrands, please check SKU.");

        // Create product

        foreach ($fetchedProductData["msg"] as $s_product){
            if($s_product["sku"] == $sku){
                $productData = $s_product;
            }
        }

        $product = new Product();
        $product->setName($productData["title"]);
        $product->setSku($productData["sku"]);
        $product->setDescription($productData["goods_desc"]);

        reset($productData["original_img"]);
        $product->setImgUrl(current($productData["original_img"]));

        reset($productData["warehouse_list"]);
        $warehouse = current($productData["warehouse_list"]);

        $product->setPrice($warehouse["price"]);
        $product->setUrl($warehouse["url"]);

        $shop = $this->objectManager->getRepository(Shop::class)->findOneBy(["owner" => $this->security->getUser()]);

        $product->setShop($shop);

        $shopReseller = $this->objectManager->getRepository(ShopReseller::class)->find(1);
        $product->setShopReseller($shopReseller);

        $this->objectManager->persist($product);

        // Import product in WC

        if($type == "simple"){
            $value["name"] = $productData["title"];
            $value["price"] = $warehouse["price"];
            $value["desc"] = $productData["goods_desc"];
            $value["sku"] = "".$sku;
            $value["cat_id"] = $cat_id;
            $value["img_src"] = $productData["original_img"];

            $this->objectManager->flush();

            $this->wc->createProduct($value);

            return "ok_simple";
        }
        elseif ($type == "variable"){

            $value["name"] = $productData["title"];
            //$value["price"] = $warehouse["price"];
            $value["desc"] = $productData["goods_desc"];
            $value["sku"] = "".$sku;
            $value["cat_id"] = $cat_id;
            $value["img_src"] = $productData["original_img"];

            $option_colors = [];
            $option_sizes = [];

            foreach ($fetchedProductData["msg"] as $s_product){
                if(isset($s_product["color"]) && isset($s_product["size"])){
                    array_push($option_colors, $s_product["color"]);
                    array_push($option_sizes, $s_product["size"]);
                }
            }

            $color = $this->wc->addAttribute("Couleur", "color");
            $size = $this->wc->addAttribute("Taille", "size");

            $attributes = [
                [
                    'id'        => $color->id,
                    'variation' => true,
                    'visible'   => true,
                    'options'   => $option_colors,
                ],
                [
                    'id'        => $size->id,
                    'variation' => true,
                    'visible'   => true,
                    'options'   => $option_sizes,
                ]
            ];

            $data = $this->wc->initVariableProduct($value, $attributes);

            foreach ($fetchedProductData["msg"] as $s_product){
                if(isset($s_product["warehouse_list"])){
                    $warehouse_var = current($s_product["warehouse_list"]);

                    $colors = [];
                    $colors["id"] = $color->id;
                    $colors["value"] = $s_product["color"];

                    $sizes = [];
                    $sizes["id"] = $size->id;
                    $sizes["value"] = $s_product['size'];

                    $this->wc->addVariation($data->id, $colors, $sizes, $warehouse_var["price"], $s_product['sku'], $s_product["original_img"]);
                }
            }

            $this->objectManager->flush();

            return $color->id;

        }
        throw new BadRequestHttpException("Please specify a correct type (simple or variable)");
    }

    /**
     * {@inheritdoc}
     * Key : Name of the function inside this file
     * Value : Name of the key called by GraphQL
     */
    public static function getAliases(): array
    {
        return [
            'product' => 'Product',
            'products' => 'Products',
            'getCbToken' => 'GetCbToken',
            'getProductDetails' => 'GetProductDetails',
            'importToWc' => 'ImportToWc',
            'getCBProductDetails' => 'GetCBProductDetails',
            'getCBProductStock' => 'GetCBProductStock'
        ];
    }
}