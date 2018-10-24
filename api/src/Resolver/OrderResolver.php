<?php

namespace App\Resolver;

use App\Repository\OrderRepository;
use Overblog\GraphQLBundle\Definition\Resolver\AliasedInterface;
use Overblog\GraphQLBundle\Definition\Resolver\ResolverInterface;


/**
 * Class OrderResolver
 * @package App\Resolver
 */
final class OrderResolver implements ResolverInterface, AliasedInterface
{
    /**
     * @var OrderRepository
     */
    private $orderRepository;

    /**
     *
     * @param OrderRepository $orderRepository
     */
    public function __construct(OrderRepository $orderRepository)
    {
        $this->orderRepository = $orderRepository;
    }

    /**
     * @return \App\Entity\Order
     */
    public function order(int $id)
    {
        return $this->orderRepository->find($id);
    }

    /**
     * @return \App\Entity\Order[]
     */
    public function orders()
    {
        return $this->orderRepository->findAll();
    }

    /**
     * {@inheritdoc}
     * Key : Name of the function inside this file
     * Value : Name of the key called by GraphQL
     */
    public static function getAliases(): array
    {
        return [
            'order' => 'Order',
            'orders' => 'Orders',
        ];
    }
}