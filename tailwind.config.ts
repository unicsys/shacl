The RTX Enterprise Ontology (REO) Suit provides a formal semantic layer that defines business entities and their relationships across domains.
When different systems (PLM, ERP, MRO, etc) reference the same ontology definitions, they can easily link to each other based on shared meaning, not just matching field names. This eliminates much of the manual mapping work engineers typically do and captures knowledge that usually exists only in people's heads.
On prerequisites:
To make this work, you need: consistent identifiers, aligned definitions and categorization, rich metadata and clear ownership for maintaining ontology definitions and resolving conflicts.
We don't have answers to all questions related to integration, we are improving on governance and configuration management aspects
On thread pedigree:
 Each item in the knowledge graph has a globally unique identifier and maintains relationships that preserve connections across the entire lifecycle. You can trace where data came from and what depends on it.
On Change Propagation & Analysis
We have impact analysis. We use graph traversal to find affected systems and visualize impacts. We have not tried the aspects related to What-If Scenarios where we simulate alternative configurations before making changes.

On elimination of point-to-point Integrations
When systems publish and consume data using shared ontology definitions, the ESB can translate between them easily. Instead of building custom integrations between every pair of systems (N×N problem), you build one adapter per system to the common model (N problem).
However, you may still need direct integrations for ultra-low latency requirements, legacy systems that can't easily adopt, or for temporary integrations not worth the investment


On AI/ML
Ontology handles formal logic and reasoning. When you need to go beyond that, that's where AI/ML comes in independently or on top of ontology.
Some examples could be: Finding hidden trends and anomalies that formal logic can't catch, when there is unstructured data, or in case of complex simulations like Multi-physics modeling, etc.

 

