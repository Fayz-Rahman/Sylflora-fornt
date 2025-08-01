<!DOCTYPE html>
<html lang="bn" class="scroll-smooth">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Sylflora | Product</title>

    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&family=Hind+Siliguri:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="./css/style.css">
</head>
<body class="font-bangla">

    <?php include 'header.php'; ?>

    <main>
        <div id="product-details-container" class="container mx-auto my-12 p-4">
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
    

      <?php include 'bottom-nav.php'; ?>
    <script src="./js/data.js"></script>
    <script src="./js/global.js"></script>
    <script src="./js/product-page.js"></script> 
</body>
</html>
