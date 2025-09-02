// Sample customer data for demonstration
const customerData = [
    { income: 3, score: 90, cluster: 0 }, // High-income, high-spending
    { income: 2, score: 70, cluster: 1 }, // Moderate-income, moderate-spending
    { income: 1.5, score: 40, cluster: 2 }, // Low-income, low-spending
    { income: 5, score: 85, cluster: 0 }, // High-income, high-spending
    { income: 7, score: 65, cluster: 1 }, // Moderate-income, moderate-spending
    { income: 4, score: 55, cluster: 1 }, // Middle-income, moderate-spending
    { income: 8, score: 80, cluster: 0 }, // High-income, high-spending
    { income: 12, score: 90, cluster: 0 }, // Upper Middle Income
    { income: 6, score: 45, cluster: 1 }, // Moderate-income, moderate-spending
    { income: 9, score: 35, cluster: 2 }, // Low-income, low-spending
    // More entries...
];

// Function to generate realistic customer data
function generateRealisticData(numCustomers) {
    const data = [];
    for (let i = 0; i < numCustomers; i++) {
        const score = Math.floor(Math.random() * 100); // Spending score from 0 to 100
        let income;

        // Realistic income generation based on common brackets in India
        const rand = Math.random();
        if (rand < 0.2) { // 20% Low Income
            income = (Math.random() * 2 + 1).toFixed(2); // Income between 1 to 3 lakhs
        } else if (rand < 0.5) { // 30% Middle Income
            income = (Math.random() * 6 + 4).toFixed(2); // Income between 4 to 10 lakhs
        } else if (rand < 0.8) { // 30% Upper Middle Income
            income = (Math.random() * 10 + 11).toFixed(2); // Income between 11 to 20 lakhs
        } else { // 20% High Income
            income = (Math.random() * 30 + 21).toFixed(2); // Income between 21 to 50 lakhs
        }

        const cluster = Math.floor(rand * 3); // Random cluster between 0 and 2
        data.push({ income: parseFloat(income), score, cluster });
    }
    return data;
}

// Function to create the scatter plot
function createScatterPlot(data) {
    const ctx = document.getElementById('myChart').getContext('2d');
    const clusters = {
        0: { color: 'rgba(255, 99, 132, 1)', label: 'High Value', marker: 'circle' },
        1: { color: 'rgba(54, 162, 235, 1)', label: 'Middle Class', marker: 'triangle' },
        2: { color: 'rgba(75, 192, 192, 1)', label: 'Budget', marker: 'rect' },
    };

    // Create datasets for each cluster
    const datasets = Object.keys(clusters).map(cluster => ({
        label: clusters[cluster].label,
        backgroundColor: clusters[cluster].color,
        data: data.filter(d => d.cluster == cluster).map(d => ({
            x: d.income, 
            y: d.score,
            radius: 5 + Math.random() * 5 // Varying sizes for better visibility
        })),
        showLine: false,
        pointStyle: clusters[cluster].marker,
        fill: false,
    }));

    // Create the scatter plot
    const myChart = new Chart(ctx, {
        type: 'scatter',
        data: {
            datasets: datasets,
        },
        options: {
            responsive: true,
            scales: {
                x: {
                    type: 'linear',
                    position: 'bottom',
                    title: {
                        display: true,
                        text: 'Annual Income (in Lakhs)',
                        font: {
                            size: 16,
                            weight: 'bold',
                        },
                    },
                    ticks: {
                        callback: function(value) {
                            return `₹${value.toLocaleString()} Lakhs`; // Format ticks as INR in lakhs
                        },
                    },
                },
                y: {
                    title: {
                        display: true,
                        text: 'Spending Score',
                        font: {
                            size: 16,
                            weight: 'bold',
                        },
                    },
                },
            },
            plugins: {
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            const clusterLabel = clusters[context.dataset.label].label;
                            return `Cluster: ${clusterLabel}\nIncome: ₹${context.raw.x.toLocaleString()} Lakhs\nScore: ${context.raw.y}`;
                        },
                    },
                },
                legend: {
                    display: true,
                    position: 'top',
                },
            },
        },
    });
}

// Generate random customer data and create the scatter plot
document.getElementById('generate').addEventListener('click', () => {
    const data = generateRealisticData(100); // Generate 100 realistic customers
    createScatterPlot(data);
});