<?php

namespace App\Resolver;

use App\Repository\UserRepository;
use Overblog\GraphQLBundle\Definition\Resolver\AliasedInterface;
use Overblog\GraphQLBundle\Definition\Resolver\ResolverInterface;


/**
 * Class UserResolver
 * @package App\Resolver
 */
final class UserResolver implements ResolverInterface, AliasedInterface
{
    /**
     * @var UserRepository
     */
    private $userRepository;

    /**
     *
     * @param UserRepository $astronautRepository
     */
    public function __construct(UserRepository $astronautRepository)
    {
        $this->userRepository = $astronautRepository;
    }

    /**
     * @return \App\Entity\User
     */
    public function user(int $id)
    {
        return $this->userRepository->find($id);
    }

    /**
     * @return \App\Entity\User[]
     */
    public function users()
    {
        return $this->userRepository->findAll();
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