<?php
  include_once 'functions.php';

  function routeAuthRequests($app){

    // $app->get('/', function() use ( $app ){
    //   $sql = 'SELECT * FROM service_ticket_tab
    //          ORDER BY service_ticket_sdate DESC';
    //   $error = null;
    //   $status = 200;
    //   try{
    //     $db = openDBConnection();
    //     $stmt = $db->query( $sql );
    //     $response = $stmt->fetchAll( PDO::FETCH_OBJ );
    //     closeDBConnection( $db );
    //   }catch(PDOException $e){
    //     $response = '{"message":{'.$e->getMessage().'}';
    //     $error = true;
    //     $status = 500;
    //   }
    //   apiResponse($response, $app, $error, $status);
    // });
  }

?>
