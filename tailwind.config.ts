slie 1
"Hi, I'm [Your Name].
Today I'm going to speak about how we're cutting analytics development time from weeks to days by making data understandable and reusable.
We have proven results from existing projects: 30-minute validations that used to take weeks, and 2,000 data fields defined in days.
The breakthrough: validate once, reuse everywhere—turning repeated work into reusable assets."

slide 2
Let me give you a real example.
When building analytics, we need data from multiple sources. In this case: diagnostic analytics on engine component defects.
The team had three data sources: automated inspection data from machines, manual inspection data from technicians, and sensor data from engine operations.
Here's what we found: 45% of the effort—almost half—goes into just discovering and understanding what data exists and what it means.
Only after that can we connect and prepare the data (25%), build models (20%), and create reports (10%).

This isn't just us—industry reports show the same pattern. Discovery and understanding consistently consume the most time in analytics projects.

Why is discovery so hard? 

Data is scattered and siloed
No automated way to understand what fields mean—no consumable definitions
No context about how data elements relate
This forces manual effort from analysts and SMEs for discovery and validation

The result: Slow data consumption and increased effort for any advanced analytics.
We're solving this 45% problem—making data discoverable and understandable from day one.

slide 3.
Alternative - More Concise (55 seconds)
"Here's where it compounds.
Multiple analytics types are being built: diagnostic, predictive digital twin, repair analytics, maintenance analytics. All need the same data sources—maintenance, inspection, sensor, operations data.

But every analytics project must identify and validate these sources from scratch.

What analysts need: Finding sources, understanding columns, validating data, checking if it's the same as before, understanding relationships.
Current approach: Find SMEs, spend weeks in meetings.
Impact:

Same databases validated repeatedly
Weeks chasing SMEs
Projects too slow and expensive


Bottom line:  Data analytics need data, but validating and understanding that data consumes weeks of analyst time and SMEs—for every single project.

Slide 4 

Let me show you a concrete example of the problem—and our solution.

Look at this: the number given to a specific aircraft engine. A simple piece of information every system needs.
But in the data: [gesture across three boxes]

In MaintDB_East, it's called ENGINE_SN
In WorkOrderDB, it's Engine_ID
In AssetTracker_DB, it's Asset_Serial

Three different names, same data. The actual values—E1234, E2234, E2847—are identical, but you'd never know these columns represent the same thing.
[point to scale]
Scale of the problem: 3 to 15 databases, hundreds of tables per project. This pattern repeats everywhere.
Our approach: [point to bottom section]
First, work with SMEs to capture and validate what this really means—'Aircraft Engine Identifier'—and map it to these database columns. We do this once, in a human- and machine-readable format.
Second, use AI-assisted mapping to provide initial definitions and accelerate the validation process.
Third, store these validated mappings so anyone can discover and reuse them. Every time someone needs this information, they query the data catalog—no repeated validation needed.
Validate once, reuse everywhere. That's how we turn weeks into days.

Slide 5
this is How  we capture and reuse these definitions?

We start with the real data—tables from different databases with their actual column names: ENGINE_SN, Engine_ID, Asset_Serial.

We use a user-friendly framework that helps us work with SMEs and business users to categorize concepts and show how they relate.
For example: 'Aircraft Engine' as a concept, and 'Aircraft Engine Identifier' that uniquely identifies it. This framework makes it easy for non-technical people to participate in defining what the data means.

We then capture all of this in our RTX-wide cloud tool—the Ontology Hub. This is where discovery and reuse happens.

Three things get stored:
Concept Definition—what this data element represents in business terms
All Column Mappings—every database column that represents this concept (ENGINE_SN, Engine_ID, Asset_Serial all map to 'Aircraft Engine Identifier')
Relationships to Other Data—how this concept connects to other data elements
Once captured, anyone building analytics can query this tool, discover the validated definitions, and reuse them instantly.
No more weeks of meetings. The knowledge is captured once and available to everyone.


Slide 6 
The result: Data consumption from weeks to days

All these analytics—can now be built faster because the data definitions are already validated and reusable.

Project impacts:

PW Aircraft Engine Digital Twin at Pratt & Whitney EDX—reused 400 data definitions from other projects. 8 analysts plus business users now aligned.
GTF Aftermarket Knowledge Graph with RTX Data Governance—AI-assisted definitions: 2,000 fields in hours versus weeks of manual work. Out of 800K total fields.
OCKMS Circuit Card Assembly at Collins Aerospace—30-minute validation meeting replaced weeks of back-and-forth with SMEs.

The momentum: 9+ projects, 1,000+ reusable data definitions, 15 modeling patterns, 270+ users on the Ontology Hub.

The bottom line: We're turning weeks of repeated validation into reusable knowledge assets.
That's how we're accelerating data consumption across RTX. Thank you."
