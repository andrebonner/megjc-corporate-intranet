<?php
  include_once 'functions.php';
  include_once 'classes/mail.php';
  include_once 'classes/action.php';
  include_once 'classes/message.php';
  $dotenv = new Dotenv\Dotenv(__DIR__);
  $dotenv->load();
  /**
   * [routeMailRequests description]
   * @param  [type] $app [description]
   * @return [type]      [description]
   */
  function routeMailRequests($app){
    setResponseHeader( $app );
    /**
     * Get all mails by a user's id.
     */
     $app->get('/users/:id', function($id) use($app){
      $sql = 'SELECT id, mail_type, file_title, mail_date,
                      receipt_date, from_org, sender,
                      receipent, subject, created_on, dept_id
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

     /**
      * Get all mails by a department id.
      */
      $app->get('/', function( ) use( $app ){
       $token = $app->request->headers->get('Authorization');
       $code = 200;
       if( $token ){
         $decoded = decodeJWT( $token );
         if($decoded['success'] == false){
           $code = 400;
           $response = Message::getMessage( false, "Token invalid");
         }else{
           $response = Mail::getAll($decoded['data']['dept_id']);
         }
       }else{
         $code = 400;
         $response = Message::getMessage( false, "Bad request");
       }
       setHTTPStatus( $app, $code );
       echo json_encode( $response );
      });
     /**
      * Get a mail correspondence by id.
      */
     $app->get('/:id', function( $id ) use( $app ){
         $token = $app->request->headers->get('Authorization');
         $code = 200;
         if( $token ){
           $decoded = decodeJWT( $token );
           if( $decoded['success'] == false ){
             $code = 400;
             $response = Message::getMessage( false, "Token invalid" );
           }else{
             $response = Mail::get( $id );
           }
         }else{
           $code = 400;
           $response = Message::getMessage( false, "Bad request" );
         }
         setHTTPStatus( $app, $code );
         echo json_encode( $response );
       });
    /**
     * Creates a mail correspondence.
     */
     $app->post('/', function() use ( $app ){
       $token = $app->request->headers->get('Authorization');
       $code = 200;
       if( $token ){
         $decoded = decodeJWT( $token );
         if( $decoded['success'] == false ){
           $code = 400;
           $response = Message::getMessage( false, "Token invalid" );
         }else{
           $request = json_decode( $app->request->getBody() );
           $request->dept_id = $decoded['data']['dept_id'];
           $request->created_by = $decoded['data']['uid'];
           $mail = new Mail( $request );
           $response = $mail->save();
           if($response == false){
             $code = 500;
           }else{
             $ac = array("mail_id" => $response,
                        "type_id" => 2,
                        "uid" => $request->created_by,
                        "description" => "Mail correspondence created."
              );
             $action = new Action( $ac );
             $action->save();
             $code = 200;
           }
         }
       }else{
         $code = 400;
         $response = Message::getMessage( false, "Bad request" );
       }
       setHTTPStatus( $app, $code );
       echo json_encode( $response );
     });

     $app->put('/:id', function( $id ) use ( $app ){
       $token = $app->request->headers->get('Authorization');
       $code = 200;
       if( $token ){
         $decoded = decodeJWT( $token );
         if( $decoded['success'] == false ){
           $code = 400;
           $response = Message::getMessage( false, "Token invalid" );
         }else{
           $request = json_decode( $app->request->getBody() );
           $response = Mail::update( $request );
           $code = 200;
         }
       }else{
         $code = 400;
         $response = Message::getMessage( false, "Bad request. No token in request" );
       }
       setHTTPStatus( $app, $code );
       echo json_encode( $response );
     });
     
    $app->post('/:id/upload', function( $id ) use ( $app ){
        //$upload = $_POST;
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
          echo json_encode('endpoint hit');
        }
    });
    /**
     * [$action description]
     * @var [type]
     */
    $app->post('/:id/actions', function( $id ) use ( $app ){
      $token = $app->request->headers->get('Authorization');
      $code = 200;
      if( $token ){
        $decoded = decodeJWT( $token );
        if( $decoded['success'] == false ){
          $code = 400;
          $response = Message::getMessage( false, "Token invalid" );
        }else{
          $request = json_decode( $app->request->getBody() );
          $request->uid= $decoded['data']['uid'];
          $action = new Action( $request );
          $response = $action->save();
          if($response != false) $code = 200;
          else $code = 500;
        }
      }else{
        $code = 400;
        $response = Message::getMessage( false, "Bad request. No token in request" );
      }
      setHTTPStatus( $app, $code );
      echo json_encode( $request );
    });
    /**
     * [$sql description]
     * @var string
     */
    $app->get('/:id/actions', function ( $id ) use ( $app ){
      $sql = 'SELECT id, created_on, mail_id, uid, description
                      FROM actions WHERE mail_id=:id
                      ORDER BY created_on DESC';
      try{
        $db = openDBConnection();
        $stmt = $db->prepare( $sql );
        $stmt->bindParam("id", $id);
        $stmt->execute();
        $result = $stmt->fetchAll( PDO::FETCH_OBJ );
        closeDBConnection( $db );
        setResponseHeader( $app );
        echo json_encode( $result );
      }catch(PDOException $e){
        echo '{"error":{"text":' .$e->getMessage(). '}}';
      }
    });
    /**
     * Get all attachments for a given mail correspondence id
     * @var string
     */
    $app->get('/:id/attachments', function ( $id ) use ( $app ){
      $sql = 'SELECT id, file_name, created_on
                      FROM uploads WHERE mail_id=:id
                      ORDER BY created_on DESC';
      try{
        $db = openDBConnection();
        $stmt = $db->prepare( $sql );
        $stmt->bindParam("id", $id);
        $stmt->execute();
        $result = $stmt->fetchAll( PDO::FETCH_OBJ );
        closeDBConnection( $db );
        setResponseHeader( $app );
        echo json_encode( $result );
      }catch(PDOException $e){
        echo '{"error":{"text":' .$e->getMessage(). '}}';
      }
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
