<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Forecasting & Planning Dashboard (Light Theme)</title>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/3.9.1/chart.min.js"></script>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            background: #f4f7fc; /* Light background */
            color: #333333; /* Dark text */
            padding: 20px;
            min-height: 100vh;
        }
        
        .dashboard-header {
            text-align: center;
            margin-bottom: 30px;
            padding: 20px;
            background: #ffffff; /* White header */
            border-radius: 15px;
            box-shadow: 0 4px 20px rgba(0,0,0,0.05); /* Softer shadow */
            border: 1px solid #e0e6ed;
        }
        
        .dashboard-header h1 {
            font-size: 2.5em;
            margin-bottom: 10px;
            color: #1e3c72; /* Dark blue title */
        }
        
        .dashboard-header p {
            font-size: 1.2em;
            color: #5a6a85;
        }
        
        .dashboard-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
            gap: 20px;
            margin-bottom: 20px;
        }
        
        .metric-cards {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 15px;
            margin-bottom: 30px;
        }
        
        .metric-card {
            background: #ffffff; /* White cards */
            padding: 20px;
            border-radius: 12px;
            box-shadow: 0 4px 20px rgba(0,0,0,0.05); /* Softer shadow */
            border: 1px solid #e0e6ed;
            transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        
        .metric-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 8px 25px rgba(0,0,0,0.08); /* Enhanced hover shadow */
        }
        
        .metric-value {
            font-size: 2.5em;
            font-weight: bold;
            margin: 10px 0;
            background: linear-gradient(45deg, #007bff, #0056b3);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
        }
        
        .metric-label {
            font-size: 0.9em;
            color: #5a6a85;
            text-transform: uppercase;
            letter-spacing: 1px;
        }
        
        .metric-trend {
            font-size: 0.85em;
            margin-top: 10px;
            color: #5a6a85;
        }
        
        .trend-up {
            color: #28a745; /* Green for up */
        }
        
        .trend-down {
            color: #dc3545; /* Red for down */
        }
        
        .chart-container {
            background: #ffffff; /* White chart background */
            padding: 25px;
            border-radius: 12px;
            box-shadow: 0 4px 20px rgba(0,0,0,0.05); /* Softer shadow */
            border: 1px solid #e0e6ed;
        }
        
        .chart-title {
            font-size: 1.3em;
            margin-bottom: 20px;
            color: #1e3c72; /* Dark blue title */
            display: flex;
            align-items: center;
            gap: 10px;
        }
        
        .chart-title::before {
            content: '';
            width: 4px;
            height: 20px;
            background: linear-gradient(45deg, #00d4ff, #0099ff);
            border-radius: 2px;
        }
        
        canvas {
            max-height: 300px;
        }
        
        .alert-section {
            background: #ffffff; /* White alert section */
            padding: 20px;
            border-radius: 12px;
            margin-top: 20px;
            border: 1px solid #e0e6ed;
            box-shadow: 0 4px 20px rgba(0,0,0,0.05);
        }
        
        .alert-item {
            display: flex;
            align-items: center;
            padding: 12px;
            margin: 8px 0;
            background: #f8f9fa; /* Light grey for item background */
            border-radius: 8px;
            border-left: 4px solid;
            transition: transform 0.2s ease;
        }
        
        .alert-item:hover {
            transform: translateX(5px);
        }
        
        .alert-critical {
            border-left-color: #dc3545; /* Red */
        }
        
        .alert-warning {
            border-left-color: #ffc107; /* Yellow */
        }
        
        .alert-info {
            border-left-color: #17a2b8; /* Blue */
        }
        
        @keyframes pulse {
            0% { opacity: 1; }
            50% { opacity: 0.6; }
            100% { opacity: 1; }
        }
        
        .live-indicator {
            display: inline-flex;
            align-items: center;
            gap: 8px;
            font-size: 0.9em;
            color: #5a6a85;
        }
        
        .live-dot {
            width: 8px;
            height: 8px;
            background: #28a745; /* Green dot */
            border-radius: 50%;
            animation: pulse 2s infinite;
        }
    </style>
</head>
<body>
    <div class="dashboard-header">
        <h1>Forecasting & Planning Dashboard</h1>
        <p>Digital Twin Analysis</p>
        <div class="live-indicator">
            <span class="live-dot"></span>
            <span>Real-time Data</span>
        </div>
    </div>
    
    <div class="metric-cards">
        <div class="metric-card">
            <div class="metric-label">Fleet Availability</div>
            <div class="metric-value">87.3%</div>
            <div class="metric-trend trend-up">↑ 2.1% from last month</div>
        </div>
        <div class="metric-card">
            <div class="metric-label">Predicted Maintenance Events</div>
            <div class="metric-value">23</div>
            <div class="metric-trend">Next 30 days</div>
        </div>
        <div class="metric-card">
            <div class="metric-label">Cost Savings (YTD)</div>
            <div class="metric-value">$4.2M</div>
            <div class="metric-trend trend-up">↑ 18% vs baseline</div>
        </div>
        <div class="metric-card">
            <div class="metric-label">Mean Time Between Failures</div>
            <div class="metric-value">842h</div>
            <div class="metric-trend trend-up">↑ 12% improvement</div>
        </div>
    </div>
    
    <div class="dashboard-grid">
        <div class="chart-container">
            <h3 class="chart-title">Remaining Useful Life Forecast</h3>
            <canvas id="rulChart"></canvas>
        </div>
        
        <div class="chart-container">
            <h3 class="chart-title">Maintenance Demand Forecast</h3>
            <canvas id="maintenanceChart"></canvas>
        </div>
        
        <div class="chart-container">
            <h3 class="chart-title">Health Score Trend Analysis</h3>
            <canvas id="healthChart"></canvas>
        </div>
        
        <div class="chart-container">
            <h3 class="chart-title">Resource Utilization Planning</h3>
            <canvas id="resourceChart"></canvas>
        </div>
    </div>
    
    <div class="alert-section">
        <h3 class="chart-title">Predictive Alerts & Recommendations</h3>
        <div class="alert-item alert-critical">
            <div>
                <strong>Engine PW0E730234:</strong> High vibration trend detected. Schedule inspection within 50 flight hours.
                <div style="font-size: 0.85em; opacity: 0.7; margin-top: 5px;">Confidence: 92% | Impact: High | Est. Cost if delayed: $280K</div>
            </div>
        </div>
        <div class="alert-item alert-warning">
            <div>
                <strong>Fleet Optimization:</strong> Recommend rotating engines between aircraft 9100004003 and 9100004007.
                <div style="font-size: 0.85em; opacity: 0.7; margin-top: 5px;">Expected life extension: 120 hours | Cost savings: $45K</div>
            </div>
        </div>
        <div class="alert-item alert-info">
            <div>
                <strong>Spare Parts Planning:</strong> Order 3 fuel filters and 2 oil filters for Q2 maintenance schedule.
                <div style="font-size: 0.85em; opacity: 0.7; margin-top: 5px;">Lead time: 45 days | Budget impact: $12K</div>
            </div>
        </div>
    </div>
    
    <script>
        // Chart.js default settings for light theme
        Chart.defaults.color = '#666'; // Dark grey for text
        Chart.defaults.borderColor = 'rgba(0,0,0,0.1)'; // Light grey for borders
        Chart.defaults.plugins.legend.labels.color = '#333'; // Dark text for legends
        
        // Remaining Useful Life Chart
        const rulCtx = document.getElementById('rulChart').getContext('2d');
        new Chart(rulCtx, {
            type: 'bar',
            data: {
                labels: ['PW0E730234', 'PW0E730267', 'PW0E730289', 'PW0E730301', 'PW0E730345', 'PW0E730378'],
                datasets: [{
                    label: 'Current RUL (Hours)',
                    data: [320, 890, 1200, 450, 670, 1450],
                    backgroundColor: function(context) {
                        const value = context.raw;
                        if (value < 500) return 'rgba(220, 53, 69, 0.8)'; // Red
                        if (value < 1000) return 'rgba(255, 193, 7, 0.8)'; // Yellow
                        return 'rgba(40, 167, 69, 0.8)'; // Green
                    },
                    borderColor: 'rgba(0,0,0,0.2)',
                    borderWidth: 1
                }, {
                    label: 'Predicted RUL (ML Model)',
                    data: [280, 920, 1150, 480, 690, 1420],
                    backgroundColor: 'rgba(0, 123, 255, 0.2)',
                    borderColor: 'rgba(0, 123, 255, 0.8)',
                    borderWidth: 2,
                    type: 'line'
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'top',
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        grid: {
                            color: 'rgba(0,0,0,0.1)'
                        }
                    },
                    x: {
                        grid: {
                            display: false
                        }
                    }
                }
            }
        });
        
        // Maintenance Demand Forecast
        const maintenanceCtx = document.getElementById('maintenanceChart').getContext('2d');
        new Chart(maintenanceCtx, {
            type: 'line',
            data: {
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                datasets: [{
                    label: 'Scheduled Maintenance',
                    data: [12, 15, 14, 18, 16, 20, 22, 19, 17, 21, 18, 16],
                    borderColor: 'rgba(0, 123, 255, 1)',
                    backgroundColor: 'rgba(0, 123, 255, 0.1)',
                    tension: 0.4
                }, {
                    label: 'Predicted Unscheduled',
                    data: [3, 2, 4, 3, 5, 4, 6, 5, 4, 3, 4, 3],
                    borderColor: 'rgba(255, 193, 7, 1)',
                    backgroundColor: 'rgba(255, 193, 7, 0.1)',
                    tension: 0.4
                }, {
                    label: 'Maintenance Capacity',
                    data: [20, 20, 20, 25, 25, 25, 30, 30, 25, 25, 25, 20],
                    borderColor: 'rgba(40, 167, 69, 1)',
                    backgroundColor: 'rgba(40, 167, 69, 0.1)',
                    borderDash: [5, 5],
                    tension: 0.4
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                interaction: {
                    mode: 'index',
                    intersect: false,
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        grid: {
                            color: 'rgba(0,0,0,0.1)'
                        }
                    },
                    x: {
                        grid: {
                            display: false
                        }
                    }
                }
            }
        });
        
        // Health Score Trend
        const healthCtx = document.getElementById('healthChart').getContext('2d');
        new Chart(healthCtx, {
            type: 'line',
            data: {
                labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5', 'Week 6', 'Week 7', 'Week 8'],
                datasets: [{
                    label: 'Vibration Health',
                    data: [95, 94, 92, 91, 88, 85, 82, 78],
                    borderColor: 'rgba(220, 53, 69, 1)',
                    backgroundColor: 'rgba(220, 53, 69, 0.1)',
                    tension: 0.4
                }, {
                    label: 'Oil System Health',
                    data: [98, 97, 96, 95, 94, 93, 92, 91],
                    borderColor: 'rgba(23, 162, 184, 1)',
                    backgroundColor: 'rgba(23, 162, 184, 0.1)',
                    tension: 0.4
                }, {
                    label: 'Overall Health Score',
                    data: [96, 95, 94, 93, 91, 89, 87, 85],
                    borderColor: 'rgba(40, 167, 69, 1)',
                    backgroundColor: 'rgba(40, 167, 69, 0.1)',
                    tension: 0.4,
                    borderWidth: 3
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: {
                        beginAtZero: false,
                        min: 70,
                        max: 100,
                        grid: {
                            color: 'rgba(0,0,0,0.1)'
                        }
                    },
                    x: {
                        grid: {
                            display: false
                        }
                    }
                }
            }
        });
        
        // Resource Utilization
        const resourceCtx = document.getElementById('resourceChart').getContext('2d');
        new Chart(resourceCtx, {
            type: 'doughnut',
            data: {
                labels: ['Technicians', 'Parts Inventory', 'Bay Availability', 'Tools & Equipment'],
                datasets: [{
                    data: [78, 65, 82, 90],
                    backgroundColor: [
                        'rgba(0, 123, 255, 0.8)',
                        'rgba(255, 193, 7, 0.8)',
                        'rgba(40, 167, 69, 0.8)',
                        'rgba(108, 117, 125, 0.8)'
                    ],
                    borderColor: '#ffffff',
                    borderWidth: 3
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'right',
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                return context.label + ': ' + context.parsed + '%';
                            }
                        }
                    }
                }
            }
        });
    </script>
</body>
</html>
