<?php
use App\Middleware\User as UserValidator;
use App\Middleware\Mail as MailValidator;
use App\Middleware\Token as Authentication;

$app->group('/v2', function() use($container, $app){
  $app->group('/auth', function() use($container, $app){
    $app->post('/user', 'Auth:user')->add(new UserValidator($container));
    $app->get('/token', 'Auth:token');
  });

  $app->group('/mails', function() use($container, $app){
    $app->post('', 'Mail:create')->add(new MailValidator($container));
    $app->get('/departments/{id}', 'Mail:index');
    $app->get('/categories/{id}', 'Mail:byCategory');
    $app->get('/{id}', 'Mail:show');
    $app->get('/actions/{id}', 'Mail:getActions');
  })->add(new Authentication($container));
});
?>
