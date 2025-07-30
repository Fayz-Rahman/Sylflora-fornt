<!DOCTYPE html>
<html lang="bn" class="scroll-smooth">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title data-lang-key="title">Sylflora | Luxury Perfume Shop</title>

    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&family=Hind+Siliguri:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="./css/style.css">
</head>

<body class="font-bangla">

    <?php include 'header.php'; ?>


    <section id="hero" class="h-[25vh] md:h-[70vh] bg-cover bg-center bg-no-repeat flex items-center justify-center text-center text-white" style="background-image: url('https://placehold.co/1920x1080/023020/F5F5F5?text=Sylflora');">
        <div class="bg-black bg-opacity-40 p-4 md:p-8 rounded-lg">
            <h1 class="text-2xl md:text-6xl font-bold uppercase tracking-widest font-english">SYLFLORA</h1>
            <p class="text-sm md:text-2xl mt-2 md:mt-4 font-light" data-lang-key="hero_subtitle">
                লাক্সারি পারফিউম শপ
            </p>
        </div>
    </section>

    <section id="test-kit-promo" class="bg-white py-12 md:py-16 text-center">
        <div class="container mx-auto px-4 sm:px-6 lg:px-8">
            <h2 class="text-3xl md:text-4xl font-bold text-sylflora-green" data-lang-key="kit_title">Create Your Own 7ml Test Kit</h2>
            <p class="mt-4 text-lg text-gray-600 max-w-3xl mx-auto" data-lang-key="kit_subtitle">Select a minimum of 5 perfumes to create your personalized 7ml sample kit.</p>
            <a href="kit.php" class="mt-8 inline-block bg-sylflora-gold text-sylflora-green font-bold py-4 px-8 rounded-full text-lg hover:opacity-90 transition duration-300" data-lang-key="kit_button">Create Your Kit</a>
        </div>
    </section>

    <section id="shop" class="py-12 md:py-16">
        <div class="container mx-auto px-4 sm:px-6 lg:px-8">

            <div class="text-center mb-8">
                <h2 class="text-2xl md:text-3xl font-bold text-sylflora-green" data-lang-key="shop_title">Our Collection</h2>
                <p class="mt-2 text-base text-gray-500" data-lang-key="shop_subtitle">Discover your signature scent from our curated collection of luxury perfumes.</p>
            </div>

            <div class="mb-10">
                <div class="flex items-center gap-2 p-2 border border-gray-200 rounded-full bg-white shadow-sm focus-within:ring-2 focus-within:ring-sylflora-gold transition-all duration-300">
                    <div class="flex-grow flex items-center pl-2">
                        <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                        </svg>
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


    <footer class="bg-sylflora-green text-sylflora-offwhite py-8">
        <div class="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <p>&copy; 2025 Sylflora. All Rights Reserved.</p>
        </div>
    </footer>

    <?php include 'bottom-nav.php'; ?>
    <script src="./js/data.js"></script>
    <script src="./js/global.js"></script>
    <script src="./js/shop.js"></script>

</body>

</html>