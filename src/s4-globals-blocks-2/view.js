// view.js - Compatible avec wp-env
(function() {
    // Attendre que jQuery soit complètement chargé et disponible
    function initCarousel() {
        if (typeof jQuery === 'undefined') {
            console.error('jQuery not loaded yet, retrying in 100ms');
            setTimeout(initCarousel, 100);
            return;
        }
        
        jQuery(document).ready(function($) {
            console.log('jQuery is loaded, initializing carousel');
            
            if (typeof $.fn.owlCarousel === 'undefined') {
                console.error('Owl Carousel not loaded');
                return;
            }
            
            // Initialize each carousel with its own options
            $('.s4_block_carousel').each(function() {
                const $carousel = $(this);
                const options = $carousel.data('carousel-options') || {};
                
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
                    overflowHidden: true,
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
                
                // Apply overflow style after initialization
                const stageOuter = $carousel.find('.owl-stage-outer');
                if (stageOuter.length) {
                    stageOuter.css('overflow', carouselOptions.overflowHidden ? 'hidden' : 'visible');
                }
            });
        });
    }
    
    // Démarrer l'initialisation
    initCarousel();
})();
