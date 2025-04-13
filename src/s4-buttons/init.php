<?php
/**
 * Server-side initialization for the S4 Buttons block
 *
 * @package S4GlobalsBlocks
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

/**
 * Register the S4 Buttons block
 */
function s4_buttons_block_init() {
	// Register the block using metadata from block.json
	register_block_type( __DIR__ );

	// Register custom icon font if needed
	if ( ! wp_style_is( 'bootstrap-icons', 'registered' ) ) {
		wp_register_style(
			'bootstrap-icons',
			'https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css',
			array(),
			'1.11.3'
		);
	}
	
	// Enqueue the Bootstrap Icons stylesheet
	wp_enqueue_style( 'bootstrap-icons' );
}

// Hook into init action to register the block
add_action( 'init', 's4_buttons_block_init' );