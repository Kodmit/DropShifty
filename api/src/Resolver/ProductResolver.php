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

    public function getProductDetails(int $id){
        // If ChinaBrands ... Remember to handle other resellers but always output same data
        if($product = $this->objectManager->getRepository(Product::class)->find($id))
            return $product;
        throw new NotFoundHttpException("Product not found.");
    }

    public function importToWc($sku, $cat_id){

        // Fetch data
        $productData = $this->chinaBrandsApi->getProductDetails($sku);

        if($productData["status"] == 0)
            throw new NotFoundHttpException("Product not found on ChinaBrands, please check SKU.");

        // Create product

        $productData = $productData["msg"][0];
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

        $value["name"] = $productData["title"];
        $value["price"] = $warehouse["price"];
        $value["desc"] = $productData["goods_desc"];
        $value["cat_id"] = $cat_id;
        $value["img_src"] = current($productData["original_img"]);

        $this->wc->createProduct($value);

        $this->objectManager->flush();


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
        ];
    }
}