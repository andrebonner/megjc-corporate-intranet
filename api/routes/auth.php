<?php
include_once 'functions.php';
$dotenv = new Dotenv\Dotenv(__DIR__);
$dotenv->load();

function routeAuthRequests($app){

  $app->post('/', function() use ( $app ){
     	$user = json_decode($app->request->getBody());
      $message = array("success" => "", "description"=>"", "dn" => "no dn found");
  try{
        $conn = openLDAPConnection();
        $ldapbind = bindLDAP($conn, getenv('LDAP_ADMIN'), getenv('LDAP_PASS'));
    	  if($ldapbind){
        		$dn = getDnFromLDAP($conn, $user->name);
        		$ldap_bind = bindLDAP($conn, $dn, $user->password);
          		if($ldap_bind){
          			$message["success"] = true;
          			$message["description"] = "The username/password entered was valid";
                $message["dn"] = $dn;
          			setHTTPStatus($app, 200);
          		}else{
          			$message["success"] = false;
          			$message["description"] = "The username/password entered was invalid";
          			setHTTPStatus($app, 400);
          		 }
    	   }else{
          		$message["success"] = false;
          		$message["description"] = "The admin username/password combination was invalid";
          		setHTTPStatus($app, 500);
    	   }
    	  ldap_close($conn);

      }catch(ErrorException $e){
	        setHTTPStatus($app, 500);
          $message["success"] = false;
       	  $message["message"] = $e->getMessage();
	        $message["description"] = "An error exception was raised";
      }
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

  $app->get('/users', function() use($app){
    session_start();
    $user = array('authenticated' => false);
    if(isset($_SESSION['username'])){
      $user['authenticated'] = true;
    }
    setResponseHeader($app);
    echo json_encode($user);
  });

  // $app->get('/user', function() use($app){
  //   session_start();
  //   $user = array('authenticated' => false);
  //   if(isset($_SESSION['username'])){
  //     $user['authenticated'] = true;
  //   }
  //   setResponseHeader($app);
  //   echo json_encode($user);
  // });

}
?>
