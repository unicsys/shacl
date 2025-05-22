<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Agile Model Based Enterprise - Mission & Vision</title>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&family=Roboto:wght@400;500;700&display=swap" rel="stylesheet">
    <style>
        /* 
        SharePoint Embedding Notes:
        1. Paste everything from <div class="mission-vision-container"> onwards into SharePoint.
        2. The <style> block should be included. If SharePoint strips it, you might need to link to CSS or use inline styles (less ideal).
        3. Test thoroughly in SharePoint. Use !important sparingly if styles are overridden.
        */

        .mission-vision-root {
            font-family: 'Inter', 'Roboto', sans-serif;
            background-color: #f4f4f4; /* Light Gray background for the whole section */
            padding: 40px 20px; /* Ample padding for the section */
            display: flex; /* For centering the container if needed on a full page */
            justify-content: center;
            align-items: center;
            min-height: 300px; /* Example minimum height */
        }

        .mission-vision-container {
            display: flex;
            gap: 30px; /* Space between Mission and Vision cards */
            max-width: 1000px; /* Max width of the component */
            width: 100%;
        }

        .mv-card {
            background-color: #ffffff; /* White card background */
            border-radius: 12px; /* Softer, modern rounded corners */
            padding: 30px;
            flex: 1; /* Each card takes equal space */
            box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1); /* Softer, more diffused shadow */
            display: flex;
            flex-direction: column;
            transition: transform 0.3s ease, box-shadow 0.3s ease;
            border-top: 5px solid transparent; /* Placeholder for accent border */
        }

        .mv-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 12px 30px rgba(0, 0, 0, 0.12);
        }

        .mv-card.mission {
            border-top-color: #D32F2F; /* Red accent for Mission */
        }
        .mv-card.mission .mv-icon svg {
            fill: #D32F2F; /* Red icon for Mission */
        }

        .mv-card.vision {
            border-top-color: #333333; /* Dark Gray/Black accent for Vision */
        }
         .mv-card.vision .mv-icon svg {
            fill: #333333; /* Dark Gray/Black icon for Vision */
        }


        .mv-header {
            display: flex;
            align-items: center;
            margin-bottom: 20px;
        }

        .mv-icon {
            margin-right: 15px;
            flex-shrink: 0; /* Prevent icon from shrinking */
        }

        .mv-icon svg {
            width: 40px; /* Adjust size as needed */
            height: 40px;
        }

        .mv-card h2 {
            font-size: 1.8em; /* 28.8px */
            color: #1a1a1a; /* Very dark gray / almost black for headings */
            margin: 0;
            font-weight: 700;
        }

        .mv-card p {
            font-size: 1.05em; /* 16.8px */
            color: #4d4d4d; /* Medium-dark gray for text */
            line-height: 1.7;
            flex-grow: 1; /* Allows paragraph to take available space */
            margin-bottom: 0;
        }
        
        /* Responsive adjustments */
        @media (max-width: 768px) {
            .mission-vision-container {
                flex-direction: column; /* Stack cards on smaller screens */
                gap: 25px;
            }
            .mv-card {
                padding: 25px;
            }
            .mv-card h2 {
                font-size: 1.6em;
            }
            .mv-icon svg {
                width: 32px;
                height: 32px;
            }
        }
         @media (max-width: 480px) {
            .mission-vision-root {
                padding: 20px 15px;
            }
             .mv-card h2 {
                font-size: 1.4em;
            }
             .mv-card p {
                font-size: 1em;
            }
        }

    </style>
</head>
<body>
    <!-- 
        Agile Model Based Enterprise - Section Title (Optional)
        If you want a title above the two cards, you can add it here, for example:
        <h1 style="text-align: center; color: #1a1a1a; margin-bottom: 30px; font-size: 2.5em;">
            Agile Model Based Enterprise
        </h1>
    -->
    <div class="mission-vision-root">
        <div class="mission-vision-container">

            <!-- Mission Card -->
            <div class="mv-card mission">
                <div class="mv-header">
                    <div class="mv-icon">
                        <!-- Simple Target/Goal SVG Icon -->
                        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm0-14c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6zm0 10c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4z"/></svg>
                    </div>
                    <h2>Our Mission</h2>
                </div>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit.
                </p>
            </div>

            <!-- Vision Card -->
            <div class="mv-card vision">
                <div class="mv-header">
                    <div class="mv-icon">
                        <!-- Simple Eye/Foresight SVG Icon -->
                        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/></svg>
                    </div>
                    <h2>Our Vision</h2>
                </div>
                <p>
                    Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur.
                </p>
            </div>

        </div>
    </div>

</body>
</html>
