<?php
// Remove all default WP template redirects/lookups
remove_action('template_redirect', 'redirect_canonical');
show_admin_bar(false);

// Redirect all requests to index.php so the Vue app is loaded and 404s aren't thrown
function remove_redirects() {
    add_rewrite_rule('^/(.+)/?', 'index.php', 'top');
}
add_action('init', 'remove_redirects');

// Load scripts
function load_vue_scripts() {
    wp_enqueue_style('blankslate/app.css', get_template_directory_uri() . '/dist/styles/app.css', false, null);
    wp_enqueue_script('blankslate/manifest.js', get_template_directory_uri() . '/dist/scripts/manifest.js', null, null, true);
    wp_enqueue_script('blankslate/vendor.js', get_template_directory_uri() . '/dist/scripts/vendor.js', null, null, true);
    wp_enqueue_script('blankslate/app.js', get_template_directory_uri() . '/dist/scripts/app.js', null, null, true);
}
add_action('wp_enqueue_scripts', 'load_vue_scripts', 100);

    add_action( 'rest_api_init', 'slug_register_longitude' );
    add_action( 'rest_api_init', 'slug_register_latitude' );
    add_action( 'rest_api_init', 'slug_register_images' );
    add_action( 'rest_api_init', 'slug_register_accesibility' );
    add_action( 'rest_api_init', 'slug_register_type' );
    add_action( 'rest_api_init', 'slug_register_adress' );
    add_action( 'rest_api_init', 'slug_register_category' );
    add_action( 'rest_api_init', 'slug_register_cloudy' );
    add_action( 'rest_api_init', 'slug_register_foggy' );
    add_action( 'rest_api_init', 'slug_register_rainy' );
    add_action( 'rest_api_init', 'slug_register_sunny' );
    add_action( 'rest_api_init', 'slug_register_spring' );
    add_action( 'rest_api_init', 'slug_register_summer' );
    add_action( 'rest_api_init', 'slug_register_autumn' );
    add_action( 'rest_api_init', 'slug_register_winter' );

    add_action( 'rest_api_init', 'register_api_hooks' );

    function slug_register_longitude() {
        register_rest_field( 'post',
            'lng',
            array(
                'get_callback'    => 'slug_get_custom_field',
                'update_callback' => null,
                'schema'          => null,
                )
            );
    }

    function slug_register_latitude() {
        register_rest_field( 'post',
            'lat',
            array(
                'get_callback'    => 'slug_get_custom_field',
                'update_callback' => null,
                'schema'          => null,
                )
            );
    }

    function slug_register_adress() {
        register_rest_field( 'post',
            'adress',
            array(
                'get_callback'    => 'slug_get_custom_field',
                'update_callback' => null,
                'schema'          => null,
                )
            );
    }

    function slug_register_type() {
        register_rest_field( 'post',
            'type',
            array(
                'get_callback'    => 'slug_get_custom_field',
                'update_callback' => null,
                'schema'          => null,
                )
            );
    }

    function slug_register_images() {
        register_rest_field( 'post',
            'images',
            array(
                'get_callback'    => 'slug_get_custom_field',
                'update_callback' => null,
                'schema'          => null,
                )
            );
    }

    function slug_register_accesibility() {
        register_rest_field( 'post',
            'accesibility',
            array(
                'get_callback'    => 'slug_get_custom_field',
                'update_callback' => null,
                'schema'          => null,
                )
            );
    }

    function slug_register_category() {
        register_rest_field( 'post',
            'category',
            array(
                'get_callback'    => 'slug_get_custom_field',
                'update_callback' => null,
                'schema'          => null,
                )
            );
    }

    function slug_register_cloudy() {
        register_rest_field( 'post',
            'cloudy',
            array(
                'get_callback'    => 'slug_get_custom_field',
                'update_callback' => null,
                'schema'          => null,
                )
            );
    }

    function slug_register_foggy() {
        register_rest_field( 'post',
            'foggy',
            array(
                'get_callback'    => 'slug_get_custom_field',
                'update_callback' => null,
                'schema'          => null,
                )
            );
    }

    function slug_register_rainy() {
        register_rest_field( 'post',
            'rainy',
            array(
                'get_callback'    => 'slug_get_custom_field',
                'update_callback' => null,
                'schema'          => null,
                )
            );
    }

    function slug_register_sunny() {
        register_rest_field( 'post',
            'sunny',
            array(
                'get_callback'    => 'slug_get_custom_field',
                'update_callback' => null,
                'schema'          => null,
                )
            );
    }

    function slug_register_spring() {
        register_rest_field( 'post',
            'spring',
            array(
                'get_callback'    => 'slug_get_custom_field',
                'update_callback' => null,
                'schema'          => null,
                )
            );
    }

    function slug_register_summer() {
        register_rest_field( 'post',
            'summer',
            array(
                'get_callback'    => 'slug_get_custom_field',
                'update_callback' => null,
                'schema'          => null,
                )
            );
    }

    function slug_register_autumn() {
        register_rest_field( 'post',
            'autumn',
            array(
                'get_callback'    => 'slug_get_custom_field',
                'update_callback' => null,
                'schema'          => null,
                )
            );
    }

    function slug_register_winter() {
        register_rest_field( 'post',
            'winter',
            array(
                'get_callback'    => 'slug_get_custom_field',
                'update_callback' => null,
                'schema'          => null,
                )
            );
    }
    /**
     * Get the value of the "fields" field
     *
     * @param array $object Details of current post.
     * @param string $field_name Name of field.
     * @param WP_REST_Request $request Current request
     *
     * @return mixed
     */
    function slug_get_custom_field( $object, $field_name, $request ) {
        return get_post_meta( $object[ 'id' ], $field_name, true );
    }


    add_action( 'wp_ajax_delete_attachment', 'delete_attachment' );

    function delete_attachment( $post ) {
    //echo $_POST['att_ID'];
        $msg = 'Attachment ID [' . $_POST['att_ID'] . '] has been deleted!';
        if( wp_delete_attachment( $_POST['att_ID'], true )) {
            echo $msg;
        }
        die();
    }

    function register_api_hooks() {

        register_rest_route(

        'custom-plugin', '/login/',
        array(
        'methods'  => 'GET',
        'callback' => 'login',
            )
        );
    }

    function login($request){
            $creds = array();
            $creds['user_login'] = $request["username"];
            $creds['user_password'] =  $request["password"];
            $creds['remember'] = true;
            $user = wp_signon( $creds, false );

        if ( is_wp_error($user) ) 

            echo $user->get_error_message();
            return $user;
        }

    add_action( 'after_setup_theme', 'custom_login' );

      add_filter( 'rest_pre_dispatch', function($request) {
          $uri_parts = explode('?', $_SERVER['REQUEST_URI'], 2);
          $path = $uri_parts[0];
        if ( ! is_user_logged_in() && $path !== "/wordpress/wp-json/custom-plugin/login") {
            return new WP_Error( 'not-logged-in', 'API Requests are only supported for authenticated requests', array( 'status' => 401 ) );
        }


    
  
} );


?>
