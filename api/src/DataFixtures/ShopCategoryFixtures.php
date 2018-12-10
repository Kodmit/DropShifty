<?php

namespace App\DataFixtures;

use App\Entity\ShopCategory;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Common\Persistence\ObjectManager;

class ShopCategoryFixtures extends Fixture
{

    public function load(ObjectManager $manager)
    {

        $shopCategory1 = new ShopCategory();
        $shopCategory1->setName("Alimentaire");

        $shopCategory2 = new ShopCategory();
        $shopCategory2->setName("Décoration");


        $manager->persist($shopCategory1);
        $manager->persist($shopCategory2);

        $manager->flush();
    }

}