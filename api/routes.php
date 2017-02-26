<?php

$app->group('/v2', function() use($container, $app){
  $app->group('/auth', function() use($container, $app){
    $this->post('/user', 'Auth:user');
    $this->get('/token', 'Auth:token');
  });
});


?>
