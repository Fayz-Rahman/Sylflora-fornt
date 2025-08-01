<!DOCTYPE html>
<html lang="bn" class="scroll-smooth">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Shop - Sylflora</title>

    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&family=Hind+Siliguri:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="./css/style.css">
</head>
<body class="font-bangla">

    <?php include 'header.php'; ?>

    <main>
        <section id="shop" class="py-12 md:py-16">
            <div class="container mx-auto px-4 sm:px-6 lg:px-8">



<!--



                <div class="mb-10 p-4 border rounded-lg bg-white shadow-sm space-y-4">
                    <div class="flex items-center gap-4">
                        <div class="relative w-4/5">
                            <span class="absolute inset-y-0 left-0 flex items-center pl-3">
                                <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                            </span>
                            <input type="text" id="search-input" class="w-full p-2 pl-10 rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-sylflora-gold" data-lang-placeholder-key="search_placeholder">
                        </div>
                        <select id="sort-select" class="w-1/5 border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-sylflora-gold text-sm">
                            <option value="default" data-lang-key="sort_default">Sort By</option>
                            <option value="price-asc" data-lang-key="sort_price_asc">Price: Low to High</option>
                            <option value="price-desc" data-lang-key="sort_price_desc">Price: High to Low</option>
                        </select>
                    </div>
                    <div id="filter-buttons" class="flex items-center gap-2 flex-wrap justify-center pt-2 border-t border-gray-100">
                        <button class="filter-btn bg-sylflora-green text-sylflora-offwhite py-1 px-3 rounded-full text-sm" data-filter="all" data-lang-key="filter_all">All</button>
                        <button class="filter-btn py-1 px-3 rounded-full border border-gray-300 text-sm" data-filter="Male" data-lang-key="filter_men">For Men</button>
                        <button class="filter-btn py-1 px-3 rounded-full border border-gray-300 text-sm" data-filter="Female" data-lang-key="filter_women">For Women</button>
                        <button class="filter-btn py-1 px-3 rounded-full border border-gray-300 text-sm" data-filter="Unisex" data-lang-key="filter_unisex">Unisex</button>
                    </div>
                </div>
                
                -->
                
                

<div class="mb-10">
    <div class="flex items-center gap-2 p-2 border border-gray-200 rounded-full bg-white shadow-sm focus-within:ring-2 focus-within:ring-sylflora-gold transition-all duration-300">
        <div class="flex-grow flex items-center pl-2">
            <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
            <input type="text" id="search-input" class="w-full p-2 bg-transparent focus:outline-none text-gray-700" data-lang-placeholder-key="search_placeholder" placeholder="Search for perfumes...">
        </div>

        <div class="relative" id="filter-container">
            <button id="filter-menu-button" class="flex items-center gap-1 p-2 rounded-full hover:bg-gray-100 transition">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2a1 1 0 01-.293.707L16 11.414V16a1 1 0 01-.293.707l-2 2A1 1 0 0113 18v-2.586l-4.707-4.707A1 1 0 018 10V4z" />
                </svg>
                <span class="text-sm font-medium text-gray-700 hidden sm:block" data-lang-key="filter_title">Filter</span>
            </button>
            <div id="filter-options" class="hidden absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10 border">
                <button class="filter-btn block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" data-filter="all" data-lang-key="filter_all">All</button>
                <button class="filter-btn block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" data-filter="Male" data-lang-key="filter_men">For Men</button>
                <button class="filter-btn block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" data-filter="Female" data-lang-key="filter_women">For Women</button>
                <button class="filter-btn block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" data-filter="Unisex" data-lang-key="filter_unisex">Unisex</button>
            </div>
        </div>

        <div class="h-6 border-l border-gray-200"></div>
        
        <div class="relative" id="sort-container">
            <button id="sort-menu-button" class="flex items-center gap-1 p-2 rounded-full hover:bg-gray-100 transition">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M3 4h13M3 8h9M3 12h9m-9 4h9m5-4v.01M19 12v.01M19 16v.01M21 12a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                 <span class="text-sm font-medium text-gray-700 hidden sm:block" data-lang-key="sort_title">Sort</span>
            </button>
            <div id="sort-options" class="hidden absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10 border">
                <a href="#" class="sort-link block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" data-value="default" data-lang-key="sort_default">Default</a>
                <a href="#" class="sort-link block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" data-value="price-asc" data-lang-key="sort_price_asc">Price: Low to High</a>
                <a href="#" class="sort-link block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" data-value="price-desc" data-lang-key="sort_price_desc">Price: High to Low</a>
            </div>
        </div>
    </div>
</div>



                
                
                

                <div id="product-grid" class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8"></div>
            </div>
        </section>
    </main>
    
    <footer class="bg-sylflora-green text-sylflora-offwhite py-8">
        <div class="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <p>&copy; 2025 Sylflora. All Rights Reserved.</p>
        </div>
    </footer>
    
    <div id="cart-modal" class="fixed inset-0 z-[70] overflow-hidden hidden">
        <div id="cart-bg" class="absolute inset-0  bg-opacity-50 transition-opacity"></div>
        <div id="cart-panel" class="absolute inset-y-0 right-0 max-w-full flex transition-transform duration-300 ease-in-out cart-slide-out">
            <div class="w-screen max-w-md">
                <div class="h-full flex flex-col bg-white shadow-xl">
                    <div class="flex-1 overflow-y-auto">
                        <div class="p-6">
                            <div class="flex items-start justify-between">
                                <h2 class="text-2xl font-bold text-sylflora-green" data-lang-key="cart_title">Shopping Cart</h2>
                                <button id="close-cart-btn" class="text-gray-500 hover:text-gray-800"><svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg></button>
                            </div>
                        </div>
                        <div id="cart-items" class="border-t border-gray-200 px-6 py-4"></div>
                    </div>
                    <div class="border-t border-gray-200 py-6 px-4 sm:px-6">
                        <div class="flex justify-between text-lg font-medium text-gray-900">
                            <p data-lang-key="cart_subtotal">Subtotal</p>
                            <p id="cart-subtotal"></p>
                        </div>
                        <div class="mt-6 space-y-3">
                            <button id="checkout-btn" class="cursor-pointer w-full flex items-center justify-center rounded-md border border-transparent bg-sylflora-green px-6 py-3 text-base font-medium text-white shadow-sm hover:opacity-90" data-lang-key="cart_checkout">Checkout</button>
                            <button id="clear-cart-btn" class="cursor-pointer w-full flex items-center justify-center rounded-md border border-red-500 px-6 py-3 text-base font-medium text-red-500 shadow-sm hover:bg-red-500 hover:text-white" data-lang-key="cart_clear">Clear Cart</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div id="checkout-modal" class="fixed inset-0 z-[80] modal-bg items-center justify-center hidden">
        <div class="bg-white rounded-lg shadow-2xl w-11/12 md:w-3/4 lg:w-1/2 max-h-[90vh] overflow-y-auto relative">
            <button id="close-checkout-modal" class="absolute top-4 right-4 text-gray-500 hover:text-gray-800"><svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg></button>
            <div class="p-6 md:p-10">
                <h2 class="text-2xl md:text-3xl font-bold text-sylflora-green mb-6" data-lang-key="checkout_title">Confirm Order</h2>
                <div class="grid md:grid-cols-2 gap-8">
                    <div>
                        <h3 class="text-xl font-semibold mb-4" data-lang-key="checkout_summary_title">Order Summary</h3>
                        <div id="checkout-item-list" class="space-y-3 max-h-48 overflow-y-auto pr-2"></div>
                        <div class="mt-4 border-t pt-4 space-y-2">
                            <div class="flex justify-between"><span data-lang-key="checkout_subtotal">Subtotal:</span><span id="checkout-subtotal-amount"></span></div>
                            <div class="flex justify-between"><span data-lang-key="checkout_delivery">Delivery Charge:</span><span id="checkout-delivery-amount"></span></div>
                            <div class="flex justify-between font-bold text-lg"><span data-lang-key="checkout_total">Total:</span><span id="checkout-total-amount"></span></div>
                        </div>
                    </div>
                    <div>
                        <h3 class="text-xl font-semibold mb-4" data-lang-key="checkout_details_title">Your Details</h3>
                        <form id="checkout-form" class="space-y-4">
                            <input type="text" name="name" required class="w-full p-3 rounded-lg border" data-lang-placeholder-key="checkout_form_name" placeholder="Your Name">
                            <input type="tel" name="phone" id="checkout-phone-input" required class="w-full p-3 rounded-lg border" data-lang-placeholder-key="checkout_form_phone" placeholder="Your Mobile Number* (11 Digits)">
                            <textarea name="address" required rows="4" class="w-full p-3 rounded-lg border" data-lang-placeholder-key="checkout_form_address" placeholder="Your Full Address..."></textarea>
                            <div class="space-y-2">
                                <label class="font-semibold" data-lang-key="checkout_delivery_location">Delivery Location</label>
                                <div class="flex gap-4">
                                    <label class="flex items-center"><input type="radio" name="delivery_location" value="inside" class="mr-2" checked><span data-lang-key="checkout_inside_dhaka">Inside Dhaka</span></label>
                                    <label class="flex items-center"><input type="radio" name="delivery_location" value="outside" class="mr-2"><span data-lang-key="checkout_outside_dhaka">Outside Dhaka</span></label>
                                </div>
                            </div>
                            <div class="mt-6 border-t pt-4">
                                <h4 class="font-semibold mb-2" data-lang-key="checkout_payment_method">Payment Method</h4>
                                <div class="p-4 bg-gray-100 rounded-lg">
                                    <p class="font-bold" data-lang-key="checkout_cod">Cash on Delivery</p>
                                    <p class="text-sm text-gray-600" data-lang-key="checkout_delivery_time">Delivery Time: 1-3 days in Dhaka, 3-5 days outside Dhaka.</p>
                                </div>
                            </div>
                            <button type="submit" class="w-full mt-4 bg-sylflora-green text-sylflora-offwhite font-bold py-4 rounded-full text-lg hover:opacity-90 transition" data-lang-key="checkout_confirm_order">Confirm Order (COD)</button>
                            <div class="text-center pt-4">
                                <p class="text-sm text-gray-600" data-lang-key="checkout_facebook_help">
                                    যেকোনো সাহায্যের জন্য মেসেজ করুন, আমাদের <a href="https://www.facebook.com/sylflora.official" target="_blank" class="text-blue-600 font-bold hover:underline">Facebook পেজে</a>।
                                </p>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div id="order-confirmation-modal" class="fixed inset-0 z-[90] modal-bg items-center justify-center hidden">
        <div id="order-confirmation-overlay" class="absolute inset-0"></div>
        <div class="bg-white rounded-lg shadow-2xl w-11/12 max-w-md text-center p-6 md:p-8 relative">
            <div class="flex justify-center mb-4">
                <div class="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                    <svg class="w-10 h-10 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                </div>
            </div>
            <h2 class="text-2xl font-bold text-sylflora-green mb-3" data-lang-key="order_placed_title"></h2>
            <div class="text-gray-600 space-y-2 text-base">
                <p data-lang-key="order_placed_p1"></p>
                <p data-lang-key="order_placed_p2"></p>
                <p data-lang-key="order_placed_p3"></p>
            </div>
            <button id="order-confirmation-btn" class="w-full mt-6 bg-sylflora-green text-white font-bold py-3 px-6 rounded-full" data-lang-key="order_placed_button"></button>
        </div>
    </div>
    
    <div id="confirm-clear-modal" class="fixed inset-0 z-[100] modal-bg items-center justify-center hidden">
        <div id="confirm-clear-overlay" class="absolute inset-0"></div>
        <div class="bg-white rounded-lg shadow-2xl w-11/12 max-w-sm text-center p-6 md:p-8 relative">
            <div class="flex justify-center mb-4">
                <div class="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
                    <svg class="w-10 h-10 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg>
                </div>
            </div>
            <h2 class="text-xl font-bold text-gray-800 mb-2" data-lang-key="confirm_clear_title"></h2>
            <p class="mb-6 text-gray-600" data-lang-key="confirm_clear_message"></p>
            <div class="flex justify-center gap-4">
                <button id="confirm-clear-no-btn" class="cursor-pointer w-full border-2 border-gray-400 text-gray-600 font-bold py-2.5 px-6 rounded-full" data-lang-key="confirm_clear_no"></button>
                <button id="confirm-clear-yes-btn" class="cursor-pointer w-full bg-red-500 text-white font-bold py-2.5 px-6 rounded-full" data-lang-key="confirm_clear_yes"></button>
            </div>
        </div>
    </div>
    

    <?php include 'bottom-nav.php'; ?>
    <script src="./js/data.js"></script>
    <script src="./js/global.js"></script>
    <script src="./js/shop.js"></script>
</body>
</html>