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

        // todo : Handle this to avoid "Call to a member function getWcApiUrl() on null" if user doesn't have a shop yet.
        // Error handled... To try...
        if($shop){
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
        else{
            $this->wooCommerce = null;
        }

    }


    public function buildLink($storeUrl){
        $user = $this->security->getUser();

        $endpoint = '/wc-auth/v1/authorize';
        $params = [
            'app_name' => 'Dropshifty',
            'scope' => 'read_write',
            'user_id' => $user->getUserKey(),
            'return_url' => 'https://ds-api2.herokuapp.com/check_wc',
            'callback_url' => 'https://ds-api2.herokuapp.com/save_wc'
        ];
        $query_string = http_build_query( $params );

        return $storeUrl . $endpoint . '?' . $query_string;
    }

    // API CALLS

    public function get(String $endpoint){
        return $this->wooCommerce->get($endpoint);
    }

    public function createProduct($value){

        $imgs = [];

        foreach ($value["img_src"] as $img){
            array_push($imgs, ["src" => $img]);
        }

        $data = [
            'name' => $value["name"],
            'type' => 'simple',
            'sku' => $value["sku"],
            'regular_price' => $value["price"],
            'description' => $value["desc"],
            'short_description' => '',
            'categories' => [
                [
                    'id' => $value["cat_id"]
                ]
            ],
            'images' => $imgs
        ];

        return $this->wooCommerce->post('products', $data);
    }

    public function initVariableProduct($value, $attributes){

        $imgs = [];

        foreach ($value["img_src"] as $img){
            array_push($imgs, ["src" => $img]);
        }

        $data = [
            'name' => $value["name"],
            'type' => 'variable',
            'description' => $value["desc"],
            'short_description' => '',
            'categories' => [
                [
                    'id' => $value["cat_id"]
                ]
            ],
            'images' => $imgs,
            'attributes'  => $attributes
        ];

        return $this->wooCommerce->post('products', $data);
    }

    public function addVariation($id, $color, $size, $price, $sku, $images){
        $imgs = [];

        foreach ($images as $img){
            array_push($imgs, ["src" => $img]);
        }

        $data = [
            'regular_price' => $price,
            'sku' => $sku,
            'image' => $imgs[0],
            'attributes' => [
                [
                    'id' => $color["id"],
                    'option' => $color["value"]
                ],
                [
                    'id' => $size["id"],
                    'option' => $size["value"]
                ]
            ]
        ];

        return $this->wooCommerce->post('products/'.$id.'/variations', $data);
    }

    public function addAttribute($name, $slug){

        $attributes = $this->wooCommerce->get('products/attributes');

        foreach($attributes as $attribute){
            if($attribute->slug == "pa_".$slug)
                return $attribute;
        }

        $data = [
            'name' => $name,
            'slug' => $slug,
            'type' => 'select',
            'order_by' => 'menu_order',
            'has_archives' => true
        ];
        return $this->wooCommerce->post('products/attributes', $data);

    }

}