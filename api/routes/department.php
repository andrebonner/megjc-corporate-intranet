<?php
include_once 'functions.php';

function routeDepartmentRequests($app){
  /**
   * Get all departments
   */
  $app->get('/', function() use( $app ) {
    $sql = 'SELECT * FROM dept_tab';
    try{
      $db = openDBConnection();
      $stmt = $db->query( $sql );
      $result = $stmt->fetchAll( PDO::FETCH_OBJ );
      closeDBConnection( $db );
      setResponseHeader( $app );
      echo json_encode($result);
    }catch(PDOException $e){
      echo '{"error":{"text":' .$e->getMessage(). '}}';
    }
  });
  /**
  * Get a department by id
  */
  $app->get('/:id', function($id) use( $app ) {
    $sql = 'SELECT * FROM dept_tab WHERE dept_id=:id';
    try{
      $db = openDBConnection();
      $stmt = $db->prepare( $sql );
      $stmt->bindParam("id", $id);
      $stmt->execute();
      $result = $stmt->fetchAll( PDO::FETCH_OBJ );
      closeDBConnection( $db );
      setResponseHeader( $app );
      echo json_encode($result);
    }catch(PDOException $e){
      echo '{"error":{"text":' .$e->getMessage(). '}}';
    }
  });
  /**
  * Get employees by department id
  */
  $app->get('/:id/employees', function( $id ) use ( $app ){
    $sql = 'SELECT * FROM employees WHERE dept_id=:id';
    try{
      $db = openDBConnection();
      $stmt = $db->prepare( $sql );
      $stmt->bindParam("id", $id);
      $stmt->execute();
      $result = $stmt->fetchAll( PDO::FETCH_OBJ );
      closeDBConnection( $db );
      setResponseHeader( $app );
      echo json_encode($result);
    }catch(PDOException $e){
      echo '{"error":{"text":' .$e->getMessage(). '}}';
    }
  });

  $app->get('/blogs/:id', function( $id ) use ( $app ){
    $sql = 'SELECT * FROM blogs WHERE id=:id';
    try{
      $db = openDBConnection();
      $stmt = $db->prepare( $sql );
      $stmt->bindParam("id", $id);
      $stmt->execute();
      $result = $stmt->fetchObject();
      closeDBConnection( $db );
      setResponseHeader( $app );
      echo json_encode( $result );
    }catch(PDOException $e){
      echo '{"error":{"text":' .$e->getMessage(). '}}';
    }
  });
}

?>
