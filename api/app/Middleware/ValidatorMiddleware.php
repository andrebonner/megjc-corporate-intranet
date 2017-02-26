<?php

namespace App\Middleware;
/**
 * Middleware handling JWT authentication
 * for routes.
 */
class ValidatorMiddleware extends Middleware
{


  public function __invoke($request, $response, $next){
    $fields = array('particular', 'amount', 'council_id', 'type_id');
    $body = $request->getParsedBody();
    $diff = array_diff(array_keys($body), $fields);
    if(sizeof($diff) !== 0){
      return $response->withJson(array("success" => false,
                                      "developer message"=>"Predefined fields were missing from the request",
                                      "message"=> "Bad Request"), 400);
    }
    $user = $request->getAttribute('user');
    $body['uid'] = $user->id;
    return $next($request, $response);
  }
}

?>
