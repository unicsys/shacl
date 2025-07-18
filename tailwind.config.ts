<html>
<head>
    <meta charset="utf-8">
    <title>Interactive SPARQL Visualization</title>
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
            height: 95vh;
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
            font-size: 14px;
            line-height: 1.4;
        }
        .sparql-query-container .sparql-line {
            display: block;
            padding: 1px 5px;
            margin: 0 -5px;
            border-radius: 3px;
            transition: background-color 0.3s ease;
        }
        .sparql-query-container .highlight-line {
            /* FIX: Changed to a more visible light yellow */
            background-color: #fff1a8;
        }
        .sparql-comment { color: #8B4513; }
        .sparql-keyword { color: #800080; font-weight: bold; }
        .sparql-variable { color: #333; }
        .sparql-uri { color: #008080; }
        .sparql-class-type { color: #D2691E; }
        .sparql-property { color: #00008B; }
        .sparql-identifier { color: #4169E1; }
        #explanation-box {
            margin-top: 10px;
            padding: 10px;
            background-color: #e9ecef;
            border-radius: 5px;
            border: 1px solid #ced4da;
            min-height: 70px;
        }
        #results-container {
             margin-top: 10px;
        }
    </style>
</head>
<body>
    <div class="container-fluid pt-3">
        <div class="row">
            <!-- Left Column -->
            <div class="col-lg-5">
                <div class="sparql-query-container">
                    <span class="sparql-line sparql-comment"># Find the person involved in repairing Aircraft N737AA</span>
                    <span class="sparql-line"><span class="sparql-keyword">PREFIX</span> ex: <<span class="sparql-uri">http://example.com/ontology#</span>></span>
                    <span class="sparql-line"><span class="sparql-keyword">PREFIX</span> rdfs: <<span class="sparql-uri">http://www.w3.org/2000/01/rdf-schema#</span>></span>
                    <br>
                    <span class="sparql-line" id="step4-line"><span class="sparql-keyword">SELECT</span> <span class="sparql-variable">?person</span> <span class="sparql-variable">?personLabel</span></span>
                    <span class="sparql-line"><span class="sparql-keyword">WHERE</span> {</span>
                    <div style="padding-left: 20px;">
                        <span class="sparql-line sparql-comment"># 1. Start with the specific aircraft instance.</span>
                        <span class="sparql-line" id="step0-line"><span class="sparql-keyword">VALUES</span> <span class="sparql-variable">?aircraft</span> { <span class="sparql-identifier">ex:N737AA</span> }</span>
                        <span class="sparql-line sparql-comment"># 2. Find the repair process it participated in.</span>
                        <span class="sparql-line" id="step1-line"><span class="sparql-variable">?repair</span> <span class="sparql-property">ex:has_participant</span> <span class="sparql-variable">?aircraft</span> .</span>
                        <span class="sparql-line sparql-comment"># 3. Find the person who was also a participant.</span>
                        <span class="sparql-line" id="step2-line"><span class="sparql-variable">?repair</span> <span class="sparql-property">ex:has_participant</span> <span class="sparql-variable">?person</span> .</span>
                        <span class="sparql-line sparql-comment"># 4. Ensure this participant is a Person.</span>
                        <span class="sparql-line" id="step3-line"><span class="sparql-variable">?person</span> <span class="sparql-keyword">a</span> <span class="sparql-class-type">ex:Person</span> .</span>
                        <span class="sparql-line sparql-comment"># 5. Get the person's name for display.</span>
                        <span class="sparql-line" id="step5-line"><span class="sparql-variable">?person</span> <span class="sparql-property">rdfs:label</span> <span class="sparql-variable">?personLabel</span> .</span>
                    </div>
                    <span class="sparql-line">}</span>
                </div>

                <div class="mt-2">
                    <button class="btn btn-primary" onclick="nextStep();">Next Step</button>
                    <button class="btn btn-secondary" onclick="resetAll();">Reset</button>
                </div>
                
                <div id="explanation-box">
                    <strong>Explanation:</strong>
                    <p id="explanation-text" class="mb-0">Click "Next Step" to begin the query execution.</p>
                </div>

                <div id="results-container">
                    <h6>Query Results:</h6>
                    <table class="table table-sm table-bordered table-striped">
                        <thead><tr><th>?person</th><th>?personLabel</th></tr></thead>
                        <tbody id="results-body"></tbody>
                    </table>
                </div>
            </div>

            <!-- Right Column -->
            <div class="col-lg-7">
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
                font: { color: 'black' } 
            },
            edge: { 
                color: '#ff5722', 
                width: 3.5,
                arrows: 'to'
            }
        };

        const querySteps = [
             {
                lineId: 'step0-line',
                explanation: 'Start by binding the ?aircraft variable to the specific individual, ex:N737AA.',
                nodesToHighlight: ['Aircraft-Inst-1'],
                edgesToHighlight: []
            },
            {
                lineId: 'step1-line',
                explanation: 'Find the repair process where this aircraft was a participant. The query engine finds Repair-01.',
                nodesToHighlight: ['Aircraft-Inst-1', 'Repair-Inst-1'],
                edgesToHighlight: ['e13']
            },
            {
                lineId: 'step2-line',
                explanation: 'From that repair process, find the other participant. This binds the ?person variable to John Doe.',
                nodesToHighlight: ['Aircraft-Inst-1', 'Repair-Inst-1', 'Person-Inst-1'],
                edgesToHighlight: ['e13', 'e14']
            },
            {
                lineId: 'step3-line',
                explanation: 'This step verifies that the found participant is indeed of type ex:Person. The condition is met.',
                nodesToHighlight: ['Person-Inst-1', 'Person'],
                edgesToHighlight: ['e9']
            },
             {
                lineId: 'step4-line',
                explanation: 'The SELECT clause specifies we want the person\'s URI and their label.',
                nodesToHighlight: ['Person-Inst-1'],
                edgesToHighlight: []
            },
            {
                lineId: 'step5-line',
                explanation: 'Retrieve the rdfs:label for the final ?person node. The query is now complete and the results are projected into the table.',
                nodesToHighlight: ['Person-Inst-1'],
                edgesToHighlight: [],
                isFinal: true
            }
        ];

        function resetAll() {
            currentStep = -1;
            document.querySelectorAll('.sparql-line').forEach(el => el.classList.remove('highlight-line'));
            document.getElementById('explanation-text').textContent = 'Click "Next Step" to begin the query execution.';
            document.getElementById('results-body').innerHTML = '';
            resetGraphStyles();
        }

        function nextStep() {
            currentStep++;
            if (currentStep >= querySteps.length) {
                currentStep = 0;
            }
            resetAllButKeepState();
            
            const step = querySteps[currentStep];
            document.getElementById(step.lineId).classList.add('highlight-line');
            document.getElementById('explanation-text').textContent = step.explanation;

            const nodesToUpdate = step.nodesToHighlight.map(id => ({id: id, ...highlightOptions.node}));
            if(nodesToUpdate.length > 0) nodes.update(nodesToUpdate);

            const edgesToUpdate = step.edgesToHighlight.map(id => ({id: id, ...highlightOptions.edge}));
            if(edgesToUpdate.length > 0) edges.update(edgesToUpdate);
            
            if (step.isFinal) {
                populateResults();
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
            
            // DEFINITIVE FIX: Restore all original edge styles explicitly.
            const edgesToUpdate = Object.keys(originalEdgeStyles).map(id => ({ id: id, ...originalEdgeStyles[id] }));
            if (edgesToUpdate.length) edges.update(edgesToUpdate);
        }
        
        function populateResults() {
             const resultsBody = document.getElementById('results-body');
             const results = [
                 {uri: 'ex:JohnDoe', label: 'John Doe'}
             ];
             results.forEach(res => {
                 let row = resultsBody.insertRow();
                 row.insertCell(0).textContent = res.uri;
                 row.insertCell(1).textContent = res.label;
             });
        }

        function drawGraph() {
            const container = document.getElementById('mynetwork');
            const allNodesData = [
                {"id": "Entity", "label": "Entity", "shape": "box", color: {background:'#FDD4A0', border: '#c7a87e'}},
                {"id": "Continuant", "label": "Continuant", "shape": "box", color: {background:'#FDD4A0', border: '#c7a87e'}},
                {"id": "Occurrent", "label": "Occurrent", "shape": "box", color: {background:'#FDD4A0', border: '#c7a87e'}},
                {"id": "Aircraft", "label": "Aircraft", "shape": "box", color: {background:'#FFA500', border: '#c78100'}},
                {"id": "Person", "label": "Person", "shape": "box", color: {background:'#FFA500', border: '#c78100'}},
                {"id": "RepairProcess", "label": "RepairProcess", "shape": "box", color: {background:'#FFA500', border: '#c78100'}},
                {"id": "Aircraft-Inst-1", "label": "Aircraft N737AA", "shape": "dot", color: {background:'#8A2BE2', border: '#6c22b5'}},
                {"id": "Person-Inst-1", "label": "John Doe", "shape": "dot", color: {background:'#8A2BE2', border: '#6c22b5'}},
                {"id": "Repair-Inst-1", "label": "Repair-01", "shape": "dot", color: {background:'#8A2BE2', border: '#6c22b5'}},
                {"id": "Aircraft-Inst-2", "label": "Aircraft N905FR", "shape": "dot", color: {background:'#8A2BE2', border: '#6c22b5'}},
                {"id": "Person-Inst-2", "label": "Jane Smith", "shape": "dot", color: {background:'#8A2BE2', border: '#6c22b5'}},
                {"id": "Repair-Inst-2", "label": "Repair-02", "shape": "dot", color: {background:'#8A2BE2', border: '#6c22b5'}},
                {"id": "Repair-Inst-3", "label": "Repair-03", "shape": "dot", color: {background:'#8A2BE2', border: '#6c22b5'}}
            ];
             const allEdgesData = [
                {"id": "e1", "from": "Continuant", "to": "Entity", "label": "rdfs:subClassOf", "dashes": true, "arrows": "to"},
                {"id": "e2", "from": "Occurrent", "to": "Entity", "label": "rdfs:subClassOf", "dashes": true, "arrows": "to"},
                {"id": "e3", "from": "Aircraft", "to": "Continuant", "label": "rdfs:subClassOf", "dashes": true, "arrows": "to"},
                {"id": "e4", "from": "Person", "to": "Continuant", "label": "rdfs:subClassOf", "dashes": true, "arrows": "to"},
                {"id": "e5", "from": "RepairProcess", "to": "Occurrent", "label": "rdfs:subClassOf", "dashes": true, "arrows": "to"},
                {"id": "e6", "from": "RepairProcess", "to": "Aircraft", "label": "has_participant", "arrows": "to"},
                {"id": "e7", "from": "RepairProcess", "to": "Person", "label": "has_participant", "arrows": "to"},
                {"id": "e8", "from": "Aircraft-Inst-1", "to": "Aircraft", "label": "rdf:type", "dashes": true, "arrows": "to"},
                {"id": "e9", "from": "Person-Inst-1", "to": "Person", "label": "rdf:type", "dashes": true, "arrows": "to"},
                {"id": "e10", "from": "Repair-Inst-1", "to": "RepairProcess", "label": "rdf:type", "dashes": true, "arrows": "to"},
                {"id": "e11", "from": "Aircraft-Inst-2", "to": "Aircraft", "label": "rdf:type", "dashes": true, "arrows": "to"},
                {"id": "e12", "from": "Person-Inst-2", "to": "Person", "label": "rdf:type", "dashes": true, "arrows": "to"},
                {"id": "e13", "from": "Repair-Inst-1", "to": "Aircraft-Inst-1", "label": "has_participant", "arrows": "to"},
                {"id": "e14", "from": "Repair-Inst-1", "to": "Person-Inst-1", "label": "has_participant", "arrows": "to"},
                {"id": "e15", "from": "Repair-Inst-2", "to": "RepairProcess", "label": "rdf:type", "dashes": true, "arrows": "to"},
                {"id": "e16", "from": "Repair-Inst-2", "to": "Aircraft-Inst-2", "label": "has_participant", "arrows": "to"},
                {"id": "e17", "from": "Repair-Inst-2", "to": "Person-Inst-2", "label": "has_participant", "arrows": "to"},
                {"id": "e18", "from": "Repair-Inst-3", "to": "Person-Inst-1", "label": "has_participant", "arrows": "to"},
                {"id": "e19", "from": "Repair-Inst-3", "to": "Aircraft-Inst-2", "label": "has_participant", "arrows": "to"}
            ];
            
            nodes = new vis.DataSet(allNodesData);
            edges = new vis.DataSet(allEdgesData);

            // Save original styles for nodes and edges
            nodes.forEach(node => {
                originalNodeStyles[node.id] = { color: node.color, font: node.font };
            });
            edges.forEach(edge => {
                // DEFINITIVE FIX: Save the complete, effective style for each edge
                originalEdgeStyles[edge.id] = { 
                    color: edge.color || '#848484', // Use default from options if not present
                    width: edge.width || 1.5,
                    dashes: edge.dashes || false,
                    arrows: edge.arrows || 'to' // This is the key part
                };
            });

            const data = { nodes, edges };
            const options = {
                nodes: {
                    font: { color: '#343434' },
                    borderWidth: 2,
                    size: 20
                },
                edges: {
                    color: '#848484',
                    font: { align: 'top', size: 12, color: '#333' },
                    smooth: { type: 'continuous' },
                    width: 1.5
                },
                physics: {
                    solver: 'barnesHut',
                    barnesHut: { gravitationalConstant: -25000 }
                },
                interaction: {
                    tooltipDelay: 200,
                    hideEdgesOnDrag: true
                }
            };
            network = new vis.Network(container, data, options);
        }

        drawGraph();
    </script>
</body>
</html>
