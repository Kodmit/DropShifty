<?php

namespace App\Mutation;

use App\ApiService\WoocommerceApi;
use App\Entity\Country;
use App\Entity\Shop;
use App\Entity\ShopCategory;
use App\Service\CoreService;
use Doctrine\ORM\EntityManagerInterface;
use Overblog\GraphQLBundle\Definition\Resolver\AliasedInterface;
use Overblog\GraphQLBundle\Definition\Resolver\MutationInterface;
use Symfony\Component\Security\Core\Authentication\Token\Storage\TokenStorageInterface;

final class WooCommerceMutation implements MutationInterface, AliasedInterface
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

    public function newProduct()
    {
        if(!$this->coreService->coolDown())
            return ['content' => "wait 10 seconds"];

        $this->coreService->ConnectionNeeded();

        return true;

    }

    /**
     * {@inheritdoc}
     */
    public static function getAliases(): array
    {
        return [
            'newProduct' => 'WC_NewProduct',
        ];
    }
}