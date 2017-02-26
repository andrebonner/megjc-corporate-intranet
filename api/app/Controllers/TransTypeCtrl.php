<?php
namespace App\Controllers;
use App\Models\TransTypeModel as TransType;
/**
 *
 */
class TransTypeCtrl extends BaseCtrl
{
  public function index($request, $response){
    $types = TransType::index();
    return $response->withJson($types, 200);
  }

  public function show($request, $response, $args){
    $type = TransType::show($args['id']);
    return $response->withJson($type, 200);
  }
}
?>
