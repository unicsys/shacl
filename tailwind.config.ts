<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Ontology Definition: Aircraft Engine Identifier</title>
    <style>
        body {
            margin: 0;
            font-family: Arial, sans-serif;
            background-color: #f5f5f5;
            color: #000;
            min-height: 100vh;
        }

        .top-band {
            background-color: #B7A99A;
            height: 40px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 0 10px;
            color: black;
            font-size: 12px;
            width: 100%;
            box-sizing: border-box;
        }

        .main-content {
            padding: 20px;
            max-width: 1600px;
            margin: 0 auto;
        }

        h1 {
            font-size: 2em;
            color: #333;
            margin-bottom: 10px;
            font-weight: 600;
        }

        h2 {
            font-size: 1.5em;
            color: #005A9C;
            border-bottom: 2px solid #005A9C;
            padding-bottom: 5px;
            margin-top: 30px;
            margin-bottom: 15px;
        }

        h3 {
            font-size: 1.2em;
            color: #333;
            margin-top: 20px;
            margin-bottom: 10px;
        }

        .class-definition {
            background: white;
            padding: 25px;
            border-radius: 8px;
            box-shadow: 0 2px 8px rgba(0,0,0,0.1);
            margin: 20px 0;
        }

        .definition-row {
            margin: 15px 0;
            line-height: 1.6;
        }

        .definition-row strong {
            color: #005A9C;
            display: inline-block;
            min-width: 150px;
        }

        .hierarchy-tree {
            list-style: none;
            padding-left: 0;
            margin: 20px 0;
            background: white;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 2px 8px rgba(0,0,0,0.1);
        }

        .hierarchy-tree li {
            position: relative;
            padding: 5px 0 5px 25px;
            line-height: 1.6;
        }

        .hierarchy-tree li::before {
            content: '';
            position: absolute;
            left: 8px;
            top: 12px;
            width: 8px;
            height: 8px;
            background-color: #DAA520;
            border-radius: 50%;
            border: 1px solid #B8860B;
        }

        .hierarchy-tree li.current-class::before {
            background-color: #005A9C;
            border-color: #003366;
        }

        .hierarchy-tree li.current-class {
            font-weight: bold;
            color: #005A9C;
        }

        .hierarchy-tree ul {
            list-style: none;
            padding-left: 25px;
        }

        .canvas-container {
            background: white;
            padding: 25px;
            border-radius: 8px;
            box-shadow: 0 2px 8px rgba(0,0,0,0.1);
            margin: 30px 0;
        }

        .canvas-wrapper {
            background: white;
            border: 2px solid #000;
            min-height: 600px;
            position: relative;
            overflow: hidden;
        }

        /* Embedded diagram styles */
        .canvas-wrapper .container {
            display: flex;
            height: 600px;
            position: relative;
        }

        .canvas-wrapper .main-section {
            display: flex;
            flex-direction: column;
            border-right: 2px solid #ccc;
        }

        .canvas-wrapper .main-section.exist {
            flex: 4;
        }

        .canvas-wrapper .main-section.happen {
            flex: 2;
        }

        .canvas-wrapper .section-header {
            background: #f8f8f8;
            border-bottom: 2px solid #ccc;
            padding: 15px;
            text-align: center;
            font-weight: bold;
            font-size: 14px;
        }

        .canvas-wrapper .columns-wrapper {
            display: flex;
            flex: 1;
            overflow: hidden;
        }

        .canvas-wrapper .section {
            flex: 1;
            border-right: 2px solid #ccc;
            background: white;
            position: relative;
            display: flex;
            flex-direction: column;
        }

        .canvas-wrapper .section.has-vertical-tabs {
            position: relative;
        }

        .canvas-wrapper .section.has-vertical-tabs .canvas-area {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: 5;
        }

        .canvas-wrapper .section.has-vertical-tabs .canvas-area .box {
            pointer-events: all;
        }

        .canvas-wrapper .section.wide {
            flex: 2;
        }

        .canvas-wrapper .section:last-child {
            border-right: none;
        }

        .canvas-wrapper .tabs {
            display: flex;
            background: #f0f0f0;
            border-bottom: 1px solid #ddd;
            padding: 5px 10px;
            flex-wrap: wrap;
            gap: 5px;
            min-height: 40px;
        }

        .canvas-wrapper .tabs.vertical {
            flex-direction: column;
            background: transparent;
            border-bottom: none;
            padding: 0;
            gap: 0;
            height: 100%;
        }

        .canvas-wrapper .tab.vertical-tab {
            flex: 1;
            display: flex;
            align-items: flex-start;
            justify-content: center;
            border-bottom: 2px solid #ddd;
            border-radius: 0;
            border-left: none;
            border-right: none;
            border-top: none;
            background: transparent;
            font-size: 11px;
            padding: 10px 5px;
        }

        .canvas-wrapper .tab.vertical-tab:last-child {
            border-bottom: none;
        }

        .canvas-wrapper .column-header {
            background: #f8f8f8;
            border-bottom: 2px solid #ccc;
            padding: 10px;
            text-align: center;
            font-weight: bold;
            font-size: 12px;
        }

        .canvas-wrapper .tab {
            padding: 5px 10px;
            font-size: 12px;
            border-radius: 3px;
            background: white;
            border: 1px solid #ddd;
        }

        .canvas-wrapper .canvas-area {
            position: relative;
            flex: 1;
            overflow: hidden;
        }

        .canvas-wrapper .box {
            position: absolute;
            padding: 12px 20px;
            background: #ffd700;
            border: 2px solid #daa520;
            border-radius: 5px;
            cursor: move;
            user-select: none;
            font-size: 13px;
            font-weight: 500;
            box-shadow: 0 2px 5px rgba(0,0,0,0.1);
            z-index: 10;
            white-space: pre-line;
            text-align: center;
        }

        .canvas-wrapper .box:hover {
            box-shadow: 0 4px 8px rgba(0,0,0,0.2);
        }

        .canvas-wrapper .box.modeling-target {
            border-left: 6px solid #28a745;
            padding-left: 14px;
        }

        .canvas-wrapper .relation-label {
            position: absolute;
            padding: 3px 8px;
            background: white;
            border: 1px solid #4a90e2;
            border-radius: 12px;
            font-size: 11px;
            color: #4a90e2;
            z-index: 5;
            pointer-events: none;
        }

        .canvas-wrapper svg {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: 1;
        }

        .canvas-wrapper .relation-label-container {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: 15;
        }

        .expand-menu {
            position: fixed;
            background: white;
            border: 2px solid #4a90e2;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            z-index: 200;
            min-width: 200px;
            display: none;
        }

        .expand-menu-header {
            background: #4a90e2;
            color: white;
            padding: 10px 15px;
            font-weight: bold;
            font-size: 13px;
            border-radius: 6px 6px 0 0;
        }

        .expand-menu-item {
            padding: 10px 15px;
            cursor: pointer;
            font-size: 12px;
            border-bottom: 1px solid #eee;
            transition: background 0.2s;
        }

        .expand-menu-item:last-child {
            border-bottom: none;
        }

        .expand-menu-item:hover {
            background: #f0f8ff;
        }

        .canvas-wrapper .expandable-indicator {
            position: absolute;
            top: -8px;
            right: -8px;
            width: 20px;
            height: 20px;
            background: #4a90e2;
            color: white;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 16px;
            font-weight: bold;
            cursor: pointer;
            box-shadow: 0 2px 4px rgba(0,0,0,0.2);
            z-index: 15;
        }

        .canvas-wrapper .expandable-indicator:hover {
            background: #357abd;
        }

        .canvas-wrapper .expandable-indicator.contract {
            right: 12px;
        }

        .data-table {
            width: 100%;
            border-collapse: collapse;
            background: white;
            box-shadow: 0 2px 8px rgba(0,0,0,0.1);
            margin: 20px 0;
        }

        .data-table thead {
            background: #005A9C;
            color: white;
        }

        .data-table th {
            padding: 12px;
            text-align: left;
            border: 1px solid #ddd;
            font-weight: 600;
        }

        .data-table td {
            padding: 10px;
            border: 1px solid #ddd;
        }

        .data-table tbody tr:nth-child(even) {
            background: #f9f9f9;
        }

        .data-table tbody tr:hover {
            background: #e8f4f8;
        }

        .column-highlight {
            font-family: 'Courier New', monospace;
            background: #FFD700;
            font-weight: 600;
        }

        .info-box {
            background: #e8f4f8;
            border-left: 4px solid #005A9C;
            padding: 15px;
            margin: 20px 0;
            border-radius: 4px;
        }

        .note-box {
            margin-top: 40px;
            padding: 20px;
            background: #f9f9f9;
            border-radius: 8px;
            text-align: center;
            color: #666;
        }
    </style>
</head>
<body>

    <div class="top-band">
        <span class="top-band-text">US and Non-US Persons</span>
        <span class="top-band-text"><b>Technical Data/Information STRICTLY PROHIBITED</b></span>
        <span class="top-band-text">US and Non-US Persons</span>
    </div>

    <div class="main-content">
        <h1>Ontology Definition: Aircraft Engine Identifier</h1>

        <h2>Class Definition</h2>
        <div class="class-definition">
            <h3>Aircraft Engine Identifier</h3>
            
            <div class="definition-row">
                <strong>Definition:</strong> 
                <span>An identifier that uniquely designates a specific aircraft engine instance. This identifier serves as the primary means of tracking, referencing, and managing individual engine assets throughout their lifecycle.</span>
            </div>

            <div class="definition-row">
                <strong>Subclass of:</strong> 
                <span>Identifier</span>
            </div>

            <div class="definition-row">
                <strong>Domain:</strong> 
                <span>Aviation, Aerospace Manufacturing, Maintenance Operations</span>
            </div>

            <div class="definition-row">
                <strong>Designates:</strong> 
                <span>Aircraft Engine (Material Thing)</span>
            </div>

            <div class="definition-row">
                <strong>SKOS Examples:</strong> 
                <span>E1234 (engine serial number); E2847 (asset serial); Engine_ID E2004 in maintenance logs; JCN-100001 linked engine identifier</span>
            </div>

            <div class="definition-row">
                <strong>Rationale:</strong> 
                <span>Aircraft engines are critical, high-value assets requiring precise identification across multiple systems including defect tracking, maintenance operations, and service records. A standardized identifier enables data integration and lifecycle management across organizational boundaries.</span>
            </div>
        </div>

        <h2>Ontological Hierarchy</h2>
        <ul class="hierarchy-tree">
            <li>owl:Thing
                <ul>
                    <li>entity
                        <ul>
                            <li>continuant
                                <ul>
                                    <li>GenericallyDependentContinuant
                                        <ul>
                                            <li>InformationContentEntity
                                                <ul>
                                                    <li>DescriptiveInformation</li>
                                                    <li>PrescriptiveInformation</li>
                                                    <li>Identifier
                                                        <ul>
                                                            <li class="current-class">Aircraft Engine Identifier</li>
                                                        </ul>
                                                    </li>
                                                </ul>
                                            </li>
                                        </ul>
                                    </li>
                                </ul>
                            </li>
                        </ul>
                    </li>
                </ul>
            </li>
        </ul>

        <h2>Ontology Canvas - Ontology Modeling Scope</h2>
        <div class="canvas-container">
            <div class="canvas-wrapper">
                <div class="container">
                    <!-- Things That Exist Section (Columns 1-3) -->
                    <div class="main-section exist">
                        <div class="section-header">Things That Exist</div>
                        <div class="columns-wrapper">
                            <!-- Column 1: Material Things -->
                            <div class="section">
                                <div class="column-header">Material Things</div>
                                <div class="canvas-area" id="section1"></div>
                            </div>

                            <!-- Column 2: Qualities, Functions, Roles -->
                            <div class="section has-vertical-tabs">
                                <div class="column-header">Qualities - Functions - Roles</div>
                                <div class="tabs vertical">
                                    <div class="tab vertical-tab">Qualities</div>
                                    <div class="tab vertical-tab">Functions</div>
                                    <div class="tab vertical-tab">Roles</div>
                                </div>
                                <div class="canvas-area" id="section2"></div>
                            </div>

                            <!-- Column 3: Info Things (Wide) -->
                            <div class="section wide has-vertical-tabs">
                                <div class="column-header">Info Things</div>
                                <div class="tabs vertical">
                                    <div class="tab vertical-tab">Descriptive Data</div>
                                    <div class="tab vertical-tab">Prescription Data</div>
                                    <div class="tab vertical-tab">Identifiers</div>
                                </div>
                                <div class="canvas-area" id="section3"></div>
                            </div>
                        </div>
                    </div>

                    <!-- Things That Happen Section (Columns 4-5) -->
                    <div class="main-section happen">
                        <div class="section-header">Things That Happen</div>
                        <div class="columns-wrapper">
                            <!-- Column 4: Processes -->
                            <div class="section">
                                <div class="column-header">Processes</div>
                                <div class="canvas-area" id="section4"></div>
                            </div>

                            <!-- Column 5: Time Periods -->
                            <div class="section">
                                <div class="column-header">Time Periods</div>
                                <div class="canvas-area" id="section5"></div>
                            </div>
                        </div>
                    </div>
                </div>

                <svg id="connections"></svg>
                <div id="labelContainer" class="relation-label-container"></div>
            </div>
        </div>

        <div id="expandMenu" class="expand-menu">
            <div class="expand-menu-header" id="expandMenuHeader">Select to expand</div>
            <div id="expandMenuItems"></div>
        </div>

        <script>
            // Data source mappings for each info entity
            const dataSourceMappings = {
                'box2': { // Aircraft Engine Identifier
                    name: 'Aircraft Engine Identifier',
                    mappings: [
                        { bu: 'PW', team: 'Maintenance Engineering', platform: 'Databricks', db: 'FST', table: 'Aircraft_Installation_History', column: 'ENGINE_SN' },
                        { bu: 'PW', team: 'Operations', platform: 'Axon', db: 'HAMR', table: 'OFF_EQUIP_ENG_WRITEUP', column: 'Engine_Serial_Number' },
                        { bu: 'PW', team: 'Asset Management', platform: 'Databricks', db: 'Annual_Inspection', table: 'ON_EQUIP_ENG_WRITEUP', column: 'Engine_ID' },
                        { bu: 'PW', team: 'Quality Assurance', platform: 'Axon', db: 'FST', table: 'LCF_OUTPUT_DATA', column: 'ENG_SN' }
                    ]
                },
                'box4': { // Assembly Identifier
                    name: 'Assembly Identifier',
                    mappings: [
                        { bu: 'PW', team: 'Manufacturing', platform: 'Databricks', db: 'FST', table: 'ESAS_PART', column: 'ASSEMBLY_ID' },
                        { bu: 'PW', team: 'Maintenance Engineering', platform: 'Axon', db: 'HAMR', table: 'ESAS_COMPONENT_TASK', column: 'Assembly_Serial' },
                        { bu: 'PW', team: 'Quality Control', platform: 'Databricks', db: 'Annual_Inspection', table: 'ActionTakenCodes', column: 'Part_Assembly_ID' }
                    ]
                },
                'box5': { // Turbine Exhaust Case Design
                    name: 'Turbine Exhaust Case Design',
                    mappings: [
                        { bu: 'PW', team: 'Engineering Design', platform: 'OneDrive', db: 'N/A', table: 'N/A', column: 'TEC_Assembly_v2.3.CAD' },
                        { bu: 'PW', team: 'Product Development', platform: 'SharePoint', db: 'N/A', table: 'N/A', column: 'TEC_Design_Final.STEP' },
                        { bu: 'PW', team: 'Configuration Management', platform: 'PLM System', db: 'N/A', table: 'N/A', column: 'Turbine_Exhaust_Case_Rev5.SLDPRT' },
                        { bu: 'PW', team: 'Manufacturing Engineering', platform: 'Windchill', db: 'N/A', table: 'N/A', column: 'TEC_Manufacturing_Model.CATPart' }
                    ]
                },
                'box6': { // Assembly Design Identifier
                    name: 'Assembly Design Identifier',
                    mappings: [
                        { bu: 'PW', team: 'Engineering Design', platform: 'Databricks', db: 'FST', table: 'ESAS_PART', column: 'DESIGN_ID' },
                        { bu: 'PW', team: 'Configuration Management', platform: 'Axon', db: 'HAMR', table: 'Aircraft_Installation_History', column: 'Design_Reference' },
                        { bu: 'PW', team: 'Product Development', platform: 'Databricks', db: 'Annual_Inspection', table: 'ESAS_COMPONENT_TASK', column: 'Assembly_Design_Number' },
                        { bu: 'PW', team: 'Technical Publications', platform: 'Axon', db: 'FST', table: 'ActionTakenCodes', column: 'Design_Spec_ID' },
                        { bu: 'PW', team: 'Systems Engineering', platform: 'Databricks', db: 'HAMR', table: 'IMIS_XML_UBL_WEAR', column: 'Design_Config_ID' }
                    ]
                },
                'box8': { // Maintenance Process Identifier
                    name: 'Maintenance Process Identifier',
                    mappings: [
                        { bu: 'PW', team: 'Maintenance Operations', platform: 'Axon', db: 'HAMR', table: 'OFF_EQUIP_ENG_WRITEUP', column: 'Maintenance_Event_ID' },
                        { bu: 'PW', team: 'Service Planning', platform: 'Databricks', db: 'Annual_Inspection', table: 'ON_EQUIP_ENG_WRITEUP', column: 'Maint_Process_Number' },
                        { bu: 'PW', team: 'Field Services', platform: 'Axon', db: 'FST', table: 'Aircraft_Installation_History', column: 'Service_Record_ID' },
                        { bu: 'PW', team: 'Overhaul Operations', platform: 'Databricks', db: 'HAMR', table: 'LCF_OUTPUT_DATA', column: 'Work_Order_ID' },
                        { bu: 'PW', team: 'Inspection Services', platform: 'Axon', db: 'Annual_Inspection', table: 'IMIS_XML_UBL_CGR', column: 'Inspection_Event_ID' },
                        { bu: 'PW', team: 'Repair Services', platform: 'Databricks', db: 'FST', table: 'ActionTakenCodes', column: 'Repair_Action_ID' }
                    ]
                }
            };

            // Data structure for expandable relations
            const expandableRelations = {
                'box1': { // Aircraft Engine
                    name: 'Aircraft Engine',
                    options: [
                        {
                            id: 'turbine',
                            label: 'Turbine Exhaust Case',
                            creates: ['box3', 'box4', 'box5']
                        },
                        {
                            id: 'maintenance',
                            label: 'Maintenance Process',
                            creates: ['box7', 'box8']
                        }
                    ]
                },
                'box5': { // Turbine Exhaust Case Design
                    name: 'Turbine Exhaust Case Design',
                    options: [
                        {
                            id: 'designIdentifier',
                            label: 'Assembly Design Identifier',
                            creates: ['box6']
                        }
                    ]
                }
            };

            const allBoxes = {
                'box1': { id: 'box1', text: 'Aircraft Engine', x: '50%', y: '50%', section: 1 },
                'box2': { id: 'box2', text: 'Aircraft Engine\nIdentifier', x: '25%', y: '83.33%', section: 3, isModelingTarget: true },
                'box3': { id: 'box3', text: 'Turbine Exhaust\nCase', x: '50%', y: '80%', section: 1 },
                'box4': { id: 'box4', text: 'Assembly\nIdentifier', x: '40%', y: '83.33%', section: 3, isModelingTarget: true },
                'box5': { id: 'box5', text: 'Turbine Exhaust\nCase Design', x: '50%', y: '50%', section: 3, isModelingTarget: true },
                'box6': { id: 'box6', text: 'Assembly Design\nIdentifier', x: '75%', y: '83.33%', section: 3, isModelingTarget: true },
                'box7': { id: 'box7', text: 'Maintenance\nProcess', x: '50%', y: '50%', section: 4 },
                'box8': { id: 'box8', text: 'Maintenance Process\nIdentifier', x: '60%', y: '83.33%', section: 3, isModelingTarget: true }
            };

            const allConnections = {
                'conn1': { from: 'box2', to: 'box1', label: 'designates' },
                'conn2': { from: 'box1', to: 'box3', label: 'has part' },
                'conn3': { from: 'box4', to: 'box3', label: 'designates' },
                'conn4': { from: 'box5', to: 'box3', label: 'prescribes' },
                'conn5': { from: 'box6', to: 'box5', label: 'designates' },
                'conn6': { from: 'box1', to: 'box7', label: 'participates in' },
                'conn7': { from: 'box8', to: 'box7', label: 'designates' }
            };

            let visibleBoxes = new Set(['box1', 'box2']);
            let visibleConnections = new Set(['conn1']);
            let expandedOptions = {};

            let draggedElement = null;
            let offsetX = 0;
            let offsetY = 0;

            function init() {
                renderDiagram();
                updateDataSourceTables(); // Initialize tables on page load
                
                document.addEventListener('click', (e) => {
                    const menu = document.getElementById('expandMenu');
                    const header = document.getElementById('expandMenuHeader');
                    if (!menu.contains(e.target) && !e.target.classList.contains('box') && !e.target.classList.contains('expandable-indicator')) {
                        menu.style.display = 'none';
                        header.style.background = '#4a90e2';
                    }
                });
            }

            function renderDiagram() {
                for (let i = 1; i <= 5; i++) {
                    const section = document.getElementById(`section${i}`);
                    section.innerHTML = '';
                }

                visibleBoxes.forEach(boxId => {
                    const boxData = allBoxes[boxId];
                    if (boxData) {
                        createBox(boxData);
                        
                        if (expandableRelations[boxId]) {
                            const relation = expandableRelations[boxId];
                            const expanded = expandedOptions[boxId] || new Set();
                            
                            if (expanded.size < relation.options.length) {
                                addExpandIndicator(boxId, false);
                            }
                            if (expanded.size > 0) {
                                addExpandIndicator(boxId, true);
                            }
                        }
                    }
                });

                redrawConnections();
                updateDataSourceTables();
            }

            function addExpandIndicator(boxId, isContract = false) {
                const boxEl = document.getElementById(boxId);
                if (!boxEl) return;
                
                const indicator = document.createElement('div');
                indicator.className = 'expandable-indicator' + (isContract ? ' contract' : '');
                indicator.textContent = isContract ? '−' : '+';
                
                if (isContract) {
                    indicator.style.right = '12px';
                } else {
                    indicator.style.right = '-8px';
                }
                
                indicator.onclick = (e) => {
                    e.stopPropagation();
                    if (isContract) {
                        showContractMenu(boxId, e);
                    } else {
                        showExpandMenu(boxId, e);
                    }
                };
                boxEl.appendChild(indicator);
            }

            function showExpandMenu(boxId, event) {
                const menu = document.getElementById('expandMenu');
                const header = document.getElementById('expandMenuHeader');
                const items = document.getElementById('expandMenuItems');
                
                const relation = expandableRelations[boxId];
                if (!relation) return;
                
                if (!expandedOptions[boxId]) {
                    expandedOptions[boxId] = new Set();
                }
                
                header.textContent = `Expand: ${relation.name}`;
                items.innerHTML = '';
                
                const availableOptions = relation.options.filter(opt => !expandedOptions[boxId].has(opt.id));
                
                if (availableOptions.length === 0) {
                    menu.style.display = 'none';
                    return;
                }
                
                availableOptions.forEach(option => {
                    const item = document.createElement('div');
                    item.className = 'expand-menu-item';
                    item.textContent = option.label;
                    item.onclick = () => {
                        expandOption(boxId, option);
                        menu.style.display = 'none';
                    };
                    items.appendChild(item);
                });
                
                const rect = event.target.getBoundingClientRect();
                menu.style.left = rect.right + 10 + 'px';
                menu.style.top = rect.top + 'px';
                menu.style.display = 'block';
            }

            function showContractMenu(boxId, event) {
                const menu = document.getElementById('expandMenu');
                const header = document.getElementById('expandMenuHeader');
                const items = document.getElementById('expandMenuItems');
                
                const relation = expandableRelations[boxId];
                if (!relation) return;
                
                const expanded = expandedOptions[boxId] || new Set();
                if (expanded.size === 0) {
                    menu.style.display = 'none';
                    return;
                }
                
                header.textContent = `Contract: ${relation.name}`;
                header.style.background = '#dc3545';
                items.innerHTML = '';
                
                const expandedOptionsList = relation.options.filter(opt => expanded.has(opt.id));
                
                expandedOptionsList.forEach(option => {
                    const item = document.createElement('div');
                    item.className = 'expand-menu-item';
                    item.textContent = option.label;
                    item.onclick = () => {
                        contractOption(boxId, option);
                        menu.style.display = 'none';
                        header.style.background = '#4a90e2';
                    };
                    items.appendChild(item);
                });
                
                const rect = event.target.getBoundingClientRect();
                menu.style.left = rect.right + 10 + 'px';
                menu.style.top = rect.top + 'px';
                menu.style.display = 'block';
            }

            function expandOption(boxId, option) {
                if (!expandedOptions[boxId]) {
                    expandedOptions[boxId] = new Set();
                }
                expandedOptions[boxId].add(option.id);
                
                option.creates.forEach(newBoxId => {
                    visibleBoxes.add(newBoxId);
                });
                
                Object.keys(allConnections).forEach(connId => {
                    const conn = allConnections[connId];
                    if (visibleBoxes.has(conn.from) && visibleBoxes.has(conn.to)) {
                        visibleConnections.add(connId);
                    }
                });
                
                renderDiagram();
            }

            function contractOption(boxId, option) {
                if (expandedOptions[boxId]) {
                    expandedOptions[boxId].delete(option.id);
                }
                
                const boxesToRemove = new Set(option.creates);
                
                const checkNested = (removedBoxId) => {
                    if (expandableRelations[removedBoxId] && expandedOptions[removedBoxId]) {
                        const relation = expandableRelations[removedBoxId];
                        relation.options.forEach(opt => {
                            if (expandedOptions[removedBoxId].has(opt.id)) {
                                opt.creates.forEach(nestedBoxId => {
                                    boxesToRemove.add(nestedBoxId);
                                    checkNested(nestedBoxId);
                                });
                            }
                        });
                        delete expandedOptions[removedBoxId];
                    }
                };
                
                option.creates.forEach(boxId => checkNested(boxId));
                
                boxesToRemove.forEach(boxId => {
                    visibleBoxes.delete(boxId);
                });
                
                const connectionsToRemove = [];
                visibleConnections.forEach(connId => {
                    const conn = allConnections[connId];
                    if (boxesToRemove.has(conn.from) || boxesToRemove.has(conn.to)) {
                        connectionsToRemove.push(connId);
                    }
                });
                
                connectionsToRemove.forEach(connId => {
                    visibleConnections.delete(connId);
                });
                
                renderDiagram();
            }

            function createBox(boxData) {
                const section = document.getElementById(`section${boxData.section}`);
                const boxEl = document.createElement('div');
                boxEl.className = 'box';
                boxEl.id = boxData.id;
                boxEl.textContent = boxData.text;
                
                if (boxData.isModelingTarget) {
                    boxEl.classList.add('modeling-target');
                }
                
                if (typeof boxData.x === 'string' && boxData.x.includes('%')) {
                    boxEl.style.left = boxData.x;
                    boxEl.style.transform = 'translateX(-50%)';
                } else {
                    boxEl.style.left = boxData.x + 'px';
                }
                
                if (typeof boxData.y === 'string' && boxData.y.includes('%')) {
                    boxEl.style.top = boxData.y;
                    boxEl.style.transform = boxEl.style.transform ? 
                        boxEl.style.transform + ' translateY(-50%)' : 'translateY(-50%)';
                } else {
                    boxEl.style.top = boxData.y + 'px';
                }

                boxEl.addEventListener('mousedown', startDrag);
                section.appendChild(boxEl);
            }

            function startDrag(e) {
                draggedElement = e.target;
                const rect = draggedElement.getBoundingClientRect();
                offsetX = e.clientX - rect.left;
                offsetY = e.clientY - rect.top;
                
                document.addEventListener('mousemove', drag);
                document.addEventListener('mouseup', stopDrag);
            }

            function drag(e) {
                if (!draggedElement) return;
                
                const parent = draggedElement.parentElement;
                const parentRect = parent.getBoundingClientRect();
                
                let newX = e.clientX - parentRect.left - offsetX;
                let newY = e.clientY - parentRect.top - offsetY;
                
                newX = Math.max(0, Math.min(newX, parent.offsetWidth - draggedElement.offsetWidth));
                newY = Math.max(0, Math.min(newY, parent.offsetHeight - draggedElement.offsetHeight));
                
                draggedElement.style.transform = 'none';
                draggedElement.style.left = newX + 'px';
                draggedElement.style.top = newY + 'px';
                
                redrawConnections();
            }

            function stopDrag() {
                draggedElement = null;
                document.removeEventListener('mousemove', drag);
                document.removeEventListener('mouseup', stopDrag);
            }

            function redrawConnections() {
                const svg = document.getElementById('connections');
                const labelContainer = document.getElementById('labelContainer');
                svg.innerHTML = '';
                labelContainer.innerHTML = '';

                const canvasWrapper = document.querySelector('.canvas-wrapper');
                const canvasRect = canvasWrapper.getBoundingClientRect();

                visibleConnections.forEach(connId => {
                    const conn = allConnections[connId];
                    if (!conn) return;
                    
                    const fromBox = document.getElementById(conn.from);
                    const toBox = document.getElementById(conn.to);
                    
                    if (!fromBox || !toBox) return;

                    const fromRect = fromBox.getBoundingClientRect();
                    const toRect = toBox.getBoundingClientRect();

                    const x1 = fromRect.left + fromRect.width / 2 - canvasRect.left;
                    const y1 = fromRect.top + fromRect.height / 2 - canvasRect.top;
                    const x2 = toRect.left + toRect.width / 2 - canvasRect.left;
                    const y2 = toRect.top + toRect.height / 2 - canvasRect.top;

                    const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
                    line.setAttribute('x1', x1);
                    line.setAttribute('y1', y1);
                    line.setAttribute('x2', x2);
                    line.setAttribute('y2', y2);
                    line.setAttribute('stroke', '#4a90e2');
                    line.setAttribute('stroke-width', '2');
                    svg.appendChild(line);

                    const arrowSize = 8;
                    const angle = Math.atan2(y2 - y1, x2 - x1);
                    
                    const arrow25X = x1 + (x2 - x1) * 0.25;
                    const arrow25Y = y1 + (y2 - y1) * 0.25;
                    const arrowBack25X = arrow25X - arrowSize * Math.cos(angle);
                    const arrowBack25Y = arrow25Y - arrowSize * Math.sin(angle);
                    
                    const arrow25 = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');
                    const points25 = [
                        [arrow25X, arrow25Y],
                        [arrowBack25X - arrowSize * Math.sin(angle) / 2, arrowBack25Y + arrowSize * Math.cos(angle) / 2],
                        [arrowBack25X + arrowSize * Math.sin(angle) / 2, arrowBack25Y - arrowSize * Math.cos(angle) / 2]
                    ];
                    arrow25.setAttribute('points', points25.map(p => p.join(',')).join(' '));
                    arrow25.setAttribute('fill', '#4a90e2');
                    svg.appendChild(arrow25);
                    
                    const arrow75X = x1 + (x2 - x1) * 0.75;
                    const arrow75Y = y1 + (y2 - y1) * 0.75;
                    const arrowBack75X = arrow75X - arrowSize * Math.cos(angle);
                    const arrowBack75Y = arrow75Y - arrowSize * Math.sin(angle);
                    
                    const arrow75 = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');
                    const points75 = [
                        [arrow75X, arrow75Y],
                        [arrowBack75X - arrowSize * Math.sin(angle) / 2, arrowBack75Y + arrowSize * Math.cos(angle) / 2],
                        [arrowBack75X + arrowSize * Math.sin(angle) / 2, arrowBack75Y - arrowSize * Math.cos(angle) / 2]
                    ];
                    arrow75.setAttribute('points', points75.map(p => p.join(',')).join(' '));
                    arrow75.setAttribute('fill', '#4a90e2');
                    svg.appendChild(arrow75);

                    const labelX = (x1 + x2) / 2;
                    const labelY = (y1 + y2) / 2;
                    
                    const label = document.createElement('div');
                    label.className = 'relation-label';
                    label.textContent = conn.label;
                    label.style.left = labelX + 'px';
                    label.style.top = labelY + 'px';
                    label.style.transform = 'translate(-50%, -50%)';
                    labelContainer.appendChild(label);
                });
            }

            window.addEventListener('resize', redrawConnections);
            
            function updateDataSourceTables() {
                const container = document.getElementById('dataSourcesContainer');
                container.innerHTML = '';
                
                // Get all visible boxes that are in section 3 (Info Things) and have data mappings
                const infoBoxes = Array.from(visibleBoxes).filter(boxId => {
                    const boxData = allBoxes[boxId];
                    return boxData && boxData.section === 3 && dataSourceMappings[boxId];
                });
                
                // Sort to maintain consistent order
                infoBoxes.sort();
                
                // Create a table for each info entity
                infoBoxes.forEach(boxId => {
                    const mapping = dataSourceMappings[boxId];
                    
                    // Create title
                    const title = document.createElement('h3');
                    title.style.fontSize = '1.2em';
                    title.style.color = '#005A9C';
                    title.style.marginTop = '30px';
                    title.style.marginBottom = '15px';
                    title.textContent = mapping.name;
                    container.appendChild(title);
                    
                    // Create table
                    const table = document.createElement('table');
                    table.className = 'data-table';
                    
                    // Create thead
                    const thead = document.createElement('thead');
                    thead.innerHTML = `
                        <tr>
                            <th>Business Unit</th>
                            <th>Team</th>
                            <th>Location / Platform</th>
                            <th>Database</th>
                            <th>Table</th>
                            <th>Column</th>
                        </tr>
                    `;
                    table.appendChild(thead);
                    
                    // Create tbody
                    const tbody = document.createElement('tbody');
                    mapping.mappings.forEach(row => {
                        const tr = document.createElement('tr');
                        tr.innerHTML = `
                            <td>${row.bu}</td>
                            <td>${row.team}</td>
                            <td>${row.platform}</td>
                            <td style="font-weight: 600;">${row.db}</td>
                            <td>${row.table}</td>
                            <td class="column-highlight">${row.column}</td>
                        `;
                        tbody.appendChild(tr);
                    });
                    table.appendChild(tbody);
                    
                    container.appendChild(table);
                });
            }
            
            init();
        </script>

        <h2>Data Sources - Column Mappings</h2>
        <div id="dataSourcesContainer">
            <!-- Dynamic tables will be inserted here -->
        </div>

        <h2>Relationships to Other Data</h2>
        <div class="class-definition">
            <h3>How Aircraft Engine Identifier Connects to Other Data Elements</h3>
            
            <div class="definition-row">
                <strong>designates →</strong> 
                <span>Aircraft Engine (the physical material object)</span>
            </div>

            <div class="definition-row">
                <strong>referenced in →</strong> 
                <span>Defect Records, Work Orders, Service Tickets, Maintenance Logs</span>
            </div>
        </div>

        <div class="note-box">
            <p><strong>Note:</strong> This ontology definition is subject to iterative refinement. Feedback from domain experts and stakeholders is essential for continuous improvement.</p>
        </div>

    </div>

</body>
</html>
