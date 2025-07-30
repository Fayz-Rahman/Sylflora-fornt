document.addEventListener('DOMContentLoaded', () => {
    // === SETUP: Access global objects safely ===
    if (!window.sylflora) {
        console.error('Sylflora global object is not found.');
        return;
    }
    const { getCart, saveCart, updateCartBadge, getEl, langData, productData, currentLang, switchLanguage, showSuccessModal } = window.sylflora;

    // === FUNCTION: Add a "Related Products" section ===
    const renderRelatedProducts = (currentProduct) => {
        const container = getEl('related-products-container');
        if (!container || !productData) return;

        const related = productData.filter(p => p.gender === currentProduct.gender && p.id !== currentProduct.id).slice(0, 4);
        if (related.length === 0) return;

        container.innerHTML = `
            <h2 class="text-2xl md:text-3xl font-bold text-sylflora-green text-center mb-8">Related Products</h2>
            <div class="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
                ${related.map(product => `
                    <a href="product.php?id=${product.id}" class="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden transform hover:-translate-y-1 transition-transform duration-300 block">
                        <img src="${product.images[0]}" alt="${product.name}" class="w-full aspect-square object-cover">
                        <div class="p-3 text-center">
                            <h3 class="text-sm font-bold text-sylflora-green truncate">${product.name}</h3>
                            <p class="text-xs text-gray-500 mt-1">
                                ${product.prices['30ml'] && product.prices['30ml'].offer ? `From BDT ${product.prices['30ml'].offer}` : 'Details inside'}
                            </p>
                        </div>
                    </a>
                `).join('')}
            </div>
        `;
    };

    // === FUNCTION: Add item to cart ===
    const handleAddToCart = (product, size, price) => {
        let cart = getCart();
        const cartItemId = `${product.id}-${size}`;
        const existingItem = cart.find(item => item.cartItemId === cartItemId);

        if (existingItem) {
            existingItem.quantity++;
        } else {
            cart.push({ cartItemId, id: product.id, name: product.name, size, price, quantity: 1, image: product.images[0] });
        }
        saveCart(cart);
        updateCartBadge();
    };

    // === MAIN FUNCTION: Render all product details on the page ===
    const renderProductDetails = (product) => {
        const container = getEl('product-details-container');
        if (!product) {
            container.innerHTML = `<p class="text-center text-red-500">Product not found.</p>`;
            return;
        }

        document.title = `Sylflora | ${product.name}`;
        const genderKey = `gender_${product.gender.toLowerCase().replace('women', 'female')}`;
        const genderText = langData[currentLang][genderKey] || product.gender;

        container.innerHTML = `
            <div class="grid md:grid-cols-2 gap-8 lg:gap-12">
                <div>
                    <img id="main-product-img" src="${product.images[0]}" alt="${product.name}" class="w-full aspect-square object-cover rounded-xl shadow-lg border-2 border-gray-200 mb-4">
                    <div id="thumbnail-gallery" class="flex gap-3 justify-center">
                        ${product.images.map((img, i) => `
                            <img src="${img}" alt="thumbnail ${i+1}" class="w-20 h-20 object-cover rounded-lg cursor-pointer border-4 transition ${i === 0 ? 'border-sylflora-gold' : 'border-transparent hover:border-gray-300'}">
                        `).join('')}
                    </div>
                </div>

                <div class="flex flex-col">
                    <h1 class="text-2xl md:text-4xl font-bold text-sylflora-green">${product.name}</h1>
                    
                    <div class="mt-2">
                        <span class="text-xs font-semibold inline-block py-1 px-3 uppercase rounded-full text-sylflora-green bg-sylflora-gold bg-opacity-80">${genderText}</span>
                    </div>
                    
                    <div class="mt-4">
                        <h3 class="text-base md:text-lg font-semibold text-sylflora-green" data-lang-key="modal_size_title">Select Size</h3>
                        <div class="size-selector flex flex-wrap gap-2 mt-2"></div>
                    </div>
                    
                    <div class="mt-3">
                        <span class="offer-price text-2xl md:text-4xl font-bold text-sylflora-green"></span>
                        <span class="regular-price text-base md:text-xl text-red-500 line-through ml-2"></span>
                    </div>

                    <div class="mt-5 flex flex-col gap-3">
                        <button class="add-to-cart-btn flex items-center justify-center text-center border-2 border-sylflora-gold text-sylflora-gold font-bold py-2.5 px-6 rounded-full text-base transition duration-300 hover:bg-sylflora-gold hover:text-sylflora-green" data-lang-key="modal_add_to_cart">Add to Cart</button>
                        <button class="instant-buy-btn flex items-center justify-center text-center bg-sylflora-gold text-sylflora-green font-bold py-2.5 px-6 rounded-full text-base transition duration-300 hover:opacity-90" data-lang-key="instant_buy">এখনই কিনুন</button>
                    </div>

                    <div class="mt-6 pt-5 border-t space-y-2">
                        <p class="text-gray-600 text-sm mb-4">${product.desc}</p>

                        <details class="group border-b pb-2">
                            <summary class="flex justify-between items-center cursor-pointer list-none py-1">
                                <span class="font-semibold text-gray-800">Longevity</span>
                                <span class="group-open:rotate-45 transform transition-transform text-xl">+</span>
                            </summary>
                            <p class="pt-1 pb-2 text-gray-600 text-sm">${product.longevity}</p>
                        </details>
                        <details class="group border-b pb-2">
                            <summary class="flex justify-between items-center cursor-pointer list-none py-1">
                                <span class="font-semibold text-gray-800">Scent Type</span>
                                <span class="group-open:rotate-45 transform transition-transform text-xl">+</span>
                            </summary>
                            <p class="pt-1 pb-2 text-gray-600 text-sm">${product.scentType}</p>
                        </details>
                        <details class="group border-b pb-2" open>
                            <summary class="flex justify-between items-center cursor-pointer list-none py-1">
                                <span class="font-semibold text-gray-800">Fragrance Notes</span>
                                <span class="group-open:rotate-45 transform transition-transform text-xl">+</span>
                            </summary>
                            <ul class="pt-1 pb-2 text-gray-600 space-y-1 text-sm">
                                <li><strong>Top:</strong> ${product.notes.top}</li>
                                <li><strong>Middle:</strong> ${product.notes.middle}</li>
                                <li><strong>Base:</strong> ${product.notes.base}</li>
                            </ul>
                        </details>
                    </div>
                </div>
            </div>
            
            <div id="related-products-container" class="mt-20 pt-12 border-t border-gray-200"></div>
        `;

        // --- Add Functionality to the new elements ---
        const sizeSelector = container.querySelector('.size-selector');
        let firstAvailableSize = null;

        Object.entries(product.prices).forEach(([size, priceData]) => {
            if (size === '7ml') return; 

            const sizeButton = document.createElement('button');
            sizeButton.className = 'size-btn border-2 border-gray-300 py-1.5 px-4 rounded-full text-sm font-semibold transition hover:border-sylflora-green';
            sizeButton.textContent = size;
            if (!firstAvailableSize) firstAvailableSize = sizeButton;
            
            sizeButton.addEventListener('click', () => {
                sizeSelector.querySelectorAll('.size-btn').forEach(btn => {
                    btn.classList.remove('bg-sylflora-green', 'text-white', 'border-sylflora-green');
                    btn.classList.add('border-gray-300');
                });
                sizeButton.classList.add('bg-sylflora-green', 'text-white', 'border-sylflora-green');
                const price = typeof priceData === 'object' ? priceData : { offer: priceData, regular: null };
                container.querySelector('.offer-price').textContent = `BDT ${price.offer.toLocaleString('en-IN')}`;
                const regularPriceEl = container.querySelector('.regular-price');
                regularPriceEl.textContent = price.regular ? `BDT ${price.regular.toLocaleString('en-IN')}` : '';
            });
            sizeSelector.appendChild(sizeButton);
        });
        if (firstAvailableSize) firstAvailableSize.click();

        container.querySelector('#thumbnail-gallery').addEventListener('click', e => {
            const target = e.target.closest('img');
            if (target) {
                getEl('main-product-img').src = target.src;
                container.querySelectorAll('#thumbnail-gallery img').forEach(img => {
                    img.classList.remove('border-sylflora-gold');
                    img.classList.add('border-transparent');
                });
                target.classList.add('border-sylflora-gold');
            }
        });

        const handleAction = (isInstantBuy) => {
            const selectedSizeEl = sizeSelector.querySelector('.bg-sylflora-green');
            if (selectedSizeEl) {
                const size = selectedSizeEl.textContent;
                const priceInfo = product.prices[size];
                const price = typeof priceInfo === 'object' ? priceInfo.offer : priceInfo;
                handleAddToCart(product, size, price);
                if (isInstantBuy) {
                    window.location.href = 'shop.php?openCart=true';
                } else {
                    // This line is updated to call the new success modal function
                    showSuccessModal(product.name);
                }
            }
        };

        container.querySelector('.add-to-cart-btn').addEventListener('click', () => handleAction(false));
        container.querySelector('.instant-buy-btn').addEventListener('click', () => handleAction(true));
        
        renderRelatedProducts(product);
        if(switchLanguage) switchLanguage(currentLang);
    };

    // --- SCRIPT INITIALIZATION ---
    const urlParams = new URLSearchParams(window.location.search);
    const productId = parseInt(urlParams.get('id'));
    const product = productData ? productData.find(p => p.id === productId) : null;
    
    renderProductDetails(product);
});
