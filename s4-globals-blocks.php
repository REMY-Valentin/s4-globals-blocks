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
		
		// Retourner les blocs activés
		return $enabled_blocks;
	}
	
	return $allowed_blocks;
}
add_filter('allowed_block_types_all', 's4_blocks_disable_blocks');

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
		),
		'core/youtube' => array(
			'description' => 'Intégrer une vidéo YouTube',
			'icon' => 'dashicons-video-alt3',
			'logo' => 'https://www.youtube.com/favicon.ico',
		),
		'core/vimeo' => array(
			'description' => 'Intégrer une vidéo Vimeo',
			'icon' => 'dashicons-video-alt3',
			'logo' => 'https://vimeo.com/favicon.ico',
		),
		'core/twitter' => array(
			'description' => 'Intégrer un tweet ou un profil Twitter/X',
			'icon' => 'dashicons-twitter',
			'logo' => 'https://twitter.com/favicon.ico',
		),
		'core/facebook' => array(
			'description' => 'Intégrer un post ou une page Facebook',
			'icon' => 'dashicons-facebook',
			'logo' => 'https://facebook.com/favicon.ico',
		),
		'core/instagram' => array(
			'description' => 'Intégrer un post Instagram',
			'icon' => 'dashicons-instagram',
			'logo' => 'https://www.instagram.com/favicon.ico',
		),
		'core/wordpress' => array(
			'description' => 'Intégrer un article ou une page WordPress',
			'icon' => 'dashicons-wordpress',
			'logo' => 'https://s.w.org/favicon.ico',
		),
		'core/soundcloud' => array(
			'description' => 'Intégrer un morceau ou une playlist SoundCloud',
			'icon' => 'dashicons-format-audio',
			'logo' => 'https://soundcloud.com/favicon.ico',
		),
		'core/spotify' => array(
			'description' => 'Intégrer une piste, un album ou une playlist Spotify',
			'icon' => 'dashicons-format-audio',
			'logo' => 'https://open.spotify.com/favicon.ico',
		),
		'core/flickr' => array(
			'description' => 'Intégrer des images depuis Flickr',
			'icon' => 'dashicons-format-image',
			'logo' => 'https://www.flickr.com/favicon.ico',
		),
		'core/animoto' => array(
			'description' => 'Intégrer une vidéo Animoto',
			'icon' => 'dashicons-video-alt3',
		),
		'core/cloudup' => array(
			'description' => 'Intégrer du contenu depuis Cloudup',
			'icon' => 'dashicons-cloud',
		),
		'core/dailymotion' => array(
			'description' => 'Intégrer une vidéo Dailymotion',
			'icon' => 'dashicons-video-alt3',
			'logo' => 'https://www.dailymotion.com/favicon.ico',
		),
		'core/funnyordie' => array(
			'description' => 'Intégrer une vidéo Funny or Die',
			'icon' => 'dashicons-video-alt3',
		),
		'core/hulu' => array(
			'description' => 'Intégrer du contenu depuis Hulu',
			'icon' => 'dashicons-video-alt3',
			'logo' => 'https://www.hulu.com/favicon.ico',
		),
		'core/imgur' => array(
			'description' => 'Intégrer des images depuis Imgur',
			'icon' => 'dashicons-format-image',
			'logo' => 'https://imgur.com/favicon.ico',
		),
		'core/issuu' => array(
			'description' => 'Intégrer des publications depuis Issuu',
			'icon' => 'dashicons-book',
			'logo' => 'https://issuu.com/favicon.ico',
		),
		'core/kickstarter' => array(
			'description' => 'Intégrer une campagne Kickstarter',
			'icon' => 'dashicons-money',
			'logo' => 'https://www.kickstarter.com/favicon.ico',
		),
		'core/meetup-com' => array(
			'description' => 'Intégrer un événement ou un groupe Meetup',
			'icon' => 'dashicons-groups',
			'logo' => 'https://www.meetup.com/favicon.ico',
		),
		'core/mixcloud' => array(
			'description' => 'Intégrer du contenu audio depuis Mixcloud',
			'icon' => 'dashicons-format-audio',
			'logo' => 'https://www.mixcloud.com/favicon.ico',
		),
		'core/reddit' => array(
			'description' => 'Intégrer un post ou un subreddit Reddit',
			'icon' => 'dashicons-share',
			'logo' => 'https://www.reddit.com/favicon.ico',
		),
		'core/reverbnation' => array(
			'description' => 'Intégrer un profil ou une piste ReverbNation',
			'icon' => 'dashicons-format-audio',
		),
		'core/screencast' => array(
			'description' => 'Intégrer un screencast',
			'icon' => 'dashicons-desktop',
		),
		'core/scribd' => array(
			'description' => 'Intégrer un document Scribd',
			'icon' => 'dashicons-media-document',
			'logo' => 'https://www.scribd.com/favicon.ico',
		),
		'core/slideshare' => array(
			'description' => 'Intégrer une présentation SlideShare',
			'icon' => 'dashicons-slides',
			'logo' => 'https://www.slideshare.net/favicon.ico',
		),
		'core/smugmug' => array(
			'description' => 'Intégrer des images depuis SmugMug',
			'icon' => 'dashicons-format-image',
		),
		'core/speaker-deck' => array(
			'description' => 'Intégrer une présentation Speaker Deck',
			'icon' => 'dashicons-slides',
		),
		'core/tiktok' => array(
			'description' => 'Intégrer une vidéo TikTok',
			'icon' => 'dashicons-video-alt3',
			'logo' => 'https://www.tiktok.com/favicon.ico',
		),
		'core/ted' => array(
			'description' => 'Intégrer une conférence TED',
			'icon' => 'dashicons-video-alt3',
			'logo' => 'https://www.ted.com/favicon.ico',
		),
		'core/tumblr' => array(
			'description' => 'Intégrer un post Tumblr',
			'icon' => 'dashicons-admin-site',
			'logo' => 'https://www.tumblr.com/favicon.ico',
		),
		'core/videopress' => array(
			'description' => 'Intégrer une vidéo VideoPress',
			'icon' => 'dashicons-video-alt3',
		),
		'core/wordpress-tv' => array(
			'description' => 'Intégrer une vidéo WordPress.tv',
			'icon' => 'dashicons-video-alt3',
			'logo' => 'https://wordpress.tv/favicon.ico',
		),
		'core/amazon-kindle' => array(
			'description' => 'Intégrer un livre Kindle',
			'icon' => 'dashicons-book',
			'logo' => 'https://www.amazon.com/favicon.ico',
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
	
	// Ajouter tous les embeds de $embed_details qui ne sont pas déjà dans $blocks_by_category['embed']
	foreach ($embed_details as $block_name => $details) {
		if (!in_array($block_name, $existing_embed_blocks)) {
			// Extraire le nom d'affichage depuis le bloc (ex: "core/youtube" devient "YouTube")
			$display_name = ucfirst(str_replace('core/', '', $block_name));
			// Convertir meetup-com en Meetup
			$display_name = str_replace('-com', '', $display_name);
			// Remplacer les tirets par des espaces
			$display_name = str_replace('-', ' ', $display_name);
			
			$blocks_by_category['embed'][] = array(
				'name' => $block_name,
				'title' => $display_name,
				'description' => $details['description'],
				'enabled' => in_array($block_name, $enabled_blocks)
			);
		}
	}

	// Trier les embeds par ordre alphabétique
	usort($blocks_by_category['embed'], function($a, $b) {
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
			<?php wp_nonce_field('s4_blocks_settings_nonce'); ?>
			<p class="submit">
				<input type="submit" class="button button-primary" value="Enregistrer les modifications">
			</p>
			<?php foreach ($blocks_by_category as $category => $blocks) : ?>
				<div class="category-section <?php echo $category === 'embed' ? 'active' : ''; ?>">
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
							</div>
							<div class="embed-toolbar">
								<div class="embed-search">
									<input type="text" id="embed-filter" placeholder="Rechercher un service..." />
									<span class="dashicons dashicons-search"></span>
								</div>
								<div class="embed-actions">
									<button type="button" class="button select-all-embeds" data-category="embed">Tout sélectionner</button>
									<button type="button" class="button deselect-all-embeds" data-category="embed">Tout désélectionner</button>
									<div class="embed-view-toggle">
										<button type="button" class="button view-grid active" title="Affichage en grille"><span class="dashicons dashicons-grid-view"></span></button>
										<button type="button" class="button view-list" title="Affichage en liste"><span class="dashicons dashicons-list-view"></span></button>
									</div>
								</div>
							</div>
							<div class="embed-grid view-mode-grid">
								<?php foreach ($blocks as $block) : ?>
									<?php 
										$block_details = isset($embed_details[$block['name']]) ? $embed_details[$block['name']] : array(
											'description' => $block['description'],
											'icon' => 'dashicons-embed-generic'
										);
									?>
									<div class="embed-item" data-name="<?php echo esc_attr($block['name']); ?>">
										<div class="embed-header">
											<?php if (isset($block_details['logo'])) : ?>
												<div class="embed-logo">
													<img src="<?php echo esc_url($block_details['logo']); ?>" alt="<?php echo esc_attr($block['title']); ?>" />
												</div>
											<?php else : ?>
												<div class="embed-icon">
													<span class="dashicons <?php echo esc_attr($block_details['icon']); ?>"></span>
												</div>
											<?php endif; ?>
											<div class="embed-title"><?php echo esc_html($block['title']); ?></div>
											<label class="switch embed-switch">
												<input type="checkbox" 
													   name="enabled_blocks[]" 
													   value="<?php echo esc_attr($block['name']); ?>"
													   class="block-toggle"
													   data-category="<?php echo esc_attr($category); ?>"
													   <?php echo $block['enabled'] ? 'checked' : ''; ?>>
												<span class="slider round"></span>
											</label>
										</div>
										<div class="embed-details">
											<div class="embed-description">
												<?php echo esc_html($block_details['description']); ?>
											</div>
											<div class="embed-code">
												<code><?php echo esc_html($block['name']); ?></code>
											</div>
										</div>
									</div>
								<?php endforeach; ?>
							</div>
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
												<?php echo esc_html($block['title']); ?>
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
	</style>

	<script>
	jQuery(document).ready(function($) {
		// Fonction pour mettre à jour l'état du master toggle
		function updateMasterToggle(category) {
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
			$(`.block-toggle[data-category="${category}"]`).prop('checked', isChecked);
		});

		// Toggle individuel
		$('.block-toggle').on('change', function() {
			var category = $(this).data('category');
			updateMasterToggle(category);
		});

		// Sélectionner tous les embeds
		$('.select-all-embeds').on('click', function() {
			var category = $(this).data('category');
			$(`.block-toggle[data-category="${category}"]`).prop('checked', true);
			updateMasterToggle(category);
		});
		
		// Désélectionner tous les embeds
		$('.deselect-all-embeds').on('click', function() {
			var category = $(this).data('category');
			$(`.block-toggle[data-category="${category}"]`).prop('checked', false);
			updateMasterToggle(category);
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
	});
	</script>
	<?php
} 