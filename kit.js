document.addEventListener('DOMContentLoaded', () => {
    if (!window.sylflora) {
        console.error("Sylflora global object not found. Ensure global.js is loaded first.");
        return;
    }

    const { getCart, saveCart, updateCartBadge, getEl, langData, productData, currentLang, showSuccessModal } = window.sylflora;

    const kitPerfumeList = getEl('kit-perfume-list');
    const kitSearchInput = getEl('kit-search-input');
    const kitCounter = getEl('kit-counter');
    const addKitToCartBtn = getEl('add-kit-to-cart-btn');

    // নতুন ডেটা কাঠামো: প্রতিটি পণ্যের সাথে তার পরিমাণও সংরক্ষণ করা হবে
    let selectedKitItems = []; // e.g., [{ product: {...}, quantity: 2 }, ...]
    const MIN_TOTAL_SAMPLES = 5;
    const PRICE_PER_SAMPLE = 90;

    // --- নতুন: কিটে পারফিউমের পরিমাণ ম্যানেজ করার জন্য ফাংশন ---
    const updatePerfumeQuantity = (productId, action) => {
        const itemIndex = selectedKitItems.findIndex(item => item.product.id === productId);
        const product = productData.find(p => p.id === productId);

        if (!product) return;

        if (itemIndex === -1 && action === 'increase') { // নতুন আইটেম যোগ করা হচ্ছে
            selectedKitItems.push({ product: product, quantity: 1 });
        } else if (itemIndex > -1) { // বিদ্যমান আইটেমের পরিমাণ আপডেট করা হচ্ছে
            if (action === 'increase') {
                selectedKitItems[itemIndex].quantity++;
            } else if (action === 'decrease') {
                selectedKitItems[itemIndex].quantity--;
                if (selectedKitItems[itemIndex].quantity <= 0) {
                    selectedKitItems.splice(itemIndex, 1); // পরিমাণ ০ হলে তালিকা থেকে মুছে ফেলা হবে
                }
            }
        }
        
        renderKitPerfumeList(kitSearchInput.value);
        updateKitSummary();
    };

    // --- আপডেটেড: পরিমাণ নিয়ন্ত্রণের বাটনসহ পারফিউম লিস্ট রেন্ডার করা ---
    const renderKitPerfumeList = (searchTerm = '') => {
        if (!kitPerfumeList) return;
        const lowerCaseSearchTerm = searchTerm.toLowerCase();
        const filteredProducts = productData.filter(p => p.name.toLowerCase().includes(lowerCaseSearchTerm));
        
        kitPerfumeList.innerHTML = '';
        filteredProducts.forEach(product => {
            const selectedItem = selectedKitItems.find(item => item.product.id === product.id);
            const quantity = selectedItem ? selectedItem.quantity : 0;
            
            const card = document.createElement('div');
            card.className = `border rounded-lg p-3 flex flex-col items-center justify-between transition ${quantity > 0 ? 'border-sylflora-gold bg-yellow-50 scale-105' : 'border-gray-200'}`;
            
            let actionControlHTML = '';
            if (quantity === 0) {
                actionControlHTML = `<button class="kit-action-btn w-full py-2 px-4 rounded-full text-sm font-bold bg-sylflora-green text-white" data-id="${product.id}" data-action="increase">Add</button>`;
            } else {
                actionControlHTML = `
                    <div class="flex items-center justify-center gap-4 w-full">
                        <button class="kit-action-btn h-8 w-8 flex items-center justify-center bg-gray-200 rounded-full text-xl font-bold" data-id="${product.id}" data-action="decrease">-</button>
                        <span class="font-semibold text-lg">${quantity}</span>
                        <button class="kit-action-btn h-8 w-8 flex items-center justify-center bg-gray-200 rounded-full text-xl font-bold" data-id="${product.id}" data-action="increase">+</button>
                    </div>
                `;
            }

            card.innerHTML = `
                <img src="${product.images[0]}" alt="${product.name}" class="w-full aspect-square object-cover rounded-md mb-2">
                <h3 class="font-semibold text-center text-sm mb-1 text-sylflora-green h-10 flex items-center justify-center">${product.name}</h3>
                <p class="text-base font-bold text-sylflora-green mb-2">BDT ${PRICE_PER_SAMPLE}</p>
                <div class="h-10 flex items-center w-full">${actionControlHTML}</div>
            `;
            
            kitPerfumeList.appendChild(card);
        });
    };

    // --- আপডেটেড: মোট স্যাম্পলের সংখ্যা হিসাব করা ---
    const updateKitSummary = () => {
        const totalSamples = selectedKitItems.reduce((sum, item) => sum + item.quantity, 0);
        kitCounter.textContent = `${totalSamples} selected`;
        addKitToCartBtn.disabled = totalSamples < MIN_TOTAL_SAMPLES;
    };
    
    // --- আপডেটেড: কার্টে বিস্তারিত তথ্যসহ কিট যোগ করা ---
    const addKitToCart = () => {
        const totalSamples = selectedKitItems.reduce((sum, item) => sum + item.quantity, 0);
        if (totalSamples < MIN_TOTAL_SAMPLES) return;

        let cart = getCart();
        const kitPrice = totalSamples * PRICE_PER_SAMPLE;
        const kitItemName = `Test Kit (${totalSamples} pcs)`;
        
        const kitItem = {
            cartItemId: `kit-${Date.now()}`,
            name: kitItemName,
            size: '7ml Samples',
            price: kitPrice,
            quantity: 1, // সম্পূর্ণ কিটের পরিমাণ ১ ধরা হচ্ছে
            image: 'https://placehold.co/100x100/023020/F5F5F5?text=Kit',
            isKit: true,
            items: selectedKitItems.map(item => `${item.product.name} (x${item.quantity})`)
        };

        cart.push(kitItem);
        saveCart(cart);
        updateCartBadge();
        
        if (showSuccessModal) {
            showSuccessModal(kitItemName);
        } else {
            alert('Your test kit has been added to the cart!');
        }

        selectedKitItems = [];
        renderKitPerfumeList();
        updateKitSummary();
    };

    // --- আপডেটেড: মূল ইভেন্ট লিসেনার ---
    if (kitPerfumeList) {
        kitPerfumeList.addEventListener('click', e => {
            const target = e.target.closest('.kit-action-btn');
            if (target) {
                const productId = parseInt(target.dataset.id, 10);
                const action = target.dataset.action;
                updatePerfumeQuantity(productId, action);
            }
        });
    }

    if (kitSearchInput) {
        kitSearchInput.addEventListener('input', () => renderKitPerfumeList(kitSearchInput.value));
    }
    
    if (addKitToCartBtn) {
        addKitToCartBtn.addEventListener('click', addKitToCart);
    }

    // Initial Render
    renderKitPerfumeList();
    updateKitSummary();
});
