<?php

namespace App\Resolver;

use App\Entity\Shop;
use App\Repository\OrderRepository;
use App\Repository\ProductRepository;
use App\Repository\ShopRepository;
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

    /**
     * @param ShopRepository $shopRepository
     * @param Security $security
     * @param ObjectManager $objectManager
     */
    public function __construct(ShopRepository $shopRepository, Security $security, ObjectManager $objectManager)
    {
        $this->shopRepository = $shopRepository;
        $this->security = $security;
        $this->objectManager = $objectManager;
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
        $shop = $this->objectManager->getRepository(Shop::class)->findBy(["owner" => $this->security->getUser()]);
        if($shop)
            return true;
        return false;
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
            'CheckIfHaveShop' => 'CheckIfHaveShop'
        ];
    }
}