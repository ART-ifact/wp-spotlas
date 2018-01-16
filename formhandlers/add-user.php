<?php
require_once("../../../../wp-load.php");
global $wpdb;

$generatedPassword = wp_generate_password(6, false);

$userdata = array(
    'user_login'  =>  $_POST['username'],
    'user_email'  => $_POST['email'],
    'user_pass'   => $generatedPassword,
    'display_name'=> $_Post['first_name'],
    'first_name'  => $_Post['first_name'],
    'last_name'   => $_Post['last_name'],
    'role'        => 'contributor'
);

$user_id = wp_insert_user( $userdata ) ;

//On success
if ( ! is_wp_error( $user_id ) ) {
    return $user_id;
    wp_new_user_notification( $user_id, null, 'user');
} else {
    echo "Oh Oh something failed";
}
?>
