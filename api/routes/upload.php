<?php
  include_once 'functions.php';
  $dotenv = new Dotenv\Dotenv(__DIR__);
  $dotenv->load();

function routeUploadRequests( $app ){

  $app->post('/:id', function( $id ) use ( $app ){
    $upload = $_POST;
    if(!empty($_FILES)){
      $filename = $_FILES['file']['name'];
      $upload_dir = __DIR__ . '/uploads';
      move_uploaded_file( $_FILES['file']['tmp_name'] , "$upload_dir/$filename" );
      try {
        $db = openDBConnection();
        $sql = 'INSERT INTO uploads (file_name, mail_id, created_on)
                VALUES (:file_name, :mail_id, :created_on)';
        $stmt = $db->prepare($sql);
        $stmt->execute(array(":file_name"=> $filename,
                                    ":mail_id" => $id,
                                    ":created_on" => date("Y-m-d H:i:s")));
        $upload_id = $db->lastInsertId();

        $stmt = null;
        $sql = 'INSERT INTO actions (mail_id, uid, description, created_on)
                VALUES (:mail_id, :uid, :description, :created_on)';
        $stmt = $db->prepare( $sql );
        $stmt->execute(array( ":mail_id" => $id,
                              ":uid" => 6,
                              ":description" => "File attached to mail.",
                              ":created_on" => date("Y-m-d H:i:s") ));
        $action_id = $db->lastInsertId();
        closeDBConnection($db);
      } catch (PDOException $e) {
        $upload_id = '{"error":{"text":' .$e->getMessage(). '}}';
      }
    }else{
      $upload_id = false;
    }
    setResponseHeader($app);
    echo json_encode($upload);
  });
}
?>
