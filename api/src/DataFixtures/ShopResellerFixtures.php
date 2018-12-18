<?php

namespace App\DataFixtures;


use App\Entity\ShopReseller;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Common\Persistence\ObjectManager;

class ShopResellerFixtures extends Fixture
{

    public function load(ObjectManager $manager)
    {
        $shop = new ShopReseller();
        $shop->setName("ChinaBrands");
        $shop->setDescription("Boutique en ligne low-cost");
        $shop->setEnabled(true);
        $shop->setWebsite("https://www.chinabrands.com/");

        $manager->persist($shop);
        $manager->flush();
    }

}