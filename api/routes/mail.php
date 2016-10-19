<?php
  include_once 'functions.php';
  $dotenv = new Dotenv\Dotenv(__DIR__);
  $dotenv->load();
  function routeMailRequests($app){
    /**
     * Get all mails by a user's id.
     */
     $app->get('/:id', function($id) use($app){
      $sql = 'SELECT id, mail_type, file_title, mail_date,
                      receipt_date, from_org, sender,
                      receipent, subject, created_on
                      FROM mails WHERE created_by=:id
                      ORDER BY created_on DESC';
      try{
        $db = openDBConnection();
        $stmt = $db->prepare( $sql );
        $stmt->bindParam("id", $id);
        $stmt->execute();
        $result = $stmt->fetchAll( PDO::FETCH_OBJ );
        closeDBConnection( $db );
        setResponseHeader( $app );
        echo json_encode($result);
      }catch(PDOException $e){
        echo '{"error":{"text":' .$e->getMessage(). '}}';
      }
     });

    $app->post('/', function() use ( $app ){
      $mail = $_POST;
      try {
        $db = openDBConnection();
        $sql = 'INSERT INTO mails (mail_type, file_title,
                                  mail_date, receipt_date,
                                  from_org, sender, receipent, subject,
                                  created_by, created_on)
                            VALUES (:mail_type, :file_title, :mail_date,
                                    :receipt_date, :from_org, :sender,
                                    :receipent, :subject, :created_by,
                                    :created_on)';
        $stmt = $db->prepare($sql);
        $stmt->execute(array(":mail_type" => $mail['mail_type'],
                            ":file_title" => $mail['file_title'],
                            ":mail_date" => $mail['mail_date'],
                            ":receipt_date" => $mail['receipt_date'],
                            ":from_org" => $mail['from_org'],
                            ":sender" => $mail['sender'],
                            ":receipent" => $mail['receipent'],
                            ":subject" => $mail['subject'],
                            ":created_by" => $mail['created_by'],
                            ":created_on" => date("Y-m-d H:i:s")));
        $mail_id = $db->lastInsertId();

        if(!empty($_FILES)){
          $filename = $_FILES['file']['name'];
          $sql_upload = 'INSERT INTO uploads (file_name, mail_id, created_on)
                  VALUES (:file_name, :mail_id, :created_on)';
          $stmt_upload = $db->prepare($sql_upload);
          $stmt_upload->execute(array(":file_name"=> $filename,
                                      ":mail_id" => $mail_id,
                                      ":created_on" => date("Y-m-d H:i:s")));
          $upload_dir = __DIR__ . '/uploads';
          move_uploaded_file( $_FILES['file']['tmp_name'] , "$upload_dir/$filename" );
        }
        closeDBConnection($db);
      } catch (PDOException $e) {
        $mail_id = '{"error":{"text":' .$e->getMessage(). '}}';
      }
      setResponseHeader($app);
      echo json_encode($mail_id);
    });
  }
  /**
   * Creates an attachment for a mail correspondence.
   * @param  [type] $mail_id The id of a mail correspondence.
   * @return [type]          [description]
   */
  function createAttachments($mail_id, $filename){
    try{
      $db = openDBConnection();
      $sql = 'INSERT INTO uploads (file_name, mail_id, created_on)
              VALUES (:file_name, mail_id, created_on)';
      $stmt = $db->prepare($sql);

      $stmt->execute(array(":file_name"=> $filename,
                            ":mail_id" => $mail_id,
                            ":created_on" => date("Y-m-d H:i:s")));
      closeDBConnection($db);
      return true;
    }catch(PDOException $e){
      return false;
    }
  }

?>
