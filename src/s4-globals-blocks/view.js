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
            
            $('.owl-carousel').owlCarousel({
                items: 3,
                loop: true,
                margin: 10,
                nav: true,
                responsive: {
                    0: { items: 1 },
                    600: { items: 2 },
                    1000: { items: 3 }
                }
            });
        });
    }
    
    // Démarrer l'initialisation
    initCarousel();
})();
