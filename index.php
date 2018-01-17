<?php status_header(200); ?>
<!DOCTYPE html>
<html <?php language_attributes(); ?> class="no-js no-svg">
<head>
  <meta charset="<?php bloginfo('charset'); ?>">
  <meta name="viewport" content="width=device-width, initial-scale=1 user-scalable=no">
  <meta name="theme-color" content="#212121" />
  <link rel="apple-touch-icon" sizes="57x57" href="/appicons/apple-icon-57x57.png">
    <link rel="apple-touch-icon" sizes="60x60" href="/appicons/apple-icon-60x60.png">
    <link rel="apple-touch-icon" sizes="72x72" href="/appicons/apple-icon-72x72.png">
    <link rel="apple-touch-icon" sizes="76x76" href="/appicons/apple-icon-76x76.png">
    <link rel="apple-touch-icon" sizes="114x114" href="/appicons/apple-icon-114x114.png">
    <link rel="apple-touch-icon" sizes="120x120" href="/appicons/apple-icon-120x120.png">
    <link rel="apple-touch-icon" sizes="144x144" href="/appicons/apple-icon-144x144.png">
    <link rel="apple-touch-icon" sizes="152x152" href="/appicons/apple-icon-152x152.png">
    <link rel="apple-touch-icon" sizes="180x180" href="/appicons/apple-icon-180x180.png">
    <link rel="icon" type="image/png" sizes="192x192"  href="/appicons/android-icon-192x192.png">
    <link rel="icon" type="image/png" sizes="32x32" href="/appicons/favicon-32x32.png">
    <link rel="icon" type="image/png" sizes="96x96" href="/appicons/favicon-96x96.png">
    <link rel="icon" type="image/png" sizes="16x16" href="/appicons/favicon-16x16.png">
    <link rel="manifest" href="manifest.json">
    <meta name="msapplication-TileColor" content="#212121">
    <meta name="msapplication-TileImage" content="/appicons/ms-icon-144x144.png">

  <meta name="mobile-web-app-capable" content="yes">
  <meta name="apple-mobile-web-app-capable" content="yes">
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