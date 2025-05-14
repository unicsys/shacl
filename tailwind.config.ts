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
}

export default config
