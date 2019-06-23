<?php

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
?>
