<?php
namespace App\Middleware;

/**
 *
 */
class Mail extends Base
{

  public function __invoke($request, $response, $next){
    $fields = array('mail_type', 'mail_category', 'file_title', 'mail_date', 'receipt_date',
                    'from_org', 'sender', 'receipent', 'subject');
    $message = array("success" => false,
                      "developer message"=>"Predefined fields missing from request",
                      "message"=> "Bad Request");
    $mail = $request->getParsedBody();
    if(sizeof(array_diff($fields, array_keys($mail))) > 0){
      return $response->withJson( $message, 400);
    }
   return $next($request, $response);
 }
}

?>
