<?php
include_once 'functions.php';
/**
 * [routeTicketRequests description]
 * @param  [type] $app [description]
 * @return [type]      [description]
 */
function routeTicketRequests($app){
  /**
  * Get all tickets
  */
  $app->get('/', function() use ( $app ){
    $sql = 'SELECT * FROM service_ticket_tab
           ORDER BY service_ticket_sdate DESC';
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
  /**
  * Get all tickets owned by a user
  */
  $app->get('/:fname/:lname', function($fname, $lname) use ( $app ){
    $sql = 'SELECT tickets.service_ticket_id as id,
                   tickets.service_ticket_sdate as created,
                   tickets.service_ticket_desc as description,
                   ticket_type.service_ticket_type as type,
                   status.service_ticket_status_type as ticket_status
            FROM service_ticket_tab as tickets
            INNER JOIN service_ticket_type_tab  as ticket_type
            ON tickets.service_ticket_type_id = ticket_type.service_ticket_type_id
            INNER JOIN service_ticket_status_type_tab as status
            ON tickets.service_ticket_status = status.service_ticket_status_type_id
            WHERE tickets.owner_fName =:fname AND tickets.owner_lName=:lname
            ORDER BY tickets.service_ticket_sdate DESC';

    $error = null;
    $status = 200;
    try{
      $db = openDBConnection();
      $stmt = $db->prepare( $sql );
      $stmt->bindParam(":fname", $fname);
      $stmt->bindParam(":lname", $lname);
      $stmt->execute();
      $response = $stmt->fetchAll( PDO::FETCH_OBJ );
      closeDBConnection( $db );
    }catch(PDOException $e){
      $response = '{"message":{'.$e->getMessage().'}';
      $error = true;
      $status = 500;
    }
    apiResponse($response, $app, $error, $status);
  });
  /**
   * Get a ticket by id
   */
  $app->get('/:id', function($id) use( $app ) {
    $sql = 'SELECT * FROM service_ticket_tab WHERE service_ticket_id = :id';
    $error = null;
    $status = 200;
    try{
      $db = openDBConnection();
      $stmt = $db->prepare( $sql );
      $stmt->bindParam("id", $id);
      $stmt->execute();
      $response = $stmt->fetchAll( PDO::FETCH_OBJ );
      closeDBConnection( $db );
    }catch(PDOException $e){
      $response = '{"message":{'.$e->getMessage().'}';
      $error = true;
      $status = 500;
    }
    apiResponse($response, $app, $error, $status);
  });
}
?>
