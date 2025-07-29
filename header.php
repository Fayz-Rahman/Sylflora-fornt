
<header class="bg-sylflora-green text-sylflora-offwhite sticky top-0 z-50 shadow-lg">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between h-20">
            <div class="text-2xl font-bold">
                <a href="index.php" class="flex items-center space-x-2">
                    <span>SYLFLORA</span>
                </a>
            </div>
            <nav class="hidden md:flex items-center space-x-8">
                <a href="shop.php" class="hover:sylflora-gold transition duration-300" data-lang-key="nav_shop">Shop</a>
                <a href="kit.php" class="hover:sylflora-gold transition duration-300" data-lang-key="nav_test_kit">Test Kit</a>
                <a href="about.php" class="hover:sylflora-gold transition duration-300" data-lang-key="nav_about">About</a>
                <a href="contact.php" class="hover:sylflora-gold transition duration-300" data-lang-key="nav_contact">Contact</a>
            </nav>
            <div class="flex items-center space-x-4">
                <button id="cart-button" class="relative p-2">
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>
                    <span id="cart-badge" class="absolute top-0 right-0 bg-sylflora-gold text-sylflora-green text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center hidden">0</span>
                </button>
                <button id="lang-switcher" class="border border-sylflora-gold text-sylflora-gold font-semibold py-2 px-4 rounded-full hover:bg-sylflora-gold hover:text-sylflora-green transition duration-300">English</button>
                <button id="mobile-menu-button" class="md:hidden p-2">
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7"></path></svg>
                </button>
            </div>
        </div>
    </div>
    <div id="mobile-menu" class="hidden md:hidden bg-sylflora-green">
            <a href="shop.php" class="block text-center py-4 text-lg hover:bg-sylflora-gold hover:text-sylflora-green transition duration-300" data-lang-key="nav_shop_mobile">Shop</a>
            <a href="kit.php" class="block text-center py-4 text-lg hover:bg-sylflora-gold hover:text-sylflora-green transition duration-300" data-lang-key="nav_test_kit_mobile">Test Kit</a>
            <a href="about.php" class="block text-center py-4 text-lg hover:bg-sylflora-gold hover:text-sylflora-green transition duration-300" data-lang-key="nav_about_mobile">About</a>
            <a href="contact.php" class="block text-center py-4 text-lg hover:bg-sylflora-gold hover:text-sylflora-green transition duration-300" data-lang-key="nav_contact_mobile">Contact</a>
    </div>
</header>