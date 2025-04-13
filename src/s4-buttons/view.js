/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { useBlockProps, RichText } from '@wordpress/block-editor';

/**
 * Save component for the S4 Buttons block
 */
export default function save({ attributes }) {
  const {
    text,
    url,
    linkTarget,
    rel,
    buttonType,
    iconPosition,
    iconName,
    hoverEffect,
    customPadding,
    borderRadius,
    isFullWidth,
  } = attributes;

  const blockProps = useBlockProps.save({
    className: `s4-button s4-button-${buttonType} hover-${hoverEffect} ${isFullWidth ? 'is-full-width' : ''}`,
    style: {
      borderRadius: borderRadius ? borderRadius : undefined,
      paddingTop: customPadding?.top || undefined,
      paddingRight: customPadding?.right || undefined,
      paddingBottom: customPadding?.bottom || undefined,
      paddingLeft: customPadding?.left || undefined,
    },
  });

  // Prepare button content with icon if selected
  const buttonContent = () => {
    if (iconPosition === 'left' && iconName) {
      return (
        <>
          <i className={`bi bi-${iconName}`}></i>
          <span>{text}</span>
        </>
      );
    } else if (iconPosition === 'right' && iconName) {
      return (
        <>
          <span>{text}</span>
          <i className={`bi bi-${iconName}`}></i>
        </>
      );
    }
    
    return text;
  };

  // Button wrapper properties
  const buttonProps = {
    ...blockProps,
    href: url || '#',
    target: linkTarget || undefined,
    rel: rel || undefined,
  };

  return (
    <a {...buttonProps}>
      <RichText.Content value={text} />
    </a>
  );
}
