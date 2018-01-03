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
    echo 'Please enter the content';
}

echo($_POST['title']);
echo($_POST['description']);

// Add the content of the form to $post as an array
$post = array(
    'post_title'    => $title,
    'post_content'  => $description,
    'post_status'   => 'publish',           // Choose: publish, preview, future, etc.
    //'post_type' => 'location'  // Use a custom post type if you want to
);


$pid = wp_insert_post($post);  // Pass  the value of $post to WordPress the insert function
// http://codex.wordpress.org/Function_Reference/wp_insert_post


//insert custom fields
update_post_meta($pid,'type',$_POST['type']);
update_post_meta($pid,'lng',$_POST['lng']);
update_post_meta($pid,'lat',$_POST['lat']);
update_post_meta($pid,'adress',$_POST['adress']);
update_post_meta($pid,'accesibility',$_POST['accesibility']);
update_post_meta($pid,'category',$_POST['category']);
update_post_meta($pid,'images',$_POST['images']);
update_post_meta($pid,'rainy',!isset($_POST['rainy']));
update_post_meta($pid,'foggy',!isset($_POST['foggy']));
update_post_meta($pid,'cloudy',!isset($_POST['cloudy']));
update_post_meta($pid,'sunny',!isset($_POST['sunny']));
update_post_meta($pid,'spring',!isset($_POST['spring']));
update_post_meta($pid,'summer',!isset($_POST['summer']));
update_post_meta($pid,'autumn',!isset($_POST['autumn']));
update_post_meta($pid,'winter',!isset($_POST['winter']));

return $pid;
?>
