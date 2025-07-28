document.addEventListener('DOMContentLoaded', () => {
    // Access global data from global.js
    const { productData, langData, currentLang } = window.sylflora;

    const genderChartCanvas = document.getElementById('genderChart');

    if (genderChartCanvas) {
        const genderCounts = productData.reduce((acc, p) => {
            const gender = p.gender === 'Women' ? 'Female' : p.gender; // Normalize "Women" to "Female"
            acc[gender] = (acc[gender] || 0) + 1;
            return acc;
        }, {});

        const chartData = {
            labels: [
                langData[currentLang].gender_male,
                langData[currentLang].gender_female,
                langData[currentLang].gender_unisex
            ],
            datasets: [{
                label: 'Perfume Genders',
                data: [
                    genderCounts['Male'] || 0,
                    genderCounts['Female'] || 0,
                    genderCounts['Unisex'] || 0
                ],
                backgroundColor: [
                    '#023020', // Sylflora Green
                    '#d4af37', // A softer gold for chart
                    '#808080'  // Grey for unisex
                ],
                borderColor: '#F5F5F5',
                borderWidth: 2
            }]
        };

        new Chart(genderChartCanvas, {
            type: 'doughnut',
            data: chartData,
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'top',
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                let label = context.label || '';
                                if (label) {
                                    label += ': ';
                                }
                                if (context.parsed !== null) {
                                    label += context.parsed;
                                }
                                return label;
                            }
                        }
                    }
                }
            },
        });
    }
});