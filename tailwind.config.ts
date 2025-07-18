<html>
    <head>
        <meta charset="utf-8">
        
            <script src="lib/bindings/utils.js"></script>
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/vis-network/9.1.2/dist/dist/vis-network.min.css" integrity="sha512-WgxfT5LWjfszlPHXRmBWHkV2eceiWTOBvrKCNbdgDYTHrT2AeLCGbF4sZlZw3UMN3WtL0tGUoIAKsu8mllg/XA==" crossorigin="anonymous" referrerpolicy="no-referrer" />
            <script src="https://cdnjs.cloudflare.com/ajax/libs/vis-network/9.1.2/dist/vis-network.min.js" integrity="sha512-LnvoEWDFrqGHlHmDD2101OrLcbsfkrzoSpvtSQtxK3RMnRV0eOkhhBN2dXHKRrUU8p2DGRTk35n4O8nWSVe1mQ==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
            
        
<center>
<h1></h1>
</center>

<!-- <link rel="stylesheet" href="../node_modules/vis/dist/vis.min.css" type="text/css" />
<script type="text/javascript" src="../node_modules/vis/dist/vis.js"> </script>-->
        <link
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta3/dist/css/bootstrap.min.css"
          rel="stylesheet"
          integrity="sha384-eOJMYsd53ii+scO/bJGFsiCZc+5NDVN2yr8+0RDqr0Ql0h+rP48ckxlpbzKgwra6"
          crossorigin="anonymous"
        />
        <script
          src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta3/dist/js/bootstrap.bundle.min.js"
          integrity="sha384-JEW9xMcG8R+pH31jmWH6WWP0WintQrMb4s7ZOdauHnUtxwoG2vI5DkLtS3qm9Ekf"
          crossorigin="anonymous"
        ></script>


        <center>
          <h1></h1>
        </center>
        <style type="text/css">

             #mynetwork {
                 width: 100%;
                 height: 800px;
                 background-color: #ffffff;
                 border: 1px solid lightgray;
                 position: relative;
                 float: left;
             }

             
             #config {
                 float: left;
                 width: 400px;
                 height: 600px;
             }
             

             
        </style>
    </head>


    <body>
        <div class="card" style="width: 100%">
            
            
            <div id="mynetwork" class="card-body"></div>
        </div>

        
        
            <div id="config"></div>
        

        <script type="text/javascript">

              // initialize global variables.
              var edges;
              var nodes;
              var allNodes;
              var allEdges;
              var nodeColors;
              var originalNodes;
              var network;
              var container;
              var options, data;
              var filter = {
                  item : '',
                  property : '',
                  value : []
              };

              

              

              // This method is responsible for drawing the graph, returns the drawn network
              function drawGraph() {
                  var container = document.getElementById('mynetwork');

                  

                  // All nodes for ontology and instances
                  nodes = new vis.DataSet([
                      {"color": "#FDD4A0", "font": {"color": "black"}, "id": "Entity", "label": "Entity", "shape": "box", "size": 30, "title": "The most general category of thing."},
                      {"color": "#FDD4A0", "font": {"color": "black"}, "id": "Continuant", "label": "Continuant", "shape": "box", "size": 25, "title": "Something that exists in full at any time (e.g., an object)."},
                      {"color": "#FDD4A0", "font": {"color": "black"}, "id": "Occurrent", "label": "Occurrent", "shape": "box", "size": 25, "title": "Something that happens over time (e.g., a process)."},
                      {"color": "#FFA500", "font": {"color": "black"}, "id": "Aircraft", "label": "Aircraft", "shape": "box", "size": 20, "title": "Our Class for aircraft."},
                      {"color": "#FFA500", "font": {"color": "black"}, "id": "Person", "label": "Person", "shape": "box", "size": 20, "title": "Our Class for people."},
                      {"color": "#FFA500", "font": {"color": "black"}, "id": "RepairProcess", "label": "RepairProcess", "shape": "box", "size": 20, "title": "Our Class for repair events."},
                      {"color": "#8A2BE2", "font": {"color": "black"}, "id": "N737AA", "label": "Aircraft N737AA", "shape": "dot", "size": 25},
                      {"color": "#8A2BE2", "font": {"color": "black"}, "id": "JohnDoe", "label": "John Doe", "shape": "dot", "size": 20},
                      {"color": "#8A2BE2", "font": {"color": "black"}, "id": "Repair-01", "label": "Repair-01", "shape": "dot", "size": 20},
                      {"color": "#8A2BE2", "font": {"color": "black"}, "id": "N905FR", "label": "Aircraft N905FR", "shape": "dot", "size": 25},
                      {"color": "#8A2BE2", "font": {"color": "black"}, "id": "JaneSmith", "label": "Jane Smith", "shape": "dot", "size": 20},
                      {"color": "#8A2BE2", "font": {"color": "black"}, "id": "Repair-02", "label": "Repair-02", "shape": "dot", "size": 20}
                  ]);

                  // All edges for ontology and instances
                  edges = new vis.DataSet([
                      // Ontology subclass relationships
                      {"arrows": "to", "color": "#808080", "dashes": true, "from": "Continuant", "label": "rdfs:subClassOf", "to": "Entity"},
                      {"arrows": "to", "color": "#808080", "dashes": true, "from": "Occurrent", "label": "rdfs:subClassOf", "to": "Entity"},
                      {"arrows": "to", "color": "#808080", "dashes": true, "from": "Aircraft", "label": "rdfs:subClassOf", "to": "Continuant"},
                      {"arrows": "to", "color": "#808080", "dashes": true, "from": "Person", "label": "rdfs:subClassOf", "to": "Continuant"},
                      {"arrows": "to", "color": "#808080", "dashes": true, "from": "RepairProcess", "label": "rdfs:subClassOf", "to": "Occurrent"},
                      
                      // Instance type relationships
                      {"arrows": "to", "color": "#808080", "dashes": true, "from": "N737AA", "label": "rdf:type", "to": "Aircraft"},
                      {"arrows": "to", "color": "#808080", "dashes": true, "from": "JohnDoe", "label": "rdf:type", "to": "Person"},
                      {"arrows": "to", "color": "#808080", "dashes": true, "from": "Repair-01", "label": "rdf:type", "to": "RepairProcess"},
                      {"arrows": "to", "color": "#808080", "dashes": true, "from": "N905FR", "label": "rdf:type", "to": "Aircraft"},
                      {"arrows": "to", "color": "#808080", "dashes": true, "from": "JaneSmith", "label": "rdf:type", "to": "Person"},
                      {"arrows": "to", "color": "#808080", "dashes": true, "from": "Repair-02", "label": "rdf:type", "to": "RepairProcess"},
                      
                      // Instance-to-instance relationships
                      {"arrows": "to", "color": "#DC143C", "from": "Repair-01", "label": "has_participant", "to": "N737AA", "width": 2},
                      {"arrows": "to", "color": "#DC143C", "from": "Repair-01", "label": "has_participant", "to": "JohnDoe", "width": 2},
                      {"arrows": "to", "color": "#DC143C", "from": "Repair-02", "label": "has_participant", "to": "N905FR", "width": 2},
                      {"arrows": "to", "color": "#DC143C", "from": "Repair-02", "label": "has_participant", "to": "JaneSmith", "width": 2}
                  ]);

                  nodeColors = {};
                  allNodes = nodes.get({ returnType: "Object" });
                  for (nodeId in allNodes) {
                    nodeColors[nodeId] = allNodes[nodeId].color;
                  }
                  allEdges = edges.get({ returnType: "Object" });
                  // adding nodes and edges to the graph
                  data = {nodes: nodes, edges: edges};

                  var options = {
                      "configure": {
                          "enabled": true,
                          "filter": [
                              "physics"
                          ]
                      },
                      "edges": {
                          "color": {
                              "inherit": true
                          },
                          "smooth": {
                              "enabled": true,
                              "type": "dynamic"
                          }
                      },
                      "interaction": {
                          "dragNodes": true,
                          "hideEdgesOnDrag": false,
                          "hideNodesOnDrag": false
                      },
                      "physics": {
                          "enabled": true,
                          "stabilization": {
                              "enabled": true,
                              "fit": true,
                              "iterations": 1000,
                              "onlyDynamicEdges": false,
                              "updateInterval": 50
                          }
                      }
                  };

                  


                  
                  // if this network requires displaying the configure window,
                  // put it in its div
                  options.configure["container"] = document.getElementById("config");
                  

                  network = new vis.Network(container, data, options);

                  return network;

              }
              drawGraph();
        </script>
    </body>
</html>
