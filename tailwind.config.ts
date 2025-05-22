<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>About MBDX Initiative</title>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&family=Roboto:wght@400;500;700&display=swap" rel="stylesheet">
    <style>
        /* 
        SharePoint Embedding Notes:
        1. You'll likely paste everything from <div class="mbdx-about-container"> onwards into a SharePoint "Embed" web part or "Text" web part (HTML view).
        2. The <style> block should ideally be included. If SharePoint strips it, you might need to link to a CSS file hosted in SharePoint or use inline styles (less ideal).
        3. Test thoroughly in SharePoint as its environment can sometimes override styles. You might need to make selectors more specific or use !important sparingly.
        */

        /* --- Global Styles for this component --- */
        .mbdx-about-container {
            font-family: 'Inter', 'Roboto', sans-serif;
            color: #333;
            line-height: 1.6;
            background-color: #f9faff; /* Very light blue background for the whole section */
            padding: 20px; /* Add padding if SharePoint doesn't provide it */
            max-width: 900px; /* Adjust as needed for SharePoint column width */
            margin: 0 auto; /* Center if it's a standalone page */
        }

        .mbdx-about-container h2,
        .mbdx-about-container h3,
        .mbdx-about-container h4 {
            color: #00205B; /* RTX Navy */
            font-weight: 700;
            margin-top: 0;
        }

        .mbdx-about-container p {
            margin-bottom: 1.2em;
            color: #454545;
        }

        .mbdx-about-container a {
            color: #005EB8; /* Sky Blue */
            text-decoration: none;
        }
        .mbdx-about-container a:hover {
            text-decoration: underline;
        }

        /* --- Section Styling --- */
        .mbdx-section {
            background-color: #ffffff; /* White cards for sections */
            padding: 25px 30px;
            margin-bottom: 25px;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0, 32, 91, 0.08); /* Subtle shadow using navy */
            border-left: 5px solid #005EB8; /* Sky Blue accent */
        }
        
        .mbdx-section.accent-orange {
             border-left-color: #F47920; /* Accent Orange for some sections */
        }

        .mbdx-section h2 {
            font-size: 1.8em; /* 28.8px */
            margin-bottom: 20px;
            padding-bottom: 10px;
            border-bottom: 1px solid #e0e0e0;
        }

        /* --- Specific Section Elements --- */
        
        /* Roles / Team Section */
        .mbdx-roles-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 20px;
        }

        .mbdx-role-card {
            background-color: #f0f7ff; /* Lighter Sky Blue */
            padding: 20px;
            border-radius: 6px;
            border: 1px solid #cce4ff;
        }

        .mbdx-role-card h3 {
            font-size: 1.3em; /* 20.8px */
            color: #00205B; /* RTX Navy */
            margin-bottom: 10px;
        }
        .mbdx-role-card p {
            font-size: 0.95em;
            margin-bottom: 0;
        }
        
        /* Deliverables List */
        .mbdx-deliverables-list {
            list-style: none;
            padding-left: 0;
        }

        .mbdx-deliverables-list li {
            padding: 10px 0 10px 35px;
            position: relative;
            font-size: 1.05em;
            border-bottom: 1px dashed #e0e0e0;
        }
        .mbdx-deliverables-list li:last-child {
            border-bottom: none;
        }

        .mbdx-deliverables-list li::before {
            content: '➤'; /* Simple arrow, or use an SVG/FontIcon if possible in SP */
            position: absolute;
            left: 5px;
            top: 50%;
            transform: translateY(-50%);
            color: #F47920; /* Accent Orange */
            font-size: 1.4em;
            line-height: 1;
        }

        /* Optional: Intro/Hero style for "Who We Are" */
        .mbdx-intro {
            text-align: center;
            padding: 20px 0;
        }
        .mbdx-intro h1 {
            font-size: 2.5em; /* 40px */
            color: #00205B; /* RTX Navy */
            margin-bottom: 15px;
        }
        .mbdx-intro .lead-text {
            font-size: 1.2em; /* 19.2px */
            color: #005EB8; /* Sky Blue */
            max-width: 700px;
            margin: 0 auto 25px auto;
        }

        /* Responsive Adjustments (basic) */
        @media (max-width: 768px) {
            .mbdx-about-container {
                padding: 15px;
            }
            .mbdx-section {
                padding: 20px;
            }
            .mbdx-section h2 {
                font-size: 1.6em;
            }
            .mbdx-intro h1 {
                font-size: 2em;
            }
            .mbdx-intro .lead-text {
                font-size: 1.1em;
            }
        }
        @media (max-width: 480px) {
             .mbdx-roles-grid {
                grid-template-columns: 1fr; /* Stack roles on small screens */
            }
            .mbdx-section h2 {
                font-size: 1.4em;
            }
        }

    </style>
</head>
<body>

    <div class="mbdx-about-container">

        <!-- Section: Who We Are (Intro) -->
        <div class="mbdx-intro">
            <h1>Model-Based Digital X (MBDX) Initiative</h1>
            <p class="lead-text">
                We are a dynamic and forward-thinking team dedicated to transforming how [Your Company/Organization] approaches engineering, manufacturing, and the entire product lifecycle through the power of integrated digital models.
            </p>
        </div>

        <!-- Section: Our Mission -->
        <div class="mbdx-section">
            <h2>Our Mission</h2>
            <p>
                To empower every engineer and manufacturing professional with the tools, methodologies, and knowledge to leverage model-based practices, fostering innovation, improving efficiency, and accelerating time-to-market for all our products and solutions. We aim to create a seamless digital thread that connects every stage of the lifecycle.
            </p>
        </div>

        <!-- Section: Our Vision -->
        <div class="mbdx-section accent-orange">
            <h2>Our Vision</h2>
            <p>
                A future where design, analysis, manufacturing, and sustainment are seamlessly integrated through authoritative digital models. We envision an environment where data flows effortlessly, decisions are model-informed, and collaboration across disciplines and business units is the standard, leading to unprecedented quality and agility.
            </p>
        </div>

        <!-- Section: Our Roles / The Team -->
        <div class="mbdx-section">
            <h2>Our Roles & Expertise</h2>
            <p>Our core team and extended network of champions bring expertise across several key domains to drive MBDX adoption:</p>
            <div class="mbdx-roles-grid">
                <div class="mbdx-role-card">
                    <h3>MBSE Strategists</h3>
                    <p>Defining system architectures, modeling best practices, and ensuring SysML v2 standards are adopted and effective.</p>
                </div>
                <div class="mbdx-role-card">
                    <h3>Digital Manufacturing Leads</h3>
                    <p>Connecting models to the shop floor, implementing standards like STEP & QIF, and optimizing production processes.</p>
                </div>
                <div class="mbdx-role-card">
                    <h3>Semantic Thread Architects</h3>
                    <p>Developing ontologies, URI policies, and SPARQL expertise to ensure data is connected, discoverable, and meaningful.</p>
                </div>
                <div class="mbdx-role-card">
                    <h3>Process & Governance Experts</h3>
                    <p>Establishing review gates, model maturity levels, and change management processes to ensure quality and consistency.</p>
                </div>
                <div class="mbdx-role-card">
                    <h3>Training & Support Specialists</h3>
                    <p>Developing learning materials, conducting workshops, and providing direct support to MBDX users.</p>
                </div>
                <div class="mbdx-role-card">
                    <h3>Use Case Champions</h3>
                    <p>Identifying, developing, and promoting successful applications of MBDX across various business units and domains.</p>
                </div>
            </div>
        </div>

        <!-- Section: Our Deliverables -->
        <div class="mbdx-section accent-orange">
            <h2>Our Deliverables</h2>
            <p>The MBDX initiative provides tangible resources and services to support your journey:</p>
            <ul class="mbdx-deliverables-list">
                <li>Comprehensive MBDX Playbook (Principles, Workflows, Templates)</li>
                <li>Standardized Modeling Rules & Guidance (SysML v2, Manufacturing Standards)</li>
                <li>Ontology Definitions & URI Policies</li>
                <li>Validated Use Cases & Best Practice Demonstrators</li>
                <li>Training Programs & Workshops</li>
                <li>Expert Consultation & Model Review Services</li>
                <li>Governance Frameworks & Model Maturity Guidelines</li>
                <li>A Centralized MBDX Portal for all resources and support.</li>
            </ul>
        </div>

    </div>

</body>
</html>
