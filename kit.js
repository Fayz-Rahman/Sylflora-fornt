document.addEventListener('DOMContentLoaded', () => {
    if (!window.sylflora) return;

    const { getCart, saveCart, updateCartBadge, getEl, langData, productData, currentLang, showSuccessModal } = window.sylflora;

    const kitPerfumeList = getEl('kit-perfume-list');
    const kitSearchInput = getEl('kit-search-input');
    const kitCounter = getEl('kit-counter');
    const addKitToCartBtn = getEl('add-kit-to-cart-btn');

    let selectedKitItems = [];
    const MIN_KIT_ITEMS = 5;
    const PRICE_PER_SAMPLE = 90;

    const renderKitPerfumeList = (searchTerm = '') => {
        if (!kitPerfumeList) return;
        const lowerCaseSearchTerm = searchTerm.toLowerCase();
        const filteredProducts = productData.filter(p => p.name.toLowerCase().includes(lowerCaseSearchTerm));
        
        kitPerfumeList.innerHTML = '';
        filteredProducts.forEach(product => {
            const isSelected = selectedKitItems.some(item => item.id === product.id);
            const card = document.createElement('div');
            card.className = `border rounded-lg p-3 flex flex-col items-center justify-between cursor-pointer transition ${isSelected ? 'border-sylflora-gold bg-yellow-50 scale-105' : 'border-gray-200'}`;
            
            card.innerHTML = `
                <img src="${product.images[0]}" alt="${product.name}" class="w-full aspect-square object-cover rounded-md mb-2">
                <h3 class="font-semibold text-center text-sm mb-1 text-sylflora-green">${product.name}</h3>
                <p class="text-base font-bold text-sylflora-green mb-2">BDT ${PRICE_PER_SAMPLE}</p>
                <button class="toggle-kit-item-btn w-full py-2 px-4 rounded-full text-sm font-bold ${isSelected ? 'bg-red-500 text-white' : 'bg-sylflora-green text-white'}">
                    ${isSelected ? 'Remove' : 'Add'}
                </button>
            `;
            
            card.addEventListener('click', (e) => {
                e.preventDefault();
                toggleKitItem(product);
            });
            kitPerfumeList.appendChild(card);
        });
    };

    const toggleKitItem = (product) => {
        const index = selectedKitItems.findIndex(item => item.id === product.id);
        if (index > -1) {
            selectedKitItems.splice(index, 1);
        } else {
            selectedKitItems.push(product);
        }
        renderKitPerfumeList(kitSearchInput.value);
        updateKitSummary();
    };

    const updateKitSummary = () => {
        kitCounter.textContent = `${selectedKitItems.length} selected`;
        addKitToCartBtn.disabled = selectedKitItems.length < MIN_KIT_ITEMS;
    };
    
    const addKitToCart = () => {
        let cart = getCart();
        const kitPrice = selectedKitItems.length * PRICE_PER_SAMPLE;
        const kitItemName = `Test Kit (${selectedKitItems.length} pcs)`;
        const kitItem = {
            cartItemId: `kit-${Date.now()}`,
            name: kitItemName,
            size: '7ml Samples',
            price: kitPrice,
            quantity: 1,
            image: 'https://placehold.co/100x100/023020/F5F5F5?text=Kit',
            isKit: true,
            items: selectedKitItems.map(p => p.name)
        };
        cart.push(kitItem);
        saveCart(cart);
        updateCartBadge();
        
        // This is the updated part
        if (showSuccessModal) {
            showSuccessModal(kitItemName);
        } else {
            alert('Your test kit has been added to the cart!');
        }

        selectedKitItems = [];
        renderKitPerfumeList();
        updateKitSummary();
    };

    // Event Listeners
    kitSearchInput.addEventListener('input', () => renderKitPerfumeList(kitSearchInput.value));
    addKitToCartBtn.addEventListener('click', addKitToCart);

    // Initial Render
    renderKitPerfumeList();
    updateKitSummary();
});
