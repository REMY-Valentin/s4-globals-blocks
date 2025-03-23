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
		
		// Récupérer uniquement les blocs activés
		$enabled_blocks = get_option('s4_enabled_blocks', array());
		
		// Si aucun bloc n'est activé, retourner un tableau vide
		if (empty($enabled_blocks)) {
			return array();
		}
		
		// Retourner uniquement les blocs activés
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

	// Récupérer les blocs activés
	$enabled_blocks = get_option('s4_enabled_blocks', array());

	// Récupérer tous les blocs enregistrés
	$registered_blocks = WP_Block_Type_Registry::get_instance()->get_all_registered();

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
			'enabled' => in_array($block_name, $enabled_blocks)
		);
	}

	// Trier les catégories selon l'ordre défini
	uksort($blocks_by_category, function($a, $b) use ($category_order) {
		$a_order = isset($category_order[$a]) ? $category_order[$a] : 999;
		$b_order = isset($category_order[$b]) ? $category_order[$b] : 999;
		return $a_order - $b_order;
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
						</h2>
						<label class="switch master-switch">
							<input type="checkbox" 
								   class="master-toggle"
								   data-category="<?php echo esc_attr($category); ?>">
							<span class="slider round"></span>
						</label>
					</div>

					<div class="category-content">
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
	});
	</script>
	<?php
} 