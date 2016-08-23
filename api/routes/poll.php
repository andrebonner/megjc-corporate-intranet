<?php
  include_once 'functions.php';

  function routePollRequests($app){
    $app->get('/', function() use($app){
      $sql = 'SELECT * FROM polls';
      try{
        $db = openDBConnection();
        $stmt = $db->query( $sql );
        $result = $stmt->fetchAll( PDO::FETCH_OBJ );
        closeDBConnection( $db );
        setResponseHeader( $app );
        echo json_encode($result);
      }catch(PDOException $e){
        echo '{"error":{"text":' .$e->getMessage(). '}}';
      }
    });

    $app->post('/responses', function() use($app){
      $response = json_decode($app->request->getBody());
      try {
        $db = openDBConnection();
        $sql = 'INSERT INTO responses (poll_id, response)
                            VALUES (:poll_id, :response)';
        $stmt = $db->prepare($sql);
        $stmt->execute(array(":poll_id" => $response->poll_id,
                            ":response" => $response->response));
        $result = $db->lastInsertId();
      } catch (PDOException $e) {
        $result = '{"error":{"text":' .$e->getMessage(). '}}';
      }
      closeDBConnection($db);
      setResponseHeader($app);
      echo json_encode($result);
    });

    $app->get('/responses', function() use($app){
      $sql = 'SELECT * FROM responses';
      try{
        $db = openDBConnection();
        $stmt = $db->query( $sql );
        $result = $stmt->fetchAll( PDO::FETCH_OBJ );
        closeDBConnection( $db );
        setResponseHeader( $app );
        processResult($result);
      }catch(PDOException $e){
        echo '{"error":{"text":' .$e->getMessage(). '}}';
      }
    });

    function processResult($responses){
      
      // $results = array('ok_responses' => $ok_count,
      //                  'really_like_responses' => $really_like,
      //                  'dont_like_responses' => $dont_like,
      //                  'not_ready_responses' => $not_ready);
      echo json_encode($results);
    }
  }
?>
