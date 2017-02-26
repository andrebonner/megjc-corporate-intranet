<?php
namespace App\Models;
use App\Helpers\DBConnection as Conn;
/**
 *
 */
class Model
{
  /**
   * [index description]
   * @return [type] [description]
   */
  public function index($table){
    $instance = Conn::getInstance();
    if($instance->getConnection()){
      $conn = $instance->getConnection();
      $sql = "SELECT created, particular, amount, uid, council_id type_id
              FROM transactions WHERE deleted=0";
      try {
        $stmt = $conn->prepare( $sql );
        $stmt->execute();
        $transactions = $stmt->fetchall(\PDO::FETCH_OBJ);
      } catch (\PDOException $e) {
        $transactions = array("error"=> $e->getMessage());
      }
      return $transactions;
    }else{
      return array("error" => true, "message"=>"Internal Server Error", "status" => 500);
    }
  }
  /**
   * [get description]
   * @param  [type] $id [description]
   * @return [type]     [description]
   */
  public function show( $table, $id ){
    $instance = Conn::getInstance();
    if($instance->getConnection()){
      $conn = $instance->getConnection();
      $sql = "SELECT created, particular, amount, uid, council_id type_id
              FROM transactions WHERE deleted=0 AND id=:id";
      try {
        $stmt = $conn->prepare( $sql );
        $stmt->execute(array(":id" => $id));
        $transaction = $stmt->fetch(\PDO::FETCH_OBJ);
      } catch (\PDOException $e) {
        $transaction = array("error"=> $e->getMessage());
      }
      return $transaction;
    }else{
      return array("error" => true, "message"=>"Internal Server Error", "status" => 500);
    }
  }

  public function create( $table, $request ){
    $instance = Conn::getInstance();
    if( $instance->getConnection() ){
      $conn = $instance->getConnection();
      try {
        $sql = 'INSERT INTO transactions (created, particular, council_id, type_id, amount, uid)
                            VALUES (:created, :particular, :council_id, :type_id, :amount, :uid)';
        $stmt = $conn->prepare($sql);
        $stmt->execute(array(":created" => date("Y-m-d H:i:s"),
                            ":particular" => $trans['particular'],
                            ":council_id" => $trans['council_id'],
                            ":type_id" => $trans['type_id'],
                            ":amount" => $trans['amount'],
                            ":uid" => $trans['uid'] ));
        $result = $conn->lastInsertId();
      } catch (PDOException $e) {
        $result = array('error'=>'true', 'message' => $e->getMessage(), 'status'=>500);
      }
      return $result;
    }else{
      return array("error" => true, "message"=>"Internal Server Error", "status" => 500);
    }
  }

  public function delete( $table, $value, $id ){
    $instance = Conn::getInstance();
    if( $instance->getConnection() ){
      $conn = $instance->getConnection();
      try {
        $sql = 'UPDATE '.$table.' SET deleted = '. $value.' WHERE id=:id';
        $stmt = $conn->prepare($sql);
        $updated = $stmt->execute(array("id"=> $id));
      } catch (PDOException $e) {
        $updated = array('error'=>'true', 'message' => $e->getMessage(), 'status'=>500);
      }
      return $updated;
    }else{
      return array("error" => true, "message"=>"Internal Server Error", "status" => 500);
    }
  }

  public function update( $table, $request, $id ){
    $column = $request['key'];
    $value = $request['value'];
    $instance = Conn::getInstance();
    if( $instance->getConnection() ){
      $conn = $instance->getConnection();
      try {
        $sql = 'UPDATE '.$table.' SET '.$column . '=' .$value.' WHERE id=:id';
        $stmt = $conn->prepare($sql);
        $updated = $stmt->execute(array(":id"=> $id));
      } catch (PDOException $e) {
        $updated = array('error'=>'true', 'message' => $e->getMessage(), 'status'=>500);
      }
      return $updated;
    }else{
      return array("error" => true, "message"=>"Internal Server Error", "status" => 500);
    }
  }
}

?>
