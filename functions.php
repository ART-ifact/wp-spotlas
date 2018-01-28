<?php
// Remove all default WP template redirects/lookups
remove_action('template_redirect', 'redirect_canonical');
show_admin_bar(false);

/**
 * Since I'm already doing a tutorial, I'm not going to include comments to
 * this code, but if you want, you can check out the "example.php" file
 * inside the ZIP you downloaded - it has a very detailed documentation.
 */
require_once dirname(__FILE__).'/class-tgm-plugin-activation.php';

add_action('tgmpa_register', 'mytheme_require_plugins');

function mytheme_require_plugins() 
{
    $plugins = array(
        array(
            'name' => 'Options Framework',
            'slug' => 'options-framework',
            'required' => true, // this plugin is recommended
        ),
        array(
            'name' => 'Imsanity',
            'slug' => 'imsanity',
            'required' => true, // this plugin is recommended
        )
    );

    $config = array(
        'id' => 'spottr-tgmpa', // your unique TGMPA ID
        'default_path' => get_stylesheet_directory().'/lib/plugins/', // default absolute path
        'menu' => 'mytheme-install-required-plugins', // menu slug
        'has_notices' => true, // Show admin notices
        'dismissable' => false, // the notices are NOT dismissable
        'is_automatic' => true, // automatically activate plugins after installation
        'message' => 'The WP-REST-API is required by spottr to work like expected.', // message to output right before the plugins table
        'strings' => array(), // The array of message strings that TGM Plugin Activation uses
    );

    tgmpa($plugins, $config);
}

/*
 * This is an example of how to add custom scripts to the options panel.
 * This one shows/hides the an option when a checkbox is clicked.
 */
add_action('optionsframework_custom_scripts', 'optionsframework_custom_scripts');
function optionsframework_custom_scripts()
{
    ?>

        <script src="https://maps.googleapis.com/maps/api/js?libraries=places"></script>
        <script src="<?php
    echo esc_url(get_template_directory_uri()); ?>/backend/js/jquery.geocomplete.min.js" type="text/javascript"></script>
        <script type="text/javascript">
            jQuery(document).ready(function() {
                setTimeout(function () {
                    jQuery("#location")
                      .geocomplete()
                      .bind("geocode:result", function(event, result){
                        jQuery("#latitude").val(result.geometry.location.lat());
                        jQuery("#longitude").val(result.geometry.location.lng());
                      });
                }, 1000);
            });
        </script>

        <?php
}

/*
 * Helper function to return the theme option value. If no value has been saved, it returns $default.
 * Needed because options are saved as serialized strings.
 *
 * This code allows the theme to work without errors if the Options Framework plugin has been disabled.
 */

if (!function_exists('of_get_option')) {
    function of_get_option($name, $default = false)
    {
        $optionsframework_settings = get_option('optionsframework');

        // Gets the unique option id
        $option_name = $optionsframework_settings['id'];

        if (get_option($option_name)) {
            $options = get_option($option_name);
        }

        if (isset($options[$name])) {
            return $options[$name];
        } else {
            return $default;
        }
    }
}

// Redirect all requests to index.php so the Vue app is loaded and 404s aren't thrown
function remove_redirects()
{
    add_rewrite_rule('^/(.+)/?', 'index.php', 'top');
}
add_action('init', 'remove_redirects');

// Load scripts
function load_vue_scripts()
{
    wp_enqueue_style('blankslate/app.css', get_template_directory_uri().'/dist/styles/app.css', false, null);
    wp_enqueue_script('blankslate/manifest.js', get_template_directory_uri().'/dist/scripts/manifest.js', null, null, true);
    wp_enqueue_script('blankslate/vendor.js', get_template_directory_uri().'/dist/scripts/vendor.js', null, null, true);
    wp_enqueue_script('blankslate/app.js', get_template_directory_uri().'/dist/scripts/app.js', null, null, true);
}
add_action('wp_enqueue_scripts', 'load_vue_scripts', 100);

add_action('rest_api_init', 'slug_register_longitude');
add_action('rest_api_init', 'slug_register_latitude');
add_action('rest_api_init', 'slug_register_images');
add_action('rest_api_init', 'slug_register_accesibility');
add_action('rest_api_init', 'slug_register_type');
add_action('rest_api_init', 'slug_register_adress');
add_action('rest_api_init', 'slug_register_category');
add_action('rest_api_init', 'slug_register_cloudy');
add_action('rest_api_init', 'slug_register_foggy');
add_action('rest_api_init', 'slug_register_rainy');
add_action('rest_api_init', 'slug_register_sunny');
add_action('rest_api_init', 'slug_register_spring');
add_action('rest_api_init', 'slug_register_summer');
add_action('rest_api_init', 'slug_register_autumn');
add_action('rest_api_init', 'slug_register_winter');
add_action('rest_api_init', 'slug_register_hash');
add_action('rest_api_init', 'slug_register_shared');

add_action('rest_api_init', 'register_api_hooks');


function slug_register_hash()
{
    register_rest_field('post', 'hash', array(
        'get_callback' => 'slug_get_custom_field',
        'update_callback' => null,
        'schema' => null,
    ));
}

function slug_register_shared()
{
    register_rest_field('post', 'shared', array(
        'get_callback' => 'slug_get_custom_field',
        'update_callback' => null,
        'schema' => null,
    ));
}
function slug_register_longitude()
{
    register_rest_field('post', 'lng', array(
        'get_callback' => 'slug_get_custom_field',
        'update_callback' => null,
        'schema' => null,
    ));
}

function slug_register_latitude()
{
    register_rest_field('post', 'lat', array(
        'get_callback' => 'slug_get_custom_field',
        'update_callback' => null,
        'schema' => null,
    ));
}

function slug_register_adress()
{
    register_rest_field('post', 'adress', array(
        'get_callback' => 'slug_get_custom_field',
        'update_callback' => null,
        'schema' => null,
    ));
}

function slug_register_type()
{
    register_rest_field('post', 'type', array(
        'get_callback' => 'slug_get_custom_field',
        'update_callback' => null,
        'schema' => null,
    ));
}

function slug_register_images()
{
    register_rest_field('post', 'images', array(
        'get_callback' => 'slug_get_custom_field',
        'update_callback' => null,
        'schema' => null,
    ));
}

function slug_register_accesibility()
{
    register_rest_field('post', 'accesibility', array(
        'get_callback' => 'slug_get_custom_field',
        'update_callback' => null,
        'schema' => null,
    ));
}

function slug_register_category()
{
    register_rest_field('post', 'category', array(
        'get_callback' => 'slug_get_custom_field',
        'update_callback' => null,
        'schema' => null,
    ));
}

function slug_register_cloudy()
{
    register_rest_field('post', 'cloudy', array(
        'get_callback' => 'slug_get_custom_field',
        'update_callback' => null,
        'schema' => null,
    ));
}

function slug_register_foggy()
{
    register_rest_field('post', 'foggy', array(
        'get_callback' => 'slug_get_custom_field',
        'update_callback' => null,
        'schema' => null,
    ));
}

function slug_register_rainy()
{
    register_rest_field('post', 'rainy', array(
        'get_callback' => 'slug_get_custom_field',
        'update_callback' => null,
        'schema' => null,
    ));
}

function slug_register_sunny()
{
    register_rest_field('post', 'sunny', array(
        'get_callback' => 'slug_get_custom_field',
        'update_callback' => null,
        'schema' => null,
    ));
}

function slug_register_spring()
{
    register_rest_field('post', 'spring', array(
        'get_callback' => 'slug_get_custom_field',
        'update_callback' => null,
        'schema' => null,
    ));
}

function slug_register_summer()
{
    register_rest_field('post', 'summer', array(
        'get_callback' => 'slug_get_custom_field',
        'update_callback' => null,
        'schema' => null,
    ));
}

function slug_register_autumn()
{
    register_rest_field('post', 'autumn', array(
        'get_callback' => 'slug_get_custom_field',
        'update_callback' => null,
        'schema' => null,
    ));
}

function slug_register_winter()
{
    register_rest_field('post', 'winter', array(
        'get_callback' => 'slug_get_custom_field',
        'update_callback' => null,
        'schema' => null,
    ));
}
/**
 * Get the value of the "fields" field.
 *
 * @param array           $object     details of current post
 * @param string          $field_name name of field
 * @param WP_REST_Request $request    Current request
 *
 * @return mixed
 */
function slug_get_custom_field($object, $field_name, $request)
{
    return get_post_meta($object['id'], $field_name, true);
}

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

function register_api_hooks()
{
    register_rest_route('custom-plugin', '/login/', array(
        'methods' => 'GET',
        'callback' => 'login',
    ));
}

function login($request)
{
    $creds = array();
    $creds['user_login'] = $request['username'];
    $creds['user_password'] = $request['password'];
    $creds['remember'] = true;
    $user = wp_signon($creds, false);

    if (is_wp_error($user)) {
        $error = new WP_Error('not-logged-in', $user->get_error_messages(), array(
            'status' => 401,
            'message' => $user->get_error_messages()
        ));
        return  $error;
    }

    $nonce = wp_create_nonce('wp_rest');

    return $nonce;
}

//add_action('after_setup_theme', 'login');

add_filter('rest_pre_dispatch', function ($request) {
    $uri_parts = explode('?', $_SERVER['REQUEST_URI'], 2);
    $path = $uri_parts[0];
    $validPath = of_get_option('basepath') . 'wp-json/custom-plugin/login';
    $isValidRequest = false;

    if (isset($_GET['id']) && isset($_GET['hash'])) {
        $post_ID = $_GET['id'];
        $post_HASH = $_GET['hash'];

        $postIsHash = get_post_meta($post_ID, 'hash');


        if ($post_HASH === (string)$postIsHash[0]) {
            $isValidRequest = true;
        }
    }

    if (!is_user_logged_in() && $path !== $validPath && $isValidRequest === false) {
        $error = new WP_Error('not-logged-in', 'You are not logged in', array(
            'status' => 403,
        ));
        return  $error;
    }
});

add_action( 'rest_api_init', 'get_user_info' );

function get_user_info(){
    if (current_user_can( 'create_users' )) {
        return true;
    } else {
        return false;
    }
};

add_action( 'rest_api_init', function () {
    register_rest_route( 'spottr', '/admin', array(
        'methods' => 'GET',
        'callback' => 'get_user_info',
    ) );
} );


register_rest_field( 'user', 'userEmail',
    array(
        'get_callback'    => function ( $user ) {
            return $user['email'];
        },
        'update_callback' => null,
        'schema'          => null,
    )
);

add_filter( 'rest_post_collection_params', 'my_prefix_change_post_per_page', 10, 1 );

function my_prefix_change_post_per_page( $params ) {
    if ( isset( $params['per_page'] ) ) {
        $params['per_page']['maximum'] = 10000000;
    }

    return $params;
}

?>