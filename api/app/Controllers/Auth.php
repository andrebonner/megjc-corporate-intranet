<?php
namespace App\Controllers;
use App\Models\User;
use App\Helpers\LDAP;
use App\Helpers\JOT;
/**
 *
 */
class Auth extends BaseCtrl
{

  public function user($request, $response){
    $message = array("success" => false, "message"=>"Bad Request. User credentials invalid");
     $user = $request->getParsedBody();
     $instance = LDAP::getInstance();
     if($instance->getConnection()){
       $dn = $instance->bind($user['username'], $user['password']);
       if(!$dn){
         return $response->withJson($message,400);
       }
       $authenticated = User::getByDn($dn);
       if(!$authenticated || $authenticated === null){
           return $response->withJson($message, 400);
       }
       if(intval($authenticated->active) === 1){
          $encoded = JOT::encode($authenticated);
       }else{
         return $response->withJson(array("success" => false, "message" => "User not activated."),423);
       }
     }else{
       $message['message'] = "Internal server error";
       return $response->withJson($message, 500);
     }
     $instance->close();
     $user_type = (intval($authenticated->type_id) === 1 ? true : false);
     return $response->withJson(array("admin" => $user_type, "token" => $encoded), 200);
  }

  public function token($request, $response){
    if($request->getHeader('Authorization')){
       $auth_header = $request->getHeaderLine('Authorization');
       $token = explode(" ", $auth_header);
       $decoded = JOT::decode( $token[1] );
       if(array_key_exists('status', $decoded)){
         return $response->withJson($decoded, $decoded['status']);
       }
       $user_type = (intval($decoded['data']->type_id) === 1 ? true : false);
       return $response->withJson(array('success'=>true, 'message'=>"Token authenticated", "admin"=> $user_type));
     }else{
       return $response->withJson(array("success" => false,
                                       "developer message"=>"Bad Request.",
                                       "message"=> "Authorization header missing."), 400);
     }
  }
}

?>
