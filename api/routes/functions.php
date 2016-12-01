<?php
$dotenv = new Dotenv\Dotenv(__DIR__);
use \Firebase\JWT\JWT;
$dotenv->load();
/**
 * Opens database connection
 * @return [type] [description]
 */
// TODO: implement try catch block for db connection
function openDBConnection(){
    $user = getenv('DB_USER');
    $pass = getenv('DB_PASS');
    $pdo = new PDO('mysql:host='.getenv('DB_HOST').';port='.getenv('DB_PORT').';dbname='.getenv('DB_NAME'), $user, $pass);
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
 * Sets the http response code
 * @param [type] $app    [description]
 * @param [type] $status [description]
 */
function setHTTPStatus($app, $status){
  $app->response()->setStatus($status);
}

/**
 * Handles api responses
 * @param  [type] $error
 * @param  [type] $response
 * @param  [type] $app
 * @return [type]
 */
function apiResponse($response, $app, $error, $status){
  if($response === false) $status = 404;

  if(empty($response) === true) $status = 204;

  sendResponse($app, $status, $response);
}
/**
 * Sends api response
 * @param  [type] $app      [description]
 * @param  [type] $status   [description]
 * @param  [type] $response [description]
 * @return [type]           [description]
 */
function sendResponse($app, $status, $response){
    setResponseHeader($app);
    setHTTPStatus($app, $status);
    echo json_encode($response);
}
/**
 * Determines if parameters for search exists
 * @param  [type] $params [description]
 * @return [type]         [description]
 */
function paramCheck($params){
    $checked = true;
    if(empty($params)){
      $checked = false;
    }else{
      if($params['q'] === "") $checked = false;
    }
    return $checked;
}
/**
 * Connects to a LDAP server.
 * @return [type] [description]
 */
function openLDAPConnection(){
  $ldaphost = "ldap://192.168.7.5"; //getenv('LDAP_HOST');
  $ldapport = getenv('LDAP_PORT');
  $ldapconn = ldap_connect($ldaphost, $ldapport);
  ldap_set_option($ldapconn, LDAP_OPT_PROTOCOL_VERSION, 3);
  ldap_set_option($ldapconn, LDAP_OPT_REFERRALS, 0);
  return $ldapconn;
}

function getDnFromLDAP($conn, $q){
	$dn = getenv('LDAP_ROOT_DN');
	$filter = "(|(name=$q*)(samaccountname=$q)(sn=$q*))";
	$attrs = array("displayname","cn", "sn", "givenname", "userPrincipalName", "samaccountname", "telephonenumber", "memberOf", "distinguisedName", "ou");
	$results = ldap_search($conn, $dn, $filter, $attrs);
	$info = ldap_get_entries($conn, $results);
	return $info[0]["dn"];
}

function bindLDAP($conn, $dn, $password){
	$ldap_bind = @ldap_bind($conn, $dn, $password);
	return $ldap_bind;
}

function startSession(){
  session_start();
}

function deleteSession(){
  unset($_SESSION['username']);
}

function setSession($key, $value){
  $_SESSION[$key] = $value;
}

function getSession($key){
  return $_SESSION[$key];
}
/**
 * Creates a default JWT token
 * @return object JWT token
 */
function createJWTToken( $user ){
  $token = array(
    "iss" => getenv('DOMAIN'),
    "iat" => time(),
    "nbf" => time() + 10,
    "uid" => $user['id'],
    "name" => "Tremaine Buchanan",
    "dept_id" => 1
  );
  return $token;
}
/**
 * Encodes a JSON Web Token
 * @param  object $token JSON Web Token
 * @return string        Encoded JSON Web Token
 */
function encodeJWT( $token ){
  $jwt = JWT::encode( $token, getenv('JWT_KEY') );
  return $jwt;
}
/**
 * Decodes a JSON Web Token
 * @param  [type] $token [description]
 * @return [type]        [description]
 */
function decodeJWT( $token ){
  try {
    $decoded = JWT::decode( $token, getenv('JWT_KEY'), array('HS256'));
    $data = ( array ) $decoded;
    return array(
        "success" => true,
        "data" =>  $data,
        "http_code" => 200
      );
    return (array) $decoded;
  } catch (Exception $e) {
    return array(
      "success" => false,
      "error" => $e->getMessage(),
      "http_code" => 401
    );
  }

}
?>
