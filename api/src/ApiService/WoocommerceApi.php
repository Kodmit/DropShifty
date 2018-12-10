<?php

namespace App\ApiService;

use App\Entity\Shop;
use Doctrine\Common\Persistence\ObjectManager;
use Symfony\Component\Security\Core\Security;
use Automattic\WooCommerce\Client;

class WoocommerceApi
{

    private $wooCommerce;
    private $security;
    private $objectManager;

    public function __construct(Security $security, ObjectManager $objectManager)
    {
        $this->security = $security;
        $this->objectManager = $objectManager;

        $shop = $objectManager->getRepository(Shop::class)->findOneBy(["owner" => $security->getUser()]);

        $this->wooCommerce = new Client(
            $shop->getWcApiUrl(),
            $shop->getWcApiKey(),
            $shop->getWcPassword(),
            [
                'wp_api' => true,
                'version' => 'wc/v3',
            ]
        );

    }


    public function buildLink($storeUrl){
        $user = $this->security->getUser();

        $endpoint = '/wc-auth/v3/authorize';
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

    // API CALLS

    public function get(String $endpoint){
        return $this->wooCommerce->get($endpoint);
    }

    public function createProduct($value){
        $data = [
            'name' => $value["name"],
            'type' => 'simple',
            'regular_price' => $value["price"],
            'description' => $value["desc"],
            'short_description' => '',
            'categories' => [
                [
                    'id' => $value["cat_id"]
                ]
            ],
            'images' => [
                [
                    'src' => $value["img_src"]
                ]
            ]
        ];

        $this->wooCommerce->post('products', $data);
    }


}