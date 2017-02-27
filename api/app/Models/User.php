<?php
namespace App\Models;
use App\Helpers\DBConnection as Conn;
/**
 *
 */
class User
{
  /**
   * [index description]
   * @return [type] [description]
   */
  public function list(){
    $instance = Conn::getInstance();
    if($instance->getConnection()){
      $conn = $instance->getConnection();
      $sql = "SELECT u.id,
                     u.uname as name,
                     IF(u.active = 1, 'true', 'false') as active,
                     d.name as department,
                     ut.title as type
                     FROM users as u
                     INNER JOIN departments as d
                     ON u.dept_id = d.id
                     INNER JOIN usertypes as ut
                     ON u.type_id = ut.id
                     ORDER BY department ASC";
      try {
        $stmt = $conn->prepare( $sql );
        $stmt->execute();
        $users = $stmt->fetchall(\PDO::FETCH_OBJ);
      } catch (\PDOException $e) {
        $users = array("error"=> $e->getMessage());
      }
      return $users;
    }else{
      return array("error" => true, "message"=>"Internal Server Error", "status" => 500);
    }
  }
  /**
   * [get description]
   * @param  [type] $id [description]
   * @return [type]     [description]
   */
  public function getById( $id ){
    $instance = Conn::getInstance();
    if( $instance->getConnection() ){
      $conn = $instance->getConnection();
      $sql = "SELECT id, dept_id, uname, active, type_id FROM users WHERE id=:id";
      try {
        $stmt = $conn->prepare( $sql );
        $stmt->bindParam( "id", $id );
        $stmt->execute();
        $result = $stmt->fetch( \PDO::FETCH_OBJ );
      } catch ( \PDOException $e ) {
        $result = array( "error"=> $e->getMessage() );
      }
      return $result;
    }else{
      return array("error" => true, "message"=>"Internal Server Error", "status" => 500);
    }
  }

  public function getByDN($dn){
    $instance = Conn::getInstance();
    if($instance->getConnection()){
      $conn = $instance->getConnection();
      $sql = "SELECT id, dept_id, uname, active, type_id FROM users WHERE dn=:dn";
      try {
        $stmt = $conn->prepare( $sql );
        $stmt->bindParam("dn", $dn);
        $stmt->execute();
        $result = $stmt->fetch(\PDO::FETCH_OBJ);
      } catch (\PDOException $e) {
        $result = array("error"=> $e->getMessage());
      }
      return $result;
    }else{
      return array("error" => true, "message"=>"Internal Server Error", "status" => 500);
    }
  }
}

?>
