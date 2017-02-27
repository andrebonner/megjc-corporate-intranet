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
        $sql = 'INSERT INTO responses (id, poll_id, answer)
                            VALUES (:id, :poll_id, :answer)';
        $stmt = $db->prepare($sql);
        $stmt->execute(array(":id" => $response->session_id,
                            ":poll_id" => $response->poll_id,
                            ":answer" => $response->answer));
        $result = $db->lastInsertId();
        closeDBConnection($db);
      } catch (PDOException $e) {
        $result = '{"error":{"text":' .$e->getMessage(). '}}';
      }
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
      $i = 0;
      $len = count($responses);
      $count_ok = 0;
      $count_dont = 0;
      $count_really_like = 0;
      $count_not_ready  = 0;
      while($len--){
        if($responses[$len]->answer === "ok") $count_ok += 1;
        if($responses[$len]->answer === "dont like") $count_dont +=1;
        if($responses[$len]->answer === "really like") $count_really_like += 1;
        if($responses[$len]->answer === "not ready") $count_not_ready += 1;
      }
      $results = array('ok_responses' => $count_ok,
                       'really_like_responses' => $count_really_like,
                       'dont_like_responses' => $count_dont,
                       'not_ready_responses' => $count_not_ready);
      echo json_encode($results);
    }
  }
?>
