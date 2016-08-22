<?php
  include_once 'functions.php';

  function routeAuthRequests($app){

    $app->get('/', function() use ( $app ){
        $conn = openLDAPConnection();
        if($conn){
          $bind = ldap_bind($conn);
          $message = "Bind result is ".$bind.".";
          ldap_close($conn);
        }else{
          $message = "Unable to connect to LDAP Server";
        }
        try{
          $bind = ldap_bind($conn);
          $message = "Bind result is ".$bind.".";
          ldap_close($conn);
        }catch(ErrorException $e){
          $message = $e->getMessage();
        }
        $message = "Connection result is ". $r."";
        //$message = "Test";
        setResponseHeader($app);
        echo json_encode($message);
    });
    /**
     * Get a specific user
     */
    $app->get('/users/:id', function($id) use ( $app ){
        setResponseHeader($app);
        $user = array('id' => 1, 'name'=>'Tremaine', 'email'=>'tremainekbuchanan@gmail.com' );
        echo json_encode($user);
    });

    $app->get('/users', function() use($app){
      setResponseHeader($app);
      echo json_encode('Get all users');
    });

    $app->get('/loggedin', function() use($app){
        session_start();
        $_SESSION["username"] = "Tremaine";
        setResponseHeader($app);
        echo json_encode('Logged in');
    });

    $app->get('/logout', function() use($app){
      session_start();
      if(isset($_SESSION['username'])){
        unset($_SESSION['username']);
        $message = "Logged out";
      }else{
        $message = "Not logged in";
      } 
      setResponseHeader($app);   
      echo json_encode($message);
    });

    $app->get('/user', function() use($app){
      session_start();
      $user = array('authenticated' => false);
      if(isset($_SESSION['username'])){
        $user['authenticated'] = true;
      }
      setResponseHeader($app);
      echo json_encode($user);
    });
  }

?>
