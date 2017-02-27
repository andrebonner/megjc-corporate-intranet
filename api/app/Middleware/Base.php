<?php
namespace App\Middleware;

/**
 *
 */
class Base
{
  protected $container;
  function __construct($container){
    $this->container = $container;
  }
}

?>
