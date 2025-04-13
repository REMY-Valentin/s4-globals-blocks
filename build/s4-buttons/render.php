<?php
/**
 * Server-side rendering of the `s4-globals-blocks/buttons` block.
 *
 * @package S4GlobalsBlocks
 */

/**
 * Renders the `s4-globals-blocks/buttons` block on the server.
 *
 * @param array    $attributes Block attributes.
 * @param string   $content    Block default content.
 * @param WP_Block $block      Block instance.
 * @return string Returns the button HTML.
 */
function render_s4_buttons_block( $attributes, $content, $block ) {
    // Extract attributes
    $text = isset( $attributes['text'] ) ? $attributes['text'] : '';
    $url = isset( $attributes['url'] ) ? $attributes['url'] : '#';
    $link_target = isset( $attributes['linkTarget'] ) ? $attributes['linkTarget'] : '';
    $rel = isset( $attributes['rel'] ) ? $attributes['rel'] : '';
    $button_type = isset( $attributes['buttonType'] ) ? $attributes['buttonType'] : 'primary';
    $icon_position = isset( $attributes['iconPosition'] ) ? $attributes['iconPosition'] : 'none';
    $icon_name = isset( $attributes['iconName'] ) ? $attributes['iconName'] : '';
    $hover_effect = isset( $attributes['hoverEffect'] ) ? $attributes['hoverEffect'] : 'none';
    $is_full_width = isset( $attributes['isFullWidth'] ) && $attributes['isFullWidth'];
    
    // Build classes
    $classes = array(
        's4-button',
        "s4-button-{$button_type}",
        "hover-{$hover_effect}"
    );
    
    if ( $is_full_width ) {
        $classes[] = 'is-full-width';
    }
    
    // Build inline styles
    $styles = array();
    
    // Add border radius if set
    if ( isset( $attributes['borderRadius'] ) && $attributes['borderRadius'] ) {
        $styles[] = "border-radius: {$attributes['borderRadius']};";
    }
    
    // Add padding styles if set
    if ( isset( $attributes['customPadding'] ) && is_array( $attributes['customPadding'] ) ) {
        $padding = $attributes['customPadding'];
        
        if ( isset( $padding['top'] ) && $padding['top'] ) {
            $styles[] = "padding-top: {$padding['top']};";
        }
        
        if ( isset( $padding['right'] ) && $padding['right'] ) {
            $styles[] = "padding-right: {$padding['right']};";
        }
        
        if ( isset( $padding['bottom'] ) && $padding['bottom'] ) {
            $styles[] = "padding-bottom: {$padding['bottom']};";
        }
        
        if ( isset( $padding['left'] ) && $padding['left'] ) {
            $styles[] = "padding-left: {$padding['left']};";
        }
    }
    
    // Format the style attribute
    $style_attr = ! empty( $styles ) ? ' style="' . esc_attr( implode( ' ', $styles ) ) . '"' : '';
    
    // Build the button content with icon if specified
    $button_content = '';
    
    if ( 'left' === $icon_position && $icon_name ) {
        $button_content = sprintf(
            '<i class="bi bi-%s"></i> <span>%s</span>',
            esc_attr( $icon_name ),
            $text
        );
    } elseif ( 'right' === $icon_position && $icon_name ) {
        $button_content = sprintf(
            '<span>%s</span> <i class="bi bi-%s"></i>',
            $text,
            esc_attr( $icon_name )
        );
    } else {
        $button_content = $text;
    }
    
    // Build the HTML
    $html = sprintf(
        '<a href="%1$s" class="%2$s"%3$s%4$s%5$s>%6$s</a>',
        esc_url( $url ),
        esc_attr( implode( ' ', $classes ) ),
        $style_attr,
        $link_target ? ' target="' . esc_attr( $link_target ) . '"' : '',
        $rel ? ' rel="' . esc_attr( $rel ) . '"' : '',
        $button_content
    );
    
    return $html;
}

return 'render_s4_buttons_block';
