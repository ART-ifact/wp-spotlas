<?php
// Remove all default WP template redirects/lookups
remove_action('template_redirect', 'redirect_canonical');
show_admin_bar(false);

require_once( get_template_directory() ."/backend/options.php");
require_once( get_template_directory() ."/backend/general.php");
require_once( get_template_directory() ."/backend/post-fields.php");
require_once( get_template_directory() ."/backend/attachments.php");
require_once( get_template_directory() ."/backend/user.php");
require_once( get_template_directory() ."/backend/login.php");
require_once( get_template_directory() ."/backend/shared-location.php");

?>
