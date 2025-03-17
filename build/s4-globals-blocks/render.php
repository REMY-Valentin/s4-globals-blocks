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

// Préparer les options du carousel
$carousel_options = array(
    'items' => $items,
    'loop' => $loop,
    'margin' => $margin,
    'nav' => $nav,
    'dots' => $dots,
    'autoplay' => $autoplay,
    'autoplayTimeout' => $autoplayTimeout,
    'autoplayHoverPause' => $autoplayHoverPause,
    'overflowHidden' => $overflowHidden,
    'responsive' => array(
        '0' => array('items' => min(1, $items)),
        '600' => array('items' => min(2, $items)),
        '1000' => array('items' => min(3, $items))
    )
);

// Afficher le carrousel
?>
<div class="s4_block_carousel <?php echo esc_attr($class_name); ?>" 
     data-carousel-options='<?php echo json_encode($carousel_options); ?>'
     data-overflow-hidden="<?php echo esc_attr($overflowHidden ? 'true' : 'false'); ?>"
     style="height: <?php echo esc_attr($height . $heightUnit); ?>; min-height: <?php echo esc_attr($minHeight); ?>px;">
    <?php if (!empty($images)) : ?>
        <?php foreach ($images as $image) : ?>
            <div class="item">
                <img src="<?php echo esc_url($image['url']); ?>" 
                     alt="<?php echo esc_attr($image['alt']); ?>"
                     style="object-fit: <?php echo esc_attr($imageFit); ?>" />
            </div>
        <?php endforeach; ?>
    <?php endif; ?>
</div>

<style>
.s4_block_carousel .owl-stage-outer {
    overflow: <?php echo $overflowHidden ? 'hidden' : 'visible'; ?>;
}
</style>
