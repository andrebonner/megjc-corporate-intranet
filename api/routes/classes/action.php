<?php
  /**
   *
   */
  class Action{
    private $created_on;
    private $description;
    private $mail_id;
    private $type_id;
    private $uid;
    /**
     * Constructs an action
     * @param array $action An action object/array
     */
    function __construct( $action ){
      $this->created_on = date("Y-m-d H:i:s");
      $this->mail_id = $action->mail_id;
      $this->type_id = $action->type_id;
      $this->uid = $action->uid;
      $this->description = $action->description;
    }
    /**
     * Saves an action for a mail correspondence.
     * @return [type] [description]
     */
    public function save(){
      try {
        $sql = 'INSERT INTO actions_bk (mail_id, type_id, uid, description, created_on)
                VALUES (:mail_id, :type_id, :uid, :description, :created_on)';
        $db = openDBConnection();
        $stmt = $db->prepare( $sql );
        $stmt->execute(array( ":mail_id" => $this->mail_id,
                              ":type_id" => $this->type_id,
                              ":uid" => $this->uid,
                              ":description" => $this->description,
                              ":created_on" => $this->created_on ));
        $action_id = $db->lastInsertId();
        closeDBConnection( $db );
      } catch (PDOException $e) {
        $action_id = $e->getMessage();
      }
      return $action_id;
  }
}

/**
 *
 */
class ActionType
{
  private $id;
  private $description;
  private $title;
  private $created_on;

  function __construct( $action_type ){
    $this->title = $action_type->title;
    $this->description = $action_type->description;
    $this->created_on = date('Y-m-d H:i:s');
  }

  function save(){
    try {
      $sql = 'INSERT INTO actiontypes (title, description, created_on)
              VALUES (:title, :description, :created_on)';
      $db = openDBConnection();
      $stmt = $db->prepare( $sql );
      $stmt->execute(array( ":title" => $this->title,
                            ":description" => $this->description,
                            ":created_on" => $this->created_on ));
      $action_type_id = $db->lastInsertId();
      closeDBConnection( $db );
    } catch (PDOException $e) {
      $action_type_id = $e->getMessage();
    }
    return $action_type_id;
  }
  /**
   * Get all action types
   * @return [type] [description]
   */
  static function getAll(){
    $sql = 'SELECT id, title FROM actiontypes WHERE access = "user"';
    try{
      $db = openDBConnection();
      $stmt = $db->prepare( $sql );
      $stmt->execute();
      $result = $stmt->fetchAll( PDO::FETCH_OBJ );
      closeDBConnection( $db );
    }catch(PDOException $e){
     $result = '{"error":{"text":' .$e->getMessage(). '}}';
    }
    return $result;
  }
}
 ?>
