<?php

namespace App\Resolver;

use App\Repository\OrderRepository;
use App\Repository\ProductRepository;
use Overblog\GraphQLBundle\Definition\Resolver\AliasedInterface;
use Overblog\GraphQLBundle\Definition\Resolver\ResolverInterface;


/**
 * Class ProductResolver
 * @package App\Resolver
 */
final class ProductResolver implements ResolverInterface, AliasedInterface
{
    /**
     * @var ProductRepository
     */
    private $productRepository;

    /**
     *
     * @param OrderRepository $productRepository
     */
    public function __construct(ProductRepository $productRepository)
    {
        $this->productRepository = $productRepository;
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
        ];
    }
}