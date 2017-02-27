<?php
namespace App\Models;

/**
 *
 */
class SQL
{
  public static $LISTBYDEPARTMENT = 'SELECT m.id, mt.title as mail_type, mc.title as mail_category,
                 m.file_title, m.mail_date, m.receipt_date, m.from_org, m.sender,
                 m.receipent, m.subject, m.created_on, m.dept_id, m.deleted
                 FROM mails as m
                 INNER JOIN mailtypes as mt
                 ON m.mail_type = mt.id
                 INNER JOIN mailcategories as mc
                 ON m.mail_category = mc.id
                 WHERE m.dept_id =:id
                 ORDER BY m.created_on';

   public static $LISTBYCATEGORY = 'SELECT m.id, mt.title as mail_type, mc.title as mail_category,
                  m.file_title, m.mail_date, m.receipt_date, m.from_org, m.sender,
                  m.receipent, m.subject, m.created_on, m.dept_id, m.deleted
                  FROM mails as m
                  INNER JOIN mailtypes as mt
                  ON m.mail_type = mt.id
                  INNER JOIN mailcategories as mc
                  ON m.mail_category = mc.id
                  WHERE m.mail_category =:id
                  ORDER BY m.created_on';

 public static $LIST = 'SELECT id, mail_type, file_title, mail_date,
                receipt_date, from_org, sender,
                receipent, subject, created_on, dept_id, deleted
                FROM mails
                ORDER BY created_on DESC';

  public static $GETBYID = 'SELECT m.id, mt.title as mail_type, mc.title as mail_category,
                 m.file_title, m.mail_date, m.receipt_date, m.from_org, m.sender,
                 m.receipent, m.subject, m.created_on, m.dept_id, m.deleted
                 FROM mails as m
                 INNER JOIN mailtypes as mt
                 ON m.mail_type = mt.id
                 INNER JOIN mailcategories as mc
                 ON m.mail_category = mc.id
                 WHERE m.id =:id';

 public static $INSERTMAIL = 'INSERT INTO mails (mail_type, mail_category, file_title,
                           mail_date, receipt_date,
                           from_org, sender, receipent, subject,
                           created_by, created_on, dept_id, deleted)
                     VALUES (:mail_type, :mail_category, :file_title, :mail_date,
                             :receipt_date, :from_org, :sender,
                             :receipent, :subject, :created_by,
                             :created_on, :dept_id, :deleted)';
public static $INSERTMAILACTION = 'INSERT INTO actions (mail_id, uid, type, description, created_on)
        VALUES (:mail_id, :uid, :type, :description, :created_on)';

public static $LISTACTIONS = 'SELECT * FROM actions WHERE mail_id =:id';
}

?>
