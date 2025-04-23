<?php

/**
 * S4 Block Styles Registrar Class
 * 
 * Registers custom block styles from theme.json
 */
class S4_Block_Styles_Registrar
{
  private $theme_json_handler;

  /**
   * Constructor
   */
  public function __construct()
  {
    $this->theme_json_handler = new S4_Theme_JSON_Handler();
    add_action('init', [$this, 'register_custom_block_styles']);
  }

  /**
   * Register all custom block styles from theme.json
   */
  public function register_custom_block_styles()
  {
    $custom_styles = $this->theme_json_handler->get_all_block_styles();

    if (empty($custom_styles)) {
      return;
    }

    foreach ($custom_styles as $block_name => $styles) {
      foreach ($styles as $style_name => $style_properties) {
        register_block_style(
          $block_name,
          [
            'name' => sanitize_title($style_name),
            'label' => $style_properties['label'],
            'inline_style' => $this->generate_inline_style($block_name, $style_name, $style_properties),
            'is_default' => isset($style_properties['isDefault']) ? $style_properties['isDefault'] : false,
          ]
        );
      }
    }
  }

  /**
   * Generate inline CSS for the block style
   */
  private function generate_inline_style($block_name, $style_name, $style_properties)
  {
    if (!isset($style_properties['css'])) {
      return '';
    }

    $block_class = wp_get_block_default_classname(str_replace('core/', '', $block_name));
    $style_class = 'is-style-' . sanitize_title($style_name);

    return ".$block_class.$style_class { {$style_properties['css']} }";
  }
}
