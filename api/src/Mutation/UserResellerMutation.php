<?php

namespace App\Mutation;

use App\ApiService\WoocommerceApi;
use App\Entity\ShopReseller;
use App\Entity\UserReseller;
use App\Service\CoreService;
use Doctrine\ORM\EntityManagerInterface;
use Overblog\GraphQLBundle\Definition\Resolver\AliasedInterface;
use Overblog\GraphQLBundle\Definition\Resolver\MutationInterface;
use Symfony\Component\HttpKernel\Exception\BadRequestHttpException;
use Symfony\Component\Security\Core\Authentication\Token\Storage\TokenStorageInterface;

final class UserResellerMutation implements MutationInterface, AliasedInterface
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

    public function saveShopResellerAccount($shop_reseller_id, $api_key = null, $api_secret = null, $username = null, $password = null)
    {
        $this->coreService->ConnectionNeeded();

        $userReseller = new UserReseller();

        if($api_key && $api_secret){
            $userReseller->setApiKey($api_key);
            $userReseller->setApiSecret($api_secret);
        }
        elseif($username && $password){
            $userReseller->setUsername($username);
            $userReseller->setPassword($password);
        }
        else{
            throw new BadRequestHttpException("You must provide at least two credentials.");
        }

        if($shopReseller = $this->em->find(ShopReseller::class, ["id" => $shop_reseller_id])){
            $userReseller->setShopReseller($shopReseller);
            $userReseller->setUser($this->tokenStorage->getToken()->getUser());
            $this->em->persist($userReseller);
            $this->em->flush();
            return ["content" => "Credentials saved."];
        }

        return ["content" => "Error : Reseller not found."];

    }

    /**
     * {@inheritdoc}
     */
    public static function getAliases(): array
    {
        return [
            'saveShopResellerAccount' => 'SaveShopResellerAccount',
        ];
    }
}