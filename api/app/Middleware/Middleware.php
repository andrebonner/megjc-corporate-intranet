<?php
namespace App\Middleware;

/**
 *
 */
class Middleware{

  protected $container;
  protected $route;

  function __construct($container, $route = NULL){
    $this->container = $container;
    if(!is_null($route)) $this->route = $route;
  }
}

?>
