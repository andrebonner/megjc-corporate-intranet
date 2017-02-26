<?php

namespace App\Middleware;
/**
 * Middleware handling JWT authentication
 * for routes.
 */
class PermissionMiddleware extends Middleware
{
  public function __invoke($request, $response, $next){
    $user = $request->getAttribute('user');
    if(!isset($user->type_id)){
        return $response->withJson(array('success'=> false, 'message'=>'Forbidden'), 403);
    }
    if($this->route === 'admin' && $user->type_id !== 1){
      return $response->withJson(array('success'=>false, 'message'=>'Forbidden'), 403);
    }
    return $next($request, $response);
  }
}

?>
