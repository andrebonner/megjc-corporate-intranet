<?php
namespace App\Middleware;

/**
 *
 */
class User extends Base
{

  public function __invoke($request, $response, $next){
   $fields = array('username', 'password');
   $message = array("success" => false,
                     "developer message"=>"Predefined fields missing from request",
                     "message"=> "Bad Request");
   $user = $request->getParsedBody();
   if(sizeof(array_diff($fields, array_keys($user))) > 0){
     return $response->withJson( $message, 400);
   }
   if(empty($user['username']) || empty($user['password'])){
     $message['developer message'] = "Username or password missing";
     return $response->withJson( $message, 400);
   }
   return $next($request, $response);
 }
}

?>
