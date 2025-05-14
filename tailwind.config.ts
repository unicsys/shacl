import type { Config } from "tailwindcss"

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        red: {
          500: "#DF231E",
        },
        green: {
          400: "#73A252",
          800: "#32581B",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],


  ==============


  Create a BFO‑aligned Circuit Card Assembly (CCA) Manufacturing Ontology that semantically links screen‑printing, SPI, pick‑and‑place, AOI, reflow, and X‑ray data so an automated reasoner can recommend the most likely correct disposition for each X‑ray non‑conformance (NC). The ontology will serve as the “semantic glue” between the data lakehouse tables, analytics pipelines, and a rules/ML engine, allowing faster, more defensible decisions at the end of the line.
2  Business Value & ROI
Benefit	Metric / KPI	Why It Matters
Decision speed	⬇ Mean NC disposition cycle time (hrs)	Frees inspectors, shortens WIP queues
Decision quality	⬆ First‑pass yield; ⬇ false rework/scrap rate	Lowers rework labor & material scrap
Process insight	Statistical link between upstream parameters and NCs	Drives continuous‑improvement projects
Audit traceability	Machine‑readable provenance graph	Satisfies regulatory & customer audits

    Back‑of‑envelope: A 20 % drop in false‑scrap on a $500 M board program saves ~$3 M/yr; cutting MRB engineer touch time by 50 % saves another ~$1 M/yr.

3  Primary Decision‑Support Questions (DSQs)

    Disposition Recommendation DSQ

        Given an NC detected by X‑ray on RefDes X, using the full history of process and inspection data for this board, what is the statistically & logically justified disposition (Accept‑As‑Is | Rework | Scrap)?

    Root‑Cause Likelihood DSQ

        Which upstream process parameter (e.g., solder‑paste volume, reflow profile) most likely caused the observed NC?

    Preventive Action DSQ

        What parameter adjustment will most reduce recurrence probability for this NC category on the next build lot?

4  Stakeholders & Their Questions
Role (Persona)	Typical Question	Ontology Payoff
X‑ray inspector	“Can I trust this NC flag, or should I override it?”	One‑click recommendation w/ provenance
Process engineer	“Which oven zone is drifting out of spec and causing voids?”	Query causal links across processes
MRB / Quality engineer	“Why did we scrap 12 boards last week?”	Traceable decision logic for audits
Ops manager	“Where do I invest CAPEX to lift yield 2 %?”	Aggregate defect causality analytics
5  Scope Definition
Category	IN SCOPE	OUT OF SCOPE (future phases)
Products	CCA assemblies, sub‑assemblies, components, apertures, stencils	Cable harnesses, mechanical sub‑assemblies
Processes (Occurrents)	Screen‑print, SPI, Pick‑Place, AOI, Reflow, X‑ray, Manual MRB decision	Conformal coat, functional test
Parameters & Results	All data fields you listed (paste volume, placement shift, void %, etc.)	Low‑level chemistry of solder alloy
Agents	Human inspectors, machines (by asset ID)	Enterprise resource planning roles
Information Artifacts	Measurement records, images (metadata only), NC tickets, dispositions	Complete image pixel payload (link only)
Temporal granularity	Lot build cycle, board serial number trace, per‑RefDes timestamp	Nanosecond‑level machine logs
6  Ontology Boundaries in BFO Terms
BFO Top‑Level Class	Example from CCA Domain
Material Entity (Continuant)	CCA_Board_123, Stencil_XYZ, Printer_Squeegee
Information Content Entity	SPI_Result_456, XRay_Image_Metadata_789, Disposition_Record
Process (Occurrent)	Reflow_Cycle_2025‑05‑14‑LotA, AOI_Inspection
Quality	Paste_Viscosity_25 °C, Joint_Void_Percentage
Role	MRB_Engineer_Role, Operator_Role

Object properties will trace “has_part”, “participates_in”, “is_output_of”, “has_disposition”, etc., ensuring each DSQ can be written as a SPARQL or SHACL rule over well‑typed triples.
7  Assumptions & Constraints

    Data availability: Machines expose event logs in the data lake within < 5 min of production.

    Single board granularity: All parameters are traceable to P/N + S/N.

    Ontology layering: Re‑use BFO + CCO upper/mid‑level terms; extend with a CCA‑Process domain module.

    Reasoner: OWL 2 DL + SWRL/SHACL rules for simple causality; heavier ML models can write back inferred triples for hybrid reasoning.

8  Next Step Checklist

    Validate DSQs with each stakeholder—tune wording and ROI targets.

    Enumerate competency questions derived from DSQs (edge cases, “why not” scenarios).

    Draft class hierarchy mapping domain terms to BFO/CCO skeleton.

    Define key object/data properties needed to answer DSQs; test with toy instances.

    Iterate—demo a minimal happy‑path reasoning flow on historical lot data.


      ===================================================


Overall Goal: Demonstrate to stakeholders the value of semantic technologies (specifically an ontology-based knowledge graph) for improving the Circuit Card Assembly (CCA) manufacturing process, focusing on X-ray non-conformance (N/C) disposition.

Step 1: Define Scope, Purpose, Key Questions, Stakeholders, and ROI

Let's refine this based on your information.

A. Purpose of the Ontology

The primary purpose of this ontology is:

    To formally model the CCA manufacturing and inspection domain: This includes representing CCAs, manufacturing processes (screen printing, SPI, pick & place, AOI, reflow, X-ray), their parameters, the data they generate, observed defects, and dispositions.

    To enable semantic integration of heterogeneous data: To link data from disparate systems (screen printer, SPI, PnP, AOI, reflow, X-ray machines, MES, etc.) related to a specific CCA unit or batch.

    To provide a knowledge base for intelligent decision support: Specifically, to assist human inspectors in making faster, more accurate, and consistent disposition decisions for X-ray detected non-conformances by providing context from upstream processes and historical data.

    To facilitate advanced analytics and root cause analysis: By structuring the data and relationships, the ontology will allow for querying patterns and correlations that are currently difficult to uncover.

B. Scope of the Ontology

To keep the initial demo manageable yet impactful, the scope will focus on the "intelligent X-ray N/C disposition recommender" use case.

In Scope:

    CCA Unit Tracking: Representation of individual CCAs (identified by P/N, S/N) and their components (RefDes, Pin#).

    Manufacturing Process Sequence: Modeling the defined sequence: Screen Printer -> SPI -> Pick & Place -> AOI -> Reflow Oven -> X-ray Inspection -> Manual Disposition.

    Key Process Data & Parameters (as relevant to solder joint quality and defects):

        Screen Printing: Key settings (e.g., pressure, speed), solder paste properties (e.g., type, viscosity from batch info).

        SPI Inspection: Key measurements (e.g., volume, height, area, alignment) per RefDes/Pin#.

        Pick & Place: Component placement accuracy, evidence of component shift (if data available).

        AOI Inspection: Detected surface/soldering defects, missing/misplaced components per RefDes.

        Reflow Process: Oven profile used (e.g., profile name, key setpoints like peak temp if available for the CCA's batch).

        X-Ray Inspection: Detected N/C categories (e.g., voiding, insufficient solder, bridging), location (RefDes/Pin#), associated image metadata (if queryable).

    Defects & Non-Conformances: Types of defects, their location, severity (if available).

    Dispositions & Repairs: Historical disposition decisions (Pass, Fail, Rework, Scrap) and repair actions taken for specific defects/NCs.

    Relationships: Connecting CCAs to processes they underwent, processes to data generated, data to specific locations (RefDes/Pin#) on the CCA, defects to CCAs and processes, and historical defects to their dispositions.

    Time: Timestamps for processes and data generation to maintain a chronological "digital thread."

Out of Scope (for the initial demo, but potential future extensions):

    Detailed machine maintenance schedules and their direct impact (unless a direct, simple link to a defect type is easily available).

    Operator skill levels or specific operator IDs tied to defects.

    Detailed financial cost of defects or rework (ROI will be qualitative or high-level quantitative).

    Real-time machine control feedback loops.

    Full physics-based modeling of solder paste or reflow dynamics.

    Raw image processing (focus on metadata and detected defect information).

    Supply chain information for individual components (e.g., vendor batch quality issues), unless easily available and critical.

    The machine learning model itself (the ontology provides data for ML, and can store ML recommendations, but isn't the ML algorithm).

C. Key Stakeholders & Their "Why"

    X-Ray Inspector / Manual Reviewer:

        Why they care: Reduce cognitive load, increase confidence in decisions, reduce time spent investigating false flags, improve consistency, learn from historical data.

        Pain point addressed: Overwhelmed by data, difficulty correlating X-ray findings with upstream events, pressure for speed and accuracy.

    Quality Engineer:

        Why they care: Improve overall product quality, identify root causes of recurring defects, implement preventative actions, reduce scrap and rework.

        Pain point addressed: Difficulty performing systemic root cause analysis across siloed data, identifying patterns that link process variations to specific defects.

    Process Engineer:

        Why they care: Optimize manufacturing processes, understand the impact of parameter changes on final quality, improve yield.

        Pain point addressed: Limited visibility into how upstream process variations specifically affect X-ray outcomes for particular solder joints.

    Manufacturing Management / Decision Makers (your stakeholders for the demo):

        Why they care: Improve operational efficiency, reduce costs (scrap, rework, inspection time), enhance product reliability, see a tangible example of "Industry 4.0" or "Smart Factory" benefits.

        Pain point addressed: Need for data-driven decision-making, desire to leverage existing data more effectively, looking for innovative solutions to persistent quality and efficiency challenges.

D. Decision Support Questions (DSQs) the Ontology will Help Answer (for the demo)

These questions are designed to show the reasoning capability by traversing the knowledge graph.

    Inspector-Focused DSQs (Primary for Demo):

        "For this CCA (S/N: XYZ123) with an X-ray non-conformance (e.g., 'Voiding > 25%') at U1-pin3, what were the upstream SPI measurements (volume, height, offset) for this specific solder paste deposit?"

        "Were there any AOI-detected issues (e.g., 'component shift', 'insufficient solder') related to component U1 on CCA XYZ123?"

        "What reflow oven profile was used for the batch containing CCA XYZ123, and were there any logged anomalies for that profile run?"

        "Show me historical instances of 'Voiding > 25%' on the same component (P/N: ABC, RefDes: U1-pin3) where upstream SPI volume was 'low' and AOI reported 'no issues'. What were the final dispositions and repair actions for those instances?"

        (The "Recommendation" DSQ - powered by the answers above and potentially a simple rule or ML model fed by the KG): "Given the current X-ray defect on CCA XYZ123 at U1-pin3, and its upstream process data signature (SPI, AOI, Reflow), what is the recommended disposition (e.g., 'Review further', 'Accept as is', 'Rework: Add Solder') based on historical precedents and known process sensitivities?"

    Engineer-Focused DSQs (Secondary, to show broader potential):
    6. "Which screen printer settings (e.g., pressure range X-Y) combined with solder paste type 'SAC305' show the highest correlation with 'insufficient solder' defects detected at X-ray for P/N ABC?"
    7. "Is there a higher incidence of X-ray detected 'bridging' on CCAs that also had 'excess solder' reported by SPI at the same locations?"

E. Return on Investment (ROI) - How to Convince Stakeholders

The ontology and the resulting decision support system will deliver ROI by:

    Improved Decision Speed:

        Evidence: Inspectors spend less time hunting for contextual data. Recommendations guide them.

        Metric (example): Reduction in average N/C disposition time per CCA.

    Improved Decision Fidelity (Accuracy & Consistency):

        Evidence: Fewer false positives (passing good boards) and fewer false negatives (failing good boards or missing critical defects that escape). More consistent dispositions across inspectors.

        Metric (example): Reduction in downstream failures attributed to missed X-ray defects; reduction in unnecessary rework from overly cautious dispositions.

    Reduced Rework & Scrap:

        Evidence: Better understanding of defect causes (via DSQs 6 & 7) allows process improvements. More accurate dispositions avoid unnecessary rework.

        Metric (example): Percentage decrease in scrap rate for targeted P/Ns; reduction in rework hours.

    Enhanced Process Understanding & Optimization:

        Evidence: Ability to ask complex questions about process interactions and their impact on quality.

        Benefit: Faster identification of root causes, leading to more effective corrective and preventive actions.

    Knowledge Retention & Democratization:

        Evidence: Expert knowledge about defect patterns and process sensitivities is captured in the ontology and accessible.

        Benefit: Less reliance on individual "tribal knowledge"; easier training for new inspectors/engineers.

    Foundation for Advanced Analytics & AI:

        Evidence: The structured, contextualized data in the KG is ideal input for machine learning models for predictive quality, anomaly detection, etc.

        Benefit: Unlocks future capabilities beyond the initial use case.

By focusing your demo on answering DSQs 1-5, you can tangibly show how the ontology connects disparate data to provide actionable insights for the X-ray inspector. This directly addresses their pain points and demonstrates clear value.

This detailed definition should provide a solid foundation for the next step: determining classes and their BFO categorization.
Does this align with your vision for the first step?

=================================================

DSQ: "For this CCA (S/N: XYZ123) with an X-ray non-conformance (e.g., 'Voiding > 25%') at U1-pin3, what were the upstream SPI measurements (volume, height, offset) for this specific solder paste deposit?"

===================

    CCA (Circuit Card Assembly)

    S/N (Serial Number)

    X-ray non-conformance

    'Voiding > 25%' (Type of non-conformance)

    U1-pin3 (Location)

        U1 (Component)

        pin3 (Pin of component)

    SPI measurements

    Volume, Height, Offset (Types of measurements / measured qualities)

    Solder paste deposit

    Upstream (implies process sequence and time)

    X-Ray Inspection Process (implied: generates the non-conformance)

    SPI Inspection Process (implied: generates SPI measurements)

    Screen Printing Process (implied: creates the solder paste deposit)

BFO-Aligned Classes & Key Properties for this DSQ:

We'll categorize them under BFO's top levels: Continuant and Occurrent.

1. BFO:Continuant (Things that persist through time, maintaining their identity)

      
*   **BFO:Independent Continuant** (Exist by themselves)
    *   **BFO:Material Entity** (Entities with mass, occupying space)
        *   `myOnt:CircuitCardAssembly` (Abbreviated: `CCA`)
            *   *A physical CCA board.*
            *   *Example individual:* `cca_XYZ123`
        *   `myOnt:ElectronicComponent`
            *   *A physical component mounted or to be mounted on a CCA (e.g., IC, resistor, capacitor).*
            *   *Example individual:* An instance representing the component at designator `U1` on `cca_XYZ123`.
        *   `myOnt:ComponentPin`
            *   *A physical pin or pad of an ElectronicComponent.*
            *   *Example individual:* An instance representing `pin3` of the component `U1`.
        *   `myOnt:SolderPasteDeposit`
            *   *A specific deposit of solder paste on a CCA pad prior to reflow.*
            *   *Example individual:* The deposit intended for `U1-pin3` on `cca_XYZ123`.
        *   `myOnt:SolderJoint`
            *   *A specific solder joint formed after reflow, connecting a component pin to a CCA pad. This is what X-Ray inspects.*
            *   *Example individual:* The solder joint at `U1-pin3` on `cca_XYZ123`. (The X-ray non-conformance inheres in this or is about this).

*   **BFO:Specifically Dependent Continuant (SDC)** (Exist in or depend on other entities)
    *   **BFO:Quality** (Properties that inhere in entities, e.g., color, mass, temperature)
        *   `myOnt:Volume` (inheres in `SolderPasteDeposit` or `SolderJoint`)
        *   `myOnt:Height` (inheres in `SolderPasteDeposit`)
        *   `myOnt:Area` (inheres in `SolderPasteDeposit`)
        *   `myOnt:PositionalOffset` (inheres in `SolderPasteDeposit` relative to a target location)
        *   `myOnt:VoidingPercentage` (inheres in `SolderJoint`)
    *   **BFO:Realizable Entity** (Potentials, dispositions, roles)
        *   `myOnt:DefectState` (A disposition to be considered defective. This could inhere in `SolderJoint` or `CCA`)
            *   *This is the actual state of being defective.*
    *   **BFO:Generically Dependent Continuant (GDC)** (Dependence is generic, not on specific individuals)
        *   **RO:Information Content Entity (ICE)** (from OBO's Relation Ontology, aligns with BFO's GDC spirit for data)
            *   `myOnt:SerialNumber`
                *   *An identifier string that designates a specific CCA.*
                *   *Example individual:* The string literal "XYZ123".
            *   `myOnt:ReferenceDesignator`
                *   *An identifier for a component's location on a CCA (e.g., "U1", "R1").*
            *   `myOnt:PinIdentifier`
                *   *An identifier for a pin on a component (e.g., "3", "A1").*
            *   `myOnt:SPIMeasurementDatum`
                *   *The recorded information about an SPI measurement. It is *about* a specific `SolderPasteDeposit` and its qualities.*
                *   It would have properties for value and unit, and what quality it measures (e.g., `measuresQuality` `myOnt:Volume`).
            *   `myOnt:XRayFinding` (or `myOnt:NonConformanceObservationDatum`)
                *   *The recorded information about an X-Ray inspection result, specifically a non-conformance.*
                *   It is *about* a `SolderJoint` (or `CCA` region).
            *   `myOnt:DefectType`
                *   *A classification of a defect.*
                *   *Example individuals:* `defectType:VoidingOver25Percent`, `defectType:InsufficientSolder`.

*   **BFO:Spatial Region** (Regions in space)
    *   `myOnt:CircuitBoardLocation`
        *   *A specific location on a CCA, often identified by a reference designator and pin.*
        *   This could be where a `SolderPasteDeposit` or `SolderJoint` is located. `ComponentPin` often serves this purpose directly.

    

IGNORE_WHEN_COPYING_START
Use code with caution.
IGNORE_WHEN_COPYING_END

2. BFO:Occurrent (Things that happen, unfold over time; processes, events)

      
*   **BFO:Process**
    *   `myOnt:ManufacturingProcess` (A superclass)
        *   `myOnt:ScreenPrintingProcess`
            *   *The process of depositing solder paste onto a CCA.*
            *   *A specific instance of this process acted on `cca_XYZ123`.*
        *   `myOnt:ReflowProcess`
            *   *The process of melting solder paste to form solder joints.*
            *   *A specific instance of this process acted on `cca_XYZ123`.*
    *   `myOnt:InspectionProcess` (A superclass)
        *   `myOnt:SPIProcess` (Solder Paste Inspection Process)
            *   *The process of inspecting solder paste deposits.*
            *   *A specific instance of this process inspected `cca_XYZ123` after screen printing.*
        *   `myOnt:XRayInspectionProcess`
            *   *The process of inspecting solder joints using X-ray technology.*
            *   *A specific instance of this process inspected `cca_XYZ123` after reflow.*

    

IGNORE_WHEN_COPYING_START
Use code with caution.
IGNORE_WHEN_COPYING_END

Key Relations to Answer the DSQ (using OBO Relationship Ontology naming conventions where appropriate):

    myOnt:CCA RO:has_identifier myOnt:SerialNumber (Connects CCA to its S/N)

    myOnt:CCA BFO:has_part myOnt:ElectronicComponent

    myOnt:ElectronicComponent RO:has_identifier myOnt:ReferenceDesignator

    myOnt:ElectronicComponent BFO:has_part myOnt:ComponentPin

    myOnt:ComponentPin RO:has_identifier myOnt:PinIdentifier

    myOnt:ScreenPrintingProcess RO:has_specified_output myOnt:SolderPasteDeposit

    myOnt:SolderPasteDeposit RO:is_output_of myOnt:ScreenPrintingProcess

    myOnt:SolderPasteDeposit RO:located_at myOnt:ComponentPin (or myOnt:CircuitBoardLocation which is associated with a ComponentPin)

    myOnt:SolderPasteDeposit BFO:has_quality myOnt:Volume, myOnt:Height, myOnt:PositionalOffset (These are the actual physical qualities)

    myOnt:SPIProcess RO:has_specified_input myOnt:SolderPasteDeposit

    myOnt:SPIProcess RO:has_specified_output myOnt:SPIMeasurementDatum

    myOnt:SPIMeasurementDatum RO:is_about_material_entity myOnt:SolderPasteDeposit

    myOnt:SPIMeasurementDatum RO:is_about_quality (e.g.) myOnt:Volume (to specify which quality the datum refers to)

    myOnt:SPIMeasurementDatum RO:has_value xsd:decimal (the actual measurement value)

    myOnt:SPIMeasurementDatum RO:has_unit obo:UO_xxxx (e.g., unit for cubic micrometers, micrometers)

    myOnt:ReflowProcess RO:has_specified_input myOnt:SolderPasteDeposit

    myOnt:ReflowProcess RO:has_specified_output myOnt:SolderJoint (The SolderPasteDeposit is transformed into a SolderJoint)

    myOnt:SolderJoint RO:is_output_of myOnt:ReflowProcess

    myOnt:SolderJoint RO:located_at myOnt:ComponentPin

    myOnt:XRayInspectionProcess RO:has_specified_input myOnt:SolderJoint (or myOnt:CCA)

    myOnt:XRayInspectionProcess RO:has_specified_output myOnt:XRayFinding

    myOnt:XRayFinding RO:is_about_material_entity myOnt:SolderJoint

    myOnt:XRayFinding RO:specifies_defect_type myOnt:DefectType (e.g., defectType:VoidingOver25Percent)

    myOnt:XRayFinding RO:located_at myOnt:ComponentPin (denoting the location of the finding)

    myOnt:SolderJoint (that the XRayFinding is about) BFO:has_quality myOnt:VoidingPercentage

    Process Sequencing:

        myOnt:SPIProcess BFO:preceded_by myOnt:ScreenPrintingProcess (for the same CCA)

        myOnt:ReflowProcess BFO:preceded_by myOnt:SPIProcess

        myOnt:XRayInspectionProcess BFO:preceded_by myOnt:ReflowProcess

        More robustly, the output of one process is the input to the next:

            The myOnt:SolderPasteDeposit that is RO:has_specified_input to myOnt:SPIProcess is the same myOnt:SolderPasteDeposit that is RO:has_specified_output of myOnt:ScreenPrintingProcess.

            The myOnt:SolderJoint that is RO:has_specified_input to myOnt:XRayInspectionProcess is the same myOnt:SolderJoint that is RO:has_specified_output of myOnt:ReflowProcess (which was transformed from the myOnt:SolderPasteDeposit).

Explanation for BFO Alignment:

    Material Entities like CCA, SolderPasteDeposit are tangible things.

    Qualities like Volume, VoidingPercentage inhere in these material entities. They cannot exist on their own.

    Information Content Entities (ICE) like SerialNumber, SPIMeasurementDatum, XRayFinding represent data or information. They are Generically Dependent Continuants because their existence depends on some convention or representation system, and they are about other entities (material entities, qualities, processes). This separation of the thing from the information about the thing is crucial for formal ontologies. For instance, the SolderPasteDeposit has an actual physical volume (myOnt:Volume quality), and the SPIProcess produces an SPIMeasurementDatum which is a piece of information about that volume.

    Processes like SPIProcess, XRayInspectionProcess are occurrents; they happen over time and have inputs and outputs.

    The relations clearly define how these entities are connected, allowing us to trace from an X-Ray finding back to the specific solder paste deposit and its SPI measurements.

This structure should allow you to formulate a SPARQL query (or similar graph query) that navigates these relationships to answer the DSQ.

What are your thoughts on this initial set of classes and relations for the specified DSQ? We can refine or expand from here.


============================================



this is a great evolution of the DSQ as it moves from pure data retrieval to requiring some level of inferential reasoning or linkage to causal knowledge.

New DSQ: "Which upstream process parameter (e.g., solder-paste volume, reflow profile) most likely caused the observed NC (Non-Conformance)?"

This DSQ implies we need to:

    Identify the Non-Conformance (NC) and its type.

    Identify all relevant upstream process steps.

    For each upstream step, identify key "parameters" (this can be settings, input material properties, or measured outputs that act as inputs to the next stage).

    Have some knowledge or rules that link specific parameter states (e.g., "low volume," "profile X") to specific NC types.

    The "most likely" part suggests either a ranking based on known correlations or presenting a set of possibilities. For a demo, showing potential influencing parameters is a good start.

Let's adjust and expand the classes, focusing on explicitly modeling "Process Parameters" and linking them to processes and potential defects.

BFO-Aligned Classes & Key Properties (Building on previous, with additions/modifications):

1. BFO:Continuant

      
*   **BFO:Independent Continuant**
    *   **BFO:Material Entity**
        *   `myOnt:CircuitCardAssembly` (CCA)
        *   `myOnt:ElectronicComponent`
        *   `myOnt:ComponentPin`
        *   `myOnt:SolderPasteDeposit`
        *   `myOnt:SolderJoint`
        *   `myOnt:SolderPasteBatch`
            *   *Represents a specific batch of solder paste material used.*
            *   *Properties like viscosity, composition would inhere in this batch.*

    *   **BFO:Specifically Dependent Continuant (SDC)**
        *   **BFO:Quality** (Properties that inhere in entities)
            *   `myOnt:Volume` (inheres in `SolderPasteDeposit` or `SolderJoint`)
            *   `myOnt:Height` (inheres in `SolderPasteDeposit`)
            *   `myOnt:PositionalOffset` (inheres in `SolderPasteDeposit`)
            *   `myOnt:VoidingPercentage` (inheres in `SolderJoint`)
            *   `myOnt:SolderPasteViscosity` (inheres in `SolderPasteBatch`)
            *   `myOnt:SolderPasteComposition` (inheres in `SolderPasteBatch`)
            *   `myOnt:Temperature` (a quality that can inhere in an oven zone during a `ReflowProcess`)
            *   `myOnt:Pressure` (a quality of, e.g., squeegee application during `ScreenPrintingProcess`)
            *   `myOnt:Speed` (a quality of, e.g., squeegee movement or conveyor belt)

        *   **BFO:Realizable Entity**
            *   `myOnt:DefectState` (inheres in `SolderJoint` or `CCA`)

    *   **BFO:Generically Dependent Continuant (GDC)**
        *   **RO:Information Content Entity (ICE)**
            *   `myOnt:SerialNumber`
            *   `myOnt:ReferenceDesignator`
            *   `myOnt:PinIdentifier`
            *   `myOnt:SPIMeasurementDatum`
                *   Now explicitly an ICE that is *about* a quality (e.g., `myOnt:Volume`) of a `myOnt:SolderPasteDeposit`.
            *   `myOnt:XRayFinding`
                *   An ICE that is *about* a `myOnt:SolderJoint` and specifies a `myOnt:DefectType`.
            *   `myOnt:DefectType` (e.g., `defectType:Voiding`, `defectType:InsufficientSolder`)
            *   **NEW/REFINED:** `myOnt:ProcessParameterSpecification` (Superclass for parameters)
                *   *An ICE that defines a parameter type for a process.*
                *   *Example individuals:* `paramSpec:SqueegeePressure`, `paramSpec:ReflowPeakTemperature`, `paramSpec:SolderPasteType`.
            *   **NEW/REFINED:** `myOnt:ProcessParameterSetting`
                *   *An ICE representing the specific value or setting used for a `ProcessParameterSpecification` during a particular process execution.*
                *   *Properties:* `has_value`, `has_unit`.
                *   *Example individuals:* "SqueegeePressureSetting of 80N for ScreenPrintingProcess_123".
            *   **NEW:** `myOnt:ReflowProfile`
                *   *An ICE that specifies a set of temperature setpoints and durations for a reflow process. It's a complex `ProcessParameterSetting`.*
                *   *Contains multiple individual parameter settings like peak temperature, soak time, conveyor speed etc.*
            *   **NEW:** `myOnt:CausalHypothesis` (or `myOnt:InfluencePattern`)
                *   *An ICE representing an assertion that a certain parameter state (or combination) is correlated with or potentially causes a certain defect type.*
                *   *Properties:* `linksParameterState` (to a `ProcessParameterSetting` or a range), `linksToDefectType` (to a `myOnt:DefectType`), `hasLikelihood` (e.g., "High", "Medium", or a score). This is where your "most likely caused" knowledge resides.

    

IGNORE_WHEN_COPYING_START
Use code with caution.
IGNORE_WHEN_COPYING_END

2. BFO:Occurrent

      
*   **BFO:Process**
    *   `myOnt:ManufacturingProcess`
        *   `myOnt:ScreenPrintingProcess`
        *   `myOnt:ReflowProcess`
    *   `myOnt:InspectionProcess`
        *   `myOnt:SPIProcess`
        *   `myOnt:XRayInspectionProcess`

    

IGNORE_WHEN_COPYING_START
Use code with caution.
IGNORE_WHEN_COPYING_END

Key Relations to Answer the New DSQ (expanding on previous):

    myOnt:CCA RO:has_identifier myOnt:SerialNumber.

    myOnt:XRayFinding RO:is_about_material_entity myOnt:SolderJoint.

    myOnt:XRayFinding RO:specifies_defect_type myOnt:DefectType.

    myOnt:XRayFinding RO:located_at myOnt:ComponentPin (indirectly linking to SolderJoint location).

    Linking Processes to their Parameters/Settings:

        myOnt:ScreenPrintingProcess RO:has_participant myOnt:SolderPasteBatch (The batch itself is an input).

        myOnt:SolderPasteBatch BFO:has_quality myOnt:SolderPasteViscosity, myOnt:SolderPasteComposition. (These qualities of the input batch are parameters).

        myOnt:ScreenPrintingProcess RO:uses_setting myOnt:ProcessParameterSetting (e.g., an instance representing Squeegee Pressure = 80N).

            This ProcessParameterSetting RO:is_setting_for paramSpec:SqueegeePressure.

        myOnt:ReflowProcess RO:uses_setting myOnt:ReflowProfile.

            myOnt:ReflowProfile BFO:has_part multiple myOnt:ProcessParameterSetting (e.g., PeakTemp=245C, ConveyorSpeed=X).

    Linking SPI Measurements as Reflectors of Upstream Parameters:

        myOnt:SPIProcess RO:has_specified_input myOnt:SolderPasteDeposit.

        myOnt:SPIProcess RO:has_specified_output myOnt:SPIMeasurementDatum.

        myOnt:SPIMeasurementDatum RO:is_about_quality myOnt:Volume (which inheres in SolderPasteDeposit).

        The myOnt:Volume (and its measured value in SPIMeasurementDatum) of the SolderPasteDeposit acts as a critical outcome parameter of the ScreenPrintingProcess and an input condition indicator for subsequent defect formation.

    Linking Parameters/States to Defects (Causal Knowledge):

        myOnt:CausalHypothesis RO:links_parameter_state myOnt:ProcessParameterSetting (e.g., a specific reflow profile instance, or a value range of an SPIMeasurementDatum like "Volume < threshold").

        myOnt:CausalHypothesis RO:links_parameter_state myOnt:SolderPasteViscosity (or a range of it).

        myOnt:CausalHypothesis RO:links_to_defect_type myOnt:DefectType.

        myOnt:CausalHypothesis myOnt:hasLikelihoodStrength xsd:string (e.g., "High", "Medium") or xsd:decimal.

How to Answer the DSQ with this Structure:

    Start with the NC:

        Identify the myOnt:XRayFinding for the given CCA S/N and location (U1-pin3).

        Get the myOnt:SolderJoint it is about, and the myOnt:DefectType (e.g., defectType:Voiding).

    Trace Upstream to Processes and their Parameters:

        From myOnt:SolderJoint, trace to the myOnt:ReflowProcess that produced it. Get the myOnt:ReflowProfile used by this specific process instance.

        From myOnt:SolderJoint, trace back to its precursor myOnt:SolderPasteDeposit.

        From myOnt:SolderPasteDeposit, trace to the myOnt:SPIProcess that measured it, and get the relevant myOnt:SPIMeasurementDatum (e.g., for volume).

        From myOnt:SolderPasteDeposit, trace to the myOnt:ScreenPrintingProcess that created it. Get its myOnt:ProcessParameterSettings (e.g., squeegee pressure) and the myOnt:SolderPasteBatch used, along with its inherent myOnt:SolderPasteViscosity, etc.

    Query for Causal Links:

        Find all myOnt:CausalHypothesis instances where:

            RO:links_to_defect_type is the identified myOnt:DefectType (e.g., defectType:Voiding).

            And RO:links_parameter_state matches:

                The specific myOnt:ReflowProfile used.

                The actual value (or a category like "low", "high") from myOnt:SPIMeasurementDatum for volume.

                The actual myOnt:ProcessParameterSettings of the ScreenPrintingProcess.

                The inherent qualities (like myOnt:SolderPasteViscosity) of the myOnt:SolderPasteBatch used.

    Present "Most Likely" Causes:

        The found myOnt:CausalHypothesis instances, potentially ranked by myOnt:hasLikelihoodStrength, point to the upstream process parameters that are known to potentially cause the observed NC.

Example of a myOnt:CausalHypothesis instance:

    hypothesis_1 rdf:type myOnt:CausalHypothesis

    hypothesis_1 RO:links_parameter_state [ rdf:type myOnt:SPIMeasurementDatumCategory ; myOnt:parameterType paramSpec:SolderPasteVolume ; myOnt:categoryLabel "Low" ]

    hypothesis_1 RO:links_to_defect_type defectType:InsufficientSolder

    hypothesis_1 myOnt:hasLikelihoodStrength "High"

This structure explicitly models the parameters and the knowledge linking them to defects, allowing you to address the "which parameter caused" question more directly. The "most likely" part is handled by populating and querying the CausalHypothesis entities (which would come from expert knowledge or historical data analysis).

This is a more complex model, but it's necessary for the advanced DSQ. For the demo, you might pre-populate a few key CausalHypothesis instances to showcase the reasoning.
