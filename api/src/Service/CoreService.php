<?php

namespace App\Service;

use Symfony\Component\HttpFoundation\Session\Session;

class CoreService{

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
}