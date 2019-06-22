<?php
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
?>
