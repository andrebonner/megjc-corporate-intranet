<?php
  /**
   *
   */
  class Mail{
    private $created_on;
    private $created_by;
    private $dept_id;
    private $file_title;
    private $from_org;
    private $id;
    private $mail_date;
    private $mail_type;
    private $receipt_date;
    private $receipent;
    private $sender;
    private $subject;
    /**
     * Creates a mail
     * @param [type] $mail [description]
     */
    function __construct( $mail ){
      $this->created_on = date("Y-m-d H:i:s");
      $this->created_by = $mail->created_by;
      $this->dept_id = $mail->dept_id;
      $this->file_title = $mail->file_title;
      $this->from_org = $mail->from_org;
      $this->mail_date = $mail->mail_date;
      $this->mail_type = $mail->mail_type;
      $this->receipt_date = $mail->receipt_date;
      $this->receipent = $mail->receipent;
      $this->sender = $mail->sender;
      $this->subject = $mail->subject;
    }
    /**
     * Saves a new mail resource.
     * @return [type] [description]
     */
    public function save(){
      $sql = 'INSERT INTO mails (mail_type, file_title,
                                mail_date, receipt_date,
                                from_org, sender, receipent, subject,
                                created_by, created_on, dept_id)
              VALUES (:mail_type, :file_title, :mail_date,
                      :receipt_date, :from_org, :sender,
                      :receipent, :subject, :created_by,
                      :created_on, :dept_id)';
      try {
        $db = openDBConnection();
        $stmt = $db->prepare($sql);
        $stmt->execute(array(":mail_type" => $this->mail_type,
                            ":file_title" => strtolower( $this->file_title ),
                            ":mail_date" => $this->mail_date,
                            ":receipt_date" => $this->receipt_date,
                            ":from_org" => strtolower( $this->from_org ),
                            ":sender" => strtolower( $this->sender ),
                            ":receipent" => strtolower( $this->receipent ),
                            ":subject" => strtolower( $this->subject ),
                            ":created_by" => $this->created_by,
                            ":created_on" => date("Y-m-d H:i:s"),
                            ":dept_id" => $this->dept_id ));
       $mail_id = $db->lastInsertId();
       closeDBConnection( $db );
      } catch (PDOException $e) {
        $mail_id = false;
      }
      return $mail_id;
    }
    /**
     * Get all mails by department id.
     * @param  [type] $dept_id [description]
     * @return [type]          [description]
     */
    static function getAll( $dept_id ){
      $sql = 'SELECT id, mail_type, file_title, mail_date,
                      receipt_date, from_org, sender,
                      receipent, subject, created_on, dept_id
                      FROM mails WHERE dept_id=:id
                      ORDER BY created_on DESC';
      try{
        $db = openDBConnection();
        $stmt = $db->prepare( $sql );
        $stmt->bindParam("id", $dept_id);
        $stmt->execute();
        $result = $stmt->fetchAll( PDO::FETCH_OBJ );
        closeDBConnection( $db );
      }catch(PDOException $e){
       $result = '{"error":{"text":' .$e->getMessage(). '}}';
      }
      return $result;
    }
    /**
     * Get a mail correspondence by an id.
     * @param  [type] $id [description]
     * @return [type]     [description]
     */
    static function get( $id ){
      $sql = 'SELECT id, mail_type, file_title, mail_date,
                      receipt_date, from_org, sender,
                      receipent, subject, created_on, dept_id
                      FROM mails WHERE id=:id
                      ORDER BY created_on DESC';
      $sql_attachments = 'SELECT id, file_name, mail_id, created_on
                          FROM uploads WHERE mail_id=:id';
      $sql_actions = 'SELECT id, created_on, mail_id, uid, description
                      FROM actions_bk WHERE mail_id=:id
                      ORDER BY created_on DESC';
        try{
          $db = openDBConnection();
          $stmt = $db->prepare( $sql );
          $stmt->bindParam("id", $id);
          $stmt->execute();
          $mail = $stmt->fetch( PDO::FETCH_OBJ );
          $stmt = null;
          $stmt = $db->prepare( $sql_attachments );
          $stmt->bindParam("id", $id);
          $stmt->execute();
          $uploads = $stmt->fetchAll( PDO::FETCH_OBJ );
          $stmt = null;
          $stmt = $db->prepare( $sql_actions );
          $stmt->bindParam("id", $id);
          $stmt->execute();
          $actions = $stmt->fetchAll( PDO::FETCH_OBJ );
          closeDBConnection( $db );
          $result = array( "mail" => $mail,
                        "uploads"=> $uploads,
                        "actions" => $actions );
        }catch(PDOException $e){
          $result = '{"error":{"text":' .$e->getMessage(). '}}';
        }
        return $result;
    }
    /**
     * [update description]
     * @param  [type] $mail [description]
     * @return [type]       [description]
     */
    function update( $mail ){
      $sql = 'UPDATE mails
              SET mail_type=:mail_type,
                  file_title=:file_title,
                  mail_date=:mail_date,
                  receipt_date=:receipt_date,
                  from_org=:from_org,
                  sender=:sender,
                  receipent=:receipent,
                  subject=:subject
            WHERE id=:id';
      try {
        $db = openDBConnection();
        $stmt = $db->prepare($sql);
        $stmt->execute(array(":mail_type" => $mail->mail_type,
                            ":file_title" => strtolower( $mail->file_title ),
                            ":mail_date" => $mail->mail_date,
                            ":receipt_date" => $mail->receipt_date,
                            ":from_org" => strtolower( $mail->from_org ),
                            ":sender" => strtolower( $mail->sender ),
                            ":receipent" => strtolower( $mail->receipent ),
                            ":subject" => strtolower( $mail->subject ),
                            ":id" => $mail->id ));
       $mail_id = true;
       closeDBConnection( $db );
      } catch (PDOException $e) {
        $mail_id = false;
      }
      return $mail_id;
    }
  }
?>
