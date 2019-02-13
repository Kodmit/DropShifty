<?php

namespace App\DataFixtures;

use App\Entity\User;
use App\Service\CoreService;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Common\Persistence\ObjectManager;

class UserFixtures extends Fixture
{

    private $userKey;

    public function __construct(CoreService $coreService)
    {
        $this->userKey = $coreService->genHash();
    }

    public function load(ObjectManager $manager)
    {
        $user1 = new User();

        $user1->setUsername("admin");
        $user1->setPassword("$2y$13$.LsNIc4MoMb1D3XgZQ11cOiXVwApFWr7dGX56NcrKbiyyjmQfcKSS"); // -> password
        $user1->setEmail("contact@dropshifty.com");
<<<<<<< HEAD
        $user1->setApiKey('key');
        $user1->setFirstname('toto');
        $user1->setLastname('toto');
=======
        $user1->setApiKey(bin2hex(random_bytes(255)));
        $user1->setUserKey($this->userKey);
>>>>>>> alex

        $manager->persist($user1);
        $manager->flush();
    }

}