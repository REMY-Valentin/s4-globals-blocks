<?php
/**
 * Plugin Name:       S4 globals blocks
 * Description:       Example block scaffolded with Create Block tool.
 * Version:           0.1.0
 * Requires at least: 6.7
 * Requires PHP:      7.4
 * Author:            The WordPress Contributors
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       s4-globals-blocks
 *
 * @package S4GlobalsBlocks
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

/**
 * Registers the block using the metadata loaded from the `block.json` file.
 * Behind the scenes, it registers also all assets so they can be enqueued
 * through the block editor in the corresponding context.
 *
 * @see https://developer.wordpress.org/reference/functions/register_block_type/
 */
function s4_globals_blocks_s4_globals_blocks_block_init() {
	register_block_type( __DIR__ . '/build/s4-globals-blocks' );
	register_block_type( __DIR__ . '/build/s4-globals-blocks-2' );
}
add_action( 'init', 's4_globals_blocks_s4_globals_blocks_block_init' );
