<?php

namespace App\Resolver;

use App\Repository\NotificationRepository;
use App\Repository\UserRepository;
use Overblog\GraphQLBundle\Definition\Resolver\AliasedInterface;
use Overblog\GraphQLBundle\Definition\Resolver\ResolverInterface;


/**
 * Class NotificationResolver
 * @package App\Resolver
 */
final class NotificationResolver implements ResolverInterface, AliasedInterface
{
    /**
     * @var NotificationRepository
     */
    private $notificationRepository;

    /**
     *
     * @param NotificationRepository $notificationRepository
     */
    public function __construct(NotificationRepository $notificationRepository)
    {
        $this->notificationRepository = $notificationRepository;
    }

    /**
     * @return \App\Entity\Notification
     */
    public function user(int $id)
    {
        return $this->notificationRepository->find($id);
    }

    /**
     * @return \App\Entity\Notification[]
     */
    public function users()
    {
        return $this->notificationRepository->findAll();
    }

    /**
     * {@inheritdoc}
     * Key : Name of the function inside this file
     * Value : Name of the key called by GraphQL
     */
    public static function getAliases(): array
    {
        return [
            'user' => 'User',
            'users' => 'Users',
        ];
    }
}