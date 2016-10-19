<?php
$filename = $_FILES['file']['name'];
$destination = 'uploads/' . $filename;
//$meta = $_POST;
//$destination = $meta['targetPath'] . $filename;
move_uploaded_file( $_FILES['file']['tmp_name'] , $destination );
echo json_encode("done");
?>
