<?php

namespace App\Resolver;

use App\ApiService\WoocommerceApi;
use App\Entity\Shop;
use App\Repository\OrderRepository;
use App\Repository\ProductRepository;
use App\Repository\ShopRepository;
use App\Service\CoreService;
use Doctrine\Common\Persistence\ObjectManager;
use Overblog\GraphQLBundle\Definition\Resolver\AliasedInterface;
use Overblog\GraphQLBundle\Definition\Resolver\ResolverInterface;
use Symfony\Component\Security\Core\Security;


/**
 * Class ShopResolver
 * @package App\Resolver
 */
final class WooCommerceResolver implements ResolverInterface, AliasedInterface
{
    /**
     * @var ShopRepository
     */
    private $shopRepository;
    private $security;
    private $objectManager;
    private $wcApi;
    private $coreService;

    /**
     * @param ShopRepository $shopRepository
     * @param Security $security
     * @param ObjectManager $objectManager
     * @param WoocommerceApi $wcApi
     * @param CoreService $coreService
     */
    public function __construct(ShopRepository $shopRepository, Security $security, ObjectManager $objectManager, WoocommerceApi $wcApi, CoreService $coreService)
    {
        $this->shopRepository = $shopRepository;
        $this->security = $security;
        $this->objectManager = $objectManager;
        $this->wcApi = $wcApi;
        $this->coreService = $coreService;
    }

    public function getProductsList(){
        return $this->wcApi->get("products");
    }

    public function getProduct(int $id){
        return $this->wcApi->get("products/" . $id);
    }

    public function getOrdersList(){
        return $this->wcApi->get("orders");
    }

    public function getOrder(int $id){
        return $this->wcApi->get("orders/" . $id);
    }

    public function getProductsCategories(){
        return $this->wcApi->get("products/categories");
    }

    /**
     * {@inheritdoc}
     * Key : Name of the function inside this file
     * Value : Name of the key called by GraphQL
     */
    public static function getAliases(): array
    {
        return [
            'getProductsList' => 'WC_GetProductsList',
            'getProduct' => 'WC_GetProduct',
            'getOrdersList' => 'WC_GetOrdersList',
            'getOrder' => 'WC_GetOrder',
            'getProductsCategories' => 'WC_GetProductsCategories',
        ];
    }
}