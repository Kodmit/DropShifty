<?php

namespace App\Resolver;

use App\Repository\UserResellerRepository;
use Overblog\GraphQLBundle\Definition\Resolver\AliasedInterface;
use Overblog\GraphQLBundle\Definition\Resolver\ResolverInterface;


/**
 * Class UserResellerResolver
 * @package App\Resolver
 */
final class UserResellerResolver implements ResolverInterface, AliasedInterface
{
    /**
     * @var UserResellerRepository
     */
    private $userResellerRepository;

    /**
     *
     * @param UserResellerRepository $userResellerRepository
     */
    public function __construct(UserResellerRepository $userResellerRepository)
    {
        $this->userResellerRepository = $userResellerRepository;
    }

    /**
     * @return \App\Entity\UserReseller
     */
    public function userReseller(int $id)
    {
        return $this->userResellerRepository->find($id);
    }

    /**
     * @return \App\Entity\UserReseller[]
     */
    public function userResellers()
    {
        return $this->userResellerRepository->findAll();
    }

    /**
     * {@inheritdoc}
     * Key : Name of the function inside this file
     * Value : Name of the key called by GraphQL
     */
    public static function getAliases(): array
    {
        return [
            'userReseller' => 'UserReseller',
            'userResellers' => 'UserResellers',
        ];
    }
}