<?php

namespace App\Mutation;

use App\ApiService\WoocommerceApi;
use App\Entity\Country;
use App\Entity\Shop;
use App\Entity\ShopCategory;
use App\Service\CoreService;
use Doctrine\ORM\EntityManagerInterface;
use Overblog\GraphQLBundle\Definition\Resolver\AliasedInterface;
use Overblog\GraphQLBundle\Definition\Resolver\MutationInterface;
use Symfony\Component\Security\Core\Authentication\Token\Storage\TokenStorageInterface;

final class ShopMutation implements MutationInterface, AliasedInterface
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

    public function newShop($name, $categoryId, $countryId, $city, $url, $wcApiUrl, $description = null, $postalCode = null, $addressLine1 = null, $addressLine2 = null, $picturePath = null)
    {
        if(!$this->coreService->coolDown())
            return ['content' => "wait 10 seconds"];

        // Check if user is logged in, if not, 403 in your face
        $this->coreService->ConnectionNeeded();

        // Check if user already have a shop registered
        // todo : In next version, handle multi shops.

        if($this->em->getRepository(Shop::class)->findOneBy(["owner" => $this->tokenStorage->getToken()->getUser()]))
            return ['content' => "shop_exist"];

        // Else, create a new shop for logged user
        $shop = new Shop();
        $shop->setName($name);
        $shop->setDescription($description);
        $shop->setCategory($this->em->find(ShopCategory::class, $categoryId));
        $shop->setCountry($this->em->find(Country::class, $countryId));
        $shop->setPostalCode($postalCode);
        $shop->setCity($city);
        $shop->setOwner($this->tokenStorage->getToken()->getUser());
        $shop->setAddressLine1($addressLine1);
        $shop->setAddressLine2($addressLine2);
        $shop->setPicturePath($picturePath);
        $shop->setUrl($url);
        $shop->setWcApiUrl($wcApiUrl);

        $this->em->persist($shop);
        $this->em->flush();

        return [
            "content" => $this->woocommerceApi->buildLink($shop->getWcApiUrl())
        ];
    }

    /**
     * {@inheritdoc}
     */
    public static function getAliases(): array
    {
        return [
            'newShop' => 'NewShop',
        ];
    }
}