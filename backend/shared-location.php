<?php

add_filter('rest_pre_dispatch', function ($request) {
  $uri_parts = explode('?', $_SERVER['REQUEST_URI'], 2);
  $path = $uri_parts[0];
  $validPath = of_get_option('basepath') . 'wp-json/nonce/v1/get';
  $validPath2 = of_get_option('basepath') . 'wp-json/nonce/v1/verify';
  $validPath3 = of_get_option('basepath') . 'wp-json/spotlas/login';
  $isValidRequest = false;

  if (isset($_GET['id']) && isset($_GET['hash'])) {
      $post_ID = $_GET['id'];
      $post_HASH = $_GET['hash'];

      $postIsHash = get_post_meta($post_ID, 'hash');


      if ($post_HASH === (string)$postIsHash[0]) {
          $isValidRequest = true;
      }
  }

  if (!is_user_logged_in() && $path !== $validPath && $path !== $validPath3 && $path !== $validPath2 && $isValidRequest === false) {
      $error = new WP_Error('not-logged-in', 'You are not logged in', array(
          'status' => 403,
      ));
      return  $error;
  }
});
?>
