<html>
<head>
    <meta charset="utf-8">
    <title>Team B - Query Failure Demonstration</title>
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
            background-color: #fff1a8;
        }
        /* New style for the failing line */
        .sparql-query-container .highlight-fail {
            background-color: #ffdddd;
            border: 1px solid #ffb8b8;
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
            min-height: 100px;
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
                    <h5 class="mb-3">Team A's Query on Team B's Graph</h5>
                    <span class="sparql-line sparql-comment"># Find the person involved in repairing Aircraft N737AA</span>
                    <span class="sparql-line"><span class="sparql-keyword">PREFIX</span> ex: <<span class="sparql-uri">http://example.com/ontology#</span>></span>
                    <span class="sparql-line"><span class="sparql-keyword">PREFIX</span> rdfs: <<span class="sparql-uri">http://www.w3.org/2000/01/rdf-schema#</span>></span>
                    <br>
                    <span class="sparql-line" id="step2-line"><span class="sparql-keyword">SELECT</span> <span class="sparql-variable">?person</span> <span class="sparql-variable">?personLabel</span></span>
                    <span class="sparql-line"><span class="sparql-keyword">WHERE</span> {</span>
                    <div style="padding-left: 20px;">
                        <span class="sparql-line sparql-comment"># 1. Start with the specific aircraft instance.</span>
                        <span class="sparql-line" id="step0-line"><span class="sparql-keyword">VALUES</span> <span class="sparql-variable">?aircraft</span> { <span class="sparql-identifier">ex:N737AA</span> }</span>
                        <span class="sparql-line sparql-comment"># 2. Find the repair process it participated in.</span>
                        <span class="sparql-line" id="step1-line"><span class="sparql-variable">?repair</span> <span class="sparql-property">ex:has_participant</span> <span class="sparql-variable">?aircraft</span> .</span>
                        <span class="sparql-line sparql-comment"># 3. Find the person who was also a participant.</span>
                        <span class="sparql-line"><span class="sparql-variable">?repair</span> <span class="sparql-property">ex:has_participant</span> <span class="sparql-variable">?person</span> .</span>
                        <span class="sparql-line sparql-comment"># 4. Ensure this participant is a Person.</span>
                        <span class="sparql-line"><span class="sparql-variable">?person</span> <span class="sparql-keyword">a</span> <span class="sparql-class-type">ex:Person</span> .</span>
                        <span class="sparql-line sparql-comment"># 5. Get the person's name for display.</span>
                        <span class="sparql-line"><span class="sparql-variable">?person</span> <span class="sparql-property">rdfs:label</span> <span class="sparql-variable">?personLabel</span> .</span>
                    </div>
                    <span class="sparql-line">}</span>
                </div>

                <div class="mt-2">
                    <button class="btn btn-primary" onclick="nextStep();">Next Step</button>
                    <button class="btn btn-secondary" onclick="resetAll();">Reset</button>
                </div>
                
                <div id="explanation-box">
                    <strong>Explanation:</strong>
                    <p id="explanation-text" class="mb-0">Run Team A's query on this new graph model to see where it fails.</p>
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
        var network, nodes, edges;
        var originalNodeStyles = {}, originalEdgeStyles = {};
        var currentStep = -1;

        const highlightOptions = {
            node: { color: { background: '#ff5722', border: '#d44a1c' }, font: { color: 'black' } },
            edge: { color: '#ff5722', width: 3.5, arrows: 'to' }
        };

        const querySteps = [
            {
                lineId: 'step0-line',
                explanation: 'Step 1: The query successfully finds the node for the instance "N737AA" in the graph, even though its type is different.',
                nodesToHighlight: ['N737AA'],
                edgesToHighlight: []
            },
            {
                lineId: 'step1-line',
                explanation: '<strong>FAILURE:</strong> The query now looks for a <code>?repair</code> node connected to N737AA via the <code>ex:has_participant</code> property. This graph has no such property or structure. The pattern finds 0 matches, and the query fails.',
                nodesToHighlight: ['N737AA'], // Keep context
                edgesToHighlight: [],
                isFailure: true // Special flag for this step
            },
            {
                lineId: 'step1-line', // Keep failure line highlighted
                explanation: 'The query execution halts because a required pattern could not be matched against the graph data. No results are returned.',
                nodesToHighlight: ['N737AA'], // Keep context
                edgesToHighlight: [],
                isFinal: true
            }
        ];

        function resetAll() {
            currentStep = -1;
            document.querySelectorAll('.sparql-line').forEach(el => {
                el.classList.remove('highlight-line');
                el.classList.remove('highlight-fail');
            });
            document.getElementById('explanation-text').innerHTML = 'Run Team A\'s query on this new graph model to see where it fails.';
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

            if (step.isFailure) {
                document.getElementById(step.lineId).classList.add('highlight-fail');
            } else {
                document.getElementById(step.lineId).classList.add('highlight-line');
            }
            document.getElementById('explanation-text').innerHTML = step.explanation;

            const nodesToUpdate = step.nodesToHighlight.map(id => ({id, ...highlightOptions.node}));
            if(nodesToUpdate.length) nodes.update(nodesToUpdate);

            if (step.isFinal) {
                populateFailureResults();
            }
        }

        function resetAllButKeepState() {
            resetGraphStyles();
            document.querySelectorAll('.sparql-line').forEach(el => {
                el.classList.remove('highlight-line');
                el.classList.remove('highlight-fail');
            });
            document.getElementById('results-body').innerHTML = '';
        }

        function resetGraphStyles() {
            const nodesToUpdate = Object.keys(originalNodeStyles).map(id => ({ id, ...originalNodeStyles[id] }));
            if (nodesToUpdate.length) nodes.update(nodesToUpdate);
            
            const edgesToUpdate = Object.keys(originalEdgeStyles).map(id => ({ id, ...originalEdgeStyles[id] }));
            if (edgesToUpdate.length) edges.update(edgesToUpdate);
        }
        
        function populateFailureResults() {
            const resultsBody = document.getElementById('results-body');
            let row = resultsBody.insertRow();
            let cell = row.insertCell(0);
            cell.colSpan = 2;
            cell.textContent = '--- No Results Found ---';
            cell.style.textAlign = 'center';
            cell.style.fontStyle = 'italic';
        }

        function drawGraph() {
            const container = document.getElementById('mynetwork');
            
            const allNodesData = [
                // Team B's new Classes with updated names
                {"id": "System", "label": "System", "shape": "box", color: {background:'#FFA500', border: '#c78100'}},
                {"id": "Technician", "label": "Technician", "shape": "box", color: {background:'#FFA500', border: '#c78100'}},

                // Team B Instances
                {"id": "N737AA", "label": "Aircraft N737AA", "shape": "dot", color: {background:'#8A2BE2', border: '#6c22b5'}},
                {"id": "MikeRoss", "label": "Mike Ross", "shape": "dot", color: {background:'#8A2BE2', border: '#6c22b5'}},
                {"id": "N811BB", "label": "Aircraft N811BB", "shape": "dot", color: {background:'#8A2BE2', border: '#6c22b5'}},
                {"id": "HarveySpecter", "label": "Harvey Specter", "shape": "dot", color: {background:'#8A2BE2', border: '#6c22b5'}}
            ];

             const allEdgesData = [
                {"id": "e1", "from": "System", "to": "Technician", "label": "repairedBy", "arrows": "to"},
                {"id": "e2", "from": "N737AA", "to": "System", "label": "rdf:type", "dashes": true, "arrows": "to"},
                {"id": "e3", "from": "MikeRoss", "to": "Technician", "label": "rdf:type", "dashes": true, "arrows": "to"},
                {"id": "e4", "from": "N811BB", "to": "System", "label": "rdf:type", "dashes": true, "arrows": "to"},
                {"id": "e5", "from": "HarveySpecter", "to": "Technician", "label": "rdf:type", "dashes": true, "arrows": "to"},
                {"id": "e6", "from": "N737AA", "to": "MikeRoss", "label": "repairedBy", "arrows": "to"},
                {"id": "e7", "from": "N811BB", "to": "HarveySpecter", "label": "repairedBy", "arrows": "to"}
            ];
            
            nodes = new vis.DataSet(allNodesData);
            edges = new vis.DataSet(allEdgesData);

            nodes.forEach(node => {
                originalNodeStyles[node.id] = { color: node.color, font: node.font };
            });
            edges.forEach(edge => {
                originalEdgeStyles[edge.id] = { 
                    color: edge.color, 
                    width: edge.width, 
                    dashes: edge.dashes,
                    arrows: edge.arrows
                };
            });

            const data = { nodes, edges };
            const options = {
                nodes: {
                    font: { color: 'black' },
                    borderWidth: 2,
                    size: 22
                },
                edges: {
                    color: '#555555',
                    font: { align: 'middle', size: 12, color: '#333' },
                    smooth: { type: 'continuous' },
                    width: 1.5,
                    arrows: 'to'
                },
                physics: {
                    solver: 'barnesHut',
                    barnesHut: { gravitationalConstant: -30000 }
                },
                interaction: {
                    tooltipDelay: 200
                }
            };
            network = new vis.Network(container, data, options);
        }

        drawGraph();
    </script>
</body>
</html>
