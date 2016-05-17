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
* 
*/
function handleDBResponse($result){
	if($result === false) echo json_encode( array() );
	else echo json_encode( $result );	
}
/**
* Slim group defining version of api
*/
$app->group('/v1', function() use ($app){
	/**
	* Get all deparments
	*/
	$app->get('/departments', function() use( $app ) {
		$sql = 'SELECT * FROM dept_tab';
		try{
			$db = openDBConnection();
			$stmt = $db->query( $sql );
			$result = $stmt->fetchAll( PDO::FETCH_OBJ );
			closeDBConnection( $db );
			setResponseHeader( $app );
			handleDBResponse( $result );
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
			$result = $stmt->fetchObject();        	
			closeDBConnection( $db );
			setResponseHeader( $app );
			handleDBResponse( $result );
		}catch(PDOException $e){
			echo '{"error":{"text":' .$e->getMessage(). '}}';
		}
	});
	/**
	* Get all employees
	*/
	$app->get('/employees', function() use ( $app ){
		$sql = 'SELECT * FROM employees';
		try{
			$db = openDBConnection();
			$stmt = $db->query( $sql );
			$result = $stmt->fetchAll( PDO::FETCH_OBJ );
			closeDBConnection( $db );
			setResponseHeader( $app );
			handleDBResponse( $result );
		}catch(PDOException $e){
			echo '{"error":{"text":' .$e->getMessage(). '}}';
		}
	});	
	/**
	* Get employees by department id
	*/
	$app->get('/departments/:id/employees', function( $id ) use ( $app ){
		$sql = 'SELECT * FROM employees WHERE dept_id=:id';
		try{
			$db = openDBConnection();
			$stmt = $db->prepare( $sql );
			$stmt->bindParam("id", $id);
			$stmt->execute();
			$result = $stmt->fetchObject();        	
			closeDBConnection( $db );
			setResponseHeader( $app );			
			handleDBResponse( $result );
		}catch(PDOException $e){
			echo '{"error":{"text":' .$e->getMessage(). '}}';
		}
	});
}); //end of group
/**
 * Run the Slim application
 */
$app->run();

?>
