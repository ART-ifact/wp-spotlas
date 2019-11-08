<?php
require_once("../../../../wp-load.php");
global $wpdb;

if (isset ($_POST['id'])) {
    $id = $_POST['id'];
}
if (isset ($_POST['title'])) {
    $title =  $_POST['title'];
} else {
    echo 'Please enter a title';
}

if (isset ($_POST['description'])) {
    $description =  $_POST['description'];
} else {
    echo 'Please enter a note';
}


// Add the content of the form to $post as an array
$post = array(
    'ID'            => $id,
    'post_title'    => $title,
    'post_content'  => $description,
    'post_status'   => 'publish',           // Choose: publish, preview, future, etc.
);


wp_update_post($post);  // Pass  the value of $post to WordPress the insert function
// http://codex.wordpress.org/Function_Reference/wp_insert_post


//insert custom fields
update_post_meta($id,'type', $_POST['type']);
update_post_meta($id,'lng', $_POST['lng']);
update_post_meta($id,'lat', $_POST['lat']);
update_post_meta($id,'adress', $_POST['adress']);
update_post_meta($id,'accesibility', $_POST['accesibility']);
update_post_meta($id,'category', $_POST['category']);
update_post_meta($id,'images', $_POST['images']);
update_post_meta($id,'rainy', $_POST['rainy']);
update_post_meta($id,'foggy', $_POST['foggy']);
update_post_meta($id,'cloudy', $_POST['cloudy']);
update_post_meta($id,'sunny', $_POST['sunny']);
update_post_meta($id,'spring', $_POST['spring']);
update_post_meta($id,'summer', $_POST['summer']);
update_post_meta($id,'autumn', $_POST['autumn']);
update_post_meta($id,'winter', $_POST['winter']);
update_post_meta($id,'shared', $_POST['shared']);
update_post_meta($id,'hash', $_POST['hash']);

return $id;


?>
