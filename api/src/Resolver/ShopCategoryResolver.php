<?php

namespace App\Resolver;

use App\Repository\ShopCategoryRepository;
use App\Repository\ShopRepository;
use Overblog\GraphQLBundle\Definition\Resolver\AliasedInterface;
use Overblog\GraphQLBundle\Definition\Resolver\ResolverInterface;


/**
 * Class ShopCategoryResolver
 * @package App\Resolver
 */
final class ShopCategoryResolver implements ResolverInterface, AliasedInterface
{
    /**
     * @var ShopCategoryRepository
     */
    private $shopCategoryRepository;

    /**
     *
     * @param ShopCategoryRepository $shopCategoryRepository
     */
    public function __construct(ShopCategoryRepository $shopCategoryRepository)
    {
        $this->shopCategoryRepository = $shopCategoryRepository;
    }

    /**
     * @return \App\Entity\ShopCategory
     */
    public function shopCategory(int $id)
    {
        return $this->shopCategoryRepository->find($id);
    }

    /**
     * @return \App\Entity\ShopCategory[]
     */
    public function shopCategories()
    {
        return $this->shopCategoryRepository->findAll();
    }

    /**
     * {@inheritdoc}
     * Key : Name of the function inside this file
     * Value : Name of the key called by GraphQL
     */
    public static function getAliases(): array
    {
        return [
            'shopCategory' => 'ShopCategory',
            'shopCategories' => 'ShopCategories',
        ];
    }
}