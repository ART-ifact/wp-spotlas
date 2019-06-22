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
        <input type="hidden" class="maps-api" value="<?php echo of_get_option('api-key'); ?>">
        <input type="hidden" class="logout-link" value="<?php echo wp_logout_url(home_url()); ?>">
        <input type="hidden" class="theme-url" value="<?php echo esc_url(get_template_directory_uri()); ?>">
        <input type="hidden" class="logo-url" value="<?php echo $logo?>">
        <input type="hidden" name="default_latitude" class="default_lat" value="<?php echo of_get_option('latitude'); ?>">
        <input type="hidden" name="default_longitude" class="default_lng" value="<?php echo of_get_option('longitude'); ?>">
        <input type="hidden" name="app-base" class="app-base" value="<?php echo of_get_option('basepath'); ?>">
<?php require get_template_directory()."/dist/index.html"; ?>
