<?php
function register_api_hooks()
{
    register_rest_route('spotlas', '/login/', array(
        'methods' => 'POST',
        'callback' => 'login',
    ));

    register_rest_route('spotlas', '/options/', array(
      'methods' => 'GET',
      'callback' => 'getOptions',
    ));

    register_rest_route('spotlas', '/medianonce/', array(
      'methods' => 'GET',
      'callback' => 'getMediaNonce'
    ));

    register_rest_route('spotlas', '/nonces/', array(
      'methods' => 'GET',
      'callback' => 'getNonces'
    ));

}

add_action('rest_api_init', 'register_api_hooks');

function getMediaNonce() {
  return;
  //$mediaNonce = wp_create_nonce('media-form');
  //return $mediaNonce;
}

function getNonces() {
  $mediaNonce = wp_create_nonce('media-form');
  $nonce = wp_create_nonce('wp_rest');
  $returnObject = [
    'nonce' => $nonce,
    'mediaNonce' => $mediaNonce
  ];
  return $returnObject;
}

function login($request)
{
    $creds = array();
    $creds['user_login'] = $request['user_login'];
    $creds['user_password'] = $request['user_password'];
    $creds['remember'] = true;
    $user = wp_signon($creds, false);
    $userID = get_current_user_id();

    if (is_wp_error($user)) {
        $error = new WP_Error('not-logged-in', $user->get_error_messages(), array(
            'status' => 401,
            'message' => $user->get_error_messages()
        ));
        return  $error;
    }

    $nonce = wp_create_nonce('wp_rest');
    $mediaNonce = wp_create_nonce('media-form');

    if ( wp_verify_nonce( $nonce, 'wp_rest' ) ) {
      return [
        'nonce' => $nonce,
        'mediaNonce' => $mediaNonce,
        'user' => $userID,
        'logoutlink' => wp_logout_url()
      ];
    }

}

add_filter( 'rest_post_dispatch', function( WP_REST_Response $response, WP_REST_Server $rest, WP_REST_Request $request) {
    //$response->header('X-WP-Nonce', wp_create_nonce( 'wp_rest' ));
    return $response;
}, PHP_INT_MAX, 3);
// wp_create_nonce relies on user-id from global user object, and authentication cookie.
// both are INCORRECT after programmatic log-in or log-out.
// Really, WordPress? You should do this for us!
// make sure memory cache of the cookie matches the cookie just sent to the browser
// on log-in, set the global $_COOKIE to the correct value
// todo: see if more cookies need this.
add_action('set_logged_in_cookie', function($cookie_value){
    $_COOKIE[ LOGGED_IN_COOKIE ] = $cookie_value;
}, PHP_INT_MAX);
// on log-ou, clear the global $_COOKIE the same way wp_logout() does.
// todo: see if more cookies need this.
add_action('clear_auth_cookie', function(){
    $_COOKIE[ LOGGED_IN_COOKIE ] = ' ';
});
// set the global user to the correct user after programmatically logging in or out
// on log-in, update the global $current_user to the newly logged-in user
add_action('wp_login', function($login, $user){
	wp_set_current_user( $user->ID );
}, PHP_INT_MAX, 2);
// on log-out, invalidate the global user object.
add_action('wp_logout', function(){
	wp_set_current_user( 0 );
}, PHP_INT_MAX);
// add the current nonce to javascript
add_action('wp_head', function(){
	print '<script>window.nonce = '. json_encode(wp_create_nonce( 'wp_rest' )) .';</script>';
});

add_action('check_admin_referer', 'logout_without_confirm', 10, 2);
function logout_without_confirm($action, $result)
{
  /**
   * Allow logout without confirmation
   */
  if ($action == "log-out" && !isset($_GET['_wpnonce'])) {
    $redirect_to = home_url();
    $location = str_replace('&amp;', '&', wp_logout_url($redirect_to));;
    header("Location: $location");
    die;
  }
}
  ?>
