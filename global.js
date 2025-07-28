// === Helper function to get element by ID ===
const getEl = (id) => document.getElementById(id);

// === Global Variables & State ===
let currentLang = localStorage.getItem('sylfloraLang') || 'bn';

// === Cart Management (used across multiple pages) ===
const getCart = () => {
    const cartJson = localStorage.getItem('sylfloraCart');
    return cartJson ? JSON.parse(cartJson) : [];
};

const saveCart = (cart) => {
    localStorage.setItem('sylfloraCart', JSON.stringify(cart));
};

// === Make functions and data globally accessible IMMEDIATELY ===
window.sylflora = {
    getCart,
    saveCart,
    getEl,
    currentLang,
    langData,
    productData
};

// === Actions that require the DOM to be ready ===
document.addEventListener('DOMContentLoaded', () => {

    const updateCartBadge = () => {
        const cart = getCart();
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        const cartBadge = getEl('cart-badge');
        if (cartBadge) {
            cartBadge.textContent = totalItems;
            cartBadge.classList.toggle('hidden', totalItems === 0);
        }
    };

    const switchLanguage = (lang) => {
        window.sylflora.currentLang = lang;
        currentLang = lang;
        localStorage.setItem('sylfloraLang', lang);
        document.documentElement.lang = lang;
        document.body.className = lang === 'bn' ? 'font-bangla' : 'font-english';
        
        const langSwitcher = getEl('lang-switcher');
        if (langSwitcher) {
            langSwitcher.textContent = lang === 'bn' ? 'English' : 'বাংলা';
        }

        document.querySelectorAll('[data-lang-key]').forEach(el => {
            const key = el.getAttribute('data-lang-key');
            if (langData && langData[lang] && langData[lang][key]) {
                el.innerHTML = langData[lang][key];
            }
        });

        document.querySelectorAll('[data-lang-placeholder-key]').forEach(el => {
            const key = el.getAttribute('data-lang-placeholder-key');
            if (langData && langData[lang] && langData[lang][key]) {
                el.placeholder = langData[lang][key];
            }
        });
    };
    
    window.sylflora.updateCartBadge = updateCartBadge;
    window.sylflora.switchLanguage = switchLanguage;
    
    // === Success Modal Logic ===
    const successModal = getEl('success-modal');
    const successModalBox = getEl('success-modal-box');
    const successModalOverlay = getEl('success-modal-overlay');
    const continueShoppingBtn = getEl('continue-shopping-btn');
    const goToCartBtn = getEl('go-to-cart-btn');
    const successTitle = successModalBox ? successModalBox.querySelector('h2') : null;
    const successMessage = successModalBox ? successModalBox.querySelector('p') : null;
    let modalTimeout;

    const hideSuccessModal = () => {
        if (!successModal) return;
        successModalBox.classList.add('scale-95', 'opacity-0');
        setTimeout(() => {
            successModal.classList.add('hidden');
            successModal.classList.remove('flex');
        }, 200);
    };

    const showSuccessModal = (productName) => {
        if (!successModal || !successTitle || !successMessage) {
            alert((langData[currentLang]?.add_success_message || "'%productName%' has been added!").replace('%productName%', productName));
            return;
        }
        clearTimeout(modalTimeout);
        
        successTitle.innerHTML = langData[currentLang]?.add_success_title || "Successfully Added!";
        successMessage.innerHTML = (langData[currentLang]?.add_success_message || "'%productName%' has been added!").replace('%productName%', `<strong>${productName}</strong>`);

        successModal.classList.remove('hidden');
        successModal.classList.add('flex');
        setTimeout(() => {
            successModalBox.classList.remove('scale-95', 'opacity-0');
        }, 10);
        
        modalTimeout = setTimeout(hideSuccessModal, 4000);
    };
    
    window.sylflora.showSuccessModal = showSuccessModal;

    // --- INITIALIZATION on page load ---
    switchLanguage(currentLang);
    updateCartBadge();

    // === Event Listeners ===
    const mobileMenuButton = getEl('mobile-menu-button');
    const mobileMenu = getEl('mobile-menu');
    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });
    }
    
    const cartButton = getEl('cart-button');
    // This is the corrected logic: it redirects only if the cart modal isn't on the current page.
    if (cartButton && !getEl('cart-modal')) { 
        cartButton.addEventListener('click', () => {
            window.location.href = 'shop.html?openCart=true';
        });
    }

    const langSwitcher = getEl('lang-switcher');
    if (langSwitcher) {
        langSwitcher.addEventListener('click', () => {
            const newLang = currentLang === 'en' ? 'bn' : 'en';
            switchLanguage(newLang);
        });
    }

    if (successModal) {
        if (continueShoppingBtn) continueShoppingBtn.addEventListener('click', hideSuccessModal);
        if (successModalOverlay) successModalOverlay.addEventListener('click', hideSuccessModal);
        if (goToCartBtn) goToCartBtn.addEventListener('click', () => {
            window.location.href = 'shop.html?openCart=true';
        });
    }
});
