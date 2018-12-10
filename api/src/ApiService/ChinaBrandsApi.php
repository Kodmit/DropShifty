<?php

namespace App\ApiService;

use Symfony\Component\HttpFoundation\Session\Session;
use Symfony\Component\Security\Core\Security;

class ChinaBrandsApi{

    private $security;

    public function __construct(Security $security)
    {
        $this->security = $security;
        $this->getToken();
    }

    public function getToken(){

        $session = new Session();

        if($session->has("CB_Token"))
            return $session->get("CB_Token");


        $client_secret = '078bb812d6292a9f78eade8957a1b6a6';
        $data = array(
            'email' => 'alexandre.bly60@gmail.com', // todo : Replace by auto fetched values
            'password' => 'Izzie1996',
            'client_id' => '2177686781'
        );
        $json_data = json_encode($data);
        $signature_string = md5($json_data.$client_secret);
        $post_data = 'signature='.$signature_string.'&data='.urlencode($json_data);
        $curl = curl_init("https://gloapi.chinabrands.com/v2/user/login");
        curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);
        curl_setopt($curl, CURLOPT_POST, 1);
        curl_setopt($curl, CURLOPT_POSTFIELDS, $post_data);
        $result = curl_exec($curl);
        curl_close($curl);

        $result = json_decode($result, true);

        $session->set("CB_Token", $result["msg"]["token"]);

        return $session->get("CB_Token");


    }

    public function getProductDetails($sku){

        $url = "https://gloapi.chinabrands.com/v2/product/index";
        $session = new Session();

        $post_data = array(
            'token' => $session->get("CB_Token"),
            'goods_sn' => json_encode($sku)
        );
        $curl=curl_init($url);
        curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);
        curl_setopt($curl, CURLOPT_POST, 1);
        curl_setopt($curl, CURLOPT_POSTFIELDS, $post_data);
        $result = curl_exec($curl);
        curl_close($curl);

        return json_decode($result, true);

    }
}