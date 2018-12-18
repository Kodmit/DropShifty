<?php

namespace App\Resolver;

use App\Entity\ShopReseller;
use App\Entity\UserReseller;
use App\Repository\UserResellerRepository;
use App\Service\CoreService;
use Doctrine\Common\Persistence\ObjectManager;
use Overblog\GraphQLBundle\Definition\Resolver\AliasedInterface;
use Overblog\GraphQLBundle\Definition\Resolver\ResolverInterface;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use Symfony\Component\Security\Core\Security;


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
    private $security;
    private $coreService;
    private $objectManager;

    public function __construct(UserResellerRepository $userResellerRepository, Security $security, CoreService $coreService, ObjectManager $objectManager)
    {
        $this->userResellerRepository = $userResellerRepository;
        $this->security = $security;
        $this->coreService = $coreService;
        $this->objectManager = $objectManager;
    }


    public function getCredentials(int $shop_id)
    {
        $this->coreService->ConnectionNeeded();

        if($credentials = $this->objectManager->getRepository(UserReseller::class)->findOneBy([
            "shop_reseller" => $this->objectManager->find(ShopReseller::class, $shop_id),
            "user" => $this->security->getUser()
        ]))
            return $credentials;
        throw new NotFoundHttpException("Credentials not found.");

    }

    public function getCredentialsList()
    {
        $this->coreService->ConnectionNeeded();

        return $this->objectManager->getRepository(UserReseller::class)->findBy(["user" => $this->security->getUser()]);

    }

    /**
     * {@inheritdoc}
     * Key : Name of the function inside this file
     * Value : Name of the key called by GraphQL
     */
    public static function getAliases(): array
    {
        return [
            'getCredentials' => 'GetCredentials',
            'getCredentialsList' => 'GetCredentialsList',
        ];
    }
}