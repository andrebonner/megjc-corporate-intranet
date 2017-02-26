<?php

use \App\Middleware\ValidatorMiddleware as Validator;
use \App\Middleware\PermissionMiddleware as Permission;
use \App\Middleware\JOTMiddleware as JOTAuth;

$app->group('/v2', function() use($container, $app){
  $app->group('/auth', function(){
      $this->post('', 'AuthCtrl:authUser');
      $this->get('/token', 'AuthCtrl:authToken');
  });

  $app->group('/admin', function() use($app){
    $app->group('/transtypes', function(){
      $this->get('', 'TransTypeCtrl:index');
      $this->get('/{id}', 'TransTypeCtrl:show');
    });
  })->add(new Permission($container, 'admin'))->add(new JOTAuth($container));

  $app->group('/transactions', function() use($container, $app){
      $app->get('', 'TransCtrl:index');
      $app->get('/{id}', 'TransCtrl:show');
      $app->post('', 'TransCtrl:create')->add(new Validator($container));
      $app->put('/{id}', 'TransCtrl:update');
      $app->delete('/{id}', 'TransCtrl:delete');
  })->add(new Permission($container, 'transactions'))->add(new JOTAuth($container));

  $app->group('/reports', function() use($container, $app){
      $app->get('/transactions', 'TransCtrl:report');
  })->add(new Permission($container, 'transactions'))->add(new JOTAuth($container));

});
?>
