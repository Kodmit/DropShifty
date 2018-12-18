<?php

namespace App\Resolver;

use App\Repository\UserRepository;
use Overblog\GraphQLBundle\Definition\Resolver\AliasedInterface;
use Overblog\GraphQLBundle\Definition\Resolver\ResolverInterface;
use Symfony\Component\Security\Core\Security;


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
    private $security;

    /**
     *
     * @param UserRepository $userRepository
     * @param Security $security
     */
    public function __construct(UserRepository $userRepository, Security $security)
    {
        $this->userRepository = $userRepository;
        $this->security = $security;
    }

    /**
     * @return \App\Entity\User
     */
    public function user(int $id)
    {
        return $this->userRepository->find($id);
    }

    /**
     * @return boolean
     */
    public function checkIfConnected()
    {
        if($this->security->getUser())
            return true;
        return false;
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
            'checkIfConnected' => 'CheckIfConnected',
        ];
    }
}