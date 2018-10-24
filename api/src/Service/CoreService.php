<?php

namespace App\Service;

use Symfony\Component\HttpFoundation\Session\Session;
use Symfony\Component\Security\Core\Exception\AccessDeniedException;
use Symfony\Component\Security\Core\Security;

class CoreService{

    private $security;

    public function __construct(Security $security)
    {
        $this->security = $security;
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

}