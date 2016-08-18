<?php
  include_once 'functions.php';

  function routeAuthRequests($app){

    $app->get('/', function() use ( $app ){
        $conn = openLDAPConnection();
        // if($conn){
        //   $bind = ldap_bind($conn);
        //   $message = "Bind result is ".$bind.".";
        //   ldap_close($conn);
        // }else{
        //   $message = "Unable to connect to LDAP Server";
        // }
        try{
          $bind = ldap_bind($conn);
          $message = "Bind result is ".$bind.".";
          ldap_close($conn);
        }catch(ErrorException $e){
          $message = $e->getMessage();
        }
        //$message = "Connection result is ". $r."";
        setResponseHeader($app);
        echo json_encode($message);
    });
    /**
     * Get a specific user
     */
    $app->get('/users/:id', function($id) use ( $app ){
        setResponseHeader($app);
        echo json_encode('Get a specific user by id');
    });

    $app->get('/users', function() use($app){
      setResponseHeader($app);
      echo json_encode('Get all users');
    });
  }

?>
