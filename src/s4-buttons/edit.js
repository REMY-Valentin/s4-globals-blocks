/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import {
  useBlockProps,
  RichText,
  URLInput,
  BlockControls,
  InspectorControls,
  PanelColorSettings,
} from '@wordpress/block-editor';
import {
  ToolbarGroup,
  ToolbarButton,
  Popover,
  Button,
  PanelBody,
  SelectControl,
  TextControl,
  ToggleControl,
  __experimentalBoxControl as BoxControl,
  __experimentalUnitControl as UnitControl,
  __experimentalDivider as Divider,
} from '@wordpress/components';
import { useState } from '@wordpress/element';
import { link, linkOff } from '@wordpress/icons';

/**
 * Edit component for the S4 Buttons block
 */
export default function Edit({ attributes, setAttributes, isSelected }) {
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

  const [isEditingURL, setIsEditingURL] = useState(false);

  const blockProps = useBlockProps({
    className: `s4-button s4-button-${buttonType} hover-${hoverEffect} ${isFullWidth ? 'is-full-width' : ''}`,
    style: {
      borderRadius: borderRadius ? borderRadius : undefined,
      paddingTop: customPadding?.top || undefined,
      paddingRight: customPadding?.right || undefined,
      paddingBottom: customPadding?.bottom || undefined,
      paddingLeft: customPadding?.left || undefined,
    },
  });

  const buttonIconOptions = [
    { label: __('None', 's4-globals-blocks'), value: 'none' },
    { label: __('Left', 's4-globals-blocks'), value: 'left' },
    { label: __('Right', 's4-globals-blocks'), value: 'right' },
  ];

  const buttonTypeOptions = [
    { label: __('Primary', 's4-globals-blocks'), value: 'primary' },
    { label: __('Secondary', 's4-globals-blocks'), value: 'secondary' },
    { label: __('Tertiary', 's4-globals-blocks'), value: 'tertiary' },
    { label: __('Outline', 's4-globals-blocks'), value: 'outline' },
    { label: __('Ghost', 's4-globals-blocks'), value: 'ghost' },
  ];

  const hoverEffectOptions = [
    { label: __('None', 's4-globals-blocks'), value: 'none' },
    { label: __('Grow', 's4-globals-blocks'), value: 'grow' },
    { label: __('Shrink', 's4-globals-blocks'), value: 'shrink' },
    { label: __('Pulse', 's4-globals-blocks'), value: 'pulse' },
    { label: __('Slide', 's4-globals-blocks'), value: 'slide' },
  ];

  function toggleEditing() {
    setIsEditingURL(!isEditingURL);
  }

  function onSetLinkRel(value) {
    setAttributes({ rel: value });
  }

  function onSetNewTab(value) {
    const newLinkTarget = value ? '_blank' : '';
    let updatedRel = rel;
    
    if (newLinkTarget && !rel?.includes('noopener')) {
      updatedRel = rel ? `${rel} noopener` : 'noopener';
    } else if (!newLinkTarget && rel === 'noopener') {
      updatedRel = '';
    }

    setAttributes({
      linkTarget: newLinkTarget,
      rel: updatedRel,
    });
  }

  function setButtonText(newText) {
    setAttributes({ text: newText });
  }

  // Render button content with icon if selected
  const renderButtonContent = () => {
    if (iconPosition === 'left' && iconName) {
      return (
        <>
          <i className={`bi bi-${iconName}`}></i>
          <span>{text || __('Button Text', 's4-globals-blocks')}</span>
        </>
      );
    } else if (iconPosition === 'right' && iconName) {
      return (
        <>
          <span>{text || __('Button Text', 's4-globals-blocks')}</span>
          <i className={`bi bi-${iconName}`}></i>
        </>
      );
    }
    
    return text || __('Button Text', 's4-globals-blocks');
  };

  return (
    <>
      <InspectorControls>
        <PanelBody title={__('Button Settings', 's4-globals-blocks')}>
          <SelectControl
            label={__('Button Type', 's4-globals-blocks')}
            value={buttonType}
            options={buttonTypeOptions}
            onChange={(value) => setAttributes({ buttonType: value })}
          />
          
          <SelectControl
            label={__('Hover Effect', 's4-globals-blocks')}
            value={hoverEffect}
            options={hoverEffectOptions}
            onChange={(value) => setAttributes({ hoverEffect: value })}
          />
          
          <ToggleControl
            label={__('Full Width', 's4-globals-blocks')}
            checked={isFullWidth}
            onChange={() => setAttributes({ isFullWidth: !isFullWidth })}
          />
          
          <Divider />
          
          <UnitControl
            label={__('Border Radius', 's4-globals-blocks')}
            value={borderRadius}
            onChange={(value) => setAttributes({ borderRadius: value })}
            units={[
              { value: 'px', label: 'px' },
              { value: '%', label: '%' },
              { value: 'em', label: 'em' },
              { value: 'rem', label: 'rem' },
            ]}
          />
          
          <BoxControl
            label={__('Padding', 's4-globals-blocks')}
            values={customPadding}
            onChange={(value) => setAttributes({ customPadding: value })}
            units={[
              { value: 'px', label: 'px' },
              { value: 'em', label: 'em' },
              { value: 'rem', label: 'rem' },
            ]}
          />
        </PanelBody>
        
        <PanelBody title={__('Icon Settings', 's4-globals-blocks')}>
          <SelectControl
            label={__('Icon Position', 's4-globals-blocks')}
            value={iconPosition}
            options={buttonIconOptions}
            onChange={(value) => setAttributes({ iconPosition: value })}
          />
          
          {iconPosition !== 'none' && (
            <TextControl
              label={__('Bootstrap Icon Name', 's4-globals-blocks')}
              help={__('Enter the Bootstrap icon name (e.g. "arrow-right", "check")', 's4-globals-blocks')}
              value={iconName}
              onChange={(value) => setAttributes({ iconName: value })}
            />
          )}
        </PanelBody>
        
        <PanelBody title={__('Link Settings', 's4-globals-blocks')}>
          <TextControl
            label={__('URL', 's4-globals-blocks')}
            value={url || ''}
            onChange={(value) => setAttributes({ url: value })}
          />
          
          <ToggleControl
            label={__('Open in new tab', 's4-globals-blocks')}
            checked={linkTarget === '_blank'}
            onChange={onSetNewTab}
          />
          
          <TextControl
            label={__('Link Rel', 's4-globals-blocks')}
            value={rel || ''}
            onChange={onSetLinkRel}
            help={__('Describes the relationship between the current page and the linked page.', 's4-globals-blocks')}
          />
        </PanelBody>
      </InspectorControls>
      
      <BlockControls>
        <ToolbarGroup>
          <ToolbarButton
            name="link"
            icon={url ? link : linkOff}
            title={__('Link', 's4-globals-blocks')}
            onClick={toggleEditing}
            isActive={!!url}
          />
        </ToolbarGroup>
      </BlockControls>
      
      <div {...blockProps}>
        <RichText
          placeholder={__('Add text…', 's4-globals-blocks')}
          value={text}
          onChange={setButtonText}
          withoutInteractiveFormatting
          allowedFormats={[]}
        />
        
        {isSelected && isEditingURL && (
          <Popover position="bottom center" onClose={toggleEditing}>
            <URLInput
              value={url}
              onChange={(value) => setAttributes({ url: value })}
            />
            <Button
              variant="primary"
              onClick={toggleEditing}
              className="s4-button-link-editor-button"
            >
              {__('Apply', 's4-globals-blocks')}
            </Button>
          </Popover>
        )}
      </div>
    </>
  );
}
