<?php status_header(200); ?>
<!DOCTYPE html>
<html <?php language_attributes(); ?> class="no-js no-svg">
<head>
  <meta charset="<?php bloginfo('charset'); ?>">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="theme-color" content="#212121" />
  <link rel="profile" href="http://gmpg.org/xfn/11">
  <?php wp_head(); ?>
  <link rel="stylesheet" href="//fonts.googleapis.com/css?family=Roboto:400,500,700,400italic|Material+Icons">
</head>
<body>
<?php $my_nonce = wp_create_nonce('media-form'); ?>
        <input type="hidden" class="wpnonce" value="<?php echo $my_nonce; ?>">
        <?php $my_api_nonce = wp_create_nonce('wp_rest'); ?>
        <?php 
        $defaultLogo = esc_url( get_template_directory_uri() ) . "/dist/assets/img/logo.svg";

        if (of_get_option('logo')) {
            $logo = of_get_option('logo');
        } else {
            $logo = $defaultLogo;
        } 
        ?>
        <input type="hidden" class="wpnonce-rest" value="<?php echo $my_api_nonce; ?>">
        <input type="hidden" class="locale" value="<?php echo of_get_option('language'); ?>">
        <input type="hidden" class="logout-link" value="<?php echo wp_logout_url(home_url()); ?>">
        <input type="hidden" class="theme-url" value="<?php echo esc_url(get_template_directory_uri()); ?>">
        <input type="hidden" class="logo-url" value="<?php echo $logo?>">
        <input type="hidden" name="default_latitude" class="default_lat" value="<?php echo of_get_option('latitude'); ?>">
        <input type="hidden" name="default_longitude" class="default_lng" value="<?php echo of_get_option('longitude'); ?>">
        <input type="hidden" name="app-base" class="app-base" value="<?php echo of_get_option('basepath'); ?>">
  <div id="app"></div>
  <?php wp_footer(); ?>
</body>
</html>