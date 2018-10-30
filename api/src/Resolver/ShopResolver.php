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
final class ShopResolver implements ResolverInterface, AliasedInterface
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

    /**
     * @return \App\Entity\Shop
     */
    public function shop(int $id)
    {
        return $this->shopRepository->find($id);
    }

    /**
     * @return boolean
     */
    public function CheckIfHaveShop()
    {
        $this->coreService->ConnectionNeeded();
        $shop = $this->objectManager->getRepository(Shop::class)->findBy(["owner" => $this->security->getUser()]);
        if($shop)
            return true;
        return false;
    }

    /**
     * @return boolean
     */
    public function checkIfWCApiFilled()
    {
        $this->coreService->ConnectionNeeded();
        if($shop = $this->objectManager->getRepository(Shop::class)->findOneBy(["owner" => $this->security->getUser()])){
            if($shop->getWcApiKey() && $shop->getWcPassword())
                return true;
            return false;
        }
        return false;
    }

    /**
     * @return boolean
     */
    public function genWcLink()
    {
        $this->coreService->ConnectionNeeded();
        $shop = $this->objectManager->getRepository(Shop::class)->findOneBy(["owner" => $this->security->getUser()]);
        return $this->wcApi->buildLink($shop->getWcApiUrl());
    }

    /**
     * @return \App\Entity\Shop[]
     */
    public function shops()
    {
        return $this->shopRepository->findAll();
    }

    /**
     * {@inheritdoc}
     * Key : Name of the function inside this file
     * Value : Name of the key called by GraphQL
     */
    public static function getAliases(): array
    {
        return [
            'shop' => 'Shop',
            'shops' => 'Shops',
            'CheckIfHaveShop' => 'CheckIfHaveShop',
            'checkIfWCApiFilled' => 'CheckIfWCApiFilled',
            'genWcLink' => 'GenWcLink',
        ];
    }
}