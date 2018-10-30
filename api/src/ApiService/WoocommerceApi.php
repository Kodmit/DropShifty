<?php

namespace App\ApiService;

use App\Entity\User;

class WoocommerceApi
{

    private $shopUrl;


    public function buildLink($storeUrl){
        $endpoint = '/wc-auth/v1/authorize';
        $params = [
            'app_name' => 'Dropshifty',
            'scope' => 'read_write',
            'user_id' => 12,
            'return_url' => 'http://localhost:8000/check_wc',
            'callback_url' => 'https://localhost:8000/save_wc'
        ];
        $query_string = http_build_query( $params );

        return $storeUrl . $endpoint . '?' . $query_string;
    }


}