document.addEventListener('DOMContentLoaded', function() {
    'use strict';

    initAccordion();
    initMembershipCards();
    handleMobileMenu();
    initSmoothScroll();
    initCookieMessage();

    function initAccordion() {
        const accordionItems = document.querySelectorAll('.accordion-item');
        if (!accordionItems.length) return;

        accordionItems.forEach(function(item) {
            const header = item.querySelector('.accordion-header');
            if (!header) return;

            header.addEventListener('click', function() {
                accordionItems.forEach(function(otherItem) {
                    if (otherItem !== item && otherItem.classList.contains('active')) {
                        otherItem.classList.remove('active');
                    }
                });
                item.classList.toggle('active');
            });
        });
    }

    function initMembershipCards() {
        const membershipCards = document.querySelectorAll('.membership-card');
        if (!membershipCards.length) return;

        membershipCards.forEach(function(card) {
            card.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-10px)';
                this.style.boxShadow = '0 10px 20px rgba(0, 0, 0, 0.2)';
            });
            card.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0)';
                this.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.1)';
            });
        });
    }

function initCookieMessage() {
        if (localStorage.getItem('cookiesAccepted') === 'true') return;

        setTimeout(function() {
            const cookieMessage = document.createElement('div');
            cookieMessage.className = 'cookie-message';
            cookieMessage.innerHTML = `
                <div class="cookie-content">
                    <p>Utilizamos cookies para mejorar tu experiencia en nuestro sitio web. <a href="#">Política de Cookies</a></p>
                    <button class="accept-cookies">Aceptar</button>
                </div>
            `;
            document.body.appendChild(cookieMessage);

            const acceptButton = document.querySelector('.accept-cookies');
            if (acceptButton) {
                acceptButton.addEventListener('click', function() {
                    cookieMessage.style.display = 'none';
                    localStorage.setItem('cookiesAccepted', 'true');
                });
            }
        }, 2000);
    }
});



window.onscroll = function() {
    var navbar = document.querySelector('.nav-bar');
    if (window.scrollY > 50) {
        navbar.classList.add('fixed');
    } else {
        navbar.classList.remove('fixed');
    }
}
