<?php
  /**
   *
   */
  class Message
  {

    static function getMessage( $error, $message ){
      return array("success" => $error, "message" => $message );
    }
  }

 ?>
