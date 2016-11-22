<?php
  include_once 'functions.php';
  $dotenv = new Dotenv\Dotenv(__DIR__);
  $dotenv->load();

function routeUploadRequests( $app ){

  $app->post('/', function() use ( $app ){
    $upload = $_POST;
    if(!empty($_FILES)){
      $filename = $_FILES['file']['name'];
      $upload_dir = __DIR__ . '/uploads';
      move_uploaded_file( $_FILES['file']['tmp_name'] , "$upload_dir/$filename" );
      // try {
      //   $db = openDBConnection();
      //   $sql_upload = 'INSERT INTO uploads (file_name, mail_id, created_on)
      //           VALUES (:file_name, :mail_id, :created_on)';
      //   $stmt_upload = $db->prepare($sql_upload);
      //   $stmt_upload->execute(array(":file_name"=> $filename,
      //                               ":mail_id" => $mail_id,
      //                               ":created_on" => date("Y-m-d H:i:s")));
      //   $upload_id = $db->lastInsertId();
      //   closeDBConnection($db);
      // } catch (PDOException $e) {
      //   $upload_id = '{"error":{"text":' .$e->getMessage(). '}}';
      // }
    }else{
      $upload_id = false;
    }
    setResponseHeader($app);
    echo json_encode($upload);
  });
}
?>
