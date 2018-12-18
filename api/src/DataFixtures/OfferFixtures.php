<?php

namespace App\DataFixtures;

use App\Entity\Offer;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Common\Persistence\ObjectManager;

class OfferFixtures extends Fixture
{

    public function load(ObjectManager $manager)
    {

        $offer1 = new Offer();
        $offer1->setName("Offre numéro 1");
        $offer1->setDescription("Description de test numéro 1");
        $offer1->setEnabled(true);
        $offer1->setPrice(0.00);
        $offer1->setWcApiLimit(100);
        $offer1->setWcOrdersLimit(10);

        $offer2 = new Offer();
        $offer2->setName("Offre numéro 2");
        $offer2->setDescription("Description de test numéro 2");
        $offer2->setEnabled(true);
        $offer2->setPrice(9.50);
        $offer2->setWcApiLimit(500);
        $offer2->setWcOrdersLimit(50);

        $manager->persist($offer1);
        $manager->persist($offer2);

        $manager->flush();
    }
}