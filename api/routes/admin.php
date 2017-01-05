<?php
include_once 'functions.php';
/**
 * [routeTicketRequests description]
 * @param  [type] $app [description]
 * @return [type]      [description]
 */
function routeAdminRequests($app){
  /**
   * Get all ticket categories
   */
  $app->get('/tickets/types', function() use ( $app ){
    $sql = 'SELECT service_ticket_type_id as id,
            service_ticket_type as title
            FROM service_ticket_type_tab';
    $error = null;
    $status = 200;
    try{
      $db = openDBConnection();
      $stmt = $db->query( $sql );
      $response = $stmt->fetchAll( PDO::FETCH_OBJ );
      closeDBConnection( $db );
    }catch(PDOException $e){
      $response = '{"message":{'.$e->getMessage().'}';
      $error = true;
      $status = 500;
    }
    apiResponse($response, $app, $error, $status);
  });

  $app->post('/actions/types', function() use ( $app ){
      $action_type = json_decode( $app->request->getBody() );
      $type = new ActionType( $action_type );
      $response = $type->save();
      echo json_encode( $response );
  });

  $app->get('/actions/types', function() use ( $app ){
      $response = ActionType::getAll();
      if($response == false){
        $code = 500;
      }else{
        $code = 200;
      }
      setHTTPStatus( $app, $code );
      echo json_encode( $response );
  });
}
?>
