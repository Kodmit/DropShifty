<?php

namespace App\Mutation;

use App\ApiService\WoocommerceApi;
use App\Service\CoreService;
use Doctrine\ORM\EntityManagerInterface;
use Overblog\GraphQLBundle\Definition\Resolver\AliasedInterface;
use Overblog\GraphQLBundle\Definition\Resolver\MutationInterface;
use Symfony\Component\Security\Core\Authentication\Token\Storage\TokenStorageInterface;

final class ShopResellerMutation implements MutationInterface, AliasedInterface
{
    private $em;
    private $coreService;
    private $tokenStorage;
    private $woocommerceApi;

    public function __construct(EntityManagerInterface $em, CoreService $coreService, TokenStorageInterface $tokenStorage, WoocommerceApi $woocommerceApi)
    {
        $this->em = $em;
        $this->coreService = $coreService;
        $this->tokenStorage = $tokenStorage;
        $this->woocommerceApi = $woocommerceApi;
    }

    public function saveShopResellerAccount($name, $website)
    {

    }

    /**
     * {@inheritdoc}
     */
    public static function getAliases(): array
    {
        return [
            'saveShopResellerAccount' => 'SaveShopResellerAccount',
        ];
    }
}