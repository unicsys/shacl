<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>SPARQL Query Visualization</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/vis-network/9.1.2/dist/dist/vis-network.min.css"/>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/vis-network/9.1.2/dist/vis-network.min.js"></script>

    <style>
        body, html {
            height: 100%;
            margin: 0;
            font-family: Arial, sans-serif;
            background-color: #f8f9fa;
        }
        #mynetwork {
            width: 100%;
            height: 92vh;
            border: 1px solid #ddd;
            background-color: #fff;
            border-radius: 5px;
        }
        .sparql-query-container {
            font-family: 'Courier New', Courier, monospace;
            background-color: #ffffff;
            border: 1px solid #ddd;
            padding: 15px;
            border-radius: 5px;
            font-size: 13px;
            line-height: 1.5;
        }
        .sparql-query-container .sparql-line {
            display: block;
            padding: 2px 5px;
            margin: 0 -5px;
            border-radius: 3px;
            transition: background-color 0.3s ease;
        }
        .sparql-query-container .highlight-line {
            background-color: #fff1a8;
            font-weight: 600;
        }
        .sparql-comment { color: #6a737d; font-style: italic; }
        .sparql-keyword { color: #d73a49; font-weight: bold; }
        .sparql-variable { color: #005cc5; }
        .sparql-uri { color: #22863a; }
        .sparql-class-type { color: #e36209; font-weight: 600; }
        .sparql-property { color: #6f42c1; }
        .sparql-identifier { color: #032f62; font-weight: 600; }
        #explanation-box {
            margin-top: 15px;
            padding: 12px;
            background-color: #e7f3ff;
            border-radius: 5px;
            border-left: 4px solid #0366d6;
            min-height: 80px;
        }
        #results-container {
            margin-top: 15px;
        }
        .btn-control {
            padding: 8px 20px;
            font-size: 14px;
        }
        .legend {
            margin-top: 15px;
            padding: 10px;
            background-color: #f8f9fa;
            border: 1px solid #dee2e6;
            border-radius: 5px;
            font-size: 12px;
        }
        .legend-item {
            display: flex;
            align-items: center;
            gap: 8px;
            margin: 5px 0;
        }
        .legend-box {
            width: 18px;
            height: 18px;
            border: 1px solid #666;
        }
        .legend-dot {
            width: 14px;
            height: 14px;
            border-radius: 50%;
            border: 1px solid #666;
        }
        .step-counter {
            font-size: 13px;
            color: #6c757d;
            margin-top: 5px;
        }
    </style>
</head>
<body>
    <div class="container-fluid pt-3">
        <div class="row">
            <!-- Left Column -->
            <div class="col-lg-5">
                <h5 class="mb-3">SPARQL Query Execution</h5>
                
                <div class="sparql-query-container">
                    <span class="sparql-line sparql-comment"># Find repairs on Aircraft N737AA with operator and date</span>
                    <span class="sparql-line"><span class="sparql-keyword">PREFIX</span> ex: <<span class="sparql-uri">http://example.com/ontology#</span>></span>
                    <span class="sparql-line"><span class="sparql-keyword">PREFIX</span> rdfs: <<span class="sparql-uri">http://www.w3.org/2000/01/rdf-schema#</span>></span>
                    <br>
                    <span class="sparql-line" id="step7-line"><span class="sparql-keyword">SELECT</span> <span class="sparql-variable">?repair</span> <span class="sparql-variable">?operator</span> <span class="sparql-variable">?date</span></span>
                    <span class="sparql-line"><span class="sparql-keyword">WHERE</span> {</span>
                    <div style="padding-left: 20px;">
                        <span class="sparql-line sparql-comment"># 1. Start with the specific aircraft</span>
                        <span class="sparql-line" id="step0-line"><span class="sparql-keyword">VALUES</span> <span class="sparql-variable">?aircraft</span> { <span class="sparql-identifier">ex:N737AA</span> }</span>
                        
                        <span class="sparql-line sparql-comment"># 2. Find repair process with this aircraft</span>
                        <span class="sparql-line" id="step1-line"><span class="sparql-variable">?repair</span> <span class="sparql-property">ex:has_participant</span> <span class="sparql-variable">?aircraft</span> .</span>
                        
                        <span class="sparql-line sparql-comment"># 3. Verify repair is a RepairProcess</span>
                        <span class="sparql-line" id="step2-line"><span class="sparql-variable">?repair</span> <span class="sparql-keyword">a</span> <span class="sparql-class-type">ex:RepairProcess</span> .</span>
                        
                        <span class="sparql-line sparql-comment"># 4. Find the operator (person participant)</span>
                        <span class="sparql-line" id="step3-line"><span class="sparql-variable">?repair</span> <span class="sparql-property">ex:has_participant</span> <span class="sparql-variable">?operator</span> .</span>
                        
                        <span class="sparql-line sparql-comment"># 5. Verify operator is a Person</span>
                        <span class="sparql-line" id="step4-line"><span class="sparql-variable">?operator</span> <span class="sparql-keyword">a</span> <span class="sparql-class-type">ex:Person</span> .</span>
                        
                        <span class="sparql-line sparql-comment"># 6. Find when the repair occurred</span>
                        <span class="sparql-line" id="step5-line"><span class="sparql-variable">?repair</span> <span class="sparql-property">ex:occurs_on</span> <span class="sparql-variable">?date</span> .</span>
                        
                        <span class="sparql-line sparql-comment"># 7. Verify date is a TimeInterval</span>
                        <span class="sparql-line" id="step6-line"><span class="sparql-variable">?date</span> <span class="sparql-keyword">a</span> <span class="sparql-class-type">ex:TimeInterval</span> .</span>
                    </div>
                    <span class="sparql-line">}</span>
                </div>

                <div class="mt-3">
                    <button class="btn btn-primary btn-control" onclick="nextStep();">▶ Next Step</button>
                    <button class="btn btn-secondary btn-control" onclick="resetAll();">↺ Reset</button>
                    <div class="step-counter" id="step-counter">Ready to start</div>
                </div>
                
                <div id="explanation-box">
                    <strong>Explanation:</strong>
                    <p id="explanation-text" class="mb-0">Click "Next Step" to begin the query execution and see how SPARQL traverses the knowledge graph.</p>
                </div>

                <div id="results-container">
                    <h6>Query Results:</h6>
                    <table class="table table-sm table-bordered table-striped">
                        <thead>
                            <tr>
                                <th>?repair</th>
                                <th>?operator</th>
                                <th>?date</th>
                            </tr>
                        </thead>
                        <tbody id="results-body"></tbody>
                    </table>
                </div>


            </div>

            <!-- Right Column -->
            <div class="col-lg-7">
                <h5 class="mb-3">Knowledge Graph</h5>
                <div id="mynetwork"></div>
            </div>
        </div>
    </div>

    <script>
        var network;
        var nodes, edges;
        var originalNodeStyles = {};
        var originalEdgeStyles = {};
        var currentStep = -1;

        const highlightOptions = {
            node: { 
                color: { background: '#ff5722', border: '#d44a1c' }, 
                font: { color: 'black', size: 15, face: 'Arial', bold: true },
                borderWidth: 3
            },
            edge: { 
                color: '#ff5722', 
                width: 4,
                arrows: 'to'
            }
        };

        const querySteps = [
            {
                lineId: 'step0-line',
                explanation: 'Step 1: Start by binding the ?aircraft variable to the specific aircraft instance ex:N737AA.',
                nodesToHighlight: ['N737AA'],
                edgesToHighlight: [],
                stepLabel: 'Step 1 of 8'
            },
            {
                lineId: 'step1-line',
                explanation: 'Step 2: Find the repair process where this aircraft was a participant. The pattern matches Repair-01.',
                nodesToHighlight: ['N737AA', 'Repair-01'],
                edgesToHighlight: ['e-repair01-aircraft'],
                stepLabel: 'Step 2 of 8'
            },
            {
                lineId: 'step2-line',
                explanation: 'Step 3: Verify that Repair-01 is indeed a RepairProcess. This type check confirms the pattern match.',
                nodesToHighlight: ['Repair-01', 'RepairProcess'],
                edgesToHighlight: ['e-repair01-type'],
                stepLabel: 'Step 3 of 8'
            },
            {
                lineId: 'step3-line',
                explanation: 'Step 4: Find another participant in the same repair process. This binds ?operator to John Doe.',
                nodesToHighlight: ['Repair-01', 'JohnDoe'],
                edgesToHighlight: ['e-repair01-person'],
                stepLabel: 'Step 4 of 8'
            },
            {
                lineId: 'step4-line',
                explanation: 'Step 5: Verify that John Doe is of type Person. The type constraint is satisfied.',
                nodesToHighlight: ['JohnDoe', 'Person'],
                edgesToHighlight: ['e-johndoe-type'],
                stepLabel: 'Step 5 of 8'
            },
            {
                lineId: 'step5-line',
                explanation: 'Step 6: Find when the repair occurred by following the occurs_on relationship. This binds ?date to Date-01.',
                nodesToHighlight: ['Repair-01', 'Date-01'],
                edgesToHighlight: ['e-repair01-date'],
                stepLabel: 'Step 6 of 8'
            },
            {
                lineId: 'step6-line',
                explanation: 'Step 7: Verify that Date-01 is a TimeInterval. All type constraints are now satisfied.',
                nodesToHighlight: ['Date-01', 'TimeInterval'],
                edgesToHighlight: ['e-date01-type'],
                stepLabel: 'Step 7 of 8'
            },
            {
                lineId: 'step7-line',
                explanation: 'Step 8: All pattern matches are complete! The SELECT clause projects the results: Repair-01, John Doe, and 1-Jan-25.',
                nodesToHighlight: ['Repair-01', 'JohnDoe', 'Date-01'],
                edgesToHighlight: [],
                isFinal: true,
                stepLabel: 'Step 8 of 8 - Complete'
            }
        ];

        function resetAll() {
            currentStep = -1;
            document.querySelectorAll('.sparql-line').forEach(el => el.classList.remove('highlight-line'));
            document.getElementById('explanation-text').textContent = 'Click "Next Step" to begin the query execution and see how SPARQL traverses the knowledge graph.';
            document.getElementById('step-counter').textContent = 'Ready to start';
            document.getElementById('results-body').innerHTML = '';
            resetGraphStyles();
        }

        function nextStep() {
            currentStep++;
            if (currentStep >= querySteps.length) {
                currentStep = 0;
                resetAll();
                return;
            }
            
            resetAllButKeepState();
            
            const step = querySteps[currentStep];
            document.getElementById(step.lineId).classList.add('highlight-line');
            document.getElementById('explanation-text').textContent = step.explanation;
            document.getElementById('step-counter').textContent = step.stepLabel;

            const nodesToUpdate = step.nodesToHighlight.map(id => ({id: id, ...highlightOptions.node}));
            if(nodesToUpdate.length > 0) nodes.update(nodesToUpdate);

            const edgesToUpdate = step.edgesToHighlight.map(id => ({id: id, ...highlightOptions.edge}));
            if(edgesToUpdate.length > 0) edges.update(edgesToUpdate);
            
            if (step.isFinal) {
                populateResults();
            }

            // Focus on highlighted nodes
            if (step.nodesToHighlight.length > 0) {
                network.fit({
                    nodes: step.nodesToHighlight,
                    animation: {
                        duration: 500,
                        easingFunction: 'easeInOutQuad'
                    }
                });
            }
        }

        function resetAllButKeepState() {
            resetGraphStyles();
            document.querySelectorAll('.sparql-line').forEach(el => el.classList.remove('highlight-line'));
            document.getElementById('results-body').innerHTML = '';
        }

        function resetGraphStyles() {
            const nodesToUpdate = Object.keys(originalNodeStyles).map(id => ({ id: id, ...originalNodeStyles[id] }));
            if (nodesToUpdate.length) nodes.update(nodesToUpdate);
            
            const edgesToUpdate = Object.keys(originalEdgeStyles).map(id => ({ id: id, ...originalEdgeStyles[id] }));
            if (edgesToUpdate.length) edges.update(edgesToUpdate);
        }
        
        function populateResults() {
            const resultsBody = document.getElementById('results-body');
            const results = [
                {repair: 'ex:Repair-01', operator: 'ex:JohnDoe (John Doe)', date: 'ex:Date-01 (1-Jan-25)'}
            ];
            results.forEach(res => {
                let row = resultsBody.insertRow();
                row.insertCell(0).textContent = res.repair;
                row.insertCell(1).textContent = res.operator;
                row.insertCell(2).textContent = res.date;
            });
        }

        function drawGraph() {
            const container = document.getElementById('mynetwork');
            
            // All nodes including ontology and instances
            const allNodesData = [
                // Upper ontology
                {id: "Entity", label: "Entity", shape: "box", color: {background:'#FDD4A0', border: '#c7a87e'}, size: 25},
                {id: "Continuant", label: "Continuant", shape: "box", color: {background:'#FDD4A0', border: '#c7a87e'}, size: 22},
                {id: "Occurrent", label: "Occurrent", shape: "box", color: {background:'#FDD4A0', border: '#c7a87e'}, size: 22},
                
                // Domain classes
                {id: "Aircraft", label: "Aircraft", shape: "box", color: {background:'#FFA500', border: '#c78100'}, size: 20},
                {id: "Person", label: "Person", shape: "box", color: {background:'#FFA500', border: '#c78100'}, size: 20},
                {id: "RepairProcess", label: "RepairProcess", shape: "box", color: {background:'#FFA500', border: '#c78100'}, size: 20},
                {id: "TimeInterval", label: "TimeInterval", shape: "box", color: {background:'#FFA500', border: '#c78100'}, size: 20},
                
                // Instances - People
                {id: "JohnDoe", label: "John Doe", shape: "dot", color: {background:'#8A2BE2', border: '#6c22b5'}, size: 18},
                {id: "JaneSmith", label: "Jane Smith", shape: "dot", color: {background:'#8A2BE2', border: '#6c22b5'}, size: 18},
                
                // Instances - Aircraft
                {id: "N737AA", label: "N737AA", shape: "dot", color: {background:'#8A2BE2', border: '#6c22b5'}, size: 22},
                {id: "N905FR", label: "N905FR", shape: "dot", color: {background:'#8A2BE2', border: '#6c22b5'}, size: 22},
                
                // Instances - Dates
                {id: "Date-01", label: "1-Jan-25", shape: "dot", color: {background:'#9370DB', border: '#7851c9'}, size: 16},
                {id: "Date-02", label: "1-Feb-25", shape: "dot", color: {background:'#9370DB', border: '#7851c9'}, size: 16},
                {id: "Date-03", label: "1-Mar-25", shape: "dot", color: {background:'#9370DB', border: '#7851c9'}, size: 16},
                
                // Instances - Repairs
                {id: "Repair-01", label: "Repair-01", shape: "dot", color: {background:'#8A2BE2', border: '#6c22b5'}, size: 18},
                {id: "Repair-02", label: "Repair-02", shape: "dot", color: {background:'#8A2BE2', border: '#6c22b5'}, size: 18},
                {id: "Repair-03", label: "Repair-03", shape: "dot", color: {background:'#8A2BE2', border: '#6c22b5'}, size: 18}
            ];
            
            // All edges including ontology and instance relationships
            const allEdgesData = [
                // Ontology hierarchy
                {id: "e1", from: "Continuant", to: "Entity", label: "rdfs:subClassOf", dashes: true, color: '#808080', arrows: "to"},
                {id: "e2", from: "Occurrent", to: "Entity", label: "rdfs:subClassOf", dashes: true, color: '#808080', arrows: "to"},
                {id: "e3", from: "Aircraft", to: "Continuant", label: "rdfs:subClassOf", dashes: true, color: '#808080', arrows: "to"},
                {id: "e4", from: "Person", to: "Continuant", label: "rdfs:subClassOf", dashes: true, color: '#808080', arrows: "to"},
                {id: "e5", from: "RepairProcess", to: "Occurrent", label: "rdfs:subClassOf", dashes: true, color: '#808080', arrows: "to"},
                {id: "e6", from: "TimeInterval", to: "Occurrent", label: "rdfs:subClassOf", dashes: true, color: '#808080', arrows: "to"},
                
                // Ontology relationships
                {id: "e7", from: "RepairProcess", to: "Aircraft", label: "has_participant", color: '#DC143C', arrows: "to", width: 2},
                {id: "e8", from: "RepairProcess", to: "Person", label: "has_participant", color: '#DC143C', arrows: "to", width: 2},
                {id: "e9", from: "RepairProcess", to: "TimeInterval", label: "occurs_on", color: '#228B22', arrows: "to", width: 2},
                
                // Instance type relationships
                {id: "e-johndoe-type", from: "JohnDoe", to: "Person", label: "rdf:type", dashes: true, color: '#808080', arrows: "to"},
                {id: "e-janesmith-type", from: "JaneSmith", to: "Person", label: "rdf:type", dashes: true, color: '#808080', arrows: "to"},
                {id: "e-n737aa-type", from: "N737AA", to: "Aircraft", label: "rdf:type", dashes: true, color: '#808080', arrows: "to"},
                {id: "e-n905fr-type", from: "N905FR", to: "Aircraft", label: "rdf:type", dashes: true, color: '#808080', arrows: "to"},
                {id: "e-date01-type", from: "Date-01", to: "TimeInterval", label: "rdf:type", dashes: true, color: '#808080', arrows: "to"},
                {id: "e-date02-type", from: "Date-02", to: "TimeInterval", label: "rdf:type", dashes: true, color: '#808080', arrows: "to"},
                {id: "e-date03-type", from: "Date-03", to: "TimeInterval", label: "rdf:type", dashes: true, color: '#808080', arrows: "to"},
                {id: "e-repair01-type", from: "Repair-01", to: "RepairProcess", label: "rdf:type", dashes: true, color: '#808080', arrows: "to"},
                {id: "e-repair02-type", from: "Repair-02", to: "RepairProcess", label: "rdf:type", dashes: true, color: '#808080', arrows: "to"},
                {id: "e-repair03-type", from: "Repair-03", to: "RepairProcess", label: "rdf:type", dashes: true, color: '#808080', arrows: "to"},
                
                // Repair-01 relationships
                {id: "e-repair01-aircraft", from: "Repair-01", to: "N737AA", label: "has_participant", color: '#DC143C', arrows: "to", width: 2},
                {id: "e-repair01-person", from: "Repair-01", to: "JohnDoe", label: "has_participant", color: '#DC143C', arrows: "to", width: 2},
                {id: "e-repair01-date", from: "Repair-01", to: "Date-01", label: "occurs_on", color: '#228B22', arrows: "to", width: 2},
                
                // Repair-02 relationships
                {id: "e-repair02-aircraft", from: "Repair-02", to: "N905FR", label: "has_participant", color: '#DC143C', arrows: "to", width: 2},
                {id: "e-repair02-person", from: "Repair-02", to: "JaneSmith", label: "has_participant", color: '#DC143C', arrows: "to", width: 2},
                {id: "e-repair02-date", from: "Repair-02", to: "Date-02", label: "occurs_on", color: '#228B22', arrows: "to", width: 2},
                
                // Repair-03 relationships
                {id: "e-repair03-aircraft", from: "Repair-03", to: "N905FR", label: "has_participant", color: '#DC143C', arrows: "to", width: 2},
                {id: "e-repair03-person", from: "Repair-03", to: "JohnDoe", label: "has_participant", color: '#DC143C', arrows: "to", width: 2},
                {id: "e-repair03-date", from: "Repair-03", to: "Date-03", label: "occurs_on", color: '#228B22', arrows: "to", width: 2}
            ];
            
            nodes = new vis.DataSet(allNodesData);
            edges = new vis.DataSet(allEdgesData);

            // Save original styles
            nodes.forEach(node => {
                originalNodeStyles[node.id] = { 
                    color: node.color, 
                    font: node.font || {color: 'black', size: 14},
                    borderWidth: node.borderWidth || 2
                };
            });
            
            edges.forEach(edge => {
                originalEdgeStyles[edge.id] = { 
                    color: edge.color || '#848484',
                    width: edge.width || 1.5,
                    dashes: edge.dashes || false,
                    arrows: edge.arrows || 'to'
                };
            });

            const data = { nodes, edges };
            const options = {
                nodes: {
                    font: { color: 'black', size: 14 },
                    borderWidth: 2
                },
                edges: {
                    font: { align: 'top', size: 11, color: '#333' },
                    smooth: { type: 'continuous' }
                },
                physics: {
                    enabled: true,
                    solver: 'barnesHut',
                    barnesHut: { 
                        gravitationalConstant: -30000,
                        centralGravity: 0.3,
                        springLength: 150,
                        springConstant: 0.04
                    },
                    stabilization: {
                        iterations: 1000
                    }
                },
                interaction: {
                    tooltipDelay: 200,
                    hideEdgesOnDrag: false,
                    hover: true
                }
            };
            
            network = new vis.Network(container, data, options);
            
            network.on("stabilizationIterationsDone", function() {
                network.setOptions({ physics: false });
            });
        }

        drawGraph();
    </script>
</body>
</html>
