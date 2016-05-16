<?php 
	// use \Psr\Http\Message\ServerRequestInterface as Request;
	// use \Psr\Http\Message\ResponseInterface as Response;

	require 'vendor/autoload.php';
	
	function openDBConnection(){
		$user = 'root';
		$pass = 'H1gh53cur1ty';
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
	
	$config['displayErrorDetails'] = true;

	$app = new \Slim\Slim(["settings" => $config]);

	$app->get('/api/departments', function() use( $app ){
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
	/**
	 * Creates a new department
	 */
	$app->post('/api/departments', function() use($app){
		$request = $app->request->getBody();
		$department = json_decode($request);
		$sql = "INSERT INTO dept_tab (dept_name, descrip, floor_id, isValid, ou_map) VALUES (:dept_name, :descrip, :floor_id, :isValid, ou_map)";
		try{
			$db = openDBConnection();
			$stmt = $db->prepare( $sql );
			$stmt = bindParam("dept_name", $department->dept_name);
			$stmt = bindParam("descrip", $department->descrip);
			$stmt = bindParam("floor_id", $department->floor_id);
			$stmt = bindParam("isValid", $department->isValid);
			$stmt = bindParam("ou_map", $department->ou_map);
			$stmt->execute();
			$department->id = $db->lastInsertId();
			closeDBConnection( $db );
			setResponseHeader( $app );
			echo json_encode( $department );
		}catch(PDOException $e){
			echo '{"error":{"text":'. $e->getMessage(). '}}';
		}
	});

	$app->get('/api/departments/:id', function($id) use( $app ){
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

	$app->put('/api/departments/:id', function($id) use( $app ){
		$request = $app->request->getBody();
		$department = json_decode( $request );
		$obj = get_object_vars($department);

		// $sql = "UPDATE dept_tab SET dept_name=:dept_name, descrip=:descrip WHERE dept_id=:id";
	 //    try {
	 //        $db = openDBConnection();
	 //        $stmt = $db->prepare( $sql );
	 //        $stmt->bindParam("dept_name", $department->dept_name);	 
	 //        $stmt->bindParam("descrip", $department->descrip);     
	 //        $stmt->bindParam("id", $id);  
	 //        $stmt->execute();
	 //        closeDBConnection( $db );
		// 	setResponseHeader( $app );
		// 	echo json_encode( $department );
	 //    } catch(PDOException $e) {
	 //        echo '{"error":{"text":'. $e->getMessage() .'}}';
	 //    }		
	});

	$app->run();

	
?>