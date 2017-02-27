<?php
namespace App\Middleware;
use \App\Helpers\JOT;
/**
 *
 */
class Token extends Base
{

  public function __invoke($request, $response, $next){
    $message = array("success" => false,
                     "developer message"=>"Bad Request.",
                     "message"=> "Authorization header missing.");

    if($request->getHeader('Authorization')){
       $auth_header = $request->getHeaderLine('Authorization');
       $token = explode(" ", $auth_header);
       if(empty($token)){
         return $response->withJson($message, 400);
       }
       $decoded = JOT::decode( $token[1] );
        if(array_key_exists('status', $decoded)){
          return $response->withJson($decoded, $decoded['status']);
        }
       $request = $request->withAttribute('user', $decoded['data']);
     }else{
       return $response->withJson($message, 400);
     }
     return $next($request, $response);
 }
}
?>
