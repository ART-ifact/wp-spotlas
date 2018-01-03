<?php
require_once("../../../../wp-load.php");
global $wpdb;

if (isset ($_POST['id_edit'])) {
    $id = $_POST['id_edit'];
}
if (isset ($_POST['title_edit'])) {
    $title =  $_POST['title_edit'];
} else {
    echo 'Please enter a title';
}

if (isset ($_POST['description_edit'])) {
    $description =  $_POST['description_edit'];
} else {
    echo 'Please enter a note';
}


// Add the content of the form to $post as an array
$post = array(
    'ID'            => $id,
    'post_title'    => $title,
    'post_content'  => $description,
    'post_status'   => 'private',           // Choose: publish, preview, future, etc.
);


wp_update_post($post);  // Pass  the value of $post to WordPress the insert function
// http://codex.wordpress.org/Function_Reference/wp_insert_post


//insert custom fields
update_post_meta($id,'type', $_POST['type_edit']);
update_post_meta($id,'lng', $_POST['lng_edit']);
update_post_meta($id,'lat', $_POST['lat_edit']);
update_post_meta($id,'adress', $_POST['adress_edit']);
update_post_meta($id,'accesibility', $_POST['accesibility_edit']);
update_post_meta($id,'category', $_POST['category_edit']);
update_post_meta($id,'images', $_POST['images_edit']);
update_post_meta($id,'rainy', $_POST['rainy_edit']);
update_post_meta($id,'foggy', $_POST['foggy_edit']);
update_post_meta($id,'cloudy', $_POST['cloudy_edit']);
update_post_meta($id,'sunny', $_POST['sunny_edit']);
update_post_meta($id,'spring', $_POST['spring_edit']);
update_post_meta($id,'summer', $_POST['summer_edit']);
update_post_meta($id,'autumn', $_POST['autumn_edit']);
update_post_meta($id,'winter', $_POST['winter_edit']);


?>
