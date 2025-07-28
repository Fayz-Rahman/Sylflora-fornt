document.addEventListener('DOMContentLoaded', () => {
    if (!window.sylflora) {
        console.error("Sylflora global object not found. Ensure global.js is loaded first.");
        return;
    }
    
    const { getCart, saveCart, updateCartBadge, switchLanguage, getEl, currentLang, langData, productData } = window.sylflora;

    // --- DOM Elements for Shop Page ---
    const productGrid = getEl('product-grid');
    const searchInput = getEl('search-input');
    
    // --- নতুন এলিমেন্ট (পুরাতন filterButtonsContainer এবং sortSelect বাদ দেওয়া হয়েছে) ---
    const filterMenuButton = getEl('filter-menu-button');
    const filterOptions = getEl('filter-options');
    const sortMenuButton = getEl('sort-menu-button');
    const sortOptions = getEl('sort-options');
    const filterContainer = getEl('filter-container');
    const sortContainer = getEl('sort-container');
    // --------------------------------------------------------------------------
    
    // Cart Modal Elements
    const cartModal = getEl('cart-modal');
    const cartPanel = getEl('cart-panel');
    const cartBg = getEl('cart-bg');
    const closeCartBtn = getEl('close-cart-btn');
    const cartItemsContainer = getEl('cart-items');
    const cartSubtotalEl = getEl('cart-subtotal');
    const checkoutBtn = getEl('checkout-btn');
    const clearCartBtn = getEl('clear-cart-btn');
    
    // Checkout Modal Elements
    const checkoutModal = getEl('checkout-modal');
    const closeCheckoutModalBtn = getEl('close-checkout-modal');
    const checkoutForm = getEl('checkout-form');
    const checkoutItemList = getEl('checkout-item-list');
    const checkoutSubtotalAmount = getEl('checkout-subtotal-amount');
    const checkoutDeliveryAmount = getEl('checkout-delivery-amount');
    const checkoutTotalAmount = getEl('checkout-total-amount');

    // Order Confirmation Modal Elements
    const orderConfirmationModal = getEl('order-confirmation-modal');
    const orderConfirmationOverlay = getEl('order-confirmation-overlay');
    const orderConfirmationBtn = getEl('order-confirmation-btn');

    // --- ফিল্টার এবং সর্টিং এর স্টেট সংরক্ষণের জন্য ভ্যারিয়েবল ---
    let activeFilter = 'all';
    let sortValue = 'default';
    // --------------------------------------------------------

    // === Cart & Checkout Logic (No changes here) ---
    const openCart = () => {
        if (!cartModal) return;
        renderCartItems();
        cartModal.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
        setTimeout(() => {
            if(cartBg) cartBg.classList.remove('opacity-0');
            if(cartPanel) {
                cartPanel.classList.remove('cart-slide-out');
                cartPanel.classList.add('cart-slide-in');
            }
        }, 10);
    };

    const closeCart = () => {
        if (!cartModal) return;
        cartPanel.classList.remove('cart-slide-in');
        cartPanel.classList.add('cart-slide-out');
        cartBg.classList.add('opacity-0');
        setTimeout(() => {
            cartModal.classList.add('hidden');
            document.body.style.overflow = '';
        }, 300);
    };

    const renderCartItems = () => {
        const cart = getCart();
        cartItemsContainer.innerHTML = '';
        if (cart.length === 0) {
            cartItemsContainer.innerHTML = `<p class="text-center text-gray-500 py-8" data-lang-key="cart_empty">${langData[currentLang].cart_empty}</p>`;
            checkoutBtn.style.display = 'none';
            clearCartBtn.style.display = 'none';
        } else {
            checkoutBtn.style.display = 'flex';
            clearCartBtn.style.display = 'flex';
            cart.forEach(item => {
                const itemEl = document.createElement('div');
                itemEl.className = 'flex items-center justify-between py-4';
                itemEl.innerHTML = `
                    <div class="flex items-center gap-4">
                        <img src="${item.image}" alt="${item.name}" class="w-16 h-16 object-cover rounded-md">
                        <div>
                            <p class="font-semibold">${item.name}</p>
                            <p class="text-sm text-gray-500">${item.size ? item.size : ''}</p>
                            <p class="text-sm font-bold text-sylflora-green">BDT ${item.price.toLocaleString('en-IN')} x ${item.quantity}</p>
                        </div>
                    </div>
                    <button class="remove-item-btn text-red-500 hover:text-red-700 text-2xl" data-id="${item.cartItemId}">&times;</button>
                `;
                cartItemsContainer.appendChild(itemEl);
            });
        }
        updateCartSubtotal();
        if(switchLanguage) switchLanguage(currentLang);
    };

    const updateCartSubtotal = () => {
        const cart = getCart();
        const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
        if(cartSubtotalEl) cartSubtotalEl.textContent = `BDT ${subtotal.toLocaleString('en-IN')}`;
    };

    const clearCart = () => {
        if (confirm('Are you sure you want to clear your cart?')) {
            saveCart([]);
            renderCartItems();
            updateCartBadge();
        }
    };

    const openCheckoutModal = () => {
        if (!checkoutModal) return;
        closeCart();
        populateCheckout();
        checkoutModal.classList.remove('hidden');
        checkoutModal.classList.add('flex');
    };

    const closeCheckoutModal = () => {
        if (!checkoutModal) return;
        checkoutModal.classList.add('hidden');
        checkoutModal.classList.remove('flex');
    };

    const populateCheckout = () => {
        const cart = getCart();
        checkoutItemList.innerHTML = '';
        cart.forEach(item => {
            const li = document.createElement('li');
            li.className = 'flex justify-between text-sm';
            li.innerHTML = `<span>${item.name} (${item.size || 'N/A'}) x ${item.quantity}</span> <span>BDT ${(item.price * item.quantity).toLocaleString('en-IN')}</span>`;
            checkoutItemList.appendChild(li);
        });

        const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
        const deliveryLocation = document.querySelector('input[name="delivery_location"]:checked');
        const deliveryCharge = deliveryLocation && deliveryLocation.value === 'inside' ? 80 : 150;
        
        checkoutSubtotalAmount.textContent = `BDT ${subtotal.toLocaleString('en-IN')}`;
        checkoutDeliveryAmount.textContent = `BDT ${deliveryCharge.toLocaleString('en-IN')}`;
        checkoutTotalAmount.textContent = `BDT ${(subtotal + deliveryCharge).toLocaleString('en-IN')}`;
    };

    const showOrderConfirmationModal = () => {
        if (!orderConfirmationModal) return;
        switchLanguage(currentLang);
        orderConfirmationModal.classList.remove('hidden');
        orderConfirmationModal.classList.add('flex');
    };

    const hideOrderConfirmationModal = () => {
        if (!orderConfirmationModal) return;
        orderConfirmationModal.classList.add('hidden');
        orderConfirmationModal.classList.remove('flex');
    };

    // --- Product Display Logic (No changes here) ---
    const getBasePriceInfo = (product) => {
        let minPriceInfo = null;
        if (!product || !product.prices) return null;
        Object.entries(product.prices).forEach(([size, priceData]) => {
            if (size === '7ml') return;
            if (typeof priceData === 'object' && priceData.offer) {
                if (!minPriceInfo || priceData.offer < minPriceInfo.offer) {
                    minPriceInfo = { offer: priceData.offer, regular: priceData.regular };
                }
            }
        });
        return minPriceInfo;
    };

    const renderProducts = (products) => {
        if (!productGrid) return;
        productGrid.innerHTML = '';
        products.forEach(product => {
            const basePriceInfo = getBasePriceInfo(product);
            const card = document.createElement('div');
            card.className = 'bg-white rounded-lg shadow-md overflow-hidden transform hover:-translate-y-2 transition-transform duration-300 cursor-pointer';
            
            card.addEventListener('click', () => {
                window.location.href = `product.html?id=${product.id}`;
            });
            
            let priceText = `<p class="mt-2 font-bold">${langData[currentLang].price_tba || 'Price TBA'}</p>`;
            if (basePriceInfo) {
                priceText = `
                    <div class="mt-2 flex items-baseline gap-2 justify-center sm:justify-start">
                        <p class="text-sylflora-green font-bold text-lg">BDT ${basePriceInfo.offer.toLocaleString('en-IN')}</p>
                        <p class="text-red-500 text-sm line-through">BDT ${basePriceInfo.regular.toLocaleString('en-IN')}</p>
                    </div>`;
            } else {
                 priceText = `<p class="mt-2 font-bold text-sylflora-green">Details inside</p>`;
            }

            card.innerHTML = `
                <img src="${product.images[0]}" alt="${product.name}" class="w-full aspect-square object-cover">
                <div class="p-4 text-center sm:text-left">
                    <h3 class="text-lg font-bold text-sylflora-green truncate">${product.name}</h3>
                    ${priceText}
                </div>`;
            productGrid.appendChild(card);
        });
    };

    // --- *** আপডেট করা প্রোডাক্ট ডিসপ্লে ফাংশন *** ---
    const updateDisplayedProducts = () => {
        if (!productGrid) return;
        const searchTerm = searchInput.value.toLowerCase().trim();
        
        // পুরাতন DOM রিডিং এর বদলে স্টেট ভ্যারিয়েবল ব্যবহার করা হচ্ছে
        let filteredProducts = productData.filter(p => p.name.toLowerCase().includes(searchTerm));
        
        if (activeFilter !== 'all') {
            filteredProducts = filteredProducts.filter(p => p.gender === activeFilter || (activeFilter === 'Female' && p.gender === 'Women'));
        }
        
        if (sortValue === 'price-asc') {
            filteredProducts.sort((a, b) => (getBasePriceInfo(a)?.offer || Infinity) - (getBasePriceInfo(b)?.offer || Infinity));
        } else if (sortValue === 'price-desc') {
            filteredProducts.sort((a, b) => (getBasePriceInfo(b)?.offer || -Infinity) - (getBasePriceInfo(a)?.offer || -Infinity));
        }
        
        renderProducts(filteredProducts);
    };

    // --- *** নতুন Event Listeners *** ---
    if (productGrid) {
        // সার্চ ইনপুটের জন্য লিসেনার
        searchInput.addEventListener('input', updateDisplayedProducts);

        // --- ড্রপডাউন মেনু খোলার এবং বন্ধ করার জন্য লজিক ---
        filterMenuButton.addEventListener('click', (event) => {
            event.stopPropagation();
            filterOptions.classList.toggle('hidden');
            sortOptions.classList.add('hidden'); // অন্য মেনু বন্ধ করুন
        });

        sortMenuButton.addEventListener('click', (event) => {
            event.stopPropagation();
            sortOptions.classList.toggle('hidden');
            filterOptions.classList.add('hidden'); // অন্য মেনু বন্ধ করুন
        });

        // বাইরে ক্লিক করলে মেনু বন্ধ করার জন্য
        document.addEventListener('click', (event) => {
            if (filterContainer && !filterContainer.contains(event.target)) {
                filterOptions.classList.add('hidden');
            }
            if (sortContainer && !sortContainer.contains(event.target)) {
                sortOptions.classList.add('hidden');
            }
        });

        // --- ফিল্টার বাটনগুলোর জন্য নতুন লিসেনার ---
        if (filterOptions) {
            filterOptions.addEventListener('click', (e) => {
                const target = e.target.closest('.filter-btn');
                if (!target) return;

                activeFilter = target.dataset.filter; // ফিল্টার স্টেট আপডেট করুন
                updateDisplayedProducts(); // প্রোডাক্ট লিস্ট আপডেট করুন
                filterOptions.classList.add('hidden'); // মেনু বন্ধ করুন

                // (Optional) Active button style
                filterOptions.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('bg-gray-200', 'font-bold'));
                target.classList.add('bg-gray-200', 'font-bold');
            });
        }
        
        // --- সর্ট লিঙ্কগুলোর জন্য নতুন লিসেনার ---
        if (sortOptions) {
            sortOptions.addEventListener('click', (e) => {
                const target = e.target.closest('.sort-link');
                if (!target) return;

                e.preventDefault();
                sortValue = target.dataset.value; // সর্ট স্টেট আপডেট করুন
                updateDisplayedProducts(); // প্রোডাক্ট লিস্ট আপডেট করুন
                sortOptions.classList.add('hidden'); // মেনু বন্ধ করুন
                
                // (Optional) Active link style
                sortOptions.querySelectorAll('.sort-link').forEach(link => link.classList.remove('bg-gray-200', 'font-bold'));
                target.classList.add('bg-gray-200', 'font-bold');
            });
        }


        // --- কার্ট এবং চেকআউটের জন্য পুরোনো লিসেনারগুলো অপরিবর্তিত ---
        const cartButton = getEl('cart-button');
        if (cartButton && cartModal) {
            cartButton.addEventListener('click', openCart);
        }
        
        if (closeCartBtn) closeCartBtn.addEventListener('click', closeCart);
        if (cartBg) cartBg.addEventListener('click', closeCart);
        if (clearCartBtn) clearCartBtn.addEventListener('click', clearCart);
        if (checkoutBtn) checkoutBtn.addEventListener('click', openCheckoutModal);
        if (closeCheckoutModalBtn) closeCheckoutModalBtn.addEventListener('click', closeCheckoutModal);

        if (cartItemsContainer) {
            cartItemsContainer.addEventListener('click', e => {
                if (e.target.classList.contains('remove-item-btn')) {
                    const cartItemId = e.target.dataset.id;
                    let cart = getCart();
                    cart = cart.filter(item => item.cartItemId !== cartItemId);
                    saveCart(cart);
                    renderCartItems();
                    updateCartBadge();
                }
            });
        }
        
        if (checkoutForm) {
            checkoutForm.addEventListener('change', e => {
                if (e.target.name === 'delivery_location') populateCheckout();
            });
            checkoutForm.addEventListener('submit', e => {
                e.preventDefault();
                const phoneInput = getEl('checkout-phone-input');
                const phoneValue = phoneInput.value.trim();
                if (phoneValue.length !== 11 || !phoneValue.startsWith('01')) {
                    alert('বাংলাদেশী মোবাইল নম্বর ১১ ডিজিটের দিন, যেমন : 01#########');
                    return;
                }
                saveCart([]);
                closeCheckoutModal();
                renderCartItems();
                updateCartBadge();
                showOrderConfirmationModal();
            });
        }
        
        if (orderConfirmationOverlay) orderConfirmationOverlay.addEventListener('click', hideOrderConfirmationModal);
        if (orderConfirmationBtn) orderConfirmationBtn.addEventListener('click', hideOrderConfirmationModal);
    }

    // --- Initialization for Shop Page ---
    if (productGrid) {
        updateDisplayedProducts();
        const urlParams = new URLSearchParams(window.location.search);
        if (urlParams.get('openCart') === 'true') {
            openCart();
        }
    }
});
