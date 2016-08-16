<?php
include_once 'functions.php';
function routeEmployeeRequests($app){
  /**
  * Get all employees
  */
  $app->get('/', function() use ( $app ){
    $sql = 'SELECT * FROM employees';
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
  * Search for an employee by name
  */
  $app->get('/search', function() use ( $app ){
    $paramValue = $app->request->get();
    if(paramCheck($paramValue) === false){
        $response = '{"message": "No search term included"}';
        $error = true;
        $status = 400;
        return apiResponse($response, $app, $error, $status);
    }
      $error = null;
      $status = 200;
      //$sql = "SELECT * FROM employees WHERE first_name LIKE CONCAT(:name, '%') OR tag LIKE CONCAT(:tag, '%')";
      $sql = "SELECT * FROM employees WHERE first_name LIKE CONCAT(:name, '%')";
      try{
        $db = openDBConnection();
        $stmt = $db->prepare( $sql );
        $stmt->bindParam("name", $paramValue['q']);
        $stmt->execute();
        $response = $stmt->fetchAll( PDO::FETCH_OBJ );
        closeDBConnection( $db );
      }catch(PDOException $e){
        $response = '{"error":{"text":' .$e->getMessage(). '}}';
        $error = true;
        $status = 500;
      }
    apiResponse($response, $app, $error, $status);
  });
}
?>
