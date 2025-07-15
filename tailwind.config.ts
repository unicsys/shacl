# First, ensure you have pyvis installed:
# pip install pyvis

from pyvis.network import Network
import webbrowser
import random
import itertools

print("Generating large knowledge graph with dummy data...")

# --- 1. Define Colors and Styles ---
FOUNDATION_CLASS_COLOR = "#FDD4A0"  # Light Orange: For BFO classes
DOMAIN_CLASS_COLOR = "#FFA500"      # Standard Orange: For domain classes
SUBDOMAIN_CLASS_COLOR = "#FF8C00"   # Dark Orange: For subdomain classes
INDIVIDUAL_COLOR = "#8A2BE2"        # BlueViolet: For individuals/instances
PROCESS_INDIVIDUAL_COLOR = "#9370DB" # Medium Purple: For process individuals
ENTITY_INDIVIDUAL_COLOR = "#6A0DAD"  # Dark Purple: For entity individuals
FACT_RELATION_COLOR = "#DC143C"     # Crimson: For factual relationships
TYPE_RELATION_COLOR = "#808080"     # Grey: For 'type' and 'subclass' relationships
PROPERTY_RELATION_COLOR = "#4169E1"  # Royal Blue: For property relationships

# --- 2. Create the Network Graph ---
net = Network(
    height="1000px",
    width="100%",
    bgcolor="#222222",
    font_color="white",
    notebook=False,
    directed=True,
    layout=True,
    heading="Large Knowledge Graph Visualization"
)

# Configure physics for better layout - nodes closer together
net.barnes_hut(gravity=-5000, central_gravity=0.5, spring_length=100, 
               spring_strength=0.08, damping=0.2)
net.solver = "barnesHut"

# --- 3. Define the Ontology Structure ---
print("Step 1: Building the ontology hierarchy...")

# Top-level BFO Classes
bfo_classes = {
    "bfo:Entity": {"label": "Entity", "size": 60},
    "bfo:Continuant": {"label": "Continuant", "size": 50},
    "bfo:Occurrent": {"label": "Occurrent", "size": 50},
    "bfo:IndependentContinuant": {"label": "Independent Continuant", "size": 45},
    "bfo:DependentContinuant": {"label": "Dependent Continuant", "size": 45},
    "bfo:GDC": {"label": "Generically Dependent Continuant", "size": 40},
    "bfo:SDC": {"label": "Specifically Dependent Continuant", "size": 40},
    "bfo:MaterialEntity": {"label": "Material Entity", "size": 40},
    "bfo:Process": {"label": "Process", "size": 40},
    "bfo:ProcessBoundary": {"label": "Process Boundary", "size": 35},
    "bfo:TemporalRegion": {"label": "Temporal Region", "size": 35},
    "bfo:SpatialRegion": {"label": "Spatial Region", "size": 35}
}

# Add BFO classes
for class_id, props in bfo_classes.items():
    net.add_node(class_id, label=props["label"], shape="box", 
                 color=FOUNDATION_CLASS_COLOR, size=props["size"])

# Domain Classes
domain_classes = {
    # Information Entities
    "iof:ICE": "Information Content Entity",
    "iof:Document": "Document",
    "iof:TechnicalReport": "Technical Report",
    "iof:Specification": "Specification",
    "iof:DataSet": "Data Set",
    
    # Organizations
    "org:Organization": "Organization",
    "org:Company": "Company",
    "org:Government": "Government Agency",
    "org:Military": "Military Organization",
    
    # Processes
    "proc:ManufacturingProcess": "Manufacturing Process",
    "proc:AcquisitionProcess": "Acquisition Process",
    "proc:DesignProcess": "Design Process",
    "proc:TestingProcess": "Testing Process",
    "proc:DeploymentProcess": "Deployment Process",
    
    # Systems and Equipment
    "sys:System": "System",
    "sys:WeaponSystem": "Weapon System",
    "sys:VehicleSystem": "Vehicle System",
    "sys:CommunicationSystem": "Communication System",
    "sys:SensorSystem": "Sensor System",
    
    # Components
    "comp:Component": "Component",
    "comp:ElectronicComponent": "Electronic Component",
    "comp:MechanicalComponent": "Mechanical Component",
    "comp:SoftwareComponent": "Software Component",
    
    # Roles and Functions
    "role:Role": "Role",
    "role:SupplierRole": "Supplier Role",
    "role:ManufacturerRole": "Manufacturer Role",
    "role:OperatorRole": "Operator Role"
}

# Add domain classes
for class_id, label in domain_classes.items():
    net.add_node(class_id, label=label, shape="box", 
                 color=DOMAIN_CLASS_COLOR, size=35)

# --- 4. Create Ontology Hierarchy ---
print("Step 2: Establishing class relationships...")

# BFO Hierarchy
bfo_hierarchy = [
    ("bfo:Continuant", "bfo:Entity"),
    ("bfo:Occurrent", "bfo:Entity"),
    ("bfo:IndependentContinuant", "bfo:Continuant"),
    ("bfo:DependentContinuant", "bfo:Continuant"),
    ("bfo:GDC", "bfo:DependentContinuant"),
    ("bfo:SDC", "bfo:DependentContinuant"),
    ("bfo:MaterialEntity", "bfo:IndependentContinuant"),
    ("bfo:Process", "bfo:Occurrent"),
    ("bfo:ProcessBoundary", "bfo:Occurrent"),
    ("bfo:TemporalRegion", "bfo:Occurrent"),
    ("bfo:SpatialRegion", "bfo:Continuant")
]

# Domain Hierarchy
domain_hierarchy = [
    # Information entities
    ("iof:ICE", "bfo:GDC"),
    ("iof:Document", "iof:ICE"),
    ("iof:TechnicalReport", "iof:Document"),
    ("iof:Specification", "iof:Document"),
    ("iof:DataSet", "iof:ICE"),
    
    # Organizations
    ("org:Organization", "bfo:MaterialEntity"),
    ("org:Company", "org:Organization"),
    ("org:Government", "org:Organization"),
    ("org:Military", "org:Government"),
    
    # Processes
    ("proc:ManufacturingProcess", "bfo:Process"),
    ("proc:AcquisitionProcess", "bfo:Process"),
    ("proc:DesignProcess", "bfo:Process"),
    ("proc:TestingProcess", "bfo:Process"),
    ("proc:DeploymentProcess", "bfo:Process"),
    
    # Systems
    ("sys:System", "bfo:MaterialEntity"),
    ("sys:WeaponSystem", "sys:System"),
    ("sys:VehicleSystem", "sys:System"),
    ("sys:CommunicationSystem", "sys:System"),
    ("sys:SensorSystem", "sys:System"),
    
    # Components
    ("comp:Component", "bfo:MaterialEntity"),
    ("comp:ElectronicComponent", "comp:Component"),
    ("comp:MechanicalComponent", "comp:Component"),
    ("comp:SoftwareComponent", "comp:Component"),
    
    # Roles
    ("role:Role", "bfo:SDC"),
    ("role:SupplierRole", "role:Role"),
    ("role:ManufacturerRole", "role:Role"),
    ("role:OperatorRole", "role:Role")
]

# Add all hierarchy edges
for child, parent in bfo_hierarchy + domain_hierarchy:
    net.add_edge(child, parent, label="rdfs:subClassOf", 
                 color=TYPE_RELATION_COLOR, dashes=True, width=1)

# --- 5. Generate Individuals ---
print("Step 3: Creating individuals (instances)...")

individuals = {}

# Document individuals
doc_types = ["iof:TechnicalReport", "iof:Specification", "iof:DataSet"]
for i in range(15):
    doc_id = f"DOC-{i+1:04d}"
    doc_type = random.choice(doc_types)
    individuals[doc_id] = {
        "label": f"Document {doc_id}",
        "type": doc_type,
        "color": INDIVIDUAL_COLOR,
        "size": 25
    }

# Organization individuals
org_names = ["Boeing", "Lockheed", "Raytheon", "Northrop", "GeneralDynamics", 
             "BAE", "Thales", "Airbus", "Saab", "RollsRoyce"]
org_types = ["org:Company", "org:Military", "org:Government"]
for i, name in enumerate(org_names):
    org_id = f"ORG-{name}"
    individuals[org_id] = {
        "label": name,
        "type": random.choice(org_types),
        "color": ENTITY_INDIVIDUAL_COLOR,
        "size": 35
    }

# System individuals
system_names = ["F35-Fighter", "Patriot-SAM", "Abrams-Tank", "Apache-Heli", 
                "Aegis-Combat", "THAAD-Defense", "GlobalHawk-UAV", "Virginia-Sub",
                "AWACS-Surveillance", "JSTARS-Radar"]
system_types = ["sys:WeaponSystem", "sys:VehicleSystem", "sys:CommunicationSystem", "sys:SensorSystem"]
for name in system_names:
    sys_id = f"SYS-{name}"
    individuals[sys_id] = {
        "label": name.replace("-", " "),
        "type": random.choice(system_types),
        "color": ENTITY_INDIVIDUAL_COLOR,
        "size": 30
    }

# Component individuals
for i in range(30):
    comp_id = f"COMP-{i+1:05d}"
    comp_types = ["comp:ElectronicComponent", "comp:MechanicalComponent", "comp:SoftwareComponent"]
    individuals[comp_id] = {
        "label": f"Component {comp_id}",
        "type": random.choice(comp_types),
        "color": INDIVIDUAL_COLOR,
        "size": 20
    }

# Process individuals
process_prefixes = ["ACQ", "MFG", "TST", "DPL", "DSN"]
process_types = ["proc:AcquisitionProcess", "proc:ManufacturingProcess", 
                 "proc:TestingProcess", "proc:DeploymentProcess", "proc:DesignProcess"]
for i in range(25):
    prefix = random.choice(process_prefixes)
    proc_id = f"{prefix}-PROC-{i+1:04d}"
    individuals[proc_id] = {
        "label": f"{prefix} Process {i+1}",
        "type": process_types[process_prefixes.index(prefix)],
        "color": PROCESS_INDIVIDUAL_COLOR,
        "size": 25
    }

# Add all individuals to the graph
for ind_id, props in individuals.items():
    net.add_node(ind_id, label=props["label"], shape="dot", 
                 color=props["color"], size=props["size"])
    # Add type relationship
    net.add_edge(ind_id, props["type"], label="rdf:type", 
                 color=TYPE_RELATION_COLOR, dashes=True, width=1)

# --- 6. Generate Relationships Between Individuals ---
print("Step 4: Creating relationships between individuals...")

# Document relationships
doc_ids = [k for k, v in individuals.items() if k.startswith("DOC-")]
sys_ids = [k for k, v in individuals.items() if k.startswith("SYS-")]
proc_ids = [k for k, v in individuals.items() if "PROC" in k]
org_ids = [k for k, v in individuals.items() if k.startswith("ORG-")]
comp_ids = [k for k, v in individuals.items() if k.startswith("COMP-")]

# Documents describe systems
for doc in random.sample(doc_ids, min(10, len(doc_ids))):
    for sys in random.sample(sys_ids, random.randint(1, 3)):
        net.add_edge(doc, sys, label="describes", 
                     color=FACT_RELATION_COLOR, width=2)

# Documents are inputs to processes
for doc in random.sample(doc_ids, min(8, len(doc_ids))):
    for proc in random.sample(proc_ids, random.randint(1, 2)):
        net.add_edge(doc, proc, label="is_input_of", 
                     color=FACT_RELATION_COLOR, width=2)

# Organizations participate in processes
for org in org_ids:
    for proc in random.sample(proc_ids, random.randint(2, 4)):
        net.add_edge(org, proc, label="participates_in", 
                     color=PROPERTY_RELATION_COLOR, width=2)

# Systems have components
for sys in sys_ids:
    num_components = random.randint(3, 6)
    for comp in random.sample(comp_ids, num_components):
        net.add_edge(sys, comp, label="has_component", 
                     color=PROPERTY_RELATION_COLOR, width=2)

# Processes produce systems
mfg_procs = [k for k, v in individuals.items() if "MFG" in k]
for proc in mfg_procs:
    if sys_ids:
        sys = random.choice(sys_ids)
        net.add_edge(proc, sys, label="produces", 
                     color=FACT_RELATION_COLOR, width=2)

# Processes follow other processes
for i, proc in enumerate(proc_ids[:-1]):
    if random.random() > 0.6:  # 40% chance of sequential relationship
        next_proc = random.choice(proc_ids[i+1:])
        net.add_edge(proc, next_proc, label="precedes", 
                     color=PROPERTY_RELATION_COLOR, width=2)

# Organizations supply components
supplier_orgs = random.sample(org_ids, min(5, len(org_ids)))
for org in supplier_orgs:
    for comp in random.sample(comp_ids, random.randint(2, 5)):
        net.add_edge(org, comp, label="supplies", 
                     color=FACT_RELATION_COLOR, width=2)

# Add some cross-references between documents
for i in range(10):
    doc1, doc2 = random.sample(doc_ids, 2)
    net.add_edge(doc1, doc2, label="references", 
                 color=PROPERTY_RELATION_COLOR, width=1)

# --- 7. Add Additional Properties ---
print("Step 5: Adding property relationships...")

# Add some quality/property nodes
properties = {
    "PROP-Critical": "Critical",
    "PROP-HighPriority": "High Priority",
    "PROP-Classified": "Classified",
    "PROP-Approved": "Approved",
    "PROP-UnderReview": "Under Review"
}

for prop_id, label in properties.items():
    net.add_node(prop_id, label=label, shape="diamond", 
                 color="#FFD700", size=18)  # Gold color for properties

# Assign properties to various entities
for _ in range(20):
    entity = random.choice(list(individuals.keys()))
    prop = random.choice(list(properties.keys()))
    net.add_edge(entity, prop, label="has_status", 
                 color="#FFD700", width=1)

# --- 8. Generate Statistics ---
print("\nGraph Statistics:")
print(f"- Total Nodes: {len(net.nodes)}")
print(f"- Total Edges: {len(net.edges)}")
print(f"- Classes: {len(bfo_classes) + len(domain_classes)}")
print(f"- Individuals: {len(individuals)}")
print(f"- Properties: {len(properties)}")

# --- 9. Save and Display ---
# Show comprehensive physics controls
net.show_buttons(filter_=['physics', 'nodes', 'edges', 'interaction', 'manipulation', 'physics', 'selection'])

# Additional physics options
net.options = {
    "nodes": {
        "font": {
            "size": 16,
            "face": "arial",
            "strokeWidth": 2,
            "strokeColor": "#000000"
        },
        "borderWidth": 2,
        "shadow": True
    },
    "edges": {
        "width": 2,
        "shadow": True,
        "smooth": {
            "type": "continuous",
            "roundness": 0.5
        },
        "font": {
            "size": 12,
            "strokeWidth": 0,
            "color": "#888888"
        }
    },
    "physics": {
        "enabled": True,
        "barnesHut": {
            "gravitationalConstant": -5000,
            "centralGravity": 0.5,
            "springLength": 100,
            "springConstant": 0.08,
            "damping": 0.2,
            "avoidOverlap": 0.1
        },
        "minVelocity": 0.75,
        "solver": "barnesHut",
        "stabilization": {
            "enabled": True,
            "iterations": 1000,
            "updateInterval": 25
        }
    },
    "interaction": {
        "hover": True,
        "tooltipDelay": 300,
        "zoomView": True,
        "dragView": True,
        "dragNodes": True,
        "navigationButtons": True,
        "keyboard": True
    }
}

# Save the graph
file_path = "large_knowledge_graph.html"
net.save_graph(file_path)

print(f"\nSUCCESS: Large knowledge graph has been saved to '{file_path}'")
print(f"The graph contains {len(net.nodes)} nodes and {len(net.edges)} edges.")
try:
    webbrowser.open(file_path)
    print(f"Opening '{file_path}' in your web browser...")
except Exception as e:
    print(f"Could not automatically open file. Please open '{file_path}' manually. Error: {e}")

# Optional: Save graph data for later analysis
import json
graph_data = {
    "nodes": [{"id": node["id"], "label": node["label"], "group": node.get("color", "")} 
              for node in net.nodes],
    "edges": [{"from": edge["from"], "to": edge["to"], "label": edge.get("label", "")} 
              for edge in net.edges]
}
with open("graph_data.json", "w") as f:
    json.dump(graph_data, f, indent=2)
print(f"Graph data also saved to 'graph_data.json' for further analysis.")
