<?php
namespace App\Controllers;
use App\Models\UserModel as User;
use App\Helpers\LDAPConnection as LDAP;
use App\Helpers\JSONWebToken as JOT;
/**
 *
 */
class AuthCtrl extends BaseCtrl
{
   /**
    * Authenticates a user
    * @param  [type] $request  [description]
    * @param  [type] $response [description]
    * @return [type]           [description]
    */
   public function authUser($request, $response){
     $message = array("success" => false, "message"=>"Bad Request. User credentials invalid");
     $user = $request->getParsedBody();
     $instance = LDAP::getInstance();
     if($instance->getConnection()){
       $dn = $instance->bind($user['username'], $user['password']);
       if(!$dn){
         return $response->withJson($message,400);
       }
       $authenticated = User::showByDn($dn);
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
   /**
    * Authenticates a jwt
    * @param  [type] $request  [description]
    * @param  [type] $response [description]
    * @return [type]           [description]
    */
   public function authToken($request, $response){
     if($request->getHeader('Authorization')){
       $auth_header = $request->getHeaderLine('Authorization');
       $token = explode(" ", $auth_header);
       $decoded = JOT::decode( $token[1] );
       if(array_key_exists('status', $decoded)){
         return $response->withJson($decoded, $decoded['status']);
       }
       return $response->withJson(array('success'=>true, 'message'=>"Token authenticated"));
     }else{
       return $response->withJson(array("success" => false,
                                       "developer message"=>"Bad Request.",
                                       "message"=> "Authorization header missing."), 400);
     }
   }

}


?>
