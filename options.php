<?php
/**
 * A unique identifier is defined to store the options in the database and reference them from the theme.
 * By default it uses the theme name, in lowercase and without spaces, but this can be changed if needed.
 * If the identifier changes, it'll appear as if the options have been reset.
 *
 */

function optionsframework_option_name() {

	// This gets the theme name from the stylesheet (lowercase and without spaces)
	$themename = get_option( 'stylesheet' );
	$themename = preg_replace("/\W/", "_", strtolower($themename) );

	$optionsframework_settings = get_option('optionsframework');
	$optionsframework_settings['id'] = $themename;
	update_option('optionsframework', $optionsframework_settings);

	// echo $themename;
}

/**
 * Defines an array of options that will be used to generate the settings page and be saved in the database.
 * When creating the 'id' fields, make sure to use all lowercase and no spaces.
 *
 */

function optionsframework_options() {

    $language_array = array(
		"de" => "German",
		"en" => "English"
	);

	// Pull all the categories into an array
	$options_categories = array();
	$options_categories_obj = get_categories();
	foreach ($options_categories_obj as $category) {
		$options_categories[$category->cat_ID] = $category->cat_name;
	}

	// Pull all tags into an array
	$options_tags = array();
	$options_tags_obj = get_tags();
	foreach ( $options_tags_obj as $tag ) {
		$options_tags[$tag->term_id] = $tag->name;
	}

	// Pull all the pages into an array
	$options_pages = array();
	$options_pages_obj = get_pages('sort_column=post_parent,menu_order');
	$options_pages[''] = 'Select a page:';
	foreach ($options_pages_obj as $page) {
		$options_pages[$page->ID] = $page->post_title;
	}

	// If using image radio buttons, define a directory path
	$imagepath =  get_template_directory_uri() . '/images/';
    $templatePath = esc_url( get_template_directory_uri() );
    $default_logo = $templatePath . "/assets/img/logo.svg";

    $logo_defaults = array(
		'image' => $default_logo
    );

	$options = array();

    $options[] = array(
		"name" => "Language",
		"id" => "language",
		"std" => "de",
		"type" => "select",
		"options" => $language_array
	);

	$options[] = array(
		'name' => __('Standard map center', 'options_check'),
		'desc' => __('The standard map center.', 'options_check'),
		'id' => 'location',
		'std' => '',
		'type' => 'text');

        $options[] = array(
    		'name' => __('Map center Longitude', 'options_check'),
    		'id' => 'latitude',
    		'std' => '51.05040880000001',
    		'type' => 'text');

            $options[] = array(
        		'name' => __('Map center Latitude', 'options_check'),
            		'id' => 'longitude',
        		'std' => '13.737262099999953',
				'type' => 'text');
		
	$options[] = array(
				'name' => __('The Location Basepath', 'options_check'),
				'desc' => __('When your Wordpress is in a subdirectory of your domain', 'options_check'),
            	'id' => 'basepath',
        		'std' => '/',
        		'type' => 'text');

	$options[] = array(
		'name' => __('Logo', 'options_check'),
		'desc' => __('The Logo to show (121 x 47 Pixels)', 'options_check'),
		'id' => 'logo',
		'type' => 'upload');

	return $options;
}
