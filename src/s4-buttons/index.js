/**
 * WordPress dependencies
 */
import { registerBlockType } from '@wordpress/blocks';
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import edit from './edit';
import save from './view';
import metadata from './block.json';

/**
 * Register the S4 Buttons block
 */
registerBlockType(metadata.name, {
  ...metadata,
  edit,
  save,
});
