<?php
use Slim\App;
require 'vendor/autoload.php';

$config['displayErrorDetails'] = true;

$app = new App(["settings" => $config]);
/**
* Slim group defining version of api
*/

$container = $app->getContainer();

$container['Auth'] = function($container){
  return new \App\Controllers\Auth($container);
};

require 'routes.php';
// $app->group('/v1', function() use ($app){
//
// 		$app->group('/departments', function() use ($app){
// 				routeDepartmentRequests($app);
// 		});
//
// 		$app->group('/employees', function() use($app){
// 				routeEmployeeRequests($app);
// 		});
//
// 		$app->group('/tickets', function() use($app){
// 				routeTicketRequests($app);
// 		});
//
// 		$app->group('/admin', function() use($app){
// 				routeAdminRequests($app);
// 		});
//
// 		$app->group('/auth', function() use($app){
// 					routeAuthRequests($app);
// 		});
//
// 		$app->group('/poll', function() use($app){
// 					routePollRequests($app);
// 		});
//
// 		$app->group('/users', function() use($app){
// 					routeUserRequests($app);
// 		});
//
// 		$app->group('/mails', function() use( $app ){
// 					routeMailRequests( $app );
// 		});
//
// 		$app->group('/upload', function() use( $app ){
// 					routeUploadRequests( $app );
// 		});
// }); //end of group
/**
 * Run the Slim application
 */
$app->run();

?>
