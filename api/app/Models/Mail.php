<?php
namespace App\Models;
use App\Helpers\DBConnection as Conn;
use App\Models\SQL;
/**
 *
 */
class Mail
{
  /**
   * [index description]
   * @return [type] [description]
   */
  public function list( $dept_id ){
    $instance = Conn::getInstance();
    if($instance->getConnection()){
      $conn = $instance->getConnection();
      try{
        $sql = SQL::$LISTBYDEPARTMENT;
        $stmt = $conn->prepare( $sql );
        $stmt->bindParam("id", $dept_id);
        $stmt->execute();
        return $stmt->fetchAll( \PDO::FETCH_OBJ );
      }catch(\PDOException $e){
        return array("error" => true, "message"=>$e->getMessage(), "status" => 500);
      }
    }else{
      return array("error" => true, "message"=>"Internal Server Error", "status" => 500);
    }
  }

  public function get( $id ){
    $instance = Conn::getInstance();
    if($instance->getConnection()){
      $conn = $instance->getConnection();
      try{
        $sql = SQL::$GETBYID;
        $stmt = $conn->prepare( $sql );
        $stmt->bindParam("id", $id);
        $stmt->execute();
        return $stmt->fetch( \PDO::FETCH_OBJ );
      }catch(\PDOException $e){
        return array("error" => true, "message"=>$e->getMessage(), "status" => 500);
      }
    }else{
      return array("error" => true, "message"=>"Internal Server Error", "status" => 500);
    }
  }

  public function getActions( $id ){
    $instance = Conn::getInstance();
    if($instance->getConnection()){
      $conn = $instance->getConnection();
      try{
        $sql = SQL::$LISTACTIONS;
        $stmt = $conn->prepare( $sql );
        $stmt->bindParam("id", $id);
        $stmt->execute();
        return $stmt->fetchAll( \PDO::FETCH_OBJ );
      }catch(\PDOException $e){
        return array("error" => true, "message"=>$e->getMessage(), "status" => 500);
      }
    }else{
      return array("error" => true, "message"=>"Internal Server Error", "status" => 500);
    }
  }

  public function getByCategory( $id ){
    $instance = Conn::getInstance();
    if($instance->getConnection()){
      $conn = $instance->getConnection();
      try{
        $sql = SQL::$LISTBYCATEGORY;
        $stmt = $conn->prepare( $sql );
        $stmt->bindParam("id", $id);
        $stmt->execute();
        return $stmt->fetchAll( \PDO::FETCH_OBJ );
      }catch(\PDOException $e){
        return array("error" => true, "message"=>$e->getMessage(), "status" => 500);
      }
    }else{
      return array("error" => true, "message"=>"Internal Server Error", "status" => 500);
    }
  }

  public function create($mail){
    $sql = SQL::$INSERTMAIL;
    $instance = Conn::getInstance();
    if($instance->getConnection()){
      $conn = $instance->getConnection();
      try{
        $stmt = $conn->prepare($sql);
        $stmt->execute(array(":mail_type" => $mail['mail_type'],
                            ":mail_category" => $mail['mail_category'],
                            ":file_title" => $mail['file_title'],
                            ":mail_date" => date("Y-m-d H:i:s"),
                            ":receipt_date" => date("Y-m-d H:i:s"),
                            ":from_org" => $mail['from_org'] ,
                            ":sender" => $mail['sender'],
                            ":receipent" => $mail['receipent'],
                            ":subject" => $mail['subject'],
                            ":created_by" => $mail['created_by'],
                            ":created_on" => date("Y-m-d H:i:s"),
                            ":dept_id" => $mail['dept_id'],
                            ":deleted" => 0));
        $mail_id = $conn->lastInsertId();
        $stmt = null;
        $sql = SQL::$INSERTMAILACTION;
        $stmt = $conn->prepare( $sql );
        $stmt->execute(array( ":mail_id" => $mail_id,
                              ":uid" => $mail['created_by'],
                              ":type" => 2,
                              ":description" => "Mail correspondence created.",
                              ":created_on" => date("Y-m-d H:i:s") ));
        return $mail_id;
      }catch(\PDOException $e){
        return array("error" => true, "message"=>$e->getMessage(), "status" => 500);
      }
    }else{
      return array("error" => true, "message"=>"Internal Server Error", "status" => 500);
    }
  }
}

?>
