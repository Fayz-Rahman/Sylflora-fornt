<!DOCTYPE html>
<html lang="bn" class="scroll-smooth">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>About Us - Sylflora</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&family=Hind+Siliguri:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="style.css">
</head>
<body class="font-bangla bg-gray-50">

    <?php include 'header.php'; ?>

    <main>
        <section id="about-hero" class="bg-white">
            <div class="container mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 text-center">
                <h1 class="text-4xl md:text-5xl font-bold text-sylflora-green" data-lang-key="about_title">The Essence of Sylflora</h1>
                <p class="mt-4 text-lg text-gray-600 max-w-3xl mx-auto" data-lang-key="about_intro">
                    Explore the story behind our fragrances and see a visual breakdown of our perfume offerings, helping you understand the diversity and focus of our scents.
                </p>
            </div>
        </section>

        <section id="story" class="py-16 md:py-24">
            <div class="container mx-auto px-4 sm:px-6 lg:px-8">
                <div class="grid md:grid-cols-2 gap-12 items-center">
                    <div class="order-2 md:order-1">
                        <img src="https://placehold.co/600x700/023020/F5F5F5?text=Sylflora+Craft" alt="Perfumery Process" class="rounded-lg shadow-xl w-full h-full object-cover">
                    </div>
                    <div class="order-1 md:order-2">
                        <h2 class="text-3xl font-bold text-sylflora-green mb-4">Our Story</h2>
                        <div class="prose max-w-none text-gray-700 space-y-4">
                            <p data-lang-key="about_p1">
                                Welcome to Sylflora, where the art of perfumery meets the essence of nature and luxury. Our mission is to create unique, high-quality fragrances that tell a story and evoke powerful emotions. Each bottle is a masterpiece, crafted with passion and precision.
                            </p>
                            <p data-lang-key="about_p2">
                                We believe that a scent is more than just a fragrance; it's a personal signature. That's why we source the finest ingredients from around the world to create our exclusive collection, offering a scent for every personality and occasion.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <section id="collection-chart" class="bg-white py-16 md:py-24">
            <div class="container mx-auto px-4 sm:px-6 lg:px-8">
                <div class="max-w-xl mx-auto text-center">
                    <h2 class="text-3xl font-bold text-sylflora-green" data-lang-key="chart_title">Our Collection by Category</h2>
                    <p class="mt-2 text-gray-600">A visual breakdown of our perfume offerings.</p>
                </div>
                <div class="chart-container mt-8">
                    <canvas id="genderChart"></canvas>
                </div>
            </div>
        </section>
    </main>
    
    <footer class="bg-sylflora-green text-sylflora-offwhite py-8">
        <div class="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <p>&copy; 2025 Sylflora. All Rights Reserved.</p>
        </div>
    </footer>

    <script src="data.js"></script>
    <script src="global.js"></script>
    <script src="about.js"></script>
</body>
</html>