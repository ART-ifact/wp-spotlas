<?php
$fileContents = file_get_contents($_FILES["file"]["tmp_name"]);

echo $fileContents;

?>