<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Assembly</title>
    <style>
        body {
            font-family: sans-serif;
            line-height: 1.5;
            color: black;
            background: white;
            margin: 2em 1em 2em 70px;
            padding: 0;
        }
        
        h1, h2, h3 {
            color: #005A9C;
            background: white;
        }
        
        h1 {
            font-size: 2em;
            margin: 0.67em 0;
        }
        
        h2 {
            font-size: 1.5em;
            margin: 1em 0 0.5em 0;
            border-bottom: 1px solid #ccc;
            padding-bottom: 3px;
        }
        
        h3 {
            font-size: 1.17em;
            margin: 1em 0;
        }
        
        a {
            color: #00C;
            text-decoration: none;
        }
        
        a:hover {
            text-decoration: underline;
        }
        
        .iri {
            font-family: monospace;
            color: #00C;
        }
        
        .hierarchy {
            font-family: monospace;
            margin: 1em 0;
            line-height: 1.4;
        }
        
        .hierarchy ul {
            list-style: none;
            margin: 0;
            padding-left: 2em;
        }
        
        .hierarchy > ul {
            padding-left: 0;
        }
        
        .hierarchy li {
            position: relative;
        }
        
        .hierarchy li::before {
            content: "├─ ";
            position: absolute;
            left: -1.5em;
        }
        
        .hierarchy li:last-child::before {
            content: "└─ ";
        }
        
        .hierarchy .current {
            background: #E0E0FF;
            font-weight: bold;
            padding: 2px 4px;
        }
        
        table {
            border-collapse: collapse;
            margin: 1em 0;
        }
        
        th, td {
            border: 1px solid #ddd;
            padding: 8px;
            text-align: left;
        }
        
        th {
            background: #f0f0f0;
        }
        
        dt {
            font-weight: bold;
            margin-top: 1em;
        }
        
        dd {
            margin-left: 2em;
            margin-bottom: 0.5em;
        }
        
        .example {
            background: #f5f5f5;
            border-left: 3px solid #ccc;
            padding: 0.5em 1em;
            margin: 1em 0;
        }
        
        .axiom {
            font-family: monospace;
            background: #f9f9f9;
            border: 1px solid #ddd;
            padding: 1em;
            margin: 1em 0;
            overflow-x: auto;
        }
        
        code {
            font-family: monospace;
            background: #f5f5f5;
            padding: 2px 4px;
        }
        
        .property-name {
            font-weight: bold;
        }
        
        .datatype {
            color: #666;
            font-family: monospace;
        }

        .graph-box {
            border: 1px solid #ddd;
            padding: 1em;
            margin: 1em 0;
            background: #fafafa;
        }

        svg {
            max-width: 100%;
            height: auto;
        }
        
        .metadata {
            background: #f9f9f9;
            border: 1px solid #ddd;
            padding: 1em;
            margin: 2em 0;
        }
        
        .metadata dl {
            margin: 0;
        }
        
        .metadata dt {
            display: inline-block;
            width: 150px;
            margin-top: 0.5em;
        }
        
        .metadata dd {
            display: inline;
            margin-left: 0;
        }
    </style>
</head>
<body>
    <h1>Assembly</h1>
    
    <dl>
        <dt>IRI:</dt>
        <dd><a href="https://spec.industrialontologies.org/ontology/core/Core/Assembly" class="iri">https://spec.industrialontologies.org/ontology/core/Core/Assembly</a></dd>
    </dl>

    <h2>Class Hierarchy</h2>
    <div class="hierarchy">
        <ul>
            <li>owl:Thing
                <ul>
                    <li>entity
                        <ul>
                            <li>continuant
                                <ul>
                                    <li>independent continuant
                                        <ul>
                                            <li>material entity
                                                <ul>
                                                    <li>object
                                                        <ul>
                                                            <li>MaterialArtifact
                                                                <ul>
                                                                    <li><span class="current">Assembly</span></li>
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
            </li>
        </ul>
    </div>

    <h2>Definition</h2>
    <p>A material artifact that is composed of material components that are physically connected and that is capable of disassembly.</p>

    <h3>Formal Definition</h3>
    <div class="axiom">
Assembly(x) → MaterialArtifact(x) ∧ <br/>
∃c1,c2(MaterialComponent(c1) ∧ MaterialComponent(c2) ∧ c1≠c2 ∧ <br/>
componentPartOfAtAllTimes(c1,x) ∧ componentPartOfAtAllTimes(c2,x))
    </div>

    <h2>Annotations</h2>
    <dl>
        <dt>rdfs:label</dt>
        <dd>assembly <span class="datatype">(en-us)</span></dd>
        
        <dt>isPrimitive</dt>
        <dd>true <span class="datatype">(xsd:boolean)</span></dd>
        
        <dt>adaptedFrom</dt>
        <dd>APICS 14 ed., 2013; DoD Standard Practice, Identification Marking of US Military Property (MIL-STD-130N Nov. 2012)</dd>
    </dl>

    <h2>Examples</h2>
    
    <h3>Counter Examples</h3>
    <div class="example">
        <ul>
            <li>a portion of material</li>
            <li>a piece of glass</li>
            <li>a rod of aluminum</li>
            <li>a roll of aluminum</li>
            <li>an engine block</li>
        </ul>
    </div>

    <h3>Positive Examples</h3>
    <div class="example">
        <ul>
            <li>powertrain assembly</li>
            <li>partially-assembled powertrain + transmission assembly</li>
            <li>driveshaft assembly temporarily disassembled for repair or routine maintenance</li>
            <li>separator assembly consisting of various shaped separator parts that safeguard wine bottles in a case during transport</li>
        </ul>
    </div>

    <h2>Object Properties</h2>
    <table>
        <tr>
            <th>Property</th>
            <th>Domain → Range</th>
            <th>Description</th>
        </tr>
        <tr>
            <td class="property-name">hasPart</td>
            <td>Assembly → MaterialComponent</td>
            <td>An assembly has material components as parts</td>
        </tr>
        <tr>
            <td class="property-name">assembledBy</td>
            <td>Assembly → AssemblyProcess</td>
            <td>The process by which an assembly is created</td>
        </tr>
        <tr>
            <td class="property-name">maintainedBy</td>
            <td>Assembly → MaintenanceProcess</td>
            <td>The process by which an assembly is maintained</td>
        </tr>
    </table>

    <h2>Relationships Graph</h2>
    <div class="graph-box">
        <svg width="500" height="300" viewBox="0 0 500 300">
            <defs>
                <marker id="arrow" markerWidth="10" markerHeight="7" 
                        refX="9" refY="3.5" orient="auto">
                    <polygon points="0 0, 10 3.5, 0 7" fill="#666" />
                </marker>
            </defs>
            
            <!-- Nodes -->
            <rect x="200" y="120" width="100" height="40" fill="#E0E0FF" stroke="#005A9C" stroke-width="2"/>
            <text x="250" y="145" text-anchor="middle" font-family="sans-serif" font-size="14">Assembly</text>
            
            <rect x="200" y="20" width="100" height="40" fill="#f0f0f0" stroke="#666"/>
            <text x="250" y="45" text-anchor="middle" font-family="sans-serif" font-size="12">MaterialArtifact</text>
            
            <rect x="50" y="120" width="110" height="40" fill="#f0f0f0" stroke="#666"/>
            <text x="105" y="145" text-anchor="middle" font-family="sans-serif" font-size="12">MaterialComponent</text>
            
            <rect x="340" y="120" width="110" height="40" fill="#f0f0f0" stroke="#666"/>
            <text x="395" y="145" text-anchor="middle" font-family="sans-serif" font-size="12">AssemblyProcess</text>
            
            <rect x="125" y="220" width="110" height="40" fill="#f0f0f0" stroke="#666"/>
            <text x="180" y="245" text-anchor="middle" font-family="sans-serif" font-size="12">PieceOfEquipment</text>
            
            <!-- Edges -->
            <line x1="250" y1="60" x2="250" y2="120" stroke="#666" stroke-width="1" marker-end="url(#arrow)"/>
            <text x="255" y="90" font-size="10" fill="#666">subClassOf</text>
            
            <line x1="160" y1="140" x2="200" y2="140" stroke="#666" stroke-width="1" marker-end="url(#arrow)"/>
            <text x="170" y="135" font-size="10" fill="#666">hasPart</text>
            
            <line x1="300" y1="140" x2="340" y2="140" stroke="#666" stroke-width="1" marker-end="url(#arrow)"/>
            <text x="305" y="135" font-size="10" fill="#666">assembledBy</text>
            
            <line x1="230" y1="160" x2="200" y2="220" stroke="#666" stroke-width="1" marker-end="url(#arrow)"/>
            <text x="195" y="190" font-size="10" fill="#666">parentOf</text>
        </svg>
    </div>

    <h2>Data Catalog Mappings</h2>
    <table>
        <tr>
            <th>Database.Table</th>
            <th>Columns</th>
        </tr>
        <tr>
            <td><code>app_sap.parts_inventory</code></td>
            <td>assembly_id, assembly_type, parent_assembly</td>
        </tr>
        <tr>
            <td><code>prd_vantage.engine_components</code></td>
            <td>component_assembly_num, assembly_serial</td>
        </tr>
        <tr>
            <td><code>app_oneaero.maintenance_records</code></td>
            <td>assembly_workscope, disassembly_flag</td>
        </tr>
    </table>

    <h2>Usage Notes</h2>
    <p>Every assembly has a plurality of material components. While this is captured in the first-order logic axiom, due to reasoning limitations with cardinality restrictions and complex properties, the OWL axiom uses 'some' instead of min 2. Hence, this class should be modeled as having at least two material components on the instance level.</p>
    
    <p><strong>Primitive Rationale:</strong> There are insufficient constructs in the ontology to provide necessary and sufficient conditions. Namely, 'disassembly capability' is missing.</p>

    <div class="metadata">
        <h3>Metadata</h3>
        <dl>
            <dt>Last Modified:</dt>
            <dd>2025-01-15</dd>
            
            <dt>Version:</dt>
            <dd>1.2.0</dd>
            
            <dt>Data Steward:</dt>
            <dd>Engineering Data Governance Team</dd>
            
            <dt>Status:</dt>
            <dd>Approved</dd>
        </dl>
    </div>
</body>
</html>
