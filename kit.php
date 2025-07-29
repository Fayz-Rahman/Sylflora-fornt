<!DOCTYPE html>
<html lang="bn" class="scroll-smooth">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Create Your Test Kit - Sylflora</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&family=Hind+Siliguri:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="style.css">
</head>
<body class="font-bangla">

    <?php include 'header.php'; ?>

    <main class="py-16 md:py-24">
        <div class="container mx-auto px-4 sm:px-6 lg:px-8">
            <div class="text-center mb-12">
                <h2 class="text-3xl md:text-4xl font-bold text-sylflora-green" data-lang-key="kit_title">Create Your Own 7ml Test Kit</h2>
                <p class="mt-4 text-lg text-gray-600 max-w-3xl mx-auto" data-lang-key="kit_subtitle">Select a minimum of 5 perfumes to create your personalized 7ml sample kit.</p>
            </div>

            <div class="mb-8 max-w-lg mx-auto relative">
                <span class="absolute inset-y-0 left-0 flex items-center pl-4">
                    <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                </span>
                <input type="text" id="kit-search-input" class="w-full p-3 pl-12 rounded-full border border-sylflora-green focus:outline-none focus:ring-2 focus:ring-sylflora-gold" data-lang-placeholder-key="kit_search_placeholder" placeholder="Search for perfumes to add...">
            </div>

            <div id="kit-perfume-list" class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
                </div>

            <div id="kit-summary" class="sticky bottom-0 bg-white shadow-lg p-4 mt-12 rounded-t-lg border-t-2 border-sylflora-gold">
                <div class="container mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
                    <div>
                        <p class="text-lg font-semibold" data-lang-key="kit_selection_counter">Select at least 5 perfumes</p>
                        <p id="kit-counter" class="text-2xl font-bold text-sylflora-green">0 selected</p>
                    </div>
                    <button id="add-kit-to-cart-btn" class="w-full md:w-auto bg-sylflora-gold text-sylflora-green font-bold py-3 px-8 rounded-full text-lg hover:opacity-90 transition disabled:bg-gray-400 disabled:cursor-not-allowed" disabled data-lang-key="kit_add_to_cart">Add Kit to Cart</button>
                </div>
            </div>
        </div>
    </main>
    
    <footer class="bg-sylflora-green text-sylflora-offwhite py-8">
        <div class="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <p>&copy; 2025 Sylflora. All Rights Reserved.</p>
        </div>
    </footer>
    
    <div id="success-modal" class="fixed inset-0 z-[90] modal-bg items-center justify-center hidden">
        <div id="success-modal-overlay" class="absolute inset-0"></div>
        <div class="bg-white rounded-lg shadow-2xl w-11/12 max-w-sm text-center p-6 md:p-8 relative transform transition-all scale-95 opacity-0" id="success-modal-box">
            <div class="flex justify-center mb-4">
                <div class="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                    <svg class="w-10 h-10 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
                </div>
            </div>
            <h2 class="text-2xl font-bold text-sylflora-green mb-2" data-lang-key="add_success_title">সফলভাবে যোগ হয়েছে!</h2>
            <p class="mb-6 text-gray-600" data-lang-key="add_success_message">পণ্যটি আপনার শপিং কার্টে যোগ করা হয়েছে।</p>
            <div class="flex flex-col sm:flex-row justify-center gap-3">
                <button id="continue-shopping-btn" class="w-full border-2 border-sylflora-green text-sylflora-green font-bold py-2.5 px-6 rounded-full" data-lang-key="continue_shopping">শপিং চালিয়ে যান</button>
                <button id="go-to-cart-btn" class="w-full bg-sylflora-green text-white font-bold py-2.5 px-6 rounded-full" data-lang-key="go_to_cart">কার্টে যান</button>
            </div>
        </div>
    </div>
    
    <script src="data.js"></script>
    <script src="global.js"></script>
    <script src="kit.js"></script> 
</body>
</html>
