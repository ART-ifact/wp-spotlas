<?php status_header(200); ?>
<!DOCTYPE html>
<html <?php language_attributes(); ?> class="no-js no-svg">
<head>
  <meta charset="<?php bloginfo( 'charset' ); ?>">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="profile" href="http://gmpg.org/xfn/11">
  <?php wp_head(); ?>
</head>
<body>
<?php $my_nonce = wp_create_nonce('media-form'); ?>
        <input type="hidden" class="wpnonce" value="<?php echo $my_nonce; ?>">
        <?php $my_api_nonce = wp_create_nonce('wp_rest'); ?>
        <input type="hidden" class="wpnonce-rest" value="<?php echo $my_api_nonce; ?>">
        <?php if ( !is_user_logged_in() ) {
            ?>
            <script>
            var loginPath = "authenticate";
             var locationIndex = window.location.pathname.indexOf(loginPath);
              if ( locationIndex ===  0 || locationIndex === -1) {
                var loginpath = window.location.pathname + loginPath;
                window.location.href = loginpath;
              }
            </script>
            
            <?php



    }?>
  <div id="app"></div>
  <?php wp_footer(); ?>
</body>
</html>