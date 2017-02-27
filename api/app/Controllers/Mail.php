<?php
namespace App\Controllers;
use App\Models\Mail as MailModel;
/**
 *
 */
class Mail extends BaseCtrl
{

  public function index($request, $response, $args){
    $mails = MailModel::list($args['id']);
    return $response->withJson($mails);
  }

  public function show($request, $response, $args){
    $mail = MailModel::get($args['id']);
    return $response->withJson($mail);
  }

  public function byCategory($request, $response, $args){
    $mail = MailModel::getByCategory($args['id']);
    return $response->withJson($mail);
  }

  public function getActions($request, $response, $args){
    $actions = MailModel::getActions($args['id']);
    return $response->withJson($actions);
  }

  public function create($request, $response){
    $mail = $request->getParsedBody();
    $user = $request->getAttribute('user');
    $mail['dept_id'] = $user->dept_id;
    $mail['created_by'] = $user->id;
    $mail_id = MailModel::create($mail);
    // if(!$mail_id){
    //   return $response->withJson(array("success"=> false, "message"=>"Error in creating mail"), 400);
    // }
    // if(array_key_exists('error', $mail_id)){
    //   return $response->withJson(array("success"=> false, "message"=>$message['message']), $mail_id['status']);
    // }
    return $response->withJson(array('sucess'=>true, "message"=> "Mail correspondence created", "id"=>$mail_id));
  }
}

?>
