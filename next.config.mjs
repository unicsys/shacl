<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Assembly - Ontology Documentation</title>
    <style>
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 1200px;
            margin: 0 auto;
            padding: 20px;
            background: #f5f5f5;
        }
        
        .header {
            background: white;
            border-radius: 8px;
            padding: 30px;
            margin-bottom: 30px;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
        
        h1 {
            color: #2c3e50;
            margin: 0 0 10px 0;
            font-size: 2.5em;
        }
        
        .iri {
            color: #3498db;
            font-family: 'Courier New', monospace;
            background: #ecf0f1;
            padding: 10px;
            border-radius: 4px;
            display: inline-block;
            margin: 10px 0;
        }
        
        .section {
            background: white;
            border-radius: 8px;
            padding: 25px;
            margin-bottom: 20px;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
        
        h2 {
            color: #34495e;
            border-bottom: 2px solid #3498db;
            padding-bottom: 10px;
            margin-top: 0;
        }
        
        .hierarchy {
            font-family: 'Courier New', monospace;
            background: #f8f9fa;
            padding: 20px;
            border-left: 4px solid #3498db;
            margin: 15px 0;
        }
        
        .hierarchy-line {
            margin: 2px 0;
        }
        
        .current-class {
            background: #3498db;
            color: white;
            padding: 2px 8px;
            border-radius: 3px;
            font-weight: bold;
        }
        
        .property-table {
            width: 100%;
            border-collapse: collapse;
            margin: 15px 0;
        }
        
        .property-table th {
            background: #34495e;
            color: white;
            padding: 12px;
            text-align: left;
        }
        
        .property-table td {
            padding: 12px;
            border-bottom: 1px solid #ecf0f1;
        }
        
        .property-table tr:hover {
            background: #f8f9fa;
        }
        
        .property-name {
            font-weight: bold;
            color: #2c3e50;
        }
        
        .property-value {
            font-family: 'Courier New', monospace;
            color: #7f8c8d;
        }
        
        .example-box {
            background: #ecf8ff;
            border-left: 4px solid #3498db;
            padding: 15px;
            margin: 15px 0;
        }
        
        .axiom-box {
            background: #f4f4f4;
            border: 1px solid #ddd;
            border-radius: 4px;
            padding: 15px;
            margin: 15px 0;
            font-family: 'Courier New', monospace;
        }
        
        .graph-container {
            background: #fff;
            border: 1px solid #ddd;
            border-radius: 4px;
            padding: 20px;
            margin: 15px 0;
            text-align: center;
        }
        
        svg {
            max-width: 100%;
            height: auto;
        }
        
        .node {
            cursor: pointer;
        }
        
        .node-label {
            font-size: 12px;
            font-family: Arial, sans-serif;
        }
        
        .current-node {
            fill: #3498db;
        }
        
        .related-node {
            fill: #95a5a6;
        }
        
        .edge {
            stroke: #7f8c8d;
            stroke-width: 1.5;
            fill: none;
        }
        
        .tag {
            display: inline-block;
            background: #3498db;
            color: white;
            padding: 4px 10px;
            border-radius: 4px;
            margin: 2px;
            font-size: 0.9em;
        }
        
        .namespace {
            color: #7f8c8d;
            font-style: italic;
        }

        .data-mapping {
            background: #f8f9fa;
            border-radius: 4px;
            padding: 15px;
            margin: 15px 0;
        }

        .mapping-item {
            margin: 8px 0;
            padding: 8px;
            background: white;
            border-left: 3px solid #27ae60;
        }

        code {
            background: #f4f4f4;
            padding: 2px 6px;
            border-radius: 3px;
            font-family: 'Courier New', monospace;
        }
    </style>
</head>
<body>
    <div class="header">
        <h1>Assembly</h1>
        <div class="namespace">Namespace: Common Core Ontology (CCO)</div>
        <div class="iri">https://ontology.company.com/cco#Assembly</div>
        <div style="margin-top: 15px;">
            <span class="tag">Material Artifact</span>
            <span class="tag">BFO:MaterialEntity</span>
            <span class="tag">Primitive</span>
        </div>
    </div>

    <div class="section">
        <h2>Class Hierarchy</h2>
        <div class="hierarchy">
            <div class="hierarchy-line">▼ owl:Thing</div>
            <div class="hierarchy-line">  ▼ entity</div>
            <div class="hierarchy-line">    ▼ continuant</div>
            <div class="hierarchy-line">      ▼ independent continuant</div>
            <div class="hierarchy-line">        ▼ material entity</div>
            <div class="hierarchy-line">          ▼ object</div>
            <div class="hierarchy-line">            ▼ MaterialArtifact</div>
            <div class="hierarchy-line">              ▶ <span class="current-class">Assembly</span></div>
        </div>
    </div>

    <div class="section">
        <h2>Definition</h2>
        <p><strong>Natural Language:</strong> A material artifact that is composed of material components that are physically connected and that is capable of disassembly.</p>
        
        <p><strong>Semi-Formal:</strong> An Assembly is a MaterialArtifact where there exist at least two distinct MaterialComponents that are component parts of all times.</p>
        
        <div class="axiom-box">
            <strong>First-Order Logic:</strong><br>
            Assembly(x) → MaterialArtifact(x) ∧ ∃c1,c2(MaterialComponent(c1) ∧ MaterialComponent(c2) ∧ 
            c1≠c2 ∧ componentPartOfAtAllTimes(c1,x) ∧ componentPartOfAtAllTimes(c2,x))
        </div>
    </div>

    <div class="section">
        <h2>Examples</h2>
        <div class="example-box">
            <strong>Counter Examples:</strong>
            <ul>
                <li>A portion of material</li>
                <li>A piece of glass</li>
                <li>A rod of aluminum</li>
                <li>A roll of aluminum</li>
                <li>An engine block (when considered as a single cast piece)</li>
            </ul>
        </div>
        
        <div class="example-box">
            <strong>Positive Examples:</strong>
            <ul>
                <li><strong>Powertrain Assembly:</strong> Partially-assembled powertrain with transmission assembly</li>
                <li><strong>Driveshaft Assembly:</strong> Temporarily disassembled for repair or routine maintenance</li>
                <li><strong>Separator Assembly:</strong> Consisting of various shaped separator parts that safeguard wine bottles during transport</li>
                <li><strong>Aircraft Engine Assembly:</strong> GTF engine with multiple components (fan, compressor, turbine)</li>
                <li><strong>Electronic Circuit Board:</strong> Multiple components soldered together but capable of desoldering</li>
            </ul>
        </div>
    </div>

    <div class="section">
        <h2>Relationships</h2>
        <div class="graph-container">
            <svg width="600" height="400" viewBox="0 0 600 400">
                <!-- Define arrow markers -->
                <defs>
                    <marker id="arrowhead" markerWidth="10" markerHeight="7" 
                            refX="9" refY="3.5" orient="auto">
                        <polygon points="0 0, 10 3.5, 0 7" fill="#7f8c8d" />
                    </marker>
                </defs>
                
                <!-- Central node (Assembly) -->
                <circle cx="300" cy="200" r="40" class="node current-node"/>
                <text x="300" y="205" text-anchor="middle" class="node-label" fill="white">Assembly</text>
                
                <!-- Parent: MaterialArtifact -->
                <circle cx="300" cy="80" r="35" class="node related-node"/>
                <text x="300" y="85" text-anchor="middle" class="node-label">MaterialArtifact</text>
                <line x1="300" y1="115" x2="300" y2="160" class="edge" marker-end="url(#arrowhead)"/>
                <text x="310" y="135" font-size="10" fill="#7f8c8d">subClassOf</text>
                
                <!-- Related: MaterialComponent -->
                <circle cx="150" cy="200" r="35" class="node related-node"/>
                <text x="150" y="205" text-anchor="middle" class="node-label">MaterialComponent</text>
                <line x1="185" y1="200" x2="260" y2="200" class="edge" marker-end="url(#arrowhead)"/>
                <text x="200" y="195" font-size="10" fill="#7f8c8d">hasPart</text>
                
                <!-- Related: AssemblyProcess -->
                <circle cx="450" cy="200" r="35" class="node related-node"/>
                <text x="450" y="205" text-anchor="middle" class="node-label">AssemblyProcess</text>
                <line x1="340" y1="200" x2="415" y2="200" class="edge" marker-end="url(#arrowhead)"/>
                <text x="360" y="195" font-size="10" fill="#7f8c8d">assembledBy</text>
                
                <!-- Child: PieceOfEquipment -->
                <circle cx="220" cy="320" r="35" class="node related-node"/>
                <text x="220" y="325" text-anchor="middle" class="node-label">PieceOfEquipment</text>
                <line x1="270" y1="230" x2="245" y2="285" class="edge" marker-end="url(#arrowhead)"/>
                <text x="240" y="260" font-size="10" fill="#7f8c8d">parentOf</text>
                
                <!-- Related: MaintenanceProcess -->
                <circle cx="380" cy="320" r="35" class="node related-node"/>
                <text x="380" y="325" text-anchor="middle" class="node-label">MaintenanceProcess</text>
                <line x1="330" y1="230" x2="355" y2="285" class="edge" marker-end="url(#arrowhead)"/>
                <text x="340" y="260" font-size="10" fill="#7f8c8d">maintainedBy</text>
            </svg>
        </div>
    </div>

    <div class="section">
        <h2>Properties</h2>
        <table class="property-table">
            <thead>
                <tr>
                    <th>Property</th>
                    <th>Type</th>
                    <th>Description</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td class="property-name">isPrimitive</td>
                    <td class="property-value">xsd:boolean</td>
                    <td>true - This is a primitive class in the ontology</td>
                </tr>
                <tr>
                    <td class="property-name">rdfs:label</td>
                    <td class="property-value">xsd:string</td>
                    <td>"assembly" (en-us)</td>
                </tr>
                <tr>
                    <td class="property-name">adaptedFrom</td>
                    <td class="property-value">xsd:anyURI</td>
                    <td>APICS 14 ed., 2013; DoD Standard Practice MIL-STD-130N</td>
                </tr>
                <tr>
                    <td class="property-name">disassemblyCapability</td>
                    <td class="property-value">xsd:string</td>
                    <td>Required capability for all Assembly instances</td>
                </tr>
            </tbody>
        </table>
    </div>

    <div class="section">
        <h2>Data Catalog Mappings</h2>
        <div class="data-mapping">
            <h3>Mapped Database Columns</h3>
            <div class="mapping-item">
                <strong>app_sap.parts_inventory</strong><br>
                Columns: <code>assembly_id</code>, <code>assembly_type</code>, <code>parent_assembly</code>
            </div>
            <div class="mapping-item">
                <strong>prd_vantage.engine_components</strong><br>
                Columns: <code>component_assembly_num</code>, <code>assembly_serial</code>
            </div>
            <div class="mapping-item">
                <strong>app_oneaero.maintenance_records</strong><br>
                Columns: <code>assembly_workscope</code>, <code>disassembly_flag</code>
            </div>
        </div>
        
        <div class="data-mapping">
            <h3>Related Decision Support Questions</h3>
            <ul>
                <li>What assemblies require disassembly during shop visits?</li>
                <li>Which components are part of critical assemblies?</li>
                <li>What is the hierarchy of assemblies within an engine?</li>
                <li>Which assemblies have pending service bulletins?</li>
            </ul>
        </div>
    </div>

    <div class="section">
        <h2>Usage Notes</h2>
        <p>Every assembly has a plurality of material components. While this is captured in the first-order logic axiom, due to reasoning limitations with cardinality restrictions and complex properties, the OWL implementation uses 'some' instead of min 2.</p>
        
        <p><strong>Rationale:</strong> There are insufficient constructs in the ontology to provide necessary and sufficient conditions. Namely, 'disassembly capability' is missing from the formal axiomatization.</p>
    </div>

    <div class="section">
        <h2>Metadata</h2>
        <table class="property-table">
            <tbody>
                <tr>
                    <td class="property-name">Last Modified</td>
                    <td colspan="2">2025-01-15T10:30:00Z</td>
                </tr>
                <tr>
                    <td class="property-name">Version</td>
                    <td colspan="2">1.2.0</td>
                </tr>
                <tr>
                    <td class="property-name">Data Steward</td>
                    <td colspan="2">Engineering Data Governance Team</td>
                </tr>
                <tr>
                    <td class="property-name">Validation Status</td>
                    <td colspan="2"><span class="tag" style="background: #27ae60;">Approved</span></td>
                </tr>
            </tbody>
        </table>
    </div>
</body>
</html>
