<?php
namespace App\Models;
use App\Helpers\DBConnection as Conn;
/**
 *
 */
class BaseModel
{
  protected $connection;

  function __construct(){
    $instance = Conn::getInstance();
    if($instance->getConnection()){
      $this->connection = $instance->getConnection();
    }else{
      $this->connection = null;
    }
  }
}


?>
