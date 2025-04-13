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
	register_block_type( __DIR__ . '/build/s4-buttons' );
}
add_action( 'init', 's4_globals_blocks_s4_globals_blocks_block_init' );



// Ajouter le menu d'administration
function s4_blocks_add_admin_menu() {
	// Vérifier si l'utilisateur est admin et a un email @section4.fr
	$user = wp_get_current_user();
	//if (
	//	!in_array('administrator', $user->roles) ||
	//	!strpos($user->user_email, '@section4.fr')
	//) {
	//	return;
	//}

	add_menu_page(
		'Gestion des Blocs', // Titre de la page
		'S4 blocks manager', // Titre du menu
		'manage_options', // Capacité requise
		's4-blocks-manager', // Slug du menu
		's4_blocks_render_admin_page', // Fonction de rendu
		'dashicons-block-default', // Icône
		81 // Position
	);
}
add_action('admin_menu', 's4_blocks_add_admin_menu');

// Sauvegarder les paramètres
function s4_blocks_save_settings() {
	if (!current_user_can('manage_options')) {
		wp_die('Accès refusé');
	}

	check_admin_referer('s4_blocks_settings_nonce');

	// On récupère les blocs activés au lieu des désactivés
	$enabled_blocks = isset($_POST['enabled_blocks']) ? $_POST['enabled_blocks'] : array();
	update_option('s4_enabled_blocks', $enabled_blocks);

	// Récupérer les variations d'embed activées
	// Vérifier si le formulaire a été soumis avec la section des variations (même si aucune n'est cochée)
	if (isset($_POST['embed_variations_submitted'])) {
		// Enregistrement d'un log pour débogage
		error_log('embed_variations_submitted est présent: ' . $_POST['embed_variations_submitted']);
		
		// S'assurer qu'on a toujours un tableau, même vide
		$enabled_embed_variations = isset($_POST['enabled_embed_variations']) ? (array) $_POST['enabled_embed_variations'] : array();
		
		// Liste de référence des variations avec leurs noms standardisés
		$standardized_variations = array(
			'twitter' => 'twitter',
			'youtube' => 'youtube',
			'facebook' => 'facebook',
			'instagram' => 'instagram',
			'wordpress' => 'wordpress',
			'soundcloud' => 'soundcloud',
			'spotify' => 'spotify',
			'flickr' => 'flickr',
			'vimeo' => 'vimeo',
			'animoto' => 'animoto',
			'cloudup' => 'cloudup',
			'dailymotion' => 'dailymotion',
			'collegehumor' => 'collegehumor',
			'funnyordie' => 'funnyordie',
			'hulu' => 'hulu',
			'imgur' => 'imgur',
			'issuu' => 'issuu',
			'kickstarter' => 'kickstarter',
			'meetup' => 'meetup',
			'mixcloud' => 'mixcloud',
			'reddit' => 'reddit',
			'reverbnation' => 'reverbnation',
			'screencast' => 'screencast',
			'scribd' => 'scribd',
			'slideshare' => 'slideshare',
			'smugmug' => 'smugmug',
			'speaker-deck' => 'speaker-deck',
			'tiktok' => 'tiktok',
			'ted' => 'ted',
			'tumblr' => 'tumblr',
			'videopress' => 'videopress',
			'wordpress-tv' => 'wordpress-tv',
			'amazon-kindle' => 'amazon-kindle',
			'crowdsignal' => 'crowdsignal',
			'pocket-casts' => 'pocket-casts',
			'pocketcasts' => 'pocket-casts', // Alias
			'pinterest' => 'pinterest',
			'bluesky' => 'bluesky'
		);
		
		// Standardiser les noms des variations
		$standardized_enabled_variations = array();
		foreach ($enabled_embed_variations as $variation) {
			$variation_lower = strtolower($variation);
			if (isset($standardized_variations[$variation_lower])) {
				$standardized_enabled_variations[] = $standardized_variations[$variation_lower];
			} else {
				$standardized_enabled_variations[] = $variation;
			}
		}
		
		// Enlever les doublons
		$standardized_enabled_variations = array_unique($standardized_enabled_variations);
		
		// Enregistrer l'option
		update_option('s4_enabled_embed_variations', $standardized_enabled_variations);
		
		// Enregistrer l'état du bloc embed principal (activé/désactivé)
		$embed_master_status = isset($_POST['embed_master_status']) ? $_POST['embed_master_status'] : '0';
		update_option('s4_embed_master_status', $embed_master_status);
		
		// Log pour débogage
		error_log('Nombre de variations activées: ' . count($standardized_enabled_variations));
		error_log('État du bloc embed: ' . $embed_master_status);
	} else {
		// Log pour débogage
		error_log('embed_variations_submitted n\'est PAS présent');
	}

	wp_redirect(add_query_arg(['page' => 's4-blocks-manager', 'updated' => 'true'], admin_url('admin.php')));
	exit;
}
add_action('admin_post_save_s4_blocks', 's4_blocks_save_settings');

// Gérer les blocs activés
function s4_blocks_disable_blocks($allowed_blocks) {
	// Si allowed_blocks est true, récupérer tous les blocs enregistrés
	if ($allowed_blocks === true) {
		$registry = WP_Block_Type_Registry::get_instance();
		$all_blocks = array_keys($registry->get_all_registered());
		
		// Récupérer les blocs activés, si l'option n'existe pas encore, activer tous les blocs
		$enabled_blocks = get_option('s4_enabled_blocks', $all_blocks);
		
		// Si l'option existe mais est vide, activer tous les blocs
		if (empty($enabled_blocks)) {
			return $all_blocks;
		}
		
		// S'assurer que core/embed est toujours présent dans les blocs activés
		if (!in_array('core/embed', $enabled_blocks)) {
			$enabled_blocks[] = 'core/embed';
		}
		
		// Retourner les blocs activés
		return $enabled_blocks;
	}
	
	return $allowed_blocks;
}
add_filter('allowed_block_types_all', 's4_blocks_disable_blocks');

// Désactiver les variations d'embeds spécifiques
function s4_blocks_disable_embed_variations() {
    // Vérifier si le bloc embed principal est activé
    $embed_master_status = get_option('s4_embed_master_status', '1');
    
    // Générer le code JavaScript pour désactiver les variations d'embed
    $enabled_variations = get_option('s4_enabled_embed_variations', array());
    
    // Liste complète des variations d'embed possibles dans WordPress
    $all_embed_variations = array(
        'twitter', 'youtube', 'facebook', 'instagram', 'wordpress', 
        'soundcloud', 'spotify', 'flickr', 'vimeo', 'animoto', 
        'cloudup', 'dailymotion', 'collegehumor', 'funnyordie', 'hulu', 'imgur', 
        'issuu', 'kickstarter', 'meetup', 'mixcloud', 'reddit',
        'reverbnation', 'screencast', 'scribd', 'slideshare', 
        'smugmug', 'speaker-deck', 'tiktok', 'ted', 'tumblr', 
        'videopress', 'wordpress-tv', 'amazon-kindle', 'crowdsignal', 
        'pocket-casts', 'pinterest', 'bluesky'
    );
    
    $script = "wp.domReady(function() {\n";
    
    // Obtenir toutes les variations disponibles
    $script .= "    var allVariations = wp.blocks.getBlockVariations('core/embed');\n";
    
    // Si le bloc embed est désactivé, désactiver également le bloc principal
    // mais seulement dans l'interface utilisateur, pas dans la registration du bloc
    if ($embed_master_status === '0') {
        $script .= "    // Désactiver complètement le bloc embed en le masquant\n";
        $script .= "    wp.data.dispatch('core/edit-post').hideBlockTypes(['core/embed']);\n";
    } else {
        $script .= "    // S'assurer que le bloc embed est visible\n";
        $script .= "    wp.data.dispatch('core/edit-post').showBlockTypes(['core/embed']);\n";
        
        // Déterminer quelles variations désactiver
        $variations_to_disable = array_diff($all_embed_variations, $enabled_variations);
        
        if (!empty($variations_to_disable)) {
            $script .= "    var availableVariations = wp.blocks.getBlockVariations('core/embed').map(function(v) { return v.name; });\n";
            
            // Ajouter l'approche universelle: désactiver toutes les variations sauf celles explicitement activées
            $script .= "    var enabledVariations = " . json_encode($enabled_variations) . ";\n";
            $script .= "    var availableVariationsDetailed = wp.blocks.getBlockVariations('core/embed');\n";
            
            // Créer une fonction pour vérifier si une variation est activée
            $script .= "    function isVariationEnabled(variation) {\n";
            $script .= "        // Vérifier par nom exact\n";
            $script .= "        if (enabledVariations.includes(variation.name)) return true;\n";
            $script .= "        \n";
            $script .= "        // Vérifier par provider slug si disponible\n";
            $script .= "        if (variation.attributes && variation.attributes.providerNameSlug) {\n";
            $script .= "            if (enabledVariations.includes(variation.attributes.providerNameSlug)) return true;\n";
            $script .= "        }\n";
            $script .= "        \n";
            $script .= "        // Vérifier les alias connus\n";
            $script .= "        var aliases = {\n";
            $script .= "            'pocketcasts': 'pocket-casts',\n";
            $script .= "            'pocket-casts': 'pocketcasts'\n";
            $script .= "        };\n";
            $script .= "        \n";
            $script .= "        if (aliases[variation.name] && enabledVariations.includes(aliases[variation.name])) return true;\n";
            $script .= "        \n";
            $script .= "        return false;\n";
            $script .= "    }\n";
            
            // Parcourir toutes les variations disponibles et désactiver celles qui ne sont pas activées
            $script .= "    availableVariationsDetailed.forEach(function(variation) {\n";
            $script .= "        if (!isVariationEnabled(variation)) {\n";
            $script .= "            try {\n";
            $script .= "                wp.blocks.unregisterBlockVariation('core/embed', variation.name);\n";
            $script .= "            } catch(e) { }\n";
            $script .= "        }\n";
            $script .= "    });\n";
            
            // Approche traditionnelle (ciblée) - en complément de l'approche universelle
            foreach ($variations_to_disable as $variation) {
                // Ajouter une vérification de l'existence de la variation avant de la désactiver
                $script .= "    if (availableVariations.includes('$variation')) {\n";
                $script .= "        try { \n";
                $script .= "            wp.blocks.unregisterBlockVariation('core/embed', '$variation'); \n";
                $script .= "        } catch(e) { }\n";
                $script .= "    }\n";
            }
        }
    }
    
    $script .= "});\n";
    
    // Enregistrer et inclure le script
    wp_register_script(
        's4-disable-embed-variations',
        '',
        array('wp-blocks', 'wp-dom-ready', 'wp-data', 'wp-edit-post'),
        '1.0',
        true
    );
    wp_add_inline_script('s4-disable-embed-variations', $script);
    wp_enqueue_script('s4-disable-embed-variations');
}
add_action('enqueue_block_editor_assets', 's4_blocks_disable_embed_variations');

// Rendu de la page d'administration
function s4_blocks_render_admin_page() {
	// Vérifier les permissions
	if (!current_user_can('manage_options')) {
		wp_die('Accès refusé');
	}

	// Récupérer tous les blocs enregistrés
	$registered_blocks = WP_Block_Type_Registry::get_instance()->get_all_registered();
	$all_blocks = array_keys($registered_blocks);

	// Récupérer les blocs activés, par défaut tous les blocs sont activés
	$enabled_blocks = get_option('s4_enabled_blocks', $all_blocks);

	// Si c'est la première visite (option non définie), activer tous les blocs
	if (get_option('s4_enabled_blocks') === false) {
		update_option('s4_enabled_blocks', $all_blocks);
		$enabled_blocks = $all_blocks;
	}

	// Définir l'ordre des catégories
	$category_order = array(
		'text' => 0,
		'media' => 1,
		'design' => 2,
		'widgets' => 3,
		'theme' => 4,
		'embed' => 5
	);

	// Organiser les blocs par catégorie
	$blocks_by_category = array();
	foreach ($registered_blocks as $block_name => $block) {
		$category = $block->category ?: 'uncategorized';
		if (!isset($blocks_by_category[$category])) {
			$blocks_by_category[$category] = array();
		}
		$blocks_by_category[$category][] = array(
			'name' => $block_name,
			'title' => $block->title ?: $block_name,
			'description' => $block->description ?: '',
			'enabled' => in_array($block_name, $enabled_blocks)
		);
	}

	// Trier les catégories selon l'ordre défini
	uksort($blocks_by_category, function($a, $b) use ($category_order) {
		$a_order = isset($category_order[$a]) ? $category_order[$a] : 999;
		$b_order = isset($category_order[$b]) ? $category_order[$b] : 999;
		return $a_order - $b_order;
	});

	// Informations détaillées sur les embeds
	$embed_details = array(
		'core/embed' => array(
			'description' => 'Intégrer du contenu à partir de n\'importe quelle URL',
			'icon' => 'dashicons-embed-generic',
			'is_variation' => false,
		),
		'twitter' => array(
			'description' => 'Intégrer un tweet ou un profil Twitter/X',
			'icon' => 'dashicons-twitter',
			'logo' => 'https://twitter.com/favicon.ico',
			'is_variation' => true,
			'parent' => 'core/embed'
		),
		'youtube' => array(
			'description' => 'Intégrer une vidéo YouTube',
			'icon' => 'dashicons-video-alt3',
			'logo' => 'https://www.youtube.com/favicon.ico',
			'is_variation' => true,
			'parent' => 'core/embed'
		),
		'vimeo' => array(
			'description' => 'Intégrer une vidéo Vimeo',
			'icon' => 'dashicons-video-alt3',
			'logo' => 'https://vimeo.com/favicon.ico',
			'is_variation' => true,
			'parent' => 'core/embed'
		),
		'facebook' => array(
			'description' => 'Intégrer un post ou une page Facebook',
			'icon' => 'dashicons-facebook',
			'logo' => 'https://facebook.com/favicon.ico',
			'is_variation' => true,
			'parent' => 'core/embed'
		),
		'instagram' => array(
			'description' => 'Intégrer un post Instagram',
			'icon' => 'dashicons-instagram',
			'logo' => 'https://www.instagram.com/favicon.ico',
			'is_variation' => true,
			'parent' => 'core/embed'
		),
		'wordpress' => array(
			'description' => 'Intégrer un article ou une page WordPress',
			'icon' => 'dashicons-wordpress',
			'logo' => 'https://s.w.org/favicon.ico',
			'is_variation' => true,
			'parent' => 'core/embed'
		),
		'soundcloud' => array(
			'description' => 'Intégrer un morceau ou une playlist SoundCloud',
			'icon' => 'dashicons-format-audio',
			'logo' => 'https://soundcloud.com/favicon.ico',
			'is_variation' => true,
			'parent' => 'core/embed'
		),
		'spotify' => array(
			'description' => 'Intégrer une piste, un album ou une playlist Spotify',
			'icon' => 'dashicons-format-audio',
			'logo' => 'https://open.spotify.com/favicon.ico',
			'is_variation' => true,
			'parent' => 'core/embed'
		),
		'flickr' => array(
			'description' => 'Intégrer des images depuis Flickr',
			'icon' => 'dashicons-format-image',
			'logo' => 'https://www.flickr.com/favicon.ico',
			'is_variation' => true,
			'parent' => 'core/embed'
		),
		'animoto' => array(
			'description' => 'Intégrer une vidéo Animoto',
			'icon' => 'dashicons-video-alt3',
			'is_variation' => true,
			'parent' => 'core/embed'
		),
		'cloudup' => array(
			'description' => 'Intégrer du contenu depuis Cloudup',
			'icon' => 'dashicons-cloud',
			'is_variation' => true,
			'parent' => 'core/embed'
		),
		'dailymotion' => array(
			'description' => 'Intégrer une vidéo Dailymotion',
			'icon' => 'dashicons-video-alt3',
			'logo' => 'https://www.dailymotion.com/favicon.ico',
			'is_variation' => true,
			'parent' => 'core/embed'
		),
		'collegehumor' => array(
			'description' => 'Intégrer du contenu CollegeHumor',
			'icon' => 'dashicons-video-alt3',
			'is_variation' => true,
			'parent' => 'core/embed'
		),
		'funnyordie' => array(
			'description' => 'Intégrer une vidéo Funny or Die',
			'icon' => 'dashicons-video-alt3',
			'is_variation' => true,
			'parent' => 'core/embed'
		),
		'hulu' => array(
			'description' => 'Intégrer du contenu depuis Hulu',
			'icon' => 'dashicons-video-alt3',
			'logo' => 'https://www.hulu.com/favicon.ico',
			'is_variation' => true,
			'parent' => 'core/embed'
		),
		'imgur' => array(
			'description' => 'Intégrer des images depuis Imgur',
			'icon' => 'dashicons-format-image',
			'logo' => 'https://imgur.com/favicon.ico',
			'is_variation' => true,
			'parent' => 'core/embed'
		),
		'issuu' => array(
			'description' => 'Intégrer des publications depuis Issuu',
			'icon' => 'dashicons-book',
			'logo' => 'https://issuu.com/favicon.ico',
			'is_variation' => true,
			'parent' => 'core/embed'
		),
		'kickstarter' => array(
			'description' => 'Intégrer une campagne Kickstarter',
			'icon' => 'dashicons-money',
			'logo' => 'https://www.kickstarter.com/favicon.ico',
			'is_variation' => true,
			'parent' => 'core/embed'
		),
		'meetup' => array(
			'description' => 'Intégrer un événement ou un groupe Meetup',
			'icon' => 'dashicons-groups',
			'logo' => 'https://www.meetup.com/favicon.ico',
			'is_variation' => true,
			'parent' => 'core/embed'
		),
		'mixcloud' => array(
			'description' => 'Intégrer du contenu audio depuis Mixcloud',
			'icon' => 'dashicons-format-audio',
			'logo' => 'https://www.mixcloud.com/favicon.ico',
			'is_variation' => true,
			'parent' => 'core/embed'
		),
		'reddit' => array(
			'description' => 'Intégrer un post ou un subreddit Reddit',
			'icon' => 'dashicons-share',
			'logo' => 'https://www.reddit.com/favicon.ico',
			'is_variation' => true,
			'parent' => 'core/embed'
		),
		'reverbnation' => array(
			'description' => 'Intégrer un profil ou une piste ReverbNation',
			'icon' => 'dashicons-format-audio',
			'is_variation' => true,
			'parent' => 'core/embed'
		),
		'screencast' => array(
			'description' => 'Intégrer un screencast',
			'icon' => 'dashicons-desktop',
			'is_variation' => true,
			'parent' => 'core/embed'
		),
		'scribd' => array(
			'description' => 'Intégrer un document Scribd',
			'icon' => 'dashicons-media-document',
			'logo' => 'https://www.scribd.com/favicon.ico',
			'is_variation' => true,
			'parent' => 'core/embed'
		),
		'slideshare' => array(
			'description' => 'Intégrer une présentation SlideShare',
			'icon' => 'dashicons-slides',
			'logo' => 'https://www.slideshare.net/favicon.ico',
			'is_variation' => true,
			'parent' => 'core/embed'
		),
		'smugmug' => array(
			'description' => 'Intégrer des images depuis SmugMug',
			'icon' => 'dashicons-format-image',
			'is_variation' => true,
			'parent' => 'core/embed'
		),
		'speaker-deck' => array(
			'description' => 'Intégrer une présentation Speaker Deck',
			'icon' => 'dashicons-slides',
			'is_variation' => true,
			'parent' => 'core/embed'
		),
		'tiktok' => array(
			'description' => 'Intégrer une vidéo TikTok',
			'icon' => 'dashicons-video-alt3',
			'logo' => 'https://www.tiktok.com/favicon.ico',
			'is_variation' => true,
			'parent' => 'core/embed'
		),
		'ted' => array(
			'description' => 'Intégrer une conférence TED',
			'icon' => 'dashicons-video-alt3',
			'logo' => 'https://www.ted.com/favicon.ico',
			'is_variation' => true,
			'parent' => 'core/embed'
		),
		'tumblr' => array(
			'description' => 'Intégrer un post Tumblr',
			'icon' => 'dashicons-admin-site',
			'logo' => 'https://www.tumblr.com/favicon.ico',
			'is_variation' => true,
			'parent' => 'core/embed'
		),
		'videopress' => array(
			'description' => 'Intégrer une vidéo VideoPress',
			'icon' => 'dashicons-video-alt3',
			'is_variation' => true,
			'parent' => 'core/embed'
		),
		'wordpress-tv' => array(
			'description' => 'Intégrer une vidéo WordPress.tv',
			'icon' => 'dashicons-video-alt3',
			'logo' => 'https://wordpress.tv/favicon.ico',
			'is_variation' => true,
			'parent' => 'core/embed'
		),
		'amazon-kindle' => array(
			'description' => 'Intégrer un livre Kindle',
			'icon' => 'dashicons-book',
			'logo' => 'https://www.amazon.com/favicon.ico',
			'is_variation' => true,
			'parent' => 'core/embed'
		),
		'crowdsignal' => array(
			'description' => 'Intégrer un sondage ou un questionnaire Crowdsignal',
			'icon' => 'dashicons-chart-bar',
			'logo' => 'https://app.crowdsignal.com/images/favicon.ico',
			'is_variation' => true,
			'parent' => 'core/embed'
		),
		'pocket-casts' => array(
			'description' => 'Intégrer un podcast de Pocket Casts',
			'icon' => 'dashicons-format-audio',
			'logo' => 'https://pocketcasts.com/favicon.ico',
			'is_variation' => true,
			'parent' => 'core/embed'
		),
		'pinterest' => array(
			'description' => 'Intégrer un pin ou un tableau Pinterest',
			'icon' => 'dashicons-pinterest',
			'logo' => 'https://www.pinterest.com/favicon.ico',
			'is_variation' => true,
			'parent' => 'core/embed'
		),
		'bluesky' => array(
			'description' => 'Intégrer un post Bluesky',
			'icon' => 'dashicons-cloud',
			'logo' => 'https://bsky.app/favicon.ico',
			'is_variation' => true,
			'parent' => 'core/embed'
		),
	);

	// S'assurer que tous les embeds définis dans $embed_details sont dans la catégorie embed
	// même s'ils ne sont pas enregistrés dans WordPress
	if (!isset($blocks_by_category['embed'])) {
		$blocks_by_category['embed'] = array();
	}
	
	// Créer une liste des noms de blocs d'embed existants pour éviter les doublons
	$existing_embed_blocks = array_map(function($block) {
		return $block['name'];
	}, $blocks_by_category['embed']);
	
	// Récupérer les variations d'embed activées
	$enabled_embed_variations = get_option('s4_enabled_embed_variations', array());
	// Si cette option n'existe pas encore, activer toutes les variations
	if (empty($enabled_embed_variations) && get_option('s4_enabled_embed_variations') === false) {
		$enabled_embed_variations = array_keys(array_filter($embed_details, function($detail) {
			return isset($detail['is_variation']) && $detail['is_variation'] === true;
		}));
		update_option('s4_enabled_embed_variations', $enabled_embed_variations);
	}
	
	// Récupérer l'état du bloc embed principal
	$embed_master_status = get_option('s4_embed_master_status', '1');
	// Si c'est la première fois, définir une valeur par défaut basée sur les variations
	if (get_option('s4_embed_master_status') === false) {
		$embed_master_status = empty($enabled_embed_variations) ? '0' : '1';
		update_option('s4_embed_master_status', $embed_master_status);
	}
	
	// Créer un tableau séparé pour les variations d'embed
	$embed_variations = array();
	
	// Traiter chaque détail d'embed
	foreach ($embed_details as $key => $details) {
		// Si c'est une variation, l'ajouter au tableau des variations
		if (isset($details['is_variation']) && $details['is_variation'] === true) {
			// Formater le nom d'affichage (ex: "twitter" devient "Twitter")
			$display_name = ucfirst($key);
			// Remplacer les tirets par des espaces
			$display_name = str_replace('-', ' ', $display_name);
			
			// Vérifier si cette variation est activée (de manière insensible à la casse)
			$is_enabled = false;
			foreach ($enabled_embed_variations as $enabled_variation) {
				if (strtolower($key) === strtolower($enabled_variation)) {
					$is_enabled = true;
					break;
				}
			}
			
			$embed_variations[] = array(
				'name' => $key,
				'title' => $display_name,
				'description' => $details['description'],
				'parent' => $details['parent'],
				'enabled' => $is_enabled,
				'details' => $details
			);
		} 
		// Sinon, si c'est un bloc principal et qu'il n'existe pas déjà, l'ajouter
		else if (!in_array($key, $existing_embed_blocks)) {
			// Extraire le nom d'affichage depuis le bloc (ex: "core/embed" devient "Embed")
			$display_name = ucfirst(str_replace('core/', '', $key));
			
			$blocks_by_category['embed'][] = array(
				'name' => $key,
				'title' => $display_name,
				'description' => $details['description'],
				'enabled' => in_array($key, $enabled_blocks),
				'is_parent' => true  // Marquer comme bloc parent
			);
		}
	}

	// Trier les variations d'embed par ordre alphabétique
	usort($embed_variations, function($a, $b) {
		return strcmp($a['title'], $b['title']);
	});

	?>
	<div class="wrap">
		<h1>Gestion des Blocs Gutenberg</h1>

		<?php if (isset($_GET['updated'])) : ?>
			<div class="notice notice-success is-dismissible">
				<p>Paramètres sauvegardés avec succès.</p>
			</div>
		<?php endif; ?>

		<form method="post" action="<?php echo admin_url('admin-post.php'); ?>">
			<input type="hidden" name="action" value="save_s4_blocks">
			<input type="hidden" name="embed_variations_submitted" value="1">
			<?php wp_nonce_field('s4_blocks_settings_nonce'); ?>
			
			<!-- Block search functionality -->
			<div class="global-search-container">
				<div class="block-search">
					<input type="text" id="global-blocks-filter" placeholder="Rechercher un bloc..." />
					<span class="dashicons dashicons-search"></span>
				</div>
				<div class="search-info">
					<span id="search-results-count"></span>
				</div>
			</div>
			
			<p class="submit">
				<input type="submit" class="button button-primary" value="Enregistrer les modifications">
			</p>
			<?php foreach ($blocks_by_category as $category => $blocks) : ?>
				<div class="category-section">
					<div class="category-header">
						<h2 class="category-title">
							<span class="dashicons dashicons-arrow-down-alt2"></span>
							<?php 
							$category_display_name = ucfirst($category);
							if ($category === 'embed') {
								$category_display_name = 'Embeds';
							} elseif ($category === 'widgets') {
								$category_display_name = 'Widgets';
							} elseif ($category === 'uncategorized') {
								$category_display_name = 'Non catégorisé';
							}
							echo esc_html($category_display_name);
							?>
							<span class="category-count">(<?php echo count($blocks); ?>)</span>
						</h2>
						<label class="switch master-switch">
							<input type="checkbox" 
								   class="master-toggle"
								   data-category="<?php echo esc_attr($category); ?>">
							<span class="slider round"></span>
						</label>
					</div>

					<div class="category-content">
						<?php if ($category === 'embed') : ?>
							<div class="embed-description">
								<p>Les embeds permettent d'intégrer du contenu externe dans vos pages. Choisissez les services que vous souhaitez autoriser.</p>
								<p class="embed-status-notice notice <?php echo $embed_master_status === '1' ? 'notice-info' : 'notice-warning'; ?>">
									<?php if ($embed_master_status === '1') : ?>
										<strong>Note:</strong> Le bloc embed principal est activé avec les variations sélectionnées.
									<?php else : ?>
										<strong>Attention:</strong> Le bloc embed principal est désactivé, mais reste fonctionnel en arrière-plan.
									<?php endif; ?>
								</p>
							</div>
							
							<!-- Variations d'embed -->
							<div class="embed-section">
								<h3 class="section-title">Variations d'Embed</h3>
								<p>Les variations permettent d'intégrer des services spécifiques avec un formatage adapté.</p>
								
								<div class="embed-toolbar">
									<div class="embed-search">
										<input type="text" id="embed-filter" placeholder="Rechercher un service..." />
										<span class="dashicons dashicons-search"></span>
									</div>
									<div class="embed-actions">
										<button type="button" class="button select-all-embeds">Tout sélectionner</button>
										<button type="button" class="button deselect-all-embeds">Tout désélectionner</button>
										<div class="embed-view-toggle">
											<button type="button" class="button view-grid active" title="Affichage en grille"><span class="dashicons dashicons-grid-view"></span></button>
											<button type="button" class="button view-list" title="Affichage en liste"><span class="dashicons dashicons-list-view"></span></button>
										</div>
									</div>
								</div>
								
								<div class="embed-grid view-mode-grid">
									<?php foreach ($embed_variations as $variation) : ?>
										<?php 
											$details = $variation['details'];
										?>
										<div class="embed-item" data-name="<?php echo esc_attr($variation['name']); ?>">
											<div class="embed-header">
												<?php if (isset($details['logo'])) : ?>
													<div class="embed-logo">
														<img src="<?php echo esc_url($details['logo']); ?>" alt="<?php echo esc_attr($variation['title']); ?>" />
													</div>
												<?php else : ?>
													<div class="embed-icon">
														<span class="dashicons <?php echo esc_attr($details['icon']); ?>"></span>
													</div>
												<?php endif; ?>
												<div class="embed-title"><?php echo esc_html($variation['title']); ?></div>
												<label class="switch embed-switch">
													<input type="checkbox" 
														   name="enabled_embed_variations[]" 
														   value="<?php echo esc_attr($variation['name']); ?>"
														   class="variation-toggle"
														   data-category="<?php echo esc_attr($category); ?>"
														   <?php echo $variation['enabled'] ? 'checked' : ''; ?>>
													<span class="slider round"></span>
												</label>
											</div>
											<div class="embed-details">
												<div class="embed-description">
													<?php echo esc_html($variation['description']); ?>
												</div>
												<div class="embed-code">
													<code>variation: <?php echo esc_html($variation['name']); ?></code>
												</div>
											</div>
										</div>
									<?php endforeach; ?>
								</div>
							</div>
							<!-- Ensure core/embed is always enabled -->
							<input type="hidden" name="enabled_blocks[]" value="core/embed">
							<!-- Hidden field to track the embed block status -->
							<input type="hidden" name="embed_master_status" id="embed_master_status" value="<?php echo $embed_master_status; ?>">
						<?php else : ?>
							<table class="wp-list-table widefat fixed striped">
								<thead>
									<tr>
										<th>Bloc</th>
										<th>Status</th>
									</tr>
								</thead>
								<tbody>
									<?php foreach ($blocks as $block) : ?>
										<tr>
											<td>
												<span class="block-title-text"><?php echo esc_html($block['title']); ?></span>
												<br>
												<small><code><?php echo esc_html($block['name']); ?></code></small>
												<?php if (!empty($block['description'])) : ?>
													<br>
													<small class="description"><?php echo esc_html($block['description']); ?></small>
												<?php endif; ?>
											</td>
											<td>
												<label class="switch">
													<input type="checkbox" 
														   name="enabled_blocks[]" 
														   value="<?php echo esc_attr($block['name']); ?>"
														   class="block-toggle"
														   data-category="<?php echo esc_attr($category); ?>"
														   <?php echo $block['enabled'] ? 'checked' : ''; ?>>
													<span class="slider round"></span>
												</label>
											</td>
										</tr>
									<?php endforeach; ?>
								</tbody>
							</table>
						<?php endif; ?>
					</div>
				</div>
			<?php endforeach; ?>

			<p class="submit">
				<input type="submit" class="button button-primary" value="Enregistrer les modifications">
			</p>
		</form>
	</div>

	<style>
		/* Style pour le toggle switch */
		.switch {
			position: relative;
			display: inline-block;
			width: 60px;
			height: 34px;
		}

		.switch input {
			opacity: 0;
			width: 0;
			height: 0;
		}

		.slider {
			position: absolute;
			cursor: pointer;
			top: 0;
			left: 0;
			right: 0;
			bottom: 0;
			background-color: #ccc;
			transition: .4s;
		}

		.slider:before {
			position: absolute;
			content: "";
			height: 26px;
			width: 26px;
			left: 4px;
			bottom: 4px;
			background-color: white;
			transition: .4s;
		}

		.switch input:checked + .slider {
			background-color: #2196F3;
		}

		.switch input:checked + .slider:before {
			transform: translateX(26px);
		}

		.slider.round {
			border-radius: 34px;
		}

		.slider.round:before {
			border-radius: 50%;
		}

		/* Styles pour les catégories */
		.category-section {
			margin: 20px 0;
			border: 1px solid #ccc;
			border-radius: 4px;
			transition: all 0.3s ease;
		}

		.category-header {
			background: #f5f5f5;
			padding: 10px 15px;
			cursor: pointer;
			display: flex;
			justify-content: space-between;
			align-items: center;
		}

		.category-title {
			margin: 0;
			display: flex;
			align-items: center;
			gap: 10px;
		}
		
		.category-count {
			font-size: 14px;
			color: #666;
			font-weight: normal;
		}

		.category-content {
			padding: 15px;
			display: none;
			transition: all 0.3s ease;
		}

		.category-section.active .category-content {
			display: block;
		}

		.category-section.active .dashicons-arrow-down-alt2 {
			transform: rotate(180deg);
		}

		/* Ajout de styles pour une meilleure visibilité des états */
		.switch input:not(:checked) + .slider {
			background-color: #ccc;
		}

		.switch.disabled {
			opacity: 0.6;
			cursor: not-allowed;
		}
		
		.switch.disabled .slider {
			cursor: not-allowed;
		}
		
		.notice {
			color: #0078d4;
			font-style: italic;
			background: #e7f5ff;
			border-left: 4px solid #0078d4;
			padding: 10px;
			margin-bottom: 15px;
		}

		/* Styles spécifiques pour les embeds */
		.embed-toolbar {
			display: flex;
			justify-content: space-between;
			align-items: center;
			margin-bottom: 20px;
			flex-wrap: wrap;
			gap: 15px;
		}
		
		.embed-search {
			position: relative;
			flex-grow: 1;
			max-width: 400px;
		}
		
		.embed-search input {
			width: 100%;
			padding: 8px 12px 8px 35px;
			border-radius: 4px;
			border: 1px solid #ddd;
		}
		
		.embed-search .dashicons {
			position: absolute;
			left: 10px;
			top: 50%;
			transform: translateY(-50%);
			color: #666;
		}
		
		.embed-actions {
			display: flex;
			gap: 10px;
			align-items: center;
		}
		
		.embed-view-toggle {
			display: flex;
			margin-left: 10px;
		}
		
		.embed-view-toggle .button {
			padding: 0;
			width: 36px;
			height: 36px;
			display: flex;
			align-items: center;
			justify-content: center;
		}
		
		.embed-view-toggle .button.active {
			background-color: #2196F3;
			color: white;
			border-color: #0073aa;
		}

		.embed-grid {
			margin-top: 20px;
		}
		
		.embed-grid.view-mode-grid {
			display: grid;
			grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
			gap: 20px;
		}
		
		.embed-grid.view-mode-list .embed-item {
			margin-bottom: 15px;
		}
		
		.embed-grid.view-mode-list .embed-header {
			padding: 10px 15px;
		}
		
		.embed-grid.view-mode-list .embed-details {
			padding: 10px 15px;
			display: flex;
			align-items: center;
			justify-content: space-between;
		}
		
		.embed-grid.view-mode-list .embed-description {
			margin-bottom: 0;
			flex-grow: 1;
		}
		
		.embed-grid.view-mode-list .embed-code {
			margin-left: 20px;
		}

		.embed-item {
			border: 1px solid #ddd;
			border-radius: 5px;
			overflow: hidden;
			transition: all 0.3s ease;
			background: #fff;
			box-shadow: 0 1px 3px rgba(0,0,0,0.1);
		}

		.embed-item:hover {
			box-shadow: 0 3px 6px rgba(0,0,0,0.2);
			transform: translateY(-2px);
		}

		.embed-header {
			padding: 15px;
			background: #f9f9f9;
			border-bottom: 1px solid #eee;
			display: flex;
			align-items: center;
			gap: 10px;
		}

		.embed-logo img {
			width: 24px;
			height: 24px;
			object-fit: contain;
		}

		.embed-icon {
			width: 24px;
			height: 24px;
			display: flex;
			align-items: center;
			justify-content: center;
		}

		.embed-title {
			flex-grow: 1;
			font-weight: 600;
		}

		.embed-details {
			padding: 15px;
		}

		.embed-description {
			margin-bottom: 10px;
			color: #666;
		}

		.embed-code {
			background: #f5f5f5;
			padding: 5px;
			border-radius: 3px;
			font-size: 12px;
		}

		.embed-switch {
			margin: 0;
		}

		.embed-description p {
			font-size: 14px;
			margin-bottom: 15px;
			background: #f8f8f8;
			padding: 10px;
			border-left: 4px solid #2196F3;
		}

		.embed-section {
			margin-top: 25px;
			margin-bottom: 25px;
			border-top: 1px solid #eee;
			padding-top: 15px;
		}
		
		.section-title {
			margin-top: 10px;
			margin-bottom: 15px;
			font-size: 1.3em;
			color: #23282d;
		}

		/* Responsive styles */
		@media screen and (max-width: 782px) {
			.embed-grid.view-mode-grid {
				grid-template-columns: 1fr;
			}
			
			.embed-actions {
				flex-wrap: wrap;
			}
			
			.embed-view-toggle {
				margin-top: 10px;
				margin-left: 0;
			}
		}

		/* Global block search styles */
		.global-search-container {
			display: flex;
			justify-content: space-between;
			align-items: center;
			margin: 20px 0;
			padding: 15px;
			background: #f5f5f5;
			border-radius: 4px;
			border: 1px solid #ddd;
		}
		
		.block-search {
			position: relative;
			flex-grow: 1;
			max-width: 600px;
		}
		
		.block-search input {
			width: 100%;
			padding: 8px 12px 8px 35px;
			border-radius: 4px;
			border: 1px solid #ddd;
			font-size: 16px;
		}
		
		.block-search .dashicons {
			position: absolute;
			left: 10px;
			top: 50%;
			transform: translateY(-50%);
			color: #666;
		}
		
		.search-info {
			margin-left: 20px;
			color: #555;
			font-style: italic;
		}
		
		.highlight-result {
			background-color: #ffeb3b;
			padding: 2px;
		}
		
		.category-section.no-results {
			display: none;
		}
		
		.category-content tr.hidden-row {
			display: none;
		}
	</style>

	<script>
	jQuery(document).ready(function($) {
		// Fonction pour mettre à jour l'état du master toggle pour les embeds
		function updateMasterToggleEmbed() {
			var categorySection = $('.category-section:has([data-category="embed"])');
			var totalToggles = categorySection.find('.variation-toggle').length;
			var checkedToggles = categorySection.find('.variation-toggle:checked').length;
			categorySection.find('.master-toggle').prop('checked', checkedToggles === totalToggles);
		}
		
		// Fonction pour mettre à jour l'état du master toggle pour les autres catégories
		function updateMasterToggle(category) {
			if (category === 'embed') {
				updateMasterToggleEmbed();
				return;
			}
			
			var categorySection = $(`.category-section:has([data-category="${category}"])`);
			var totalToggles = categorySection.find('.block-toggle').length;
			var checkedToggles = categorySection.find('.block-toggle:checked').length;
			categorySection.find('.master-toggle').prop('checked', checkedToggles === totalToggles);
		}

		// Initialiser les master toggles
		$('.category-section').each(function() {
			var category = $(this).find('.master-toggle').data('category');
			updateMasterToggle(category);
		});

		// Toggle des catégories
		$('.category-header').on('click', function(e) {
			if (!$(e.target).is('input, label, .slider')) {
				$(this).closest('.category-section').toggleClass('active');
			}
		});

		// Master toggle par catégorie
		$('.master-toggle').on('change', function() {
			var category = $(this).data('category');
			var isChecked = $(this).prop('checked');
			
			if (category === 'embed') {
				// Pour la catégorie embed, on toggle toutes les variations
				$('.variation-toggle').prop('checked', isChecked);
				
				// Mettre à jour l'état visuel du bloc embed principal
				// Le hidden input reste toujours actif, mais on ajoute une indication visuelle
				if (isChecked) {
					$('.embed-description .embed-status-notice').removeClass('notice-warning').addClass('notice-info')
						.html('<strong>Note:</strong> Le bloc embed principal est activé avec les variations sélectionnées.');
				} else {
					$('.embed-description .embed-status-notice').removeClass('notice-info').addClass('notice-warning')
						.html('<strong>Attention:</strong> Le bloc embed principal est désactivé, mais reste fonctionnel en arrière-plan.');
				}
				
				// Mettre à jour le champ caché pour indiquer l'état du bloc embed
				$('#embed_master_status').val(isChecked ? '1' : '0');
			} else {
				// Pour les autres catégories, on toggle les blocs
				$(`.block-toggle[data-category="${category}"]`).prop('checked', isChecked);
			}
		});

		// Toggle individuel pour les blocs
		$('.block-toggle').on('change', function() {
			var category = $(this).data('category');
			updateMasterToggle(category);
		});
		
		// Toggle individuel pour les variations d'embed
		$('.variation-toggle').on('change', function() {
			updateMasterToggleEmbed();
			
			// Mettre à jour l'état visuel du bloc embed principal en fonction des variations
			var allUnchecked = $('.variation-toggle:checked').length === 0;
			if (allUnchecked) {
				$('.embed-description .embed-status-notice').removeClass('notice-info').addClass('notice-warning')
					.html('<strong>Attention:</strong> Le bloc embed principal est désactivé, mais reste fonctionnel en arrière-plan.');
				$('#embed_master_status').val('0');
			} else {
				$('.embed-description .embed-status-notice').removeClass('notice-warning').addClass('notice-info')
					.html('<strong>Note:</strong> Le bloc embed principal est activé avec les variations sélectionnées.');
				$('#embed_master_status').val('1');
			}
		});

		// Sélectionner tous les embeds variations
		$('.select-all-embeds').on('click', function() {
			$('.variation-toggle').prop('checked', true);
			updateMasterToggleEmbed();
			
			// Mettre à jour l'état visuel du bloc embed principal
			$('.embed-description .embed-status-notice').removeClass('notice-warning').addClass('notice-info')
				.html('<strong>Note:</strong> Le bloc embed principal est activé avec les variations sélectionnées.');
			$('#embed_master_status').val('1');
			
			// Visual feedback
			$(this).addClass('button-primary').fadeOut(100).fadeIn(100);
			setTimeout(function() {
				$('.select-all-embeds').removeClass('button-primary');
			}, 500);
		});

		// Désélectionner tous les embeds variations
		$('.deselect-all-embeds').on('click', function() {
			$('.variation-toggle').prop('checked', false);
			updateMasterToggleEmbed();
			
			// Mettre à jour l'état visuel du bloc embed principal
			$('.embed-description .embed-status-notice').removeClass('notice-info').addClass('notice-warning')
				.html('<strong>Attention:</strong> Le bloc embed principal est désactivé, mais reste fonctionnel en arrière-plan.');
			$('#embed_master_status').val('0');
			
			// Visual feedback
			$(this).addClass('button-primary').fadeOut(100).fadeIn(100);
			setTimeout(function() {
				$('.deselect-all-embeds').removeClass('button-primary');
			}, 500);
		});

		// Ajout d'un gestionnaire de soumission du formulaire
		$('form[action*="admin-post.php"]').on('submit', function() {
			// Vérifier si toutes les variations sont désélectionnées
			var allUnchecked = $('.variation-toggle:checked').length === 0;
			
			// Si toutes sont désélectionnées, s'assurer que le champ caché est bien présent
			if (allUnchecked) {
				// Vérifier si le champ embed_variations_submitted existe déjà
				if ($(this).find('input[name="embed_variations_submitted"]').length === 0) {
					$(this).append('<input type="hidden" name="embed_variations_submitted" value="1">');
				}
				
				// Assurons-nous que la valeur est bien définie
				$(this).find('input[name="embed_variations_submitted"]').val('1');
			}
			
			// Permettre au formulaire de continuer
			return true;
		});

		// Filtre des embeds
		$('#embed-filter').on('keyup', function() {
			var value = $(this).val().toLowerCase();
			$('.embed-item').filter(function() {
				var text = $(this).text().toLowerCase();
				$(this).toggle(text.indexOf(value) > -1);
			});
		});
		
		// Changer la vue des embeds
		$('.view-grid').on('click', function() {
			$(this).addClass('active');
			$('.view-list').removeClass('active');
			$('.embed-grid').removeClass('view-mode-list').addClass('view-mode-grid');
		});
		
		$('.view-list').on('click', function() {
			$(this).addClass('active');
			$('.view-grid').removeClass('active');
			$('.embed-grid').removeClass('view-mode-grid').addClass('view-mode-list');
		});

		// Global blocks search functionality
		$('#global-blocks-filter').on('keyup', function() {
			var searchTerm = $(this).val().toLowerCase();
			var totalResults = 0;
			var resultsInCategory = {};
			
			// Reset visibility of all sections and rows
			$('.category-section').removeClass('no-results active');
			$('.category-content').hide();
			$('.category-content tr').removeClass('hidden-row');
			$('.embed-item').show();
			
			// Remove any existing highlight
			$('.block-title-text, .embed-title').each(function() {
				$(this).text($(this).data('original-text') || $(this).text());
			});
			
			// If search is empty, just show collapsed categories
			if (searchTerm === '') {
				$('#search-results-count').text('');
				return;
			}
			
			// Search in regular blocks
			$('.category-content tr').each(function() {
				var blockTitle = $(this).find('td:first-child').text().toLowerCase();
				var category = $(this).closest('.category-section').find('.category-title').text().trim();
				
				if (blockTitle.indexOf(searchTerm) > -1) {
					var $categorySection = $(this).closest('.category-section');
					$categorySection.addClass('active');
					$categorySection.find('.category-content').show();
					
					// Highlight the matching text
					var $titleCell = $(this).find('td:first-child');
					var originalText = $titleCell.find('.block-title-text').data('original-text') || $titleCell.find('.block-title-text').text();
					var highlightedText = originalText.replace(
						new RegExp('(' + searchTerm + ')', 'gi'), 
						'<span class="highlight-result">$1</span>'
					);
					
					// Store original text if not already stored
					if (!$titleCell.find('.block-title-text').data('original-text')) {
						$titleCell.find('.block-title-text').data('original-text', originalText);
					}
					
					$titleCell.find('.block-title-text').html(highlightedText);
					
					totalResults++;
					
					// Track results per category
					if (!resultsInCategory[category]) {
						resultsInCategory[category] = 0;
					}
					resultsInCategory[category]++;
				} else {
					$(this).addClass('hidden-row');
				}
			});
			
			// Search in embed variations
			$('.embed-item').each(function() {
				var embedTitle = $(this).find('.embed-title').text().toLowerCase();
				var embedDesc = $(this).find('.embed-description').text().toLowerCase();
				var category = 'Embeds';
				
				if (embedTitle.indexOf(searchTerm) > -1 || embedDesc.indexOf(searchTerm) > -1) {
					var $categorySection = $(this).closest('.category-section');
					$categorySection.addClass('active');
					$categorySection.find('.category-content').show();
					
					// Highlight the matching text in title
					var $titleElement = $(this).find('.embed-title');
					var originalText = $titleElement.data('original-text') || $titleElement.text();
					
					// Store original text if not already stored
					if (!$titleElement.data('original-text')) {
						$titleElement.data('original-text', originalText);
					}
					
					if (embedTitle.indexOf(searchTerm) > -1) {
						var highlightedText = originalText.replace(
							new RegExp('(' + searchTerm + ')', 'gi'), 
							'<span class="highlight-result">$1</span>'
						);
						$titleElement.html(highlightedText);
					}
					
					totalResults++;
					
					// Track results per category
					if (!resultsInCategory[category]) {
						resultsInCategory[category] = 0;
					}
					resultsInCategory[category]++;
				} else {
					$(this).hide();
				}
			});
			
			// Hide categories with no results
			$('.category-section').each(function() {
				var category = $(this).find('.category-title').text().trim();
				var hasVisibleBlocks = false;
				
				// Check for normal blocks
				if ($(this).find('tr:not(.hidden-row)').length > 0) {
					hasVisibleBlocks = true;
				}
				
				// Check for visible embed variations
				if ($(this).find('.embed-item:visible').length > 0) {
					hasVisibleBlocks = true;
				}
				
				if (!hasVisibleBlocks) {
					$(this).addClass('no-results');
				}
			});
			
			// Update search results count
			if (totalResults === 0) {
				$('#search-results-count').text('Aucun résultat trouvé');
			} else {
				var resultText = totalResults === 1 ? 'résultat trouvé' : 'résultats trouvés';
				var categoryBreakdown = Object.keys(resultsInCategory).map(function(cat) {
					return cat.replace(/[^a-zA-Z0-9]+/g, '') + ': ' + resultsInCategory[cat];
				}).join(', ');
				
				$('#search-results-count').text(totalResults + ' ' + resultText + ' (' + categoryBreakdown + ')');
			}
		});
	});
	</script>
	<?php
} 