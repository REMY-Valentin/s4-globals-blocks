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

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * Those files can contain any CSS code that gets applied to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import "./editor.scss";
import { Button, PanelBody, RangeControl, ToggleControl, SelectControl } from "@wordpress/components";
import { useEffect, useRef } from "@wordpress/element";

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
 *
 * @return {Element} Element to render.
 */
export default function Edit({ attributes, setAttributes }) {
	const carouselRef = useRef(null);
	// Assurez-vous que `images` est toujours un tableau
	const images = attributes.images || [];
	
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
			// Destroy existing carousel if it exists
			if (jQuery(carouselRef.current).data('owl.carousel')) {
				jQuery(carouselRef.current).trigger('destroy.owl.carousel');
			}

			// Initialize Owl Carousel with dynamic settings
			jQuery(carouselRef.current).owlCarousel({
				items,
				loop,
				margin,
				nav: nav,
				dots: dots,
				autoplay: autoplay,
				autoplayTimeout: autoplayTimeout,
				autoplayHoverPause: autoplayHoverPause,
				mouseDrag: false,
				pullDrag: false,
				freeDrag: false,
				touchDrag: true,
				smartSpeed: 500,
				responsive: {
					0: {
						items: Math.min(1, items),
						nav: nav
					},
					600: {
						items: Math.min(2, items),
						nav: nav
					},
					1000: {
						items: Math.min(3, items),
						nav: nav
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
				jQuery(carouselRef.current).trigger('destroy.owl.carousel');
			}
		};
	}, [images, items, loop, margin, nav, dots, autoplay, autoplayTimeout, autoplayHoverPause, overflowHidden]);

	return (
		<>
			<InspectorControls>
				<PanelBody title={__('Paramètres du carrousel', 's4-globals-blocks')}>
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
							// Reset height to a reasonable default when changing units
							if (value === 'vh') {
								setAttributes({ height: 50 }); // Default to 50vh
							} else {
								setAttributes({ height: 400 }); // Default to 400px/rem
							}
						}}
					/>
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
					<RangeControl
						label={__('Délai d\'autoplay (ms)', 's4-globals-blocks')}
						value={autoplayTimeout}
						onChange={(value) => setAttributes({ autoplayTimeout: value })}
						min={0}
						max={10000}
						step={500}
					/>
					<ToggleControl
						label={__('Boucle', 's4-globals-blocks')}
						checked={loop}
						onChange={(value) => setAttributes({ loop: value })}
					/>
					<ToggleControl
						label={__('Flèches de navigation', 's4-globals-blocks')}
						checked={nav}
						onChange={(value) => setAttributes({ nav: value })}
					/>
					<ToggleControl
						label={__('Points de navigation', 's4-globals-blocks')}
						checked={dots}
						onChange={(value) => setAttributes({ dots: value })}
					/>
					<ToggleControl
						label={__('Lecture automatique', 's4-globals-blocks')}
						checked={autoplay}
						onChange={(value) => setAttributes({ autoplay: value })}
					/>
					<ToggleControl
						label={__('Pause au survol', 's4-globals-blocks')}
						checked={autoplayHoverPause}
						onChange={(value) => setAttributes({ autoplayHoverPause: value })}
					/>
					<ToggleControl
						label={__('Masquer le débordement', 's4-globals-blocks')}
						checked={overflowHidden}
						onChange={(value) => setAttributes({ overflowHidden: value })}
					/>
				</PanelBody>
			</InspectorControls>
			<div {...useBlockProps()}>
				<div className="owl-carousel" 
					ref={carouselRef} 
					style={{ 
						height: `${height}${heightUnit}`,
						minHeight: `${minHeight}px`
					}}>
					{images.map((image, index) => (
						<div key={index} className="item">
							<img src={image.url} alt={image.alt} style={{ objectFit: imageFit }} />
						</div>
					))}
				</div>
			</div>
		</>
	);
}
