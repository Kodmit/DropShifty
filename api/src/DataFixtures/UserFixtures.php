<?php

namespace App\DataFixtures;

use App\Entity\User;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Common\Persistence\ObjectManager;

class UserFixtures extends Fixture
{

    public function load(ObjectManager $manager)
    {
        $user1 = new User();

        $user1->setUsername("admin");
        $user1->setPassword("$2y$13$.LsNIc4MoMb1D3XgZQ11cOiXVwApFWr7dGX56NcrKbiyyjmQfcKSS"); // -> password
        $user1->setEmail("contact@dropshifty.com");
        $user1->setApiKey(bin2hex(random_bytes(100)));

        $manager->persist($user1);
        $manager->flush();
    }

}