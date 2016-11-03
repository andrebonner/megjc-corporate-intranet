<?php
  include_once 'functions.php';
  $dotenv = new Dotenv\Dotenv(__DIR__);
  $dotenv->load();

  function routeUserRequests( $app ){
    $app->post('/', function() use ( $app ){
      $message = array( 'success' => true, 'user' => '' );
      $user = json_decode( $app->request->getBody() );
      $result = findUserByDn( $user->dn );
      if( !$result ){
        $uid = createUser( $user->dn, $user->dept_id );
        if( !$uid ){
          $message['success'] = false;
          $message['user'] = 0;
        }else{
          $message['user'] = findUserByID( $uid );
        }
      }else{
        $message['user'] = $result;
      }
      setResponseHeader( $app );
      echo json_encode( $message );
    });
  }
  /**
   * Find a user by dn or create a user if not found by dn.
   * @return [type] [description]
   */
  function findUserByDn($dn){
    $sql = 'SELECT * FROM users WHERE dn=:dn';
    try{
      $db = openDBConnection();
      $stmt = $db->prepare( $sql );
      $stmt->bindParam("dn", $dn);
      $stmt->execute();
      $result = $stmt->fetch( PDO::FETCH_OBJ );
      closeDBConnection( $db );
      return $result;
    }catch(PDOException $e){
      return false;
    }
  }

  /**
   * Creates a user if user not found in database.
   * @param  string $dn User domain name
   * @return boolean
   */
  function createUser($dn, $dept_id){
    $sql = 'INSERT INTO users (dn, dept_id, created_on)
            VALUES (:dn, :dept_id, :created_on)';
    try{
      $db = openDBConnection();
      $stmt = $db->prepare($sql);
      $stmt->execute(array(":dn" => $dn,":dept_id"=> $dept_id,
                            ":created_on" => date("Y-m-d H:i:s")));
      $result = $db->lastInsertId();
      closeDBConnection($db);
      return $result;
    }catch(PDOException $e){
      return false;
    }
  }

  function getNameFromDn($dn){
      list($cn, $dept, $ou, $dc_one, $dc_two, $dc_three) = explode(',', $dn);
      $name = explode('=', $ou);
      return $name[1];
  }
/**
 * Find a user by id.
 * @return [type] [description]
 */
function findUserByID($id){
  $sql = 'SELECT * FROM users WHERE id=:id';
  try{
    $db = openDBConnection();
    $stmt = $db->prepare( $sql );
    $stmt->bindParam("id", $id);
    $stmt->execute();
    $result = $stmt->fetch( PDO::FETCH_OBJ );
    closeDBConnection( $db );
    return $result;
  }catch(PDOException $e){
    return false;
  }
}

?>
