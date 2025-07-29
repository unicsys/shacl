

The Goal: Create a "Digital Twin" of an aircraft engine to answer critical decision support questions.

The Problem: Our data is spread across dozens of tables from different systems:

    Maintenance Data (IMIS)

    Inspection Data (ESAS)

    Operational Data (CEDU binaries)

Key Challenge: The same real-world object, like an engine, is referred to by different column names (ESN, ENGINE_SN, NHA_ENG_ITEM_SN, END_ITEM_SN) in different tables.

The Question: How do we unify this data into a single, cohesive view of reality?
Approach
Our first step was a comprehensive data profiling and research phase to identify all the unique "hubs" or identifiers that connect our data.

We discovered that these identifiers are not random; they fall into clear, logical categories that represent the real world.

High-Level Identifier Categories:

    Physical Objects & Parts: Serial Numbers, Tail Numbers

    Events & Processes: JCNs (Jobs), FRCs (Faults), Sorties (Flights)

    Information & Data Artifacts: TCTOs (Directives), File Names

    People & Organizations: Employee Numbers, Work Center Codes

Insight: These are not just database keys; they are the fingerprints of real-world things and events.
The Power of Ontology: Defining "What Things Are"
The Problem with Just Joining Tables: A database join can tell you that a JCN value in one table matches a JCN in another. It cannot tell you what a JCN is.

This is where ontology helps. An ontology provides a formal, machine-readable definition of our concepts. Instead of just matching strings, we define the reality behind the data.

The Ontological Distinction (Our "Aha!" Moment):

    The string "JCN-12345" is an Identifier.

    This identifier denotes (points to) a real-world Maintenance Process—a collection of actions that happened over a period of time.

Why This Matters: By modeling this distinction, we can now connect everything that happened during that job (parts, people, directives) to this single MaintenanceProcess instance, creating a rich web of context.
 The "As-Maintained" Model: Connecting Everything
Using the ontology, we built a formal model that captures the full story of a component's lifecycle.

This model shows how our identified concepts are linked:

    A MaintenanceProcess (identified by a JCN) is performed to comply with a TechnicalOrder (identified by a TCTO Number).

    This process involves installing a Part (identified by a Serial Number) at a specific Site (identified by an LCN) on an Engine (identified by a Serial Number).

    This creates an InstalledState that exists over a specific TemporalInterval.

Key Takeaway: The ontology provides the "semantic glue" to link dozens of columns from different tables into one logical, human-readable story.
The Ontology-Driven ETL Process
Our ontology doesn't just describe the target; it drives our entire data integration (ETL) process.
1. Entity Reconciliation & Canonicalization (The "One Truth"):
    We query all tables that refer to an engine (using our research from Slide 2).
    The ontology tells us these all refer to the class Engine. We create one single node (a canonical entity) for each unique engine and map all other references to it.
    Result: No duplicates. All facts about Engine 'ABC' are connected to a single node.
2. Relation Inference (The "Hidden Facts"):
    The data only records an "installation date". It doesn't explicitly state a "removal date".
    Our ontological model requires the InstalledState to have a start and an end. This forces us to infer the removal.
    Logic: If a new part is installed at the same LCN on the same engine, we infer that the old part was removed at that time. The ontology gives us the pattern to look for.
3. Hypothesis Testing & Validation:
    Hypothesis: The *_HEALTH tables contain data about specific components.
    Test: The ontology demands that a data reading (Quality) must inhere in a physical thing (EngineComponent). This forces us to decode the PARAM_INDEX to find the specific component. If we can't, we have a data quality issue. The ontology validates our data's completeness.

JCN (Job Control Number): The "What Happened?"

    What it is: The unique ID for an entire maintenance job or work order.

    Why it's important: It's the event hub. The JCN links every part, person, document, and action that was part of a single maintenance event, allowing us to build a complete, 360-degree view of the job.

LCN (Logical Control Number): The "Where?"

    What it is: The identifier for a specific physical "slot" on an engine (e.g., the position for the #1 fuel pump).

    Why it's important: It allows us to track the history of a single position over time, enabling crucial relation inference like determining when a part was removed to make way for a new one.

TCTO (Technical Order Number): The "Why?"

    What it is: The identifier for a directive, like a safety bulletin or mandatory upgrade.

    Why it's important: It provides the causal link for a maintenance event. It connects a specific job (JCN) to the high-level requirement that triggered it, enabling impact and compliance analysis.

FRC (Fault Reporting Code): The "Problem Trigger"

    What it is: The identifier for a specific fault or problem instance reported by the engine's systems.

    Why it's important: It is often the root cause of a maintenance job. By linking an FRC to a JCN, we can trace a maintenance action directly back to the operational fault that initiated it.

The Entity Reconciliation Challenge: What's in a Name?
    (Visual: A central icon for "Engine" with arrows pointing to it from boxes containing different column names: ESN, ENGINE_SN, etc. Do the same for "Engine Component")
    A core challenge in data integration is that there is no single, consistent name for our key entities across all source tables. Our data profiling revealed this complexity.
    An "Engine" is called...
        Directly: ESN, ENGINE_SN, NHA_ENG_ITEM_SN, END_ITEM_SN
        Via Internal ID: ENG_ID (requires a join)
        Indirectly: AIRCRAFT_SN (requires temporal logic to find the installed engine)
        Ambiguously: ENGINE_ITEM_SN (in some tables, this is the engine; in others, it's a part)

    An "Engine Component" is called...

        Directly: SERIAL_NO, ITEM_SN

        Ambiguously: ENGINE_ITEM_SN (in many maintenance tables, this is the part being worked on)

    How Ontology Solves This:

        Our ontology defines a single, canonical class: AircraftEngine.

        Our ETL process is now an Entity Reconciliation engine. It uses the contextual rules we've discovered to map all these different columns to the single, correct AircraftEngine instance in the graph.

        Result: This prevents data duplication and creates a single, unified view, ensuring that all facts about a specific engine are connected to one node, regardless of what that engine was called in the source data.

