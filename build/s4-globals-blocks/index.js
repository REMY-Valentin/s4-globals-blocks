/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/@wordpress/icons/build-module/library/cog.js":
/*!*******************************************************************!*\
  !*** ./node_modules/@wordpress/icons/build-module/library/cog.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_primitives__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/primitives */ "@wordpress/primitives");
/* harmony import */ var _wordpress_primitives__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__);
/**
 * WordPress dependencies
 */


const cog = /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_0__.SVG, {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 24 24",
  children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_0__.Path, {
    fillRule: "evenodd",
    d: "M10.289 4.836A1 1 0 0111.275 4h1.306a1 1 0 01.987.836l.244 1.466c.787.26 1.503.679 2.108 1.218l1.393-.522a1 1 0 011.216.437l.653 1.13a1 1 0 01-.23 1.273l-1.148.944a6.025 6.025 0 010 2.435l1.149.946a1 1 0 01.23 1.272l-.653 1.13a1 1 0 01-1.216.437l-1.394-.522c-.605.54-1.32.958-2.108 1.218l-.244 1.466a1 1 0 01-.987.836h-1.306a1 1 0 01-.986-.836l-.244-1.466a5.995 5.995 0 01-2.108-1.218l-1.394.522a1 1 0 01-1.217-.436l-.653-1.131a1 1 0 01.23-1.272l1.149-.946a6.026 6.026 0 010-2.435l-1.148-.944a1 1 0 01-.23-1.272l.653-1.131a1 1 0 011.217-.437l1.393.522a5.994 5.994 0 012.108-1.218l.244-1.466zM14.929 12a3 3 0 11-6 0 3 3 0 016 0z",
    clipRule: "evenodd"
  })
});
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (cog);
//# sourceMappingURL=cog.js.map

/***/ }),

/***/ "./src/s4-globals-blocks/block.json":
/*!******************************************!*\
  !*** ./src/s4-globals-blocks/block.json ***!
  \******************************************/
/***/ ((module) => {

module.exports = /*#__PURE__*/JSON.parse('{"$schema":"https://schemas.wp.org/trunk/block.json","apiVersion":3,"name":"s4-globals-blocks/s4-blocks-carousel","version":"0.1.0","title":"S4 blocks carousel","category":"theme","icon":"images-alt2","description":"Bloc carousel image","example":{},"attributes":{"images":{"type":"array","default":[],"items":{"type":"object","properties":{"id":{"type":"number"},"url":{"type":"string"},"alt":{"type":"string"}}}},"navPrevImage":{"type":"object","default":null,"properties":{"id":{"type":"number"},"url":{"type":"string"},"alt":{"type":"string"}}},"navNextImage":{"type":"object","default":null,"properties":{"id":{"type":"number"},"url":{"type":"string"},"alt":{"type":"string"}}},"useCustomNav":{"type":"boolean","default":false},"items":{"type":"number","default":1},"loop":{"type":"boolean","default":true},"margin":{"type":"number","default":10},"nav":{"type":"boolean","default":true},"dots":{"type":"boolean","default":true},"autoplay":{"type":"boolean","default":true},"autoplayTimeout":{"type":"number","default":5000},"autoplayHoverPause":{"type":"boolean","default":true},"height":{"type":"number","default":10},"heightUnit":{"type":"string","default":"rem"},"minHeight":{"type":"number","default":200},"imageFit":{"type":"string","default":"cover"},"overflowHidden":{"type":"boolean","default":true},"customClass":{"type":"string","default":""},"permissions":{"type":"object","default":{"dimensions":true,"navigation":true,"imageAdjustment":false,"autoplay":false,"cssCustomization":false,"responsive":false}},"navStyle":{"type":"string","default":"default"},"bootstrapPrevIcon":{"type":"string","default":"bi-chevron-left"},"bootstrapNextIcon":{"type":"string","default":"bi-chevron-right"}},"supports":{"interactivity":true},"textdomain":"s4-globals-blocks","editorScript":["file:./index.js","file:./assets/owl.carousel.min.js"],"editorStyle":["file:./index.css","file:./assets/assets/owl.carousel.min.css","file:./assets/assets/owl.theme.default.min.css","file:./assets/bootstrap-icons-1.11.3/font/bootstrap-icons.css"],"style":["file:./style-index.css","file:./assets/assets/owl.carousel.min.css","file:./assets/assets/owl.theme.default.min.css","file:./assets/bootstrap-icons-1.11.3/font/bootstrap-icons.css"],"render":"file:./render.php","viewScript":["file:./view.js","file:./assets/owl.carousel.min.js"],"script":["jquery"]}');

/***/ }),

/***/ "./src/s4-globals-blocks/edit.js":
/*!***************************************!*\
  !*** ./src/s4-globals-blocks/edit.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Edit)
/* harmony export */ });
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/block-editor */ "@wordpress/block-editor");
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/data */ "@wordpress/data");
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_data__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _editor_scss__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./editor.scss */ "./src/s4-globals-blocks/editor.scss");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _wordpress_icons__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @wordpress/icons */ "./node_modules/@wordpress/icons/build-module/library/cog.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__);
/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-i18n/
 */


/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */



/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * Those files can contain any CSS code that gets applied to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */





/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
 *
 * @return {Element} Element to render.
 */

const PermissionsModal = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_5__.memo)(({
  isOpen,
  onClose,
  permissions,
  onPermissionChange
}) => {
  if (!isOpen) return null;
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.Modal, {
    title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Configuration des permissions", "s4-globals-blocks"),
    onRequestClose: onClose,
    className: "s4-permissions-modal",
    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)("div", {
      style: {
        padding: '20px'
      },
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("h3", {
        children: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Sections accessibles aux utilisateurs", "s4-globals-blocks")
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)("div", {
        style: {
          marginBottom: '20px'
        },
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("p", {
          style: {
            color: '#666',
            fontSize: '13px',
            marginBottom: '15px'
          },
          children: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Sélectionnez les sections que vous souhaitez rendre accessibles aux utilisateurs non-administrateurs.", "s4-globals-blocks")
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)("div", {
          style: {
            display: 'grid',
            gap: '10px'
          },
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.ToggleControl, {
            label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Dimensions", "s4-globals-blocks"),
            checked: permissions.dimensions,
            onChange: value => onPermissionChange('dimensions', value),
            help: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Permet de modifier la hauteur du carrousel", "s4-globals-blocks")
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.ToggleControl, {
            label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Navigation", "s4-globals-blocks"),
            checked: permissions.navigation,
            onChange: value => onPermissionChange('navigation', value),
            help: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Permet de configurer les flèches et points de navigation", "s4-globals-blocks")
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.ToggleControl, {
            label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Ajustement des images", "s4-globals-blocks"),
            checked: permissions.imageAdjustment,
            onChange: value => onPermissionChange('imageAdjustment', value),
            help: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Permet de configurer l'affichage des images (cover/contain)", "s4-globals-blocks")
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.ToggleControl, {
            label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Lecture automatique", "s4-globals-blocks"),
            checked: permissions.autoplay,
            onChange: value => onPermissionChange('autoplay', value),
            help: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Permet de configurer la lecture automatique", "s4-globals-blocks")
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.ToggleControl, {
            label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Personnalisation CSS", "s4-globals-blocks"),
            checked: permissions.cssCustomization,
            onChange: value => onPermissionChange('cssCustomization', value),
            help: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Permet d'ajouter des classes CSS personnalisées", "s4-globals-blocks")
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.ToggleControl, {
            label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Paramètres responsifs", "s4-globals-blocks"),
            checked: permissions.responsive,
            onChange: value => onPermissionChange('responsive', value),
            help: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Permet de configurer le comportement sur différents écrans", "s4-globals-blocks")
          })]
        })]
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("div", {
        style: {
          marginTop: '20px',
          textAlign: 'right'
        },
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.Button, {
          variant: "primary",
          onClick: onClose,
          children: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Fermer", "s4-globals-blocks")
        })
      })]
    })
  });
});
function Edit({
  attributes,
  setAttributes
}) {
  const carouselRef = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_5__.useRef)(null);
  const images = attributes.images || [];
  const [isPermissionsModalOpen, setIsPermissionsModalOpen] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_5__.useState)(false);

  // Récupérer les informations de l'utilisateur actuel
  const currentUser = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_2__.useSelect)(select => {
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
    overflowHidden = true
  } = attributes;
  const onSelectImages = newImages => {
    setAttributes({
      images: newImages.map(image => ({
        id: image.id,
        url: image.url,
        alt: image.alt || ""
      }))
    });
  };
  const removeImage = indexToRemove => {
    // Destroy carousel before removing image
    if (carouselRef.current) {
      if (jQuery(carouselRef.current).data('owl.carousel')) {
        jQuery(carouselRef.current).trigger('destroy.owl.carousel');
      }
    }
    const newImages = images.filter((_, index) => index !== indexToRemove);
    setAttributes({
      images: newImages
    });
  };
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_5__.useEffect)(() => {
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
            return [`<i class="bi ${attributes.bootstrapPrevIcon}"></i>`, `<i class="bi ${attributes.bootstrapNextIcon}"></i>`];
          case 'custom':
            return attributes.useCustomNav && attributes.navPrevImage && attributes.navNextImage ? [`<img src="${attributes.navPrevImage.url}" alt="${attributes.navPrevImage.alt || 'Previous'}" class="owl-nav-custom-img" />`, `<img src="${attributes.navNextImage.url}" alt="${attributes.navNextImage.alt || 'Next'}" class="owl-nav-custom-img" />`] : ['<span aria-label="Previous">‹</span>', '<span aria-label="Next">›</span>'];
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
  }, [images, items, loop, margin, nav, dots, autoplay, autoplayTimeout, autoplayHoverPause, overflowHidden, attributes.navStyle, attributes.bootstrapPrevIcon, attributes.bootstrapNextIcon, attributes.useCustomNav, attributes.navPrevImage, attributes.navNextImage]);
  const blockProps = (0,_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__.useBlockProps)();
  const handlePermissionChange = (key, value) => {
    setAttributes({
      permissions: {
        ...attributes.permissions,
        [key]: value
      }
    });
  };
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.Fragment, {
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__.InspectorControls, {
      children: [isSection4Admin && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)("div", {
        style: {
          padding: '10px',
          background: '#f0f0f0',
          borderBottom: '1px solid #e2e4e7',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        },
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("span", {
          style: {
            fontSize: '13px',
            color: '#1e1e1e'
          },
          children: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Mode administrateur Section4", "s4-globals-blocks")
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.Button, {
          icon: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.Icon, {
            icon: _wordpress_icons__WEBPACK_IMPORTED_MODULE_7__["default"]
          }),
          onClick: () => setIsPermissionsModalOpen(true),
          variant: "secondary",
          isSmall: true,
          children: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Options dev", "s4-globals-blocks")
        })]
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.PanelBody, {
        title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Images', 's4-globals-blocks'),
        initialOpen: true,
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__.MediaUploadCheck, {
          children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__.MediaUpload, {
            onSelect: onSelectImages,
            allowedTypes: ["image"],
            multiple: true,
            value: images.map(image => image.id),
            render: ({
              open
            }) => /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.Button, {
              onClick: open,
              variant: "primary",
              className: "components-button",
              children: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Choisir des images", "s4-globals-blocks")
            })
          })
        }), images.length > 0 && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)("div", {
          className: "s4-carousel-image-preview",
          style: {
            marginTop: '10px'
          },
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("p", {
            style: {
              marginBottom: '8px',
              fontSize: '12px',
              color: '#757575'
            },
            children: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Images sélectionnées:', 's4-globals-blocks')
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("div", {
            style: {
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(60px, 1fr))',
              gap: '8px',
              marginBottom: '16px'
            },
            children: images.map((image, index) => /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)("div", {
              style: {
                position: 'relative'
              },
              children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("img", {
                src: image.url,
                alt: image.alt,
                style: {
                  width: '100%',
                  height: '60px',
                  objectFit: 'cover',
                  borderRadius: '4px',
                  border: '1px solid #ddd'
                }
              }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.Button, {
                isSmall: true,
                isDestructive: true,
                onClick: () => removeImage(index),
                style: {
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
                },
                children: "\xD7"
              })]
            }, index))
          })]
        })]
      }), (isSection4Admin || permissions.dimensions) && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.PanelBody, {
        title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Dimensions', 's4-globals-blocks'),
        initialOpen: false,
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.RangeControl, {
          label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Hauteur du carrousel', 's4-globals-blocks'),
          value: height,
          onChange: value => setAttributes({
            height: value
          }),
          min: heightUnit === 'vh' ? 1 : 200,
          max: heightUnit === 'vh' ? 100 : 1000,
          step: heightUnit === 'vh' ? 1 : 10
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.RangeControl, {
          label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Hauteur minimale (px)', 's4-globals-blocks'),
          value: minHeight,
          onChange: value => setAttributes({
            minHeight: value
          }),
          min: 100,
          max: 800,
          step: 10
        })]
      }), (isSection4Admin || permissions.navigation) && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.PanelBody, {
        title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Navigation', 's4-globals-blocks'),
        initialOpen: false,
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.ToggleControl, {
          label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Flèches de navigation', 's4-globals-blocks'),
          checked: nav,
          onChange: value => setAttributes({
            nav: value
          })
        }), nav && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.Fragment, {
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.SelectControl, {
            label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Style de navigation', 's4-globals-blocks'),
            value: attributes.navStyle,
            options: [{
              label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Par défaut', 's4-globals-blocks'),
              value: 'default'
            }, {
              label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Bootstrap', 's4-globals-blocks'),
              value: 'bootstrap'
            }, {
              label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Personnalisé', 's4-globals-blocks'),
              value: 'custom'
            }],
            onChange: value => setAttributes({
              navStyle: value
            })
          }), attributes.navStyle === 'bootstrap' && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.Fragment, {
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.SelectControl, {
              label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Icône précédente', 's4-globals-blocks'),
              value: attributes.bootstrapPrevIcon,
              options: [{
                label: 'Chevron Left',
                value: 'bi-chevron-left'
              }, {
                label: 'Arrow Left',
                value: 'bi-arrow-left'
              }, {
                label: 'Caret Left',
                value: 'bi-caret-left'
              }, {
                label: 'Arrow Left Circle',
                value: 'bi-arrow-left-circle'
              }, {
                label: 'Arrow Left Circle Fill',
                value: 'bi-arrow-left-circle-fill'
              }, {
                label: 'Arrow Left Square',
                value: 'bi-arrow-left-square'
              }, {
                label: 'Arrow Left Square Fill',
                value: 'bi-arrow-left-square-fill'
              }, {
                label: 'Chevron Double Left',
                value: 'bi-chevron-double-left'
              }, {
                label: 'Folder',
                value: 'bi-folder'
              }],
              onChange: value => setAttributes({
                bootstrapPrevIcon: value
              })
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.SelectControl, {
              label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Icône suivante', 's4-globals-blocks'),
              value: attributes.bootstrapNextIcon,
              options: [{
                label: 'Chevron Right',
                value: 'bi-chevron-right'
              }, {
                label: 'Arrow Right',
                value: 'bi-arrow-right'
              }, {
                label: 'Caret Right',
                value: 'bi-caret-right'
              }, {
                label: 'Arrow Right Circle',
                value: 'bi-arrow-right-circle'
              }, {
                label: 'Arrow Right Circle Fill',
                value: 'bi-arrow-right-circle-fill'
              }, {
                label: 'Arrow Right Square',
                value: 'bi-arrow-right-square'
              }, {
                label: 'Arrow Right Square Fill',
                value: 'bi-arrow-right-square-fill'
              }, {
                label: 'Chevron Double Right',
                value: 'bi-chevron-double-right'
              }, {
                label: 'Folder',
                value: 'bi-folder'
              }],
              onChange: value => setAttributes({
                bootstrapNextIcon: value
              })
            })]
          }), attributes.navStyle === 'custom' && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.Fragment, {
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.ToggleControl, {
              label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Utiliser des images personnalisées', 's4-globals-blocks'),
              checked: attributes.useCustomNav,
              onChange: value => setAttributes({
                useCustomNav: value
              })
            }), attributes.useCustomNav && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)("div", {
              style: {
                marginTop: '10px'
              },
              children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("p", {
                style: {
                  marginBottom: '8px'
                },
                children: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Image flèche précédente', 's4-globals-blocks')
              }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__.MediaUploadCheck, {
                children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__.MediaUpload, {
                  onSelect: media => {
                    setAttributes({
                      navPrevImage: {
                        id: media.id,
                        url: media.url,
                        alt: media.alt || ""
                      }
                    });
                  },
                  allowedTypes: ["image"],
                  value: attributes.navPrevImage?.id,
                  render: ({
                    open
                  }) => /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("div", {
                    children: attributes.navPrevImage ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)("div", {
                      style: {
                        position: 'relative',
                        display: 'inline-block'
                      },
                      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("img", {
                        src: attributes.navPrevImage.url,
                        alt: attributes.navPrevImage.alt,
                        style: {
                          maxWidth: '50px',
                          height: 'auto',
                          cursor: 'pointer',
                          marginBottom: '8px'
                        },
                        onClick: open
                      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.Button, {
                        isDestructive: true,
                        isSmall: true,
                        onClick: () => setAttributes({
                          navPrevImage: null
                        }),
                        style: {
                          position: 'absolute',
                          top: '-8px',
                          right: '-8px',
                          padding: '2px',
                          minWidth: '20px',
                          height: '20px'
                        },
                        children: "\xD7"
                      })]
                    }) : /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.Button, {
                      onClick: open,
                      variant: "secondary",
                      isSmall: true,
                      children: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Choisir une image', 's4-globals-blocks')
                    })
                  })
                })
              }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("p", {
                style: {
                  marginBottom: '8px',
                  marginTop: '16px'
                },
                children: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Image flèche suivante', 's4-globals-blocks')
              }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__.MediaUploadCheck, {
                children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__.MediaUpload, {
                  onSelect: media => {
                    setAttributes({
                      navNextImage: {
                        id: media.id,
                        url: media.url,
                        alt: media.alt || ""
                      }
                    });
                  },
                  allowedTypes: ["image"],
                  value: attributes.navNextImage?.id,
                  render: ({
                    open
                  }) => /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("div", {
                    children: attributes.navNextImage ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)("div", {
                      style: {
                        position: 'relative',
                        display: 'inline-block'
                      },
                      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("img", {
                        src: attributes.navNextImage.url,
                        alt: attributes.navNextImage.alt,
                        style: {
                          maxWidth: '50px',
                          height: 'auto',
                          cursor: 'pointer',
                          marginBottom: '8px'
                        },
                        onClick: open
                      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.Button, {
                        isDestructive: true,
                        isSmall: true,
                        onClick: () => setAttributes({
                          navNextImage: null
                        }),
                        style: {
                          position: 'absolute',
                          top: '-8px',
                          right: '-8px',
                          padding: '2px',
                          minWidth: '20px',
                          height: '20px'
                        },
                        children: "\xD7"
                      })]
                    }) : /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.Button, {
                      onClick: open,
                      variant: "secondary",
                      isSmall: true,
                      children: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Choisir une image', 's4-globals-blocks')
                    })
                  })
                })
              }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("p", {
                className: "components-base-control__help",
                style: {
                  fontSize: '12px',
                  color: '#757575',
                  marginTop: '8px'
                },
                children: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Formats recommandés : SVG ou PNG avec fond transparent', 's4-globals-blocks')
              })]
            })]
          })]
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.ToggleControl, {
          label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Points de navigation', 's4-globals-blocks'),
          checked: dots,
          onChange: value => setAttributes({
            dots: value
          })
        })]
      }), isSection4Admin && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.Fragment, {
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.PanelBody, {
          title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Paramètres avancés', 's4-globals-blocks'),
          initialOpen: false,
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.SelectControl, {
            label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Unité de hauteur', 's4-globals-blocks'),
            value: heightUnit,
            options: [{
              label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Pixels (px)', 's4-globals-blocks'),
              value: 'px'
            }, {
              label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Rem (rem)', 's4-globals-blocks'),
              value: 'rem'
            }, {
              label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Hauteur de la fenêtre (vh)', 's4-globals-blocks'),
              value: 'vh'
            }],
            onChange: value => {
              setAttributes({
                heightUnit: value
              });
              if (value === 'vh') {
                setAttributes({
                  height: 50
                });
              } else {
                setAttributes({
                  height: 400
                });
              }
            }
          }), (isSection4Admin || permissions.imageAdjustment) && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.Fragment, {
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.SelectControl, {
              label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Ajustement de l\'image', 's4-globals-blocks'),
              value: imageFit,
              options: [{
                label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Couvrir', 's4-globals-blocks'),
                value: 'cover'
              }, {
                label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Contenir', 's4-globals-blocks'),
                value: 'contain'
              }],
              onChange: value => setAttributes({
                imageFit: value
              })
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.RangeControl, {
              label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Éléments à afficher', 's4-globals-blocks'),
              value: items,
              onChange: value => setAttributes({
                items: value
              }),
              min: 1,
              max: 5
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.RangeControl, {
              label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Marge entre les éléments', 's4-globals-blocks'),
              value: margin,
              onChange: value => setAttributes({
                margin: value
              }),
              min: 0,
              max: 50
            })]
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.ToggleControl, {
            label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Masquer le débordement', 's4-globals-blocks'),
            checked: overflowHidden,
            onChange: value => setAttributes({
              overflowHidden: value
            })
          })]
        }), (isSection4Admin || permissions.autoplay) && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.PanelBody, {
          title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Lecture automatique', 's4-globals-blocks'),
          initialOpen: false,
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.ToggleControl, {
            label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Activer la lecture automatique', 's4-globals-blocks'),
            checked: autoplay,
            onChange: value => setAttributes({
              autoplay: value
            })
          }), autoplay && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.Fragment, {
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.RangeControl, {
              label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Délai d\'autoplay (ms)', 's4-globals-blocks'),
              value: autoplayTimeout,
              onChange: value => setAttributes({
                autoplayTimeout: value
              }),
              min: 0,
              max: 10000,
              step: 500
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.ToggleControl, {
              label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Pause au survol', 's4-globals-blocks'),
              checked: autoplayHoverPause,
              onChange: value => setAttributes({
                autoplayHoverPause: value
              })
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.ToggleControl, {
              label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Lecture en boucle', 's4-globals-blocks'),
              checked: loop,
              onChange: value => setAttributes({
                loop: value
              })
            })]
          })]
        }), (isSection4Admin || permissions.cssCustomization) && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.PanelBody, {
          title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Personnalisation CSS', 's4-globals-blocks'),
          initialOpen: false,
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.TextControl, {
            label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Classe CSS personnalisée', 's4-globals-blocks'),
            value: attributes.customClass || '',
            onChange: value => setAttributes({
              customClass: value
            })
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("p", {
            className: "components-base-control__help",
            style: {
              fontSize: '12px',
              color: '#757575',
              marginTop: '4px'
            },
            children: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Ajoutez une classe CSS personnalisée pour styliser votre carrousel.', 's4-globals-blocks')
          })]
        })]
      })]
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(PermissionsModal, {
      isOpen: isPermissionsModalOpen,
      onClose: () => setIsPermissionsModalOpen(false),
      permissions: attributes.permissions,
      onPermissionChange: handlePermissionChange
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("div", {
      ...blockProps,
      children: images.length === 0 ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("div", {
        style: {
          backgroundColor: '#f0f0f0',
          border: '2px dashed #999',
          padding: '20px',
          textAlign: 'center',
          borderRadius: '4px',
          cursor: 'pointer'
        },
        onClick: () => {
          const mediaUploadButton = document.querySelector('.block-editor-media-placeholder button.components-button');
          if (mediaUploadButton) {
            mediaUploadButton.click();
          }
        },
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("p", {
          style: {
            margin: '0',
            color: '#666'
          },
          children: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Cliquez pour sélectionner des images pour le carrousel", "s4-globals-blocks")
        })
      }) : /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("div", {
        ref: carouselRef,
        className: "owl-carousel owl-theme",
        style: {
          height: `${height}${heightUnit}`,
          minHeight: `${minHeight}px`
        },
        children: images.map((image, index) => /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("div", {
          className: "item",
          children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("img", {
            src: image.url,
            alt: image.alt,
            style: {
              width: "100%",
              height: "100%",
              objectFit: imageFit
            }
          })
        }, index))
      })
    })]
  });
}

/***/ }),

/***/ "./src/s4-globals-blocks/editor.scss":
/*!*******************************************!*\
  !*** ./src/s4-globals-blocks/editor.scss ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./src/s4-globals-blocks/index.js":
/*!****************************************!*\
  !*** ./src/s4-globals-blocks/index.js ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/blocks */ "@wordpress/blocks");
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _style_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./style.scss */ "./src/s4-globals-blocks/style.scss");
/* harmony import */ var _edit__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./edit */ "./src/s4-globals-blocks/edit.js");
/* harmony import */ var _block_json__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./block.json */ "./src/s4-globals-blocks/block.json");
/**
 * Registers a new block provided a unique name and an object defining its behavior.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-registration/
 */


/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * All files containing `style` keyword are bundled together. The code used
 * gets applied both to the front of your site and to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */


/**
 * Internal dependencies
 */



/**
 * Every block starts by registering a new block type definition.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-registration/
 */
(0,_wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__.registerBlockType)(_block_json__WEBPACK_IMPORTED_MODULE_3__.name, {
  /**
   * @see ./edit.js
   */
  edit: _edit__WEBPACK_IMPORTED_MODULE_2__["default"]
});

/***/ }),

/***/ "./src/s4-globals-blocks/style.scss":
/*!******************************************!*\
  !*** ./src/s4-globals-blocks/style.scss ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "@wordpress/block-editor":
/*!*************************************!*\
  !*** external ["wp","blockEditor"] ***!
  \*************************************/
/***/ ((module) => {

module.exports = window["wp"]["blockEditor"];

/***/ }),

/***/ "@wordpress/blocks":
/*!********************************!*\
  !*** external ["wp","blocks"] ***!
  \********************************/
/***/ ((module) => {

module.exports = window["wp"]["blocks"];

/***/ }),

/***/ "@wordpress/components":
/*!************************************!*\
  !*** external ["wp","components"] ***!
  \************************************/
/***/ ((module) => {

module.exports = window["wp"]["components"];

/***/ }),

/***/ "@wordpress/data":
/*!******************************!*\
  !*** external ["wp","data"] ***!
  \******************************/
/***/ ((module) => {

module.exports = window["wp"]["data"];

/***/ }),

/***/ "@wordpress/element":
/*!*********************************!*\
  !*** external ["wp","element"] ***!
  \*********************************/
/***/ ((module) => {

module.exports = window["wp"]["element"];

/***/ }),

/***/ "@wordpress/i18n":
/*!******************************!*\
  !*** external ["wp","i18n"] ***!
  \******************************/
/***/ ((module) => {

module.exports = window["wp"]["i18n"];

/***/ }),

/***/ "@wordpress/primitives":
/*!************************************!*\
  !*** external ["wp","primitives"] ***!
  \************************************/
/***/ ((module) => {

module.exports = window["wp"]["primitives"];

/***/ }),

/***/ "react/jsx-runtime":
/*!**********************************!*\
  !*** external "ReactJSXRuntime" ***!
  \**********************************/
/***/ ((module) => {

module.exports = window["ReactJSXRuntime"];

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/chunk loaded */
/******/ 	(() => {
/******/ 		var deferred = [];
/******/ 		__webpack_require__.O = (result, chunkIds, fn, priority) => {
/******/ 			if(chunkIds) {
/******/ 				priority = priority || 0;
/******/ 				for(var i = deferred.length; i > 0 && deferred[i - 1][2] > priority; i--) deferred[i] = deferred[i - 1];
/******/ 				deferred[i] = [chunkIds, fn, priority];
/******/ 				return;
/******/ 			}
/******/ 			var notFulfilled = Infinity;
/******/ 			for (var i = 0; i < deferred.length; i++) {
/******/ 				var [chunkIds, fn, priority] = deferred[i];
/******/ 				var fulfilled = true;
/******/ 				for (var j = 0; j < chunkIds.length; j++) {
/******/ 					if ((priority & 1 === 0 || notFulfilled >= priority) && Object.keys(__webpack_require__.O).every((key) => (__webpack_require__.O[key](chunkIds[j])))) {
/******/ 						chunkIds.splice(j--, 1);
/******/ 					} else {
/******/ 						fulfilled = false;
/******/ 						if(priority < notFulfilled) notFulfilled = priority;
/******/ 					}
/******/ 				}
/******/ 				if(fulfilled) {
/******/ 					deferred.splice(i--, 1)
/******/ 					var r = fn();
/******/ 					if (r !== undefined) result = r;
/******/ 				}
/******/ 			}
/******/ 			return result;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			"s4-globals-blocks/index": 0,
/******/ 			"s4-globals-blocks/style-index": 0
/******/ 		};
/******/ 		
/******/ 		// no chunk on demand loading
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		__webpack_require__.O.j = (chunkId) => (installedChunks[chunkId] === 0);
/******/ 		
/******/ 		// install a JSONP callback for chunk loading
/******/ 		var webpackJsonpCallback = (parentChunkLoadingFunction, data) => {
/******/ 			var [chunkIds, moreModules, runtime] = data;
/******/ 			// add "moreModules" to the modules object,
/******/ 			// then flag all "chunkIds" as loaded and fire callback
/******/ 			var moduleId, chunkId, i = 0;
/******/ 			if(chunkIds.some((id) => (installedChunks[id] !== 0))) {
/******/ 				for(moduleId in moreModules) {
/******/ 					if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 						__webpack_require__.m[moduleId] = moreModules[moduleId];
/******/ 					}
/******/ 				}
/******/ 				if(runtime) var result = runtime(__webpack_require__);
/******/ 			}
/******/ 			if(parentChunkLoadingFunction) parentChunkLoadingFunction(data);
/******/ 			for(;i < chunkIds.length; i++) {
/******/ 				chunkId = chunkIds[i];
/******/ 				if(__webpack_require__.o(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 					installedChunks[chunkId][0]();
/******/ 				}
/******/ 				installedChunks[chunkId] = 0;
/******/ 			}
/******/ 			return __webpack_require__.O(result);
/******/ 		}
/******/ 		
/******/ 		var chunkLoadingGlobal = globalThis["webpackChunks4_globals_blocks"] = globalThis["webpackChunks4_globals_blocks"] || [];
/******/ 		chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0));
/******/ 		chunkLoadingGlobal.push = webpackJsonpCallback.bind(null, chunkLoadingGlobal.push.bind(chunkLoadingGlobal));
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module depends on other loaded chunks and execution need to be delayed
/******/ 	var __webpack_exports__ = __webpack_require__.O(undefined, ["s4-globals-blocks/style-index"], () => (__webpack_require__("./src/s4-globals-blocks/index.js")))
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;
//# sourceMappingURL=index.js.map