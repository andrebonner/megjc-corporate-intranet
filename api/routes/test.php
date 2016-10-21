<?php
  include_once 'functions.php';
  $dotenv = new Dotenv\Dotenv(__DIR__);
  $dotenv->load();
  function routeTestRequests($app){

    $app->post('/', function() use ( $app ){
      $mail = $_POST;
      echo $mail['subject'];
      // $filename = $_FILES['file']['name'];
      // $destination = 'uploads/' . $filename;
      // move_uploaded_file( $_FILES['file']['tmp_name'] , $destination );
      // echo json_encode("done");
    });

  }

?>
