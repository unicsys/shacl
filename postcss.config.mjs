Of course. This is the perfect next step: turning our conceptual ontology into a practical, data-driven pipeline. Your request for a modular approach is exactly the right way to build this. We will break the code into logical, reusable pieces.

We will create a multi-file Python script that uses the rdflib library to translate your ENG_INST_ITEM.csv data into a valid RDF graph based on our Aircraft Engine Digital Twin Ontology (AEDTO).

Step 1: The Project Structure

A modular approach is best. Let's set up our project with three separate files. This keeps our concerns separate and makes the code much easier to maintain and expand.

Generated code
digital-twin-rdf/
├── data/
│   └── ENG_INST_ITEM.csv
├── ontology_defs.py
├── create_graph.py
└── process_installations.py


data/ENG_INST_ITEM.csv: This will hold our sample source data.

ontology_defs.py: This is a foundational, reusable module. It will define all our ontology's namespaces and classes, acting as a single source of truth for our terminology.

create_graph.py: This is the main script that will orchestrate the process. It will initialize the graph and process the CSV file.

process_installations.py: a dedicated module for processing the installation csv file.

Step 2: Create a Sample CSV File

First, let's create a sample CSV file to work with. This data reflects the scenarios we discussed, including a part going into a sub-assembly, and a sub-assembly going into an engine.

data/ENG_INST_ITEM.csv:

Generated csv
NHA_ENG_ITEM_PN,NHA_ENG_ITEM_SN,LCN,ENGINE_SN,ENG_ITEM_PN,ENG_ITEM_SN,ITEM_INST_DTG,FILENAME_DTG,FILENAME_BASE
ROTOR-ASSY-A,ROTOR-456,2431-01A-03B,ENGINE-789,BLADE-PN-X,BLADE-123,2023-05-10T14:00:00Z,20230510,BASE-A
ENGINE-PN-1,ENGINE-789,2430-01,ENGINE-789,ROTOR-ASSY-A,ROTOR-456,2023-06-15T09:30:00Z,20230615,BASE-B
IGNORE_WHEN_COPYING_START
content_copy
download
Use code with caution.
Csv
IGNORE_WHEN_COPYING_END

Row 1: A blade (BLADE-123) is installed into a sub-assembly (ROTOR-456).

Row 2: The same sub-assembly (ROTOR-456) is later installed into the main engine (ENGINE-789).

Step 3: The Ontology Definitions Module

This file defines all our terminology. It's like a header file that prevents typos and keeps our ontology references consistent.

ontology_defs.py:

Generated python
from rdflib import Namespace, RDFS, XSD
from rdflib.namespace import RDF, OWL

# -----------------
# 1. NAMESPACES
# -----------------
# We use a more generic namespace for reuse across future projects (e.g., landing gear)
AALO = Namespace("https://spec.yourcompany.com/aalo/")

# Basic Formal Ontology (BFO) and Industrial Ontology Foundry (IOF) Core
BFO = Namespace("http://purl.obolibrary.org/obo/BFO_")
CORE = Namespace("https://spec.industrialontologies.org/ontology/core/Core/")

# -----------------
# 2. OUR CUSTOM CLASSES
# -----------------
# Physical Objects (Continuants)
Aircraft = AALO.Aircraft
AircraftEngine = AALO.AircraftEngine
EngineSubAssembly = AALO.EngineSubAssembly
EnginePart = AALO.EnginePart
ComponentPosition = AALO.ComponentPosition

# Contextual Roles (Dependent Continuants)
InstalledComponentRole = AALO.InstalledComponentRole

# Lifecycle Events (Occurrents / Processes)
InstallationProcess = AALO.InstallationProcess
RemovalProcess = AALO.RemovalProcess

# Identifiers (Generically Dependent Continuants)
AircraftTailNumber = AALO.AircraftTailNumber
AircraftEngineSerialNumber = AALO.AircraftEngineSerialNumber
SubAssemblySerialNumber = AALO.SubAssemblySerialNumber
PartSerialNumber = AALO.PartSerialNumber
LogisticsControlNumber = AALO.LogisticsControlNumber
InstallationTaskNumber = AALO.InstallationTaskNumber

# Temporal Entities
InstallationEventInterval = AALO.InstallationEventInterval
InstalledStateInterval = AALO.InstalledStateInterval

# -----------------
# 3. PROPERTIES / PREDICATES
# -----------------
# For our own custom properties if needed (none for now)
# e.g., isRealizedAt = AALO.isRealizedAt

# For simplicity, we can map direct properties here if we want a shorthand
# For now, we will use the full BFO/CORE properties in the main script.
IGNORE_WHEN_COPYING_START
content_copy
download
Use code with caution.
Python
IGNORE_WHEN_COPYING_END
Step 4: The Graph Processing Module

This is the heart of the script. It will contain the logic to read a CSV row and generate all the necessary triples.

process_installations.py:

Generated python
import re
from rdflib import Graph, Literal
from ontology_defs import *

def clean_for_uri(text):
    """Replaces characters that are invalid in URIs with underscores."""
    return re.sub(r'[^a-zA-Z0-9_]', '_', text)

def process_installation_row(g, row):
    """
    Processes a single row from the ENG_INST_ITEM.csv and adds triples to the graph.

    Args:
        g (Graph): The rdflib Graph to add triples to.
        row (dict): A dictionary representing a single row from the CSV.
    """
    # 1. Extract data from the row
    nha_sn = row['NHA_ENG_ITEM_SN']
    lcn = row['LCN']
    engine_sn = row['ENGINE_SN']
    part_sn = row['ENG_ITEM_SN']
    install_dtg_str = row['ITEM_INST_DTG']
    
    # Clean strings for use in URIs
    nha_sn_uri_part = clean_for_uri(nha_sn)
    part_sn_uri_part = clean_for_uri(part_sn)
    engine_sn_uri_part = clean_for_uri(engine_sn)
    lcn_uri_part = clean_for_uri(lcn)
    dtg_uri_part = clean_for_uri(install_dtg_str)

    # 2. Determine the classes of the part and the Next Higher Assembly (NHA)
    # This is a key business logic step. Here, we assume if the NHA's serial number
    # is the same as the engine's, it's an engine. Otherwise, it's a sub-assembly.
    if nha_sn == engine_sn:
        nha_class = AircraftEngine
        nha_id_class = AircraftEngineSerialNumber
    else:
        nha_class = EngineSubAssembly
        nha_id_class = SubAssemblySerialNumber

    # For this table, the installed item is either a part or a sub-assembly.
    # We can make a simple assumption for now. A more robust system might check a master parts DB.
    if "ROTOR" in row['ENG_ITEM_PN']:
         part_class = EngineSubAssembly
         part_id_class = SubAssemblySerialNumber
    else:
         part_class = EnginePart
         part_id_class = PartSerialNumber
         
    # 3. Create URIs for all individuals
    part_uri = AALO[f"Part_{part_sn_uri_part}"]
    part_id_uri = AALO[f"PartSN_{part_sn_uri_part}"]
    nha_uri = AALO[f"NHA_{nha_sn_uri_part}"]
    nha_id_uri = AALO[f"NhasSN_{nha_sn_uri_part}"]
    position_uri = AALO[f"Position_{nha_sn_uri_part}_{lcn_uri_part}"]
    lcn_uri = AALO[f"LCN_{lcn_uri_part}"]
    
    # URIs for the event and its context
    process_uri = AALO[f"Install_{part_sn_uri_part}_into_{nha_sn_uri_part}_at_{dtg_uri_part}"]
    role_uri = AALO[f"Role_{part_sn_uri_part}_in_{nha_sn_uri_part}_from_{dtg_uri_part}"]
    
    # URIs for temporal entities
    event_interval_uri = AALO[f"EventInterval_{process_uri.split('/')[-1]}"]
    state_interval_uri = AALO[f"StateInterval_{role_uri.split('/')[-1]}"]
    install_end_instant_uri = AALO[f"Instant_{dtg_uri_part}"]
    
    # 4. Add Triples for Physical Objects and their Identifiers
    g.add((part_uri, RDF.type, part_class))
    g.add((part_uri, CORE.isDesignatedBy, part_id_uri))
    g.add((part_id_uri, RDF.type, part_id_class))
    g.add((part_id_uri, RDFS.label, Literal(part_sn)))
    
    g.add((nha_uri, RDF.type, nha_class))
    g.add((nha_uri, CORE.isDesignatedBy, nha_id_uri))
    g.add((nha_id_uri, RDF.type, nha_id_class))
    g.add((nha_id_uri, RDFS.label, Literal(nha_sn)))

    # 5. Add Triples for the Component Position (the "Socket")
    g.add((position_uri, RDF.type, ComponentPosition))
    g.add((position_uri, CORE.isDesignatedBy, lcn_uri))
    g.add((lcn_uri, RDF.type, LogisticsControlNumber))
    g.add((lcn_uri, RDFS.label, Literal(lcn)))
    g.add((nha_uri, BFO.hasPart, position_uri)) # The position is part of the NHA
    
    # 6. Add Triples for the Installation Process (the Event)
    g.add((process_uri, RDF.type, InstallationProcess))
    g.add((process_uri, RDF.type, CORE.GainOfRole)) # Multiple inheritance
    g.add((process_uri, RDF.type, CORE.PlannedProcess)) # Multiple inheritance
    g.add((process_uri, BFO.hasParticipantAtAllTimes, part_uri))
    g.add((process_uri, BFO.hasParticipantAtAllTimes, nha_uri))
    g.add((process_uri, CORE.hasOutput, role_uri))

    # 7. Add Triples for the Installed Component Role (the Context)
    g.add((role_uri, RDF.type, InstalledComponentRole))
    g.add((role_uri, CORE.roleOf, part_uri))
    # In a full model, we would add a custom 'isRealizedAt' property
    g.add((role_uri, AALO.isRealizedAt, position_uri))

    # 8. Add Triples for the Temporal Model
    install_datetime = Literal(install_dtg_str, datatype=XSD.dateTime)
    
    # The event itself
    g.add((process_uri, BFO.occupiesTemporalRegion, event_interval_uri))
    # Per IOF note, if only one time is given, use it as the end of the event
    g.add((event_interval_uri, BFO.hasLastInstant, install_end_instant_uri))
    
    # The resulting state
    g.add((role_uri, BFO.existsAt, state_interval_uri))
    g.add((state_interval_uri, BFO.hasFirstInstant, install_end_instant_uri))
    
    # The formal connection between the two intervals
    g.add((event_interval_uri, CORE.meets, state_interval_uri))
    
    # The actual timestamp value
    g.add((install_end_instant_uri, RDF.type, BFO.TemporalInstant))
    g.add((install_end_instant_uri, AALO.hasTimestamp, install_datetime))
IGNORE_WHEN_COPYING_START
content_copy
download
Use code with caution.
Python
IGNORE_WHEN_COPYING_END
Step 5: The Main Orchestration Script

This script initializes the graph, reads the CSV, and calls our processing function for each row.

create_graph.py:

Generated python
import csv
from rdflib import Graph
from ontology_defs import *
from process_installations import process_installation_row

def initialize_graph():
    """Initializes an rdflib Graph and binds all necessary prefixes."""
    g = Graph()
    g.bind("aalo", AALO)
    g.bind("bfo", BFO)
    g.bind("core", CORE)
    g.bind("rdf", RDF)
    g.bind("rdfs", RDFS)
    g.bind("owl", OWL)
    g.bind("xsd", XSD)
    return g

def main():
    """
    Main function to create the RDF graph from the ENG_INST_ITEM.csv file.
    """
    # 1. Initialize the graph with all our prefixes
    g = initialize_graph()
    
    # 2. Define the input CSV file
    csv_file_path = 'data/ENG_INST_ITEM.csv'
    
    print(f"Starting RDF generation from {csv_file_path}...")

    # 3. Open and process the CSV file
    try:
        with open(csv_file_path, mode='r', encoding='utf-8') as csvfile:
            reader = csv.DictReader(csvfile)
            for row in reader:
                process_installation_row(g, row)
        
        print(f"Processed {len(list(reader))} rows.")
    except FileNotFoundError:
        print(f"Error: The file {csv_file_path} was not found.")
        return
        
    # 4. Save the graph to a Turtle (.ttl) file
    output_file_path = 'output/installation_history.ttl'
    g.serialize(destination=output_file_path, format='turtle')
    
    print(f"Successfully created RDF graph with {len(g)} triples.")
    print(f"Output saved to {output_file_path}")

if __name__ == '__main__':
    main()
IGNORE_WHEN_COPYING_START
content_copy
download
Use code with caution.
Python
IGNORE_WHEN_COPYING_END
How to Run the Code

Make sure you have rdflib installed (pip install rdflib).

Create the directory structure as described (data/ and output/).

Place the four files (ENG_INST_ITEM.csv, ontology_defs.py, process_installations.py and create_graph.py) in their correct locations.

Run the main script from your terminal: python create_graph.py

This modular approach allows you to easily add new processing functions in the future (e.g., process_removals.py, process_operations.py) without touching the core definitions or the main graph creation logic. It is the perfect foundation for your project.
