<?php

/**
 * S4 Theme JSON Handler Class
 * 
 * Manages interaction with theme.json file for storing custom block styles
 */
class S4_Theme_JSON_Handler
{
  private $theme_json_path;
  private $theme_json_data;

  /**
   * Constructor
   */
  public function __construct()
  {
    $this->theme_json_path = get_stylesheet_directory() . '/theme.json';
    $this->load_theme_json();
  }

  /**
   * Load the theme.json file or create a basic structure if it doesn't exist
   */
  private function load_theme_json()
  {
    if (file_exists($this->theme_json_path)) {
      $json_content = file_get_contents($this->theme_json_path);
      $this->theme_json_data = json_decode($json_content, true);
    } else {
      $this->theme_json_data = $this->get_default_theme_json();
    }
  }

  /**
   * Get default theme.json structure
   */
  private function get_default_theme_json()
  {
    return [
      '$schema' => 'https://schemas.wp.org/trunk/theme.json',
      'version' => 2,
      'settings' => [],
      'styles' => [],
      'customTemplates' => [],
      'templateParts' => [],
      'patterns' => [],
      's4BlockStyles' => [] // Our custom section for admin-defined styles
    ];
  }

  /**
   * Initialize theme.json if it doesn't exist
   */
  public function initialize_theme_json()
  {
    if (!file_exists($this->theme_json_path)) {
      $this->save_theme_json();
    }
  }

  /**
   * Save the theme.json data to file
   */
  public function save_theme_json()
  {
    $json_content = json_encode($this->theme_json_data, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES);
    if (!is_dir(dirname($this->theme_json_path))) {
      wp_mkdir_p(dirname($this->theme_json_path));
    }
    return file_put_contents($this->theme_json_path, $json_content);
  }

  /**
   * Add a new custom block style
   */
  public function add_block_style($block_name, $style_name, $style_properties)
  {
    if (!isset($this->theme_json_data['s4BlockStyles'])) {
      $this->theme_json_data['s4BlockStyles'] = [];
    }

    if (!isset($this->theme_json_data['s4BlockStyles'][$block_name])) {
      $this->theme_json_data['s4BlockStyles'][$block_name] = [];
    }

    $this->theme_json_data['s4BlockStyles'][$block_name][$style_name] = $style_properties;
    return $this->save_theme_json();
  }

  /**
   * Remove a custom block style
   */
  public function remove_block_style($block_name, $style_name)
  {
    if (isset($this->theme_json_data['s4BlockStyles'][$block_name][$style_name])) {
      unset($this->theme_json_data['s4BlockStyles'][$block_name][$style_name]);

      // Clean up if the block has no more styles
      if (empty($this->theme_json_data['s4BlockStyles'][$block_name])) {
        unset($this->theme_json_data['s4BlockStyles'][$block_name]);
      }

      return $this->save_theme_json();
    }
    return false;
  }

  /**
   * Get all custom block styles
   */
  public function get_all_block_styles()
  {
    return isset($this->theme_json_data['s4BlockStyles'])
      ? $this->theme_json_data['s4BlockStyles']
      : [];
  }

  /**
   * Get custom styles for a specific block
   */
  public function get_block_styles($block_name)
  {
    return isset($this->theme_json_data['s4BlockStyles'][$block_name])
      ? $this->theme_json_data['s4BlockStyles'][$block_name]
      : [];
  }
}
