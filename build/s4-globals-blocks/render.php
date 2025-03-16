<?php
/**
 * @see https://github.com/WordPress/gutenberg/blob/trunk/docs/reference-guides/block-api/block-metadata.md#render
 */
$attributes = isset($block->attributes) ? $block->attributes : [];

// Récupérer les images
$images = isset($attributes['images']) ? $attributes['images'] : [];

// Construire la classe CSS
$class_name = 'owl-carousel';

// Ajouter une classe personnalisée si elle existe
if (!empty($attributes['className'])) {
    $class_name .= ' ' . esc_attr($attributes['className']);
}

// Ajouter une classe d'alignement si elle existe
if (!empty($block->align)) {
    $class_name .= ' align' . esc_attr($block->align);
}


// Afficher le carrousel
?>
<div class="s4_block_carousel <?php echo esc_attr($class_name); ?>">
    <?php if (!empty($images)) : ?>
        <?php foreach ($images as $image) : ?>
            <img src="<?php echo esc_url($image['url']); ?>" 
                 alt="<?php echo esc_attr($image['alt']); ?>"
                 class="owl-carousel-item" />
        <?php endforeach; ?>
    <?php endif; ?>
</div>
