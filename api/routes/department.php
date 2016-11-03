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

  // $app->get('/blogs/:id', function( $id ) use ( $app ){
  //   $sql = 'SELECT * FROM blogs WHERE id=:id';
  //   try{
  //     $db = openDBConnection();
  //     $stmt = $db->prepare( $sql );
  //     $stmt->bindParam("id", $id);
  //     $stmt->execute();
  //     $result = $stmt->fetchObject();
  //     closeDBConnection( $db );
  //     setResponseHeader( $app );
  //     echo json_encode( $result );
  //   }catch(PDOException $e){
  //     echo '{"error":{"text":' .$e->getMessage(). '}}';
  //   }
  // });

  $app->post('/', function() use ( $app ){
    $dept = json_decode( $app->request->getBody() );
    $found = findDepartmentByName( getDeptNameFromDn( $dept->dn ) );
    $message = array('success' => true, 'id'=> '');
    if( !$found ){ //create the department
      $department = createDepartmentFromDn( $dept->dn );
      if( !$department ){ //if the department was not created.
        $message['success'] = false;
        $message['id'] = 0;
      }else{
        $message['id'] = $department->id;
      }
    }else{
      $message['id'] = $found->id;
    }
    setResponseHeader( $app );
    echo json_encode( $message );
  });
}
/**
 * [createDepartmentFromDn description]
 * @param  [type] $dn [description]
 * @return [type]     [description]
 */
function createDepartmentFromDn( $dn ){
  $name = getDeptFromDn( $dn );
  $sql = 'INSERT INTO departments (name, created_on) VALUES (:name, :created_on)';
  try{
    $db = openDBConnection();
    $stmt = $db->prepare($sql);
    $stmt->execute(array(":name" => $name,":created_on" => date("Y-m-d H:i:s")));
    $result = $db->lastInsertId();
    closeDBConnection($db);
    return $result;
  }catch(PDOException $e){
    return false;
  }
}
/**
 * Get the department name of the user from the dn string.
 * @param  [type] $dn [description]
 * @return [type]     [description]
 */
function getDeptNameFromDn($dn){
  list($cn, $dept, $ou, $dc_one, $dc_two, $dc_three) = explode(',', $dn);
  $dept_name = explode('=', $dept);
  return $dept_name[1];
}

/**
 * Find a department by name.
 * @param  [type] $name [description]
 * @return [type]       [description]
 */
function findDepartmentByName($name){
  $sql = 'SELECT * FROM departments WHERE name=:name';
  try{
    $db = openDBConnection();
    $stmt = $db->prepare( $sql );
    $stmt->bindParam("name", $name);
    $stmt->execute();
    $result = $stmt->fetch( PDO::FETCH_OBJ );
    closeDBConnection( $db );
    return $result;
  }catch(PDOException $e){
    return false;
  }
}
?>
