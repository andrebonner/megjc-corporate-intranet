<?php
require 'vendor/autoload.php';
/** @var Dotenv Dotenv configuration */
$dotenv = new Dotenv\Dotenv(__DIR__);
$dotenv->load();
/************************************/

$config['displayErrorDetails'] = true;

$app = new \Slim\Slim(["settings" => $config]);
/**
 * Opens database connection
 * @return [type] [description]
 */
function openDBConnection(){
		$user = getenv('DB_USER');
		$pass = getenv('DB_PASS');
		$pdo = new PDO('mysql:host=192.168.7.232;port=3306;dbname=mwhintra', $user, $pass);
		$pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
		return $pdo;
}	
/**
 * Closes database connection
 * @param  [type] $connection [description]
 * @return [type]             [description]
 */
function closeDBConnection($connection){
	$connection = null;
}
/**
 * Sets the response header
 * @param [type] $app [description]
 */
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
			// echo '{' .json_encode( $departments ). '}';
			echo json_encode( $departments );
		}catch(PDOException $e){
			echo '{"error":{"text":' .$e->getMessage(). '}}';
		}
});
/**
 * Get a department by id
 */
$app->get('/departments/:id', function($id) use( $app ) {
   $sql = 'SELECT * FROM dept_tab WHERE dept_id=:id';
		try{
			$db = openDBConnection();
			$stmt = $db->prepare( $sql );
	        $stmt->bindParam("id", $id);
	        $stmt->execute();
	        $department = $stmt->fetchObject();        	
			closeDBConnection( $db );
			setResponseHeader( $app );
			echo json_encode( $department );
		}catch(PDOException $e){
			echo '{"error":{"text":' .$e->getMessage(). '}}';
		}
});

/**
 * Run the Slim application
 */
$app->run();

?>
