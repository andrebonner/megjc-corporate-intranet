<?php
include_once 'functions.php';
/**
 * [routeTicketRequests description]
 * @param  [type] $app [description]
 * @return [type]      [description]
 */
function routeTokenRequests($app){
  $app->get('/', function() use ( $app ){
      $token = createJWTToken();
      setResponseHeader( $app );
      echo json_encode( array ("token" => encodeJWT( $token ) ) );
  });

  $app->post('/', function() use ( $app ){
     $token = json_decode( $app->request->getBody() );
     setResponseHeader( $app );

     $token_array = ( array ) $token;

     if(!$token_array['token']){
       $result = decodeJWT( $token_array['token']);
     }else{
       $result = array(
         "success" => false,
         "message" => "Bad request",
         "http_code" => 400
       );
     }
     setHTTPStatus($app, $result['http_code']);
     echo json_encode( $result );
    //  if(isset($token)){
    //    if($token->token){
    //      $result = decodeJWT( $token->token );
    //    }else{
    //      setHTTPStatus($app, 400);
    //     echo json_encode(array("success" => false, "message"=> "Bad request no token in object"));
    //    }
    //  }else{
    //     setHTTPStatus($app, 400);
    //    echo json_encode(array("success" => false, "message"=> "Bad request empty token"));
    //  }

    //  if($result['success'] == true){
    //    setHTTPStatus($app, 200);
    //    echo json_encode( $result['data'] );
    //  }else{
    //    setHTTPStatus($app, 401);
    //    echo json_encode( $result );
    //  }
  });
}
?>
