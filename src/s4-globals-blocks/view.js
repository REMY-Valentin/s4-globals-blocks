// view.js - Compatible avec wp-env
(function() {
    // Counter to limit retries
    let retryCount = 0;
    const maxRetries = 20; // Max number of retries (2 seconds total with 100ms intervals)
    
    // Store carousel configurations for change detection
    let carouselConfigs = {};
    
    // Log all script tags to help with debugging
    console.log('=== S4 Carousel Debugging ===');
    console.log('Document readyState:', document.readyState);
    console.log('Checking loaded scripts:');
    const scripts = document.getElementsByTagName('script');
    for (let i = 0; i < scripts.length; i++) {
        const src = scripts[i].src || '(inline script)';
        console.log(`Script ${i+1}:`, src);
        if (src.includes('jquery')) {
            console.log('  jQuery script found:', src);
        }
        if (src.includes('owl') || src.includes('carousel')) {
            console.log('  Owl Carousel script found:', src);
        }
    }
    
    // Log loaded CSS files
    console.log('Checking loaded CSS:');
    const styleSheets = document.styleSheets;
    for (let i = 0; i < styleSheets.length; i++) {
        try {
            const href = styleSheets[i].href || '(inline style)';
            console.log(`CSS ${i+1}:`, href);
            if (href.includes('owl') || href.includes('carousel')) {
                console.log('  Owl Carousel CSS found:', href);
            }
        } catch (e) {
            console.log(`CSS ${i+1}: (blocked by CORS policy)`);
        }
    }
    
    // Function to destroy and reinitialize a specific carousel
    function reinitializeCarousel($, $carousel) {
        const carouselId = $carousel.attr('id');
        console.log(`Reinitializing carousel (ID: ${carouselId})`);
        
        try {
            // Get current options before destroying
            const optionsString = $carousel.attr('data-carousel-options');
            let options = {};
            
            try {
                if (optionsString) {
                    options = JSON.parse(optionsString);
                }
            } catch (e) {
                console.error('Error parsing carousel options:', e);
            }
            
            // Destroy the carousel instance
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
            
            // Initialize with the new options
            $carousel.owlCarousel(options);
            console.log(`Carousel (ID: ${carouselId}) reinitialized successfully`);
            
            // Apply overflow style after reinitialization
            const stageOuter = $carousel.find('.owl-stage-outer');
            if (stageOuter.length) {
                const overflowSetting = $carousel.attr('data-overflow-hidden') === 'true' ? 'hidden' : 'visible';
                stageOuter.css('overflow', overflowSetting);
            }
        } catch (error) {
            console.error(`Error reinitializing carousel (ID: ${carouselId}):`, error);
        }
    }
    
    // Check if carousel configuration has changed
    function hasConfigChanged($carousel) {
        const carouselId = $carousel.attr('id');
        const currentConfig = $carousel.attr('data-carousel-options');
        const navStyle = $carousel.attr('data-nav-style');
        
        // Create a config key that includes both options and nav style
        const configKey = `${currentConfig}_${navStyle}`;
        
        // If we don't have a stored config for this carousel, store it and return false
        if (!carouselConfigs[carouselId]) {
            carouselConfigs[carouselId] = configKey;
            return false;
        }
        
        // Check if the config has changed
        const hasChanged = carouselConfigs[carouselId] !== configKey;
        
        // Update the stored config if it changed
        if (hasChanged) {
            console.log(`Detected change in carousel config for ID: ${carouselId}`);
            carouselConfigs[carouselId] = configKey;
        }
        
        return hasChanged;
    }
    
    // Attendre que jQuery soit complètement chargé et disponible
    function initCarousel() {
        if (typeof jQuery === 'undefined') {
            console.log('jQuery not loaded yet, retrying... attempt ' + (retryCount + 1));
            if (retryCount < maxRetries) {
                retryCount++;
                setTimeout(initCarousel, 100);
            } else {
                console.error('Failed to load jQuery after multiple attempts');
            }
            return;
        }
        
        jQuery(document).ready(function($) {
            console.log('jQuery is loaded, initializing carousel');
            
            // Check DOM for carousel elements
            const carousels = $('.s4_block_carousel.owl-carousel');
            console.log('DOM elements with class .s4_block_carousel.owl-carousel:', carousels.length);
            
            if (carousels.length === 0) {
                console.warn('No .s4_block_carousel.owl-carousel elements found on page');
                // Try with just the main class as fallback
                const mainCarousels = $('.s4_block_carousel');
                console.log('DOM elements with class .s4_block_carousel:', mainCarousels.length);
                
                if (mainCarousels.length > 0) {
                    console.log('Found carousel elements with main class only');
                }
                return;
            } else {
                console.log('Found ' + carousels.length + ' carousel(s) on page');
            }
            
            // Check if Owl Carousel is loaded
            if (typeof $.fn.owlCarousel === 'undefined') {
                console.error('Owl Carousel plugin not loaded. Check if the script is included correctly.');
                
                // Try to load it manually as a fallback (not recommended for production)
                const scriptPath = '/wp-content/plugins/s4-globals-blocks/assets/owl.carousel.min.js';
                console.log('Attempting to load Owl Carousel from: ' + scriptPath);
                
                const script = document.createElement('script');
                script.src = scriptPath;
                script.onload = function() {
                    console.log('Owl Carousel loaded manually, initializing carousels');
                    initOwlCarousels($);
                };
                script.onerror = function() {
                    console.error('Failed to load Owl Carousel manually');
                };
                document.head.appendChild(script);
                
                return;
            }
            
            // Initialize carousels
            initOwlCarousels($);
            
            // Set up MutationObserver to watch for attribute changes
            setupMutationObserver($);
        });
    }
    
    // Set up MutationObserver to detect changes to the carousel
    function setupMutationObserver($) {
        if (!window.MutationObserver) {
            console.log('MutationObserver not supported in this browser');
            return;
        }
        
        // Create a new observer for each carousel
        $('.s4_block_carousel.owl-carousel').each(function() {
            const $carousel = $(this);
            const carouselId = $carousel.attr('id');
            
            const observer = new MutationObserver(function(mutations) {
                let needsReinit = false;
                
                mutations.forEach(function(mutation) {
                    if (mutation.type === 'attributes' && 
                       (mutation.attributeName === 'data-carousel-options' || 
                        mutation.attributeName === 'data-nav-style')) {
                        needsReinit = true;
                    }
                });
                
                if (needsReinit) {
                    console.log(`Mutation detected for carousel ID: ${carouselId}, reinitializing...`);
                    reinitializeCarousel($, $carousel);
                }
            });
            
            // Options for the observer (which mutations to observe)
            const config = { attributes: true, attributeFilter: ['data-carousel-options', 'data-nav-style'] };
            
            // Start observing the carousel element
            observer.observe($carousel[0], config);
            console.log(`Mutation observer set up for carousel ID: ${carouselId}`);
        });
    }
    
    // Extract carousel initialization to a separate function
    function initOwlCarousels($) {
        // Initialize each carousel with its own options
        $('.s4_block_carousel.owl-carousel').each(function(index) {
            const $carousel = $(this);
            const carouselId = $carousel.attr('id') || 'carousel-' + index;
            console.log(`Initializing carousel #${index + 1} (ID: ${carouselId})`);
            
            try {
                // If already initialized, check if config has changed
                if ($carousel.hasClass('owl-loaded')) {
                    if (hasConfigChanged($carousel)) {
                        console.log(`Config changed for carousel #${index + 1} (ID: ${carouselId}), reinitializing`);
                        reinitializeCarousel($, $carousel);
                    } else {
                        console.log(`Carousel #${index + 1} already initialized, skipping`);
                    }
                    return;
                }
                
                const optionsString = $carousel.attr('data-carousel-options');
                let options = {};
                
                try {
                    if (optionsString) {
                        options = JSON.parse(optionsString);
                        console.log('Carousel options:', options);
                        
                        // Store initial config for change detection
                        const navStyle = $carousel.attr('data-nav-style');
                        carouselConfigs[carouselId] = `${optionsString}_${navStyle}`;
                    } else {
                        console.warn('No carousel options found, using defaults');
                    }
                } catch (e) {
                    console.error('Error parsing carousel options:', e);
                }
                
                // Default options as fallback
                const defaultOptions = {
                    items: 1,
                    loop: true,
                    margin: 10,
                    nav: true,
                    dots: true,
                    autoplay: true,
                    autoplayTimeout: 5000,
                    autoplayHoverPause: true,
                    mouseDrag: true,
                    pullDrag: true,
                    freeDrag: false,
                    touchDrag: true,
                    smartSpeed: 500,
                    responsive: {
                        0: {
                            items: 1,
                            nav: options.nav
                        },
                        600: {
                            items: 2,
                            nav: options.nav
                        },
                        1000: {
                            items: 3,
                            nav: options.nav
                        }
                    }
                };
           
                // Merge default options with saved options
                const carouselOptions = { ...defaultOptions, ...options };
                
                // Initialize the carousel with the merged options
                $carousel.owlCarousel(carouselOptions);
                console.log(`Carousel #${index + 1} (ID: ${carouselId}) initialized successfully`);
                
                // Apply overflow style after initialization
                const stageOuter = $carousel.find('.owl-stage-outer');
                if (stageOuter.length) {
                    const overflowSetting = $carousel.attr('data-overflow-hidden') === 'true' ? 'hidden' : 'visible';
                    stageOuter.css('overflow', overflowSetting);
                    console.log('Applied overflow style: ' + overflowSetting);
                }
            } catch (error) {
                console.error(`Error initializing carousel #${index + 1} (ID: ${carouselId}):`, error);
            }
        });
    }
    
    // Démarrer l'initialisation
    console.log('Starting carousel initialization');
    initCarousel();
    
    // Add a fallback initialization after a delay to ensure everything is loaded
    setTimeout(function() {
        if (document.readyState === 'complete' && typeof jQuery !== 'undefined') {
            console.log('Running fallback initialization check');
            const $ = jQuery;
            const carousels = $('.s4_block_carousel.owl-carousel:not(.owl-loaded)');
            if (carousels.length > 0) {
                console.log('Found ' + carousels.length + ' uninitialized carousel(s), reinitializing');
                initOwlCarousels($);
            }
        }
    }, 1000);
    
    // Set up a periodic check for changes and reinitialize if needed (useful in admin/editor context)
    if (typeof wp !== 'undefined' && wp.data) {
        console.log('WordPress editor detected, setting up periodic checks');
        
        // Check every 2 seconds for changes in editor
        const editorCheckInterval = setInterval(function() {
            if (typeof jQuery !== 'undefined') {
                const $ = jQuery;
                const carousels = $('.s4_block_carousel.owl-carousel');
                
                if (carousels.length > 0) {
                    carousels.each(function() {
                        const $carousel = $(this);
                        if (hasConfigChanged($carousel)) {
                            reinitializeCarousel($, $carousel);
                        }
                    });
                }
            }
        }, 2000);
        
        // Clean up on editor unload to prevent memory leaks
        if (window.addEventListener) {
            window.addEventListener('unload', function() {
                clearInterval(editorCheckInterval);
            });
        }
    }
})();
