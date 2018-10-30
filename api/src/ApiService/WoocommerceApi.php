<?php

namespace App\ApiService;

use App\Entity\User;
use Symfony\Component\Security\Core\Security;

class WoocommerceApi
{

    private $shopUrl;
    private $security;

    public function __construct(Security $security)
    {
        $this->security = $security;
    }


    public function buildLink($storeUrl){
        $user = $this->security->getUser();

        $endpoint = '/wc-auth/v1/authorize';
        $params = [
            'app_name' => 'Dropshifty',
            'scope' => 'read_write',
            'user_id' => $user->getKey(),
            'return_url' => 'http://localhost:8000/check_wc',
            'callback_url' => 'http://localhost:8000/save_wc'
        ];
        $query_string = http_build_query( $params );

        return $storeUrl . $endpoint . '?' . $query_string;
    }


}