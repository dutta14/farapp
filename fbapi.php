<?php
    require_once __DIR__ . '/php-graph-sdk-5.0.0/src/Facebook/autoload.php';
        
    $app_id = '1844851255776979';
    $app_secret = '630b106841ef3869026e3bad967941a7';
    $fb_access_token = 'EAAaN4efDltMBAEyh5EzZBZCVf6ZAG5vcSyy8Vkd3NW5LYTG9uL4R6IjmMFnufm3vNytVsi1wnxqKNyEpqyD1gxABQtKtNDALQWsZAxLzZCxtRKkLmAw4XFVWT6TPL5HFe16F4WiygMmGC8EwJWO0w7l3YFPDI00Y1xVWBE8lAd9rJbZA3QjUaEtT1J3iTLuJgZD';
    $google_api_key = 'AIzaSyA6G2FFlpbX6PABzGC5jEfSVeAb0mm_JjY';
    $google_url = "https://maps.googleapis.com/maps/api/geocode/json?";
           
    $fb = new Facebook\Facebook([
         'app_id' => $app_id,
         'app_secret' => $app_secret,
         'default_graph_version' => 'v2.5',
    ]);
      
    $fb->setDefaultAccessToken($fb_access_token);

    $keyword = $_GET["keyword"];
       

    $params =  array('q' => $keyword,
                     'type' => 'user',
                     'fields' => 'name');

    $request = $fb->request('GET', '/search',$params);
    $response = $fb->getClient()->sendRequest($request);
    $result =$response->getBody();
        
    print_r($result);
?>