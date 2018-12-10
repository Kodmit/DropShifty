<?php

namespace App\Service;

use App\Entity\User;
use Doctrine\Common\Persistence\ObjectManager;
use Symfony\Component\HttpFoundation\Session\Session;
use Symfony\Component\Security\Core\Exception\AccessDeniedException;
use Symfony\Component\Security\Core\Security;

class CoreService{

    private $security;
    private $objectManager;

    public function __construct(Security $security, ObjectManager $objectManager)
    {
        $this->security = $security;
        $this->objectManager = $objectManager;
    }

    public function coolDown($time = 10){
        $session = new Session();
        if(!$session->has("coolDown")){
            $session->set("coolDown", time());
        }
        else{
            if(time() - $session->get("coolDown") < $time){
                $session->set("coolDown", time());
                return false;
            }
        }
        $session->set("coolDown", time());
        return true;
    }

    public function ConnectionNeeded(){
        if(!$this->security->getUser())
            throw new AccessDeniedException("You need to be connected");
        return true;
    }

    public function genHash(){
        return bin2hex(openssl_random_pseudo_bytes(100));
    }

    public function checkHash(String $hash, User $user){

    }

    public function findUserByKey(String $key){
        if($user = $this->objectManager->getRepository(User::class)->findOneBy(["key" => $key]))
            return $user;
        return false;
    }

}