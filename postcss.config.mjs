Improved mapping table ,,,,,
,,,,,
CSV Column(s),Plain meaning,Ontology thing,,Key triples you assert (Subject – Predicate – Object),Notes
TL_MATERIAL,Top/root product for the BOM,Assembly (also a MaterialArtifact),,:mat/822-3337-002 rdf:type :Assembly,Used to group all rows under one BOM.
TL_PLANT,Site for that top-level BOM,site,,(optional BOM header → site link if you model a BOM node),Keep for multi-plant differences.
NH_MATERIAL,Parent assembly in this row,Assembly / MaterialArtifact,,:mat/NH :hasComponentPartAtSomeTime :mat/COMP,NH is the subject of the parent-child edge.
NH_PLANT,Plant context for NH_MATERIAL,site,,(optional scope check / header linkage),Keep explicit even if same as TL_PLANT.
COMPONENT,Child part/assembly,MaterialArtifact (acts as MaterialComponent),,:mat/014-3004-040 :hasRole :role_014-3004-040,Create one role individual per bearer (IOF-faithful).
BOM_LVL / VL,Depth/level in BOM,literal on usage,,":usage/{key} :bomLevel ""2""",Store on reified usage node.
CALC_QTY_VALUE,Required quantity,Quantity value (literal or value node),,":usage/{key} :qtyValue ""1.0""",Use decimal; pair with unit.
COMP_U_NIT,Unit for quantity,UnitOfMeasure (map to QUDT if possible),,":usage/{key} :qtyUnit ""EA"" (or :qty [ qudt:unit qudt:EA ])",Keep original code if no mapping.
"CALC_BASE_UOM_QTY_M_VALUE, BASE_UO_M",Quantity in base UoM,Quantity value,,":usage/{key} :baseQty ""1.0"" ; :baseUnit ""EA""",Optional but useful for analytics.
BULK_MAT,Bulk/consumable flag,literal on usage,,":usage/{key} :isBulk ""X""",Often changes MRP logic.
AI_GR_OUP / AI_P_RIO,Alternate group/priority,literals on usage,,":usage/{key} :altGroup ""…"" ; :priority ""0""",Enables alternates/variants.
ALT_OR_C_HILD_OF_A_E_PR_LT,Alt/child/effectivity line,literal on usage,,":usage/{key} :altLine ""…""",Preserve design intent.
USAGE_PROB,Probability of usage,literal on usage,,":usage/{key} :usageProb ""0.8""",For stochastic/option BOMs.
SOURCE_PLANT,Where component is sourced,site or literal on usage,,":usage/{key} :sourcePlant ""1002""",Keep as code or link to :site/*.
MAKE_B_UY,Make vs. Buy,literal on usage,,":usage/{key} :makeBuy ""E/F""",Drives supply planning.
PATH,Breadcrumb from top to row,literal on usage,,":usage/{key} :pathCode ""->…""",Great for debugging lineage.

