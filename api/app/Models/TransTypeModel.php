<?php
namespace App\Models;
use App\Helpers\DBConnection as Conn;
/**
 *
 */
class TransTypeModel
{
  /**
   * [index description]
   * @return [type] [description]
   */
  public function index(){
    $instance = Conn::getInstance();
    if($instance->getConnection()){
      $conn = $instance->getConnection();
      $sql = "SELECT * FROM transaction_types";
      try {
        $stmt = $conn->prepare( $sql );
        $stmt->execute();
        $types = $stmt->fetchall(\PDO::FETCH_OBJ);
      } catch (\PDOException $e) {
        $types = array("error"=> $e->getMessage());
      }
      return $types;
    }else{
      return array("error" => true, "message"=>"Internal Server Error", "status" => 500);
    }
  }
  /**
   * [get description]
   * @param  [type] $id [description]
   * @return [type]     [description]
   */
  public function show( $id ){
    $instance = Conn::getInstance();
    if( $instance->getConnection() ){
      $conn = $instance->getConnection();
      $sql = "SELECT * FROM transaction_types WHERE id=:id";
      try {
        $stmt = $conn->prepare( $sql );
        $stmt->bindParam( "id", intval($id) );
        $stmt->execute();
        $type = $stmt->fetch( \PDO::FETCH_OBJ );
      } catch ( \PDOException $e ) {
        $type = array( "error"=> $e->getMessage() );
      }
      return $type;
    }else{
      return array("error" => true, "message"=>"Internal Server Error", "status" => 500);
    }
  }
}

?>
