<?php
require 'vendor/autoload.php';
$dotenv = new Dotenv\Dotenv(__DIR__);
$dotenv->load();

$config['displayErrorDetails'] = true;

$app = new \Slim\Slim(["settings" => $config]);

function openDBConnection(){
		$user = getenv('DB_USER');
		$pass = getenv('DB_PASS');
		$pdo = new PDO('mysql:host=192.168.7.232;port=3306;dbname=mwhintra', $user, $pass);
		$pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
		return $pdo;
}	

function closeDBConnection($connection){
	$connection = null;
}

function setResponseHeader($app){
	$app->response()->header("Content-Type", "application/json");
}
/**
 * Get all deparments
 */
$app->get('/departments', function() use( $app ) {
   $sql = 'SELECT * FROM dept_tab';
		try{
			$db = openDBConnection();
			$stmt = $db->query( $sql );
			$departments = $stmt->fetchAll( PDO::FETCH_OBJ );
			closeDBConnection( $db );
			setResponseHeader( $app );
			echo '{' .json_encode( $departments ). '}';
		}catch(PDOException $e){
			echo '{"error":{"text":' .$e->getMessage(). '}}';
		}
});

$app->run();

?>
