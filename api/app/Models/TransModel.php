<?php
namespace App\Models;
use App\Helpers\DBConnection as Conn;
/**
 *
 */
class TransModel
{
  /**
   * [index description]
   * @return [type] [description]
   */
  public function index(){
    $instance = Conn::getInstance();
    if($instance->getConnection()){
      $conn = $instance->getConnection();
      $sql = "SELECT t.id,
                    t.created,
                    t.particular,
                    t.amount,
                    u.uname as user,
                    c.name as council,
                    type.title as trans_type,
                    t.fin_year as year
              FROM transactions as t
              INNER JOIN transaction_types as type
              ON t.type_id = type.id
              INNER JOIN councils as c
              ON t.council_id = c.id
              INNER JOIN users as u
              ON t.uid = u.id
              WHERE t.deleted=0";
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
  public function show( $id ){
    $instance = Conn::getInstance();
    if($instance->getConnection()){
      $conn = $instance->getConnection();
      $sql = "SELECT t.id,
                    t.created,
                    t.particular,
                    t.amount,
                    u.uname as user,
                    c.name as council,
                    type.title as trans_type,
                    t.fin_year as year
              FROM transactions as t
              INNER JOIN transaction_types as type
              ON t.type_id = type.id
              INNER JOIN councils as c
              ON t.council_id = c.id
              INNER JOIN users as u
              ON t.uid = u.id
              WHERE t.deleted=0 AND t.id=:id";
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

  public function create( $trans, $id){
    $instance = Conn::getInstance();
    if( $instance->getConnection() ){
      $conn = $instance->getConnection();
      try {
        $sql = 'INSERT INTO transactions (created, particular, council_id, type_id, amount, fin_year, uid)
                            VALUES (:created, :particular, :council_id, :type_id, :amount, :fin_year, :uid)';
        $stmt = $conn->prepare($sql);
        $stmt->execute(array(":created" => date("Y-m-d H:i:s"),
                            ":particular" => $trans['particular'],
                            ":council_id" => $trans['council_id'],
                            ":type_id" => $trans['type_id'],
                            ":amount" => $trans['amount'],
                            ":fin_year" => date("Y"),
                            ":uid" => $id ));
        $result = $conn->lastInsertId();
      } catch (PDOException $e) {
        $result = array('error'=>'true', 'message' => $e->getMessage(), 'status'=>500);
      }
      return $result;
    }else{
      return array("error" => true, "message"=>"Internal Server Error", "status" => 500);
    }
  }

  public function delete( $id ){
    $instance = Conn::getInstance();
    if( $instance->getConnection() ){
      $conn = $instance->getConnection();
      try {
        $sql = 'UPDATE transactions SET deleted = 1 WHERE id=:id';
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

  public function update( $request, $id ){
    $instance = Conn::getInstance();
    if( $instance->getConnection() ){
      $conn = $instance->getConnection();
      try {
        $sql = 'UPDATE transactions SET particular =:particular WHERE id=:id';
        $stmt = $conn->prepare($sql);
        $updated = $stmt->execute(array(":id"=> $id, ":particular"=> $request['value']));
      } catch (PDOException $e) {
        $updated = array('error'=>'true', 'message' => $e->getMessage(), 'status'=>500);
      }
      return $updated;
    }else{
      return array("error" => true, "message"=>"Internal Server Error", "status" => 500);
    }
  }

  public function report(){
    $instance = Conn::getInstance();
    if( $instance->getConnection() ){
      $conn = $instance->getConnection();
      try {
           $sql = 'SELECT c.name, SUM(t.amount) AS expenditure
                   FROM transactions as t
                   INNER JOIN councils as c
                   ON t.council_id = c.id
                   WHERE t.deleted = 0 AND t.type_id=2 AND t.fin_year=2017
                   GROUP BY c.name
                   UNION
                   SELECT c.name, SUM(t.amount) AS allocation
                   FROM transactions as t
                   INNER JOIN councils as c
                   ON t.council_id = c.id
                   WHERE t.deleted = 0 AND t.type_id=1 AND t.fin_year=2017
                   GROUP BY c.name';
        $stmt = $conn->prepare($sql);
        $stmt->execute();
        $report = $stmt->fetchAll(\PDO::FETCH_OBJ);
      } catch (PDOException $e) {
        $report = array('error'=>'true', 'message' => $e->getMessage(), 'status'=>500);
      }
      return $report;
    }else{
      return array("error" => true, "message"=>"Internal Server Error", "status" => 500);
    }
  }

  private function FunctionName($value='')
  {
    # code...
  }
}

?>
