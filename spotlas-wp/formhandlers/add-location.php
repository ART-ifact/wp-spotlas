<?php
require_once("../../../../wp-load.php");
global $wpdb;

// Do some minor form validation to make sure there is content
if (isset ($_POST['title'])) {
    $title =  $_POST['title'];
} else {
    echo 'Please enter a title';
}

if (isset ($_POST['description'])) {
    $description = $_POST['description'];
} else {
    $description = '';
}

// Add the content of the form to $post as an array
$post = array(
    'post_title'    => $title,
    'post_content'  => $description,
    'post_status'   => 'publish',           // Choose: publish, preview, future, etc.
    //'post_type' => 'location'  // Use a custom post type if you want to
);


$pid = wp_insert_post($post);  // Pass  the value of $post to WordPress the insert function
// http://codex.wordpress.org/Function_Reference/wp_insert_post

echo($pid);
//insert custom fields
update_post_meta($pid,'type',$_POST['type']);
update_post_meta($pid,'lng',$_POST['lng']);
update_post_meta($pid,'lat',$_POST['lat']);
update_post_meta($pid,'adress',$_POST['adress']);
update_post_meta($pid,'accesibility',$_POST['accesibility']);
update_post_meta($pid,'category',$_POST['category']);
update_post_meta($pid,'images',$_POST['images']);
update_post_meta($pid,'rainy',$_POST['rainy']);
update_post_meta($pid,'foggy',$_POST['foggy']);
update_post_meta($pid,'cloudy',$_POST['cloudy']);
update_post_meta($pid,'sunny',$_POST['sunny']);
update_post_meta($pid,'spring',$_POST['spring']);
update_post_meta($pid,'summer',$_POST['summer']);
update_post_meta($pid,'autumn',$_POST['autumn']);
update_post_meta($pid,'winter',$_POST['winter']);
update_post_meta($pid,'shared', $_POST['shared']);
update_post_meta($pid,'hash', $_POST['hash']);

return $pid;
?>
