<?php
/**
 * @see https://github.com/WordPress/gutenberg/blob/trunk/docs/reference-guides/block-api/block-metadata.md#render
 */
$attributes = isset($block->attributes) ? $block->attributes : [];

// Récupérer les images
$images = isset($attributes['images']) ? $attributes['images'] : [];

// Récupérer les paramètres du carousel
$items = isset($attributes['items']) ? $attributes['items'] : 1;
$loop = isset($attributes['loop']) ? $attributes['loop'] : true;
$margin = isset($attributes['margin']) ? $attributes['margin'] : 10;
$nav = isset($attributes['nav']) ? $attributes['nav'] : true;
$dots = isset($attributes['dots']) ? $attributes['dots'] : true;
$autoplay = isset($attributes['autoplay']) ? $attributes['autoplay'] : true;
$autoplayTimeout = isset($attributes['autoplayTimeout']) ? $attributes['autoplayTimeout'] : 5000;
$autoplayHoverPause = isset($attributes['autoplayHoverPause']) ? $attributes['autoplayHoverPause'] : true;
$height = isset($attributes['height']) ? $attributes['height'] : 400;
$heightUnit = isset($attributes['heightUnit']) ? $attributes['heightUnit'] : 'px';
$minHeight = isset($attributes['minHeight']) ? $attributes['minHeight'] : 200;
$imageFit = isset($attributes['imageFit']) ? $attributes['imageFit'] : 'cover';
$overflowHidden = isset($attributes['overflowHidden']) ? $attributes['overflowHidden'] : true;
$navStyle = isset($attributes['navStyle']) ? $attributes['navStyle'] : 'default';
$bootstrapPrevIcon = isset($attributes['bootstrapPrevIcon']) ? $attributes['bootstrapPrevIcon'] : 'bi-chevron-left';
$bootstrapNextIcon = isset($attributes['bootstrapNextIcon']) ? $attributes['bootstrapNextIcon'] : 'bi-chevron-right';

// Navigation text based on style
$navText = ['<span aria-label="Previous">‹</span>', '<span aria-label="Next">›</span>'];
if ($navStyle === 'bootstrap') {
    $navText = [
        '<i class="bi ' . esc_attr($bootstrapPrevIcon) . '"></i>',
        '<i class="bi ' . esc_attr($bootstrapNextIcon) . '"></i>'
    ];
} elseif ($navStyle === 'custom' && isset($attributes['useCustomNav']) && $attributes['useCustomNav'] && isset($attributes['navPrevImage']) && isset($attributes['navNextImage'])) {
    $navText = [
        '<img src="' . esc_url($attributes['navPrevImage']['url']) . '" alt="' . esc_attr($attributes['navPrevImage']['alt'] ?? 'Previous') . '" class="owl-nav-custom-img" />',
        '<img src="' . esc_url($attributes['navNextImage']['url']) . '" alt="' . esc_attr($attributes['navNextImage']['alt'] ?? 'Next') . '" class="owl-nav-custom-img" />'
    ];
}

// Construire la classe CSS
$class_name = 's4_block_carousel owl-carousel';

// Ajouter une classe d'alignement si elle existe
if (!empty($block->align)) {
    $class_name .= ' align' . esc_attr($block->align);
}

// Ajouter une classe personnalisée si elle existe
if (!empty($attributes['customClass'])) {
    $class_name .= ' ' . esc_attr($attributes['customClass']);
}

// Préparer les options du carousel
$carousel_options = array(
    'items' => intval($items),
    'loop' => (bool)$loop,
    'margin' => intval($margin),
    'nav' => (bool)$nav,
    'dots' => (bool)$dots,
    'autoplay' => (bool)$autoplay,
    'autoplayTimeout' => intval($autoplayTimeout),
    'autoplayHoverPause' => (bool)$autoplayHoverPause,
    'navText' => $navText,
    'dotsClass' => $navStyle === 'bootstrap' ? 'owl-dots d-flex justify-content-center' : 'owl-dots',
    'dotClass' => $navStyle === 'bootstrap' ? 'owl-dot mx-2' : 'owl-dot',
    'responsive' => array(
        '0' => array('items' => min(1, intval($items))),
        '600' => array('items' => min(2, intval($items))),
        '1000' => array('items' => min(3, intval($items)))
    ),
    // Additional options for better performance
    'smartSpeed' => 500,
    'mouseDrag' => true,
    'touchDrag' => true,
    'pullDrag' => true,
    'freeDrag' => false,
);

// Ensure proper JSON encoding
$encoded_options = wp_json_encode($carousel_options);
if (!$encoded_options) {
    $encoded_options = '{}';
}

// Generate a unique ID for the carousel
$carousel_id = 's4_carousel_' . uniqid();

// Afficher le carrousel
?>
<div id="<?php echo esc_attr($carousel_id); ?>" 
     class="<?php echo esc_attr($class_name); ?>" 
     data-carousel-options="<?php echo esc_attr($encoded_options); ?>"
     data-overflow-hidden="<?php echo esc_attr($overflowHidden ? 'true' : 'false'); ?>"
     data-nav-style="<?php echo esc_attr($navStyle); ?>"
     style="height: <?php echo esc_attr($height . $heightUnit); ?>; min-height: <?php echo esc_attr($minHeight); ?>px;">
    <?php if (!empty($images)) : ?>
        <?php foreach ($images as $image) : ?>
            <div class="item">
                <img src="<?php echo esc_url($image['url']); ?>" 
                     alt="<?php echo esc_attr($image['alt'] ?? ''); ?>"
                     style="object-fit: <?php echo esc_attr($imageFit); ?>; width: 100%; height: 100%;" />
            </div>
        <?php endforeach; ?>
    <?php else: ?>
        <div class="item empty-carousel">
            <p>No images selected for carousel.</p>
        </div>
    <?php endif; ?>
</div>

<?php if (!is_admin()) : // Only add inline style on front-end ?>
<style>
#<?php echo esc_attr($carousel_id); ?> .owl-stage-outer {
    overflow: <?php echo $overflowHidden ? 'hidden' : 'visible'; ?>;
}
#<?php echo esc_attr($carousel_id); ?> .item {
    height: 100%;
}
#<?php echo esc_attr($carousel_id); ?> .empty-carousel {
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #f8f9fa;
    color: #6c757d;
}
</style>
<?php endif; ?>
