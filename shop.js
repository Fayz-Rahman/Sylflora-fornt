document.addEventListener('DOMContentLoaded', () => {
    if (!window.sylflora) {
        console.error("Sylflora global object not found. Ensure global.js is loaded first.");
        return;
    }
    
    const { getCart, saveCart, updateCartBadge, switchLanguage, getEl, currentLang, langData, productData } = window.sylflora;

    // --- DOM Elements for Shop Page ---
    const productGrid = getEl('product-grid');
    const searchInput = getEl('search-input');
    const filterMenuButton = getEl('filter-menu-button');
    const filterOptions = getEl('filter-options');
    const sortMenuButton = getEl('sort-menu-button');
    const sortOptions = getEl('sort-options');
    const filterContainer = getEl('filter-container');
    const sortContainer = getEl('sort-container');
    
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

    // নতুন: কনফার্মেশন মোডালের জন্য এলিমেন্ট
    const confirmClearModal = getEl('confirm-clear-modal');
    const confirmClearOverlay = getEl('confirm-clear-overlay');
    const confirmClearYesBtn = getEl('confirm-clear-yes-btn');
    const confirmClearNoBtn = getEl('confirm-clear-no-btn');

    // --- ফিল্টার এবং সর্টিং এর স্টেট সংরক্ষণের জন্য ভ্যারিয়েবল ---
    let activeFilter = 'all';
    let sortValue = 'default';

    // --- নতুন: কনফার্মেশন মোডাল দেখানোর এবং লুকানোর ফাংশন ---
    const showConfirmClearModal = () => {
        if (!confirmClearModal) return;
        switchLanguage(currentLang);
        confirmClearModal.classList.remove('hidden');
        confirmClearModal.classList.add('flex');
    };

    const hideConfirmClearModal = () => {
        if (!confirmClearModal) return;
        confirmClearModal.classList.add('hidden');
        confirmClearModal.classList.remove('flex');
    };

    // --- পণ্যের পরিমাণ আপডেট করার জন্য ফাংশন ---
    const updateCartItemQuantity = (cartItemId, action) => {
        let cart = getCart();
        const itemIndex = cart.findIndex(item => item.cartItemId === cartItemId);

        if (itemIndex > -1) {
            if (action === 'increase') {
                cart[itemIndex].quantity++;
            } else if (action === 'decrease') {
                if (cart[itemIndex].isKit && cart[itemIndex].quantity <= 1) {
                    return; 
                }
                cart[itemIndex].quantity--;
            }
            if (cart[itemIndex].quantity <= 0) {
                cart.splice(itemIndex, 1);
            }
        }
        saveCart(cart);
        renderCartItems();
        updateCartBadge();
    };

    // --- Cart & Checkout Logic ---
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
        if (!cartItemsContainer) return;
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
                itemEl.className = 'py-4 border-b last:border-b-0';
                
                let itemDetailsHTML = '';

                if (item.isKit) {
                    itemDetailsHTML = `
                        <div class="flex items-start justify-between">
                            <div class="flex items-start gap-4">
                                <img src="${item.image}" alt="${item.name}" class="w-16 h-16 object-cover rounded-md">
                                <div>
                                    <p class="font-semibold">${item.name}</p>
                                    <p class="text-sm text-gray-500">${item.size}</p>
                                    <p class="font-bold text-sylflora-green mt-1">BDT ${(item.price * item.quantity).toLocaleString('en-IN')}</p>
                                </div>
                            </div>
                            <button class="remove-item-btn text-red-500 hover:text-red-700 text-2xl" data-id="${item.cartItemId}">&times;</button>
                        </div>
                        <div class="mt-3 pl-4 sm:pl-20">
                            <p class="font-medium text-sm mb-1">Included Perfumes:</p>
                            <ul class="list-disc list-inside text-sm text-gray-600 space-y-1">
                                ${item.items.map(perfume => `<li>${perfume}</li>`).join('')}
                            </ul>
                            <div class="flex items-center gap-4 mt-3">
                                <span class="text-sm font-medium">Quantity:</span>
                                <button class="quantity-btn h-6 w-6 flex items-center justify-center bg-gray-200 rounded-full text-lg font-bold" data-id="${item.cartItemId}" data-action="decrease">-</button>
                                <span class="font-semibold">${item.quantity}</span>
                                <button class="quantity-btn h-6 w-6 flex items-center justify-center bg-gray-200 rounded-full text-lg font-bold" data-id="${item.cartItemId}" data-action="increase">+</button>
                            </div>
                        </div>
                    `;
                } else {
                    itemDetailsHTML = `
                        <div class="flex items-center justify-between">
                            <div class="flex items-center gap-4 flex-1">
                                <img src="${item.image}" alt="${item.name}" class="w-16 h-16 object-cover rounded-md">
                                <div class="flex-1 min-w-0">
                                    <p class="font-semibold truncate">${item.name}</p>
                                    <p class="text-sm text-gray-500">${item.size ? item.size : ''}</p>
                                    <div class="flex items-center gap-3 mt-2">
                                        <button class="quantity-btn h-6 w-6 flex items-center justify-center bg-gray-200 rounded-full text-lg font-bold" data-id="${item.cartItemId}" data-action="decrease">-</button>
                                        <span class="font-semibold">${item.quantity}</span>
                                        <button class="quantity-btn h-6 w-6 flex items-center justify-center bg-gray-200 rounded-full text-lg font-bold" data-id="${item.cartItemId}" data-action="increase">+</button>
                                    </div>
                                </div>
                            </div>
                            <div class="text-right ml-2">
                                <p class="font-bold text-sylflora-green">BDT ${(item.price * item.quantity).toLocaleString('en-IN')}</p>
                                <button class="remove-item-btn text-red-500 hover:text-red-700 text-sm mt-1" data-id="${item.cartItemId}">Remove</button>
                            </div>
                        </div>
                    `;
                }

                itemEl.innerHTML = itemDetailsHTML;
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

    // আপডেটেড: clearCart ফাংশন এখন কাস্টম মোডাল খুলবে
    const clearCart = () => {
        showConfirmClearModal();
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

    // আপডেটেড: populateCheckout ফাংশনে এখন কিটের বিস্তারিত বিবরণ দেখা যাবে
    const populateCheckout = () => {
        const cart = getCart();
        checkoutItemList.innerHTML = '';
        cart.forEach(item => {
            const li = document.createElement('div');
            li.className = 'text-sm mb-3';
            
            let itemHTML = '';
            
            if (item.isKit && item.items) {
                const kitDetails = `<ul class="list-disc list-inside text-xs text-gray-500 pl-4 mt-1">
                    ${item.items.map(perfume => `<li>${perfume}</li>`).join('')}
                </ul>`;
                itemHTML = `<div>
                    <div class="flex justify-between">
                        <span class="font-medium">${item.name} x ${item.quantity}</span>
                        <span class="font-medium">BDT ${(item.price * item.quantity).toLocaleString('en-IN')}</span>
                    </div>
                    ${kitDetails}
                </div>`;
            } else {
                itemHTML = `<div class="flex justify-between">
                    <span>${item.name} (${item.size || 'N/A'}) x ${item.quantity}</span>
                    <span>BDT ${(item.price * item.quantity).toLocaleString('en-IN')}</span>
                </div>`;
            }
            
            li.innerHTML = itemHTML;
            checkoutItemList.appendChild(li);
        });

        const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
        const deliveryLocation = document.querySelector('input[name="delivery_location"]:checked');
        const deliveryCharge = deliveryLocation && deliveryLocation.value === 'inside' ? 80 : 130;
        
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

    // --- Product Display Logic ---
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
                window.location.href = `product.php?id=${product.id}`;
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

    const updateDisplayedProducts = () => {
        if (!productGrid) return;
        const searchTerm = searchInput.value.toLowerCase().trim();
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

    // --- Event Listeners on Shop Page ---
    if (productGrid || getEl('cart-modal')) {
        if(searchInput) searchInput.addEventListener('input', updateDisplayedProducts);

        if(filterMenuButton) filterMenuButton.addEventListener('click', (event) => {
            event.stopPropagation();
            filterOptions.classList.toggle('hidden');
            if(sortOptions) sortOptions.classList.add('hidden');
        });

        if(sortMenuButton) sortMenuButton.addEventListener('click', (event) => {
            event.stopPropagation();
            sortOptions.classList.toggle('hidden');
            if(filterOptions) filterOptions.classList.add('hidden');
        });

        document.addEventListener('click', (event) => {
            if (filterContainer && !filterContainer.contains(event.target)) {
                if(filterOptions) filterOptions.classList.add('hidden');
            }
            if (sortContainer && !sortContainer.contains(event.target)) {
                if(sortOptions) sortOptions.classList.add('hidden');
            }
        });

        if (filterOptions) {
            filterOptions.addEventListener('click', (e) => {
                const target = e.target.closest('.filter-btn');
                if (!target) return;
                activeFilter = target.dataset.filter;
                updateDisplayedProducts();
                filterOptions.classList.add('hidden');
                filterOptions.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('bg-gray-200', 'font-bold'));
                target.classList.add('bg-gray-200', 'font-bold');
            });
        }
        
        if (sortOptions) {
            sortOptions.addEventListener('click', (e) => {
                const target = e.target.closest('.sort-link');
                if (!target) return;
                e.preventDefault();
                sortValue = target.dataset.value;
                updateDisplayedProducts();
                sortOptions.classList.add('hidden');
                sortOptions.querySelectorAll('.sort-link').forEach(link => link.classList.remove('bg-gray-200', 'font-bold'));
                target.classList.add('bg-gray-200', 'font-bold');
            });
        }

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
                const target = e.target;
                if (target.closest('.remove-item-btn')) {
                    const cartItemId = target.closest('.remove-item-btn').dataset.id;
                    let cart = getCart();
                    cart = cart.filter(item => item.cartItemId !== cartItemId);
                    saveCart(cart);
                    renderCartItems();
                    updateCartBadge();
                }
                if (target.closest('.quantity-btn')) {
                    const button = target.closest('.quantity-btn');
                    const cartItemId = button.dataset.id;
                    const action = button.dataset.action;
                    updateCartItemQuantity(cartItemId, action);
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

        // নতুন: কনফার্মেশন মোডালের জন্য ইভেন্ট লিসেনার
        if (confirmClearOverlay) confirmClearOverlay.addEventListener('click', hideConfirmClearModal);
        if (confirmClearNoBtn) confirmClearNoBtn.addEventListener('click', hideConfirmClearModal);
        if (confirmClearYesBtn) confirmClearYesBtn.addEventListener('click', () => {
            saveCart([]);
            renderCartItems();
            updateCartBadge();
            hideConfirmClearModal();
        });
    }

    // --- Initialization for Shop Page ---
    if (productGrid) {
        updateDisplayedProducts();
    }
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('openCart') === 'true') {
        openCart();
    }
});
