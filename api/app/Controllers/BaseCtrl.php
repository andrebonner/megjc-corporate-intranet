<?php
namespace App\Controllers;

/**
 *
 */
class BaseCtrl
{
  protected $container;
  function __construct($container){
    $this->container = $container;
  }
}

?>
