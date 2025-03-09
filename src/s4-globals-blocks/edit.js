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
} from "@wordpress/block-editor";

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * Those files can contain any CSS code that gets applied to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import "./editor.scss";
import { Button } from "@wordpress/components";

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
 *
 * @return {Element} Element to render.
 */
export default function Edit({ attributes, setAttributes }) {
	// Assurez-vous que `images` est toujours un tableau
	const images = attributes.images || [];

	const onSelectImages = (newImages) => {
		setAttributes({
			images: newImages.map((image) => ({
				id: image.id,
				url: image.url,
				alt: image.alt || "", // Assurez-vous que `alt` est défini
			})),
		});
	};

	return (
		<div {...useBlockProps()}>
			<MediaUploadCheck>
				<MediaUpload
					onSelect={onSelectImages}
					allowedTypes={["image"]}
					multiple={true}
					value={images.map((image) => image.id)}
					render={({ open }) => (
						<Button onClick={open} variant="primary">
							{__("Choisir des images", "s4-globals-blocks")}
						</Button>
					)}
				/>
			</MediaUploadCheck>
			<div className="owl-carousel">
				{images.map((image, index) => (
					<img key={index} src={image.url} alt={image.alt} />
				))}
			</div>
		</div>
	);
}
