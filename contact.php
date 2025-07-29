<!DOCTYPE html>
<html lang="bn" class="scroll-smooth">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Contact Us - Sylflora</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&family=Hind+Siliguri:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="style.css">
</head>
<body class="font-bangla">

    <?php include 'header.php'; ?>

    <main>
        <section id="contact" class="py-16 md:py-24">
            <div class="container mx-auto px-4 sm:px-6 lg:px-8">
                 <div class="text-center mb-12">
                    <h2 class="text-3xl md:text-4xl font-bold text-sylflora-green" data-lang-key="contact_title">Get In Touch</h2>
                     <p class="mt-4 text-lg text-gray-600" data-lang-key="contact_subtitle">We would love to hear from you. For inquiries, support, or feedback, please reach out.</p>
                </div>
                <div class="max-w-xl mx-auto">
                    <form id="facebook-message-form" class="space-y-6">
                        <div>
                             <label for="contact-name" class="sr-only" data-lang-key="form_name">Name</label>
                            <input type="text" id="contact-name" class="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-sylflora-gold" data-lang-placeholder-key="form_name_placeholder">
                        </div>
                        <div>
                            <label for="contact-message" class="sr-only" data-lang-key="form_message">Message</label>
                            <textarea id="contact-message" rows="5" class="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-sylflora-gold" data-lang-placeholder-key="form_message_placeholder" required></textarea>
                        </div>
                        <div class="text-center">
                            <button type="submit" class="w-full bg-blue-600 text-white font-bold py-3 px-8 rounded-full hover:bg-blue-700 transition duration-300 flex items-center justify-center gap-2">
                                <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.04C6.5 2.04 2 6.53 2 12.06C2 17.06 5.66 21.21 10.44 21.96V14.96H7.9V12.06H10.44V9.85C10.44 7.32 11.93 5.96 14.22 5.96C15.31 5.96 16.45 6.15 16.45 6.15V8.62H15.19C13.95 8.62 13.56 9.39 13.56 10.18V12.06H16.34L15.89 14.96H13.56V21.96A10 10 0 0 0 22 12.06C22 6.53 17.5 2.04 12 2.04Z"></path></svg>
                                <span data-lang-key="contact_facebook">Message us on Facebook</span>
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    </main>
    
    <footer class="bg-sylflora-green text-sylflora-offwhite py-8">
        <div class="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <p>&copy; 2025 Sylflora. All Rights Reserved.</p>
        </div>
    </footer>


  <?php include 'bottom-nav.php'; ?>
    <script src="data.js"></script>
    <script src="global.js"></script>
    <script src="contact.js"></script> </body>
</html>