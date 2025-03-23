/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-i18n/
 */
import { __ } from "@wordpress/i18n";

/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */
import {
	useBlockProps,
	MediaUpload,
	MediaUploadCheck,
	InspectorControls,
} from "@wordpress/block-editor";

import { useSelect } from '@wordpress/data';

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * Those files can contain any CSS code that gets applied to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import "./editor.scss";
import { Button, PanelBody, RangeControl, ToggleControl, SelectControl, TextControl, Modal, Icon } from "@wordpress/components";
import { useEffect, useRef, useState, memo } from "@wordpress/element";
import { cog } from '@wordpress/icons';

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
 *
 * @return {Element} Element to render.
 */
const PermissionsModal = memo(({ isOpen, onClose, permissions, onPermissionChange }) => {
	if (!isOpen) return null;
	
	return (
		<Modal
			title={__("Configuration des permissions", "s4-globals-blocks")}
			onRequestClose={onClose}
			className="s4-permissions-modal"
		>
			<div style={{ padding: '20px' }}>
				<h3>{__("Sections accessibles aux utilisateurs", "s4-globals-blocks")}</h3>
				<div style={{ marginBottom: '20px' }}>
					<p style={{ color: '#666', fontSize: '13px', marginBottom: '15px' }}>
						{__("Sélectionnez les sections que vous souhaitez rendre accessibles aux utilisateurs non-administrateurs.", "s4-globals-blocks")}
					</p>
					<div style={{ display: 'grid', gap: '10px' }}>
						<ToggleControl
							label={__("Dimensions", "s4-globals-blocks")}
							checked={permissions.dimensions}
							onChange={(value) => onPermissionChange('dimensions', value)}
							help={__("Permet de modifier la hauteur du carrousel", "s4-globals-blocks")}
						/>
						<ToggleControl
							label={__("Navigation", "s4-globals-blocks")}
							checked={permissions.navigation}
							onChange={(value) => onPermissionChange('navigation', value)}
							help={__("Permet de configurer les flèches et points de navigation", "s4-globals-blocks")}
						/>
						<ToggleControl
							label={__("Ajustement des images", "s4-globals-blocks")}
							checked={permissions.imageAdjustment}
							onChange={(value) => onPermissionChange('imageAdjustment', value)}
							help={__("Permet de configurer l'affichage des images (cover/contain)", "s4-globals-blocks")}
						/>
						<ToggleControl
							label={__("Lecture automatique", "s4-globals-blocks")}
							checked={permissions.autoplay}
							onChange={(value) => onPermissionChange('autoplay', value)}
							help={__("Permet de configurer la lecture automatique", "s4-globals-blocks")}
						/>
						<ToggleControl
							label={__("Personnalisation CSS", "s4-globals-blocks")}
							checked={permissions.cssCustomization}
							onChange={(value) => onPermissionChange('cssCustomization', value)}
							help={__("Permet d'ajouter des classes CSS personnalisées", "s4-globals-blocks")}
						/>
						<ToggleControl
							label={__("Paramètres responsifs", "s4-globals-blocks")}
							checked={permissions.responsive}
							onChange={(value) => onPermissionChange('responsive', value)}
							help={__("Permet de configurer le comportement sur différents écrans", "s4-globals-blocks")}
						/>
					</div>
				</div>
				<div style={{ marginTop: '20px', textAlign: 'right' }}>
					<Button
						variant="primary"
						onClick={onClose}
					>
						{__("Fermer", "s4-globals-blocks")}
					</Button>
				</div>
			</div>
		</Modal>
	);
});

export default function Edit({ attributes, setAttributes }) {
	const carouselRef = useRef(null);
	const images = attributes.images || [];
	const [isPermissionsModalOpen, setIsPermissionsModalOpen] = useState(false);
	
	// Récupérer les informations de l'utilisateur actuel
	const currentUser = useSelect((select) => {
		return select('core').getCurrentUser();
	}, []);

	// Vérifier si l'utilisateur est un administrateur avec email @section4.fr
	//const isSection4Admin = currentUser?.roles?.includes('administrator') && 
		//				   currentUser?.email?.endsWith('@section4.fr');
	const isSection4Admin = true;
	// Permissions par défaut si non définies
	const permissions = attributes.permissions || {
		dimensions: true,
		navigation: true,
		imageAdjustment: false,
		autoplay: false,
		cssCustomization: false,
		responsive: false
	};

	// Carousel settings with defaults
	const {
		items = 1,
		loop = true,
		margin = 10,
		nav = true,
		dots = true,
		autoplay = true,
		autoplayTimeout = 5000,
		autoplayHoverPause = true,
		height = 400,
		heightUnit = "px",
		minHeight = 200,
		imageFit = "cover",
		overflowHidden = true,
	} = attributes;

	const onSelectImages = (newImages) => {
		setAttributes({
			images: newImages.map((image) => ({
				id: image.id,
				url: image.url,
				alt: image.alt || "",
			})),
		});
	};

	const removeImage = (indexToRemove) => {
		// Destroy carousel before removing image
		if (carouselRef.current) {
			if (jQuery(carouselRef.current).data('owl.carousel')) {
				jQuery(carouselRef.current).trigger('destroy.owl.carousel');
			}
		}
		
		const newImages = images.filter((_, index) => index !== indexToRemove);
		setAttributes({ images: newImages });
	};

	useEffect(() => {
		if (carouselRef.current && images.length > 0) {
			const $carousel = jQuery(carouselRef.current);
			
			// Always destroy the carousel before rebuilding when icon changes
			if ($carousel.data('owl.carousel')) {
				$carousel.trigger('destroy.owl.carousel');
				// Remove all Owl Carousel classes and styles
				$carousel.removeClass('owl-loaded owl-drag');
				$carousel.find('.owl-stage-outer, .owl-stage, .owl-item, .owl-nav, .owl-dots, .owl-dot').remove();
				
				// Reset the original structure
				$carousel.find('.item').css({
					'width': '',
					'position': '',
					'display': ''
				});
			}
			
			const getNavText = () => {
				switch (attributes.navStyle) {
					case 'bootstrap':
						return [
							`<i class="bi ${attributes.bootstrapPrevIcon}"></i>`,
							`<i class="bi ${attributes.bootstrapNextIcon}"></i>`
						];
					case 'custom':
						return attributes.useCustomNav && attributes.navPrevImage && attributes.navNextImage ? [
							`<img src="${attributes.navPrevImage.url}" alt="${attributes.navPrevImage.alt || 'Previous'}" class="owl-nav-custom-img" />`,
							`<img src="${attributes.navNextImage.url}" alt="${attributes.navNextImage.alt || 'Next'}" class="owl-nav-custom-img" />`
						] : ['<span aria-label="Previous">‹</span>', '<span aria-label="Next">›</span>'];
					default:
						return ['<span aria-label="Previous">‹</span>', '<span aria-label="Next">›</span>'];
				}
			};

			// Initialize carousel with updated options
			$carousel.owlCarousel({
				items,
				loop,
				margin,
				nav,
				dots,
				autoplay,
				autoplayTimeout,
				autoplayHoverPause,
				mouseDrag: false,
				pullDrag: false,
				freeDrag: false,
				touchDrag: true,
				smartSpeed: 500,
				navText: getNavText(),
				dotsClass: attributes.navStyle === 'bootstrap' ? 'owl-dots d-flex justify-content-center' : 'owl-dots',
				dotClass: attributes.navStyle === 'bootstrap' ? 'owl-dot mx-2' : 'owl-dot',
				responsive: {
					0: {
						items: Math.min(1, items),
						nav
					},
					600: {
						items: Math.min(2, items),
						nav
					},
					1000: {
						items: Math.min(3, items),
						nav
					}
				}
			});
			
			// Apply overflow style to owl-stage-outer
			const stageOuter = carouselRef.current.querySelector('.owl-stage-outer');
			if (stageOuter) {
				stageOuter.style.overflow = overflowHidden ? 'hidden' : 'visible';
			}
		}

		// Cleanup function
		return () => {
			if (carouselRef.current) {
				const owlInstance = jQuery(carouselRef.current).data('owl.carousel');
				if (owlInstance) {
					owlInstance.destroy();
				}
			}
		};
	}, [images, items, loop, margin, nav, dots, autoplay, autoplayTimeout, autoplayHoverPause, overflowHidden, 
	    attributes.navStyle, attributes.bootstrapPrevIcon, attributes.bootstrapNextIcon, 
	    attributes.useCustomNav, attributes.navPrevImage, attributes.navNextImage]);

	const blockProps = useBlockProps();

	const handlePermissionChange = (key, value) => {
		setAttributes({ 
			permissions: { 
				...attributes.permissions, 
				[key]: value 
			}
		});
	};

	return (
		<>
			<InspectorControls>
				{isSection4Admin && (
					<div style={{ 
						padding: '10px', 
						background: '#f0f0f0', 
						borderBottom: '1px solid #e2e4e7',
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'space-between'
					}}>
						<span style={{ fontSize: '13px', color: '#1e1e1e' }}>
							{__("Mode administrateur Section4", "s4-globals-blocks")}
						</span>
						<Button
							icon={<Icon icon={cog} />}
							onClick={() => setIsPermissionsModalOpen(true)}
							variant="secondary"
							isSmall
						>
							{__("Options dev", "s4-globals-blocks")}
						</Button>
					</div>
				)}

				<PanelBody title={__('Images', 's4-globals-blocks')} initialOpen={true}>
					<MediaUploadCheck>
						<MediaUpload
							onSelect={onSelectImages}
							allowedTypes={["image"]}
							multiple={true}
							value={images.map((image) => image.id)}
							render={({ open }) => (
								<Button onClick={open} variant="primary" className="components-button">
									{__("Choisir des images", "s4-globals-blocks")}
								</Button>
							)}
						/>
					</MediaUploadCheck>
					{images.length > 0 && (
						<div className="s4-carousel-image-preview" style={{ marginTop: '10px' }}>
							<p style={{ marginBottom: '8px', fontSize: '12px', color: '#757575' }}>
								{__('Images sélectionnées:', 's4-globals-blocks')}
							</p>
							<div style={{ 
								display: 'grid', 
								gridTemplateColumns: 'repeat(auto-fill, minmax(60px, 1fr))',
								gap: '8px',
								marginBottom: '16px'
							}}>
								{images.map((image, index) => (
									<div key={index} style={{ position: 'relative' }}>
										<img 
											src={image.url} 
											alt={image.alt}
											style={{
												width: '100%',
												height: '60px',
												objectFit: 'cover',
												borderRadius: '4px',
												border: '1px solid #ddd'
											}}
										/>
										<Button
											isSmall
											isDestructive
											onClick={() => removeImage(index)}
											style={{
												position: 'absolute',
												top: '-8px',
												right: '-8px',
												padding: '2px',
												minWidth: '20px',
												height: '20px',
												borderRadius: '50%',
												display: 'flex',
												alignItems: 'center',
												justifyContent: 'center'
											}}
										>
											×
										</Button>
									</div>
								))}
							</div>
						</div>
					)}
				</PanelBody>

				{/* Sections conditionnelles basées sur les permissions */}
				{(isSection4Admin || permissions.dimensions) && (
					<PanelBody title={__('Dimensions', 's4-globals-blocks')} initialOpen={false}>
						<RangeControl
							label={__('Hauteur du carrousel', 's4-globals-blocks')}
							value={height}
							onChange={(value) => setAttributes({ height: value })}
							min={heightUnit === 'vh' ? 1 : 200}
							max={heightUnit === 'vh' ? 100 : 1000}
							step={heightUnit === 'vh' ? 1 : 10}
						/>
						<RangeControl
							label={__('Hauteur minimale (px)', 's4-globals-blocks')}
							value={minHeight}
							onChange={(value) => setAttributes({ minHeight: value })}
							min={100}
							max={800}
							step={10}
						/>
					</PanelBody>
				)}

				{(isSection4Admin || permissions.navigation) && (
					<PanelBody title={__('Navigation', 's4-globals-blocks')} initialOpen={false}>
						<ToggleControl
							label={__('Flèches de navigation', 's4-globals-blocks')}
							checked={nav}
							onChange={(value) => setAttributes({ nav: value })}
						/>
						{nav && (
							<>
								<SelectControl
									label={__('Style de navigation', 's4-globals-blocks')}
									value={attributes.navStyle}
									options={[
										{ label: __('Par défaut', 's4-globals-blocks'), value: 'default' },
										{ label: __('Bootstrap', 's4-globals-blocks'), value: 'bootstrap' },
										{ label: __('Personnalisé', 's4-globals-blocks'), value: 'custom' },
									]}
									onChange={(value) => setAttributes({ navStyle: value })}
								/>
								{attributes.navStyle === 'bootstrap' && (
									<>
										<SelectControl
											label={__('Icône précédente', 's4-globals-blocks')}
											value={attributes.bootstrapPrevIcon}
											options={[
												{ label: 'Chevron Left', value: 'bi-chevron-left' },
												{ label: 'Arrow Left', value: 'bi-arrow-left' },
												{ label: 'Caret Left', value: 'bi-caret-left' },
												{ label: 'Arrow Left Circle', value: 'bi-arrow-left-circle' },
												{ label: 'Arrow Left Circle Fill', value: 'bi-arrow-left-circle-fill' },
												{ label: 'Arrow Left Square', value: 'bi-arrow-left-square' },
												{ label: 'Arrow Left Square Fill', value: 'bi-arrow-left-square-fill' },
												{ label: 'Chevron Double Left', value: 'bi-chevron-double-left' },
												{ label: 'Folder', value: 'bi-folder' },
											]}
											onChange={(value) => setAttributes({ bootstrapPrevIcon: value })}
										/>
										<SelectControl
											label={__('Icône suivante', 's4-globals-blocks')}
											value={attributes.bootstrapNextIcon}
											options={[
												{ label: 'Chevron Right', value: 'bi-chevron-right' },
												{ label: 'Arrow Right', value: 'bi-arrow-right' },
												{ label: 'Caret Right', value: 'bi-caret-right' },
												{ label: 'Arrow Right Circle', value: 'bi-arrow-right-circle' },
												{ label: 'Arrow Right Circle Fill', value: 'bi-arrow-right-circle-fill' },
												{ label: 'Arrow Right Square', value: 'bi-arrow-right-square' },
												{ label: 'Arrow Right Square Fill', value: 'bi-arrow-right-square-fill' },
												{ label: 'Chevron Double Right', value: 'bi-chevron-double-right' },
												{ label: 'Folder', value: 'bi-folder' },
											]}
											onChange={(value) => setAttributes({ bootstrapNextIcon: value })}
										/>
									</>
								)}
								{attributes.navStyle === 'custom' && (
									<>
										<ToggleControl
											label={__('Utiliser des images personnalisées', 's4-globals-blocks')}
											checked={attributes.useCustomNav}
											onChange={(value) => setAttributes({ useCustomNav: value })}
										/>
										{attributes.useCustomNav && (
											<div style={{ marginTop: '10px' }}>
												<p style={{ marginBottom: '8px' }}>{__('Image flèche précédente', 's4-globals-blocks')}</p>
												<MediaUploadCheck>
													<MediaUpload
														onSelect={(media) => {
															setAttributes({
																navPrevImage: {
																	id: media.id,
																	url: media.url,
																	alt: media.alt || "",
																},
															});
														}}
														allowedTypes={["image"]}
														value={attributes.navPrevImage?.id}
														render={({ open }) => (
															<div>
																{attributes.navPrevImage ? (
																	<div style={{ position: 'relative', display: 'inline-block' }}>
																		<img
																			src={attributes.navPrevImage.url}
																			alt={attributes.navPrevImage.alt}
																			style={{ 
																				maxWidth: '50px', 
																				height: 'auto',
																				cursor: 'pointer',
																				marginBottom: '8px'
																			}}
																			onClick={open}
																		/>
																		<Button
																			isDestructive
																			isSmall
																			onClick={() => setAttributes({ navPrevImage: null })}
																			style={{
																				position: 'absolute',
																				top: '-8px',
																				right: '-8px',
																				padding: '2px',
																				minWidth: '20px',
																				height: '20px'
																			}}
																		>
																				×
																			</Button>
																	</div>
																) : (
																	<Button onClick={open} variant="secondary" isSmall>
																		{__('Choisir une image', 's4-globals-blocks')}
																	</Button>
																)}
															</div>
														)}
													/>
												</MediaUploadCheck>

												<p style={{ marginBottom: '8px', marginTop: '16px' }}>{__('Image flèche suivante', 's4-globals-blocks')}</p>
												<MediaUploadCheck>
													<MediaUpload
														onSelect={(media) => {
															setAttributes({
																navNextImage: {
																	id: media.id,
																	url: media.url,
																	alt: media.alt || "",
																},
															});
														}}
														allowedTypes={["image"]}
														value={attributes.navNextImage?.id}
														render={({ open }) => (
															<div>
																{attributes.navNextImage ? (
																	<div style={{ position: 'relative', display: 'inline-block' }}>
																		<img
																			src={attributes.navNextImage.url}
																			alt={attributes.navNextImage.alt}
																			style={{ 
																				maxWidth: '50px', 
																				height: 'auto',
																				cursor: 'pointer',
																				marginBottom: '8px'
																			}}
																			onClick={open}
																		/>
																		<Button
																			isDestructive
																			isSmall
																			onClick={() => setAttributes({ navNextImage: null })}
																			style={{
																				position: 'absolute',
																				top: '-8px',
																				right: '-8px',
																				padding: '2px',
																				minWidth: '20px',
																				height: '20px'
																			}}
																		>
																				×
																			</Button>
																	</div>
																) : (
																	<Button onClick={open} variant="secondary" isSmall>
																		{__('Choisir une image', 's4-globals-blocks')}
																	</Button>
																)}
															</div>
														)}
													/>
												</MediaUploadCheck>
												<p className="components-base-control__help" style={{ fontSize: '12px', color: '#757575', marginTop: '8px' }}>
													{__('Formats recommandés : SVG ou PNG avec fond transparent', 's4-globals-blocks')}
												</p>
											</div>
										)}
									</>
								)}
							</>
						)}
						<ToggleControl
							label={__('Points de navigation', 's4-globals-blocks')}
							checked={dots}
							onChange={(value) => setAttributes({ dots: value })}
						/>
					</PanelBody>
				)}

				{isSection4Admin && (
					<>
						<PanelBody title={__('Paramètres avancés', 's4-globals-blocks')} initialOpen={false}>
							<SelectControl
								label={__('Unité de hauteur', 's4-globals-blocks')}
								value={heightUnit}
								options={[
									{ label: __('Pixels (px)', 's4-globals-blocks'), value: 'px' },
									{ label: __('Rem (rem)', 's4-globals-blocks'), value: 'rem' },
									{ label: __('Hauteur de la fenêtre (vh)', 's4-globals-blocks'), value: 'vh' },
								]}
								onChange={(value) => {
									setAttributes({ heightUnit: value });
									if (value === 'vh') {
										setAttributes({ height: 50 });
									} else {
										setAttributes({ height: 400 });
									}
								}}
							/>
							{(isSection4Admin || permissions.imageAdjustment) && (
								<>
									<SelectControl
										label={__('Ajustement de l\'image', 's4-globals-blocks')}
										value={imageFit}
										options={[
											{ label: __('Couvrir', 's4-globals-blocks'), value: 'cover' },
											{ label: __('Contenir', 's4-globals-blocks'), value: 'contain' },
										]}
										onChange={(value) => setAttributes({ imageFit: value })}
									/>
									<RangeControl
										label={__('Éléments à afficher', 's4-globals-blocks')}
										value={items}
										onChange={(value) => setAttributes({ items: value })}
										min={1}
										max={5}
									/>
									<RangeControl
										label={__('Marge entre les éléments', 's4-globals-blocks')}
										value={margin}
										onChange={(value) => setAttributes({ margin: value })}
										min={0}
										max={50}
									/>
								</>
							)}
							<ToggleControl
								label={__('Masquer le débordement', 's4-globals-blocks')}
								checked={overflowHidden}
								onChange={(value) => setAttributes({ overflowHidden: value })}
							/>
						</PanelBody>

						{(isSection4Admin || permissions.autoplay) && (
							<PanelBody title={__('Lecture automatique', 's4-globals-blocks')} initialOpen={false}>
								<ToggleControl
									label={__('Activer la lecture automatique', 's4-globals-blocks')}
									checked={autoplay}
									onChange={(value) => setAttributes({ autoplay: value })}
								/>
								{autoplay && (
									<>
										<RangeControl
											label={__('Délai d\'autoplay (ms)', 's4-globals-blocks')}
											value={autoplayTimeout}
											onChange={(value) => setAttributes({ autoplayTimeout: value })}
											min={0}
											max={10000}
											step={500}
										/>
										<ToggleControl
											label={__('Pause au survol', 's4-globals-blocks')}
											checked={autoplayHoverPause}
											onChange={(value) => setAttributes({ autoplayHoverPause: value })}
										/>
										<ToggleControl
											label={__('Lecture en boucle', 's4-globals-blocks')}
											checked={loop}
											onChange={(value) => setAttributes({ loop: value })}
										/>
									</>
								)}
							</PanelBody>
						)}

						{(isSection4Admin || permissions.cssCustomization) && (
							<PanelBody title={__('Personnalisation CSS', 's4-globals-blocks')} initialOpen={false}>
								<TextControl
									label={__('Classe CSS personnalisée', 's4-globals-blocks')}
									value={attributes.customClass || ''}
									onChange={(value) => setAttributes({ customClass: value })}
								/>
								<p className="components-base-control__help" style={{ fontSize: '12px', color: '#757575', marginTop: '4px' }}>
									{__('Ajoutez une classe CSS personnalisée pour styliser votre carrousel.', 's4-globals-blocks')}
								</p>
							</PanelBody>
						)}
					</>
				)}
			</InspectorControls>
			
			<PermissionsModal 
				isOpen={isPermissionsModalOpen}
				onClose={() => setIsPermissionsModalOpen(false)}
				permissions={attributes.permissions}
				onPermissionChange={handlePermissionChange}
			/>
			
			<div {...blockProps}>
				{images.length === 0 ? (
					<div 
						style={{
							backgroundColor: '#f0f0f0',
							border: '2px dashed #999',
							padding: '20px',
							textAlign: 'center',
							borderRadius: '4px',
							cursor: 'pointer'
						}}
						onClick={() => {
							const mediaUploadButton = document.querySelector('.block-editor-media-placeholder button.components-button');
							if (mediaUploadButton) {
								mediaUploadButton.click();
							}
						}}
					>
						<p style={{ margin: '0', color: '#666' }}>
							{__("Cliquez pour sélectionner des images pour le carrousel", "s4-globals-blocks")}
						</p>
					</div>
				) : (
					<div
						ref={carouselRef}
						className="owl-carousel owl-theme"
						style={{
							height: `${height}${heightUnit}`,
							minHeight: `${minHeight}px`,
						}}
					>
						{images.map((image, index) => (
							<div key={index} className="item">
								<img
									src={image.url}
									alt={image.alt}
									style={{
										width: "100%",
										height: "100%",
										objectFit: imageFit,
									}}
								/>
							</div>
						))}
					</div>
				)}
			</div>
		</>
	);
}
