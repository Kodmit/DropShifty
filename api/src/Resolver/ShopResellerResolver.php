<?php

namespace App\Resolver;

use App\Repository\ShopResellerRepository;
use Overblog\GraphQLBundle\Definition\Resolver\AliasedInterface;
use Overblog\GraphQLBundle\Definition\Resolver\ResolverInterface;


/**
 * Class ShopResellerResolver
 * @package App\Resolver
 */
final class ShopResellerResolver implements ResolverInterface, AliasedInterface
{
    /**
     * @var ShopResellerRepository
     */
    private $shopResellerRepository;

    /**
     *
     * @param ShopResellerRepository $shopResellerRepository
     */
    public function __construct(ShopResellerRepository $shopResellerRepository)
    {
        $this->shopResellerRepository = $shopResellerRepository;
    }

    /**
     * @return \App\Entity\ShopReseller
     */
    public function shopReseller(int $id)
    {
        return $this->shopResellerRepository->find($id);
    }

    /**
     * @return \App\Entity\ShopReseller[]
     */
    public function shopResellers()
    {
        return $this->shopResellerRepository->findAll();
    }

    /**
     * {@inheritdoc}
     * Key : Name of the function inside this file
     * Value : Name of the key called by GraphQL
     */
    public static function getAliases(): array
    {
        return [
            'shopReseller' => 'ShopReseller',
            'shopResellers' => 'ShopResellers',
        ];
    }
}