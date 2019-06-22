<?php

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

?>
