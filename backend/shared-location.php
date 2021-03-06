<?php

add_filter('rest_pre_dispatch', function ($request) {
  $uri_parts = explode('?', $_SERVER['REQUEST_URI'], 2);
  $path = $uri_parts[0];

  $validPaths = array(
    of_get_option('basepath') . 'wp-json/nonce/v1/get',
    of_get_option('basepath') . 'wp-json/nonce/v1/verify',
    of_get_option('basepath') . 'wp-json/spotlas/login',
    '/wp-json/nonce/v1/get',
    '/wp-json/nonce/v1/verify',
    '/wp-json/spotlas/login',
    '/wp-json/spotlas/options'
  );
  $isValidRequest = false;

  if (isset($_GET['id']) && isset($_GET['hash'])) {
      $post_ID = $_GET['id'];
      $post_HASH = $_GET['hash'];

      $postIsHash = get_post_meta($post_ID, 'hash');


      if ($post_HASH === (string)$postIsHash[0]) {
          $isValidRequest = true;
      }
  }

  if (!is_user_logged_in()  && !in_array($path, $validPaths) && $isValidRequest === false) {
      $error = new WP_Error('not-logged-in', 'You are not logged in', array(
          'status' => 403,
          'inarray' => in_array($path, $validPaths),
          '$path' => $path,
          '$validPaths' => $validPaths
      ));
      return  $error;
  }
});

?>
