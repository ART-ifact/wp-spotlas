<?php
add_action('wp_ajax_delete_attachment', 'delete_attachment');

function delete_attachment($post)
{
    //echo $_POST['att_ID'];
    $msg = 'Attachment ID ['.$_POST['att_ID'].'] has been deleted!';
    if (wp_delete_attachment($_POST['att_ID'], true)) {
        echo $msg;
    }
    die();
}
?>
