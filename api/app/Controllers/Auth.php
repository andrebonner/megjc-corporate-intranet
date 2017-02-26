<?php
namespace App\Controllers;

/**
 *
 */
class Auth extends BaseCtrl
{

  public function user($request, $response){
    return $response->withJson('Index');
  }

  public function token($request, $response){
    return $response->withJson('token');
  }
}

?>
