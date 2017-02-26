<?php
namespace App\Controllers;
use \App\Models\TransModel as Trans;
/**
 *
 */
class TransCtrl extends BaseCtrl
{
  public function index($request, $response){
    $transactions = Trans::index();
    return $response->withJson($transactions);
  }

  public function show($request, $response, $args){
    $transaction = Trans::show($args['id']);
    return $response->withJson($transaction);
  }

  public function create($request, $response, $args){
    $req = $request->getParsedBody();
    $user = $request->getAttribute('user');
    $trans_id = Trans::create($req, $user->id);
    return $response->withJson($trans_id);
  }
  //
  public function update($request, $response, $args){
    $update_req = $request->getParsedBody();
    $result = Trans::update($update_req, $args['id']);
    return $response->withJson($result);
  }
  //
  public function delete($request, $response, $args){
    $result = Trans::delete($args['id']);
    return $response->withJson($result);
  }

  public function report($request, $response){
    $result = Trans::report();
    return $response->withJson($result);
  }

}


?>
