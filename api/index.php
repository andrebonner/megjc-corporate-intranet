<?php
use Slim\App;
require 'vendor/autoload.php';

$app = new App([
    'settings' => [
        'determineRouteBeforeAppMiddleware' => true
    ]
]);

$container = $app->getContainer();

$container['AuthCtrl'] = function($container){
  return new \App\Controllers\AuthCtrl($container);
};

$container['TransCtrl'] = function($container){
  return new \App\Controllers\TransCtrl($container);
};

$container['TransTypeCtrl'] = function($container){
  return new \App\Controllers\TransTypeCtrl($container);
};

require 'routes.php';

$app->run();
?>
