<?php
function s4_globals_blocks_register_assets() {
    // Enregistrer les styles Owl Carousel
    wp_register_style(
        's4-owl-carousel',
        plugins_url('assets/owl.carousel.min.css', __FILE__),
        array(),
        '2.3.4'
    );

    wp_register_style(
        's4-owl-carousel-theme',
        plugins_url('assets/owl.theme.default.min.css', __FILE__),
        array('s4-owl-carousel'),
        '2.3.4'
    );

    // Enregistrer le script Owl Carousel
    wp_register_script(
        's4-owl-carousel',
        plugins_url('assets/owl.carousel.min.js', __FILE__),
        array('jquery'),
        '2.3.4',
        true
    );

    // Enregistrer le script d'initialisation
    wp_register_script(
        's4-carousel-init',
        plugins_url('view.js', __FILE__),
        array('s4-owl-carousel'),
        '1.0.0',
        true
    );

    // Charger les assets pour l'éditeur
    if (is_admin()) {
        wp_enqueue_style('s4-owl-carousel');
        wp_enqueue_style('s4-owl-carousel-theme');
        wp_enqueue_script('s4-owl-carousel');
        wp_enqueue_script('s4-carousel-init');
    }
}
add_action('init', 's4_globals_blocks_register_assets');

// Charger les assets pour le front-end
function s4_globals_blocks_enqueue_front_assets() {
    if (has_block('s4-globals-blocks/s4-globals-blocks')) {
        wp_enqueue_style('s4-owl-carousel');
        wp_enqueue_style('s4-owl-carousel-theme');
        wp_enqueue_script('s4-owl-carousel');
        wp_enqueue_script('s4-carousel-init');
    }
}
add_action('wp_enqueue_scripts', 's4_globals_blocks_enqueue_front_assets'); 