<?php
require_once("../../../../wp-load.php");
global $wpdb;
wp_delete_post( $_POST['id'], true );
?>
