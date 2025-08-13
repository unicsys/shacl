1) Column explanations (plain English)

TL_MATERIAL (Top-Level Material)

    The root product for this BOM.

    It’s the thing you’re ultimately building (the top assembly).

    Each row belongs to the BOM whose root is TL_MATERIAL at TL_PLANT.

TL_PLANT (Top-Level Plant / Site)

    The plant (site) context for the top-level BOM.

    Use it to scope BOM differences by plant (e.g., 1002 vs 1007).

    Think: “This BOM version is for TL_MATERIAL at TL_PLANT.”

NH_MATERIAL (Next Higher Material)

    The parent part/assembly in this specific row.

    Tells you which assembly the row’s COMPONENT belongs under.

    Every row is essentially: “This COMPONENT belongs under NH_MATERIAL at NH_PLANT.”

NH_PLANT (Next Higher Plant / Site)

    The plant/site context for the parent assembly (NH_MATERIAL).

    Usually the same as TL_PLANT, but keep it explicit in case sub-assemblies are plant-specific.

COMPONENT

    The child part/assembly used by NH_MATERIAL in this row.

    This item plays the MaterialComponent role when installed under its parent.

BOM_LVL / VL (Level)

    The depth of this row within the BOM (how far down from TL_MATERIAL).

    Useful for display, ordering, and quick checks like “max depth”.

CALC_QTY_VALUE (Required Quantity)

    The quantity of the COMPONENT required by its NH_MATERIAL parent (per parent unit).

    E.g., “need 4 screws per engine.”

COMP_U_NIT (Component Unit of Measure)

    The unit for CALC_QTY_VALUE (e.g., EA, REF, AR).

    Map to standard units (e.g., QUDT) where possible; keep the original code if unknown.

CALC_BASE_UOM_QTY_M_VALUE & BASE_UO_M (Base Quantity and Unit)

    The same quantity expressed in a base/normalized unit.

    Useful if purchasing/stocking/valuation uses base UoM.

BULK_MAT

    Marks bulk/consumable items.

    Handy to treat differently in costing, MRP, or inventory logic (often not tracked one-for-one).

AI_GR_OUP / AI_P_RIO (Alt group / priority)

    Alternate/variant grouping and priority among interchangeable components.

    Lets you model optional/alternate parts and preference order.

ALT_OR_C_HILD_OF_A_E_PR_LT (Alternate or Child Line / Effectivity)

    Line/effectivity details for alternates or conditional usage.

    Keep it to preserve design intent and variant logic.

USAGE_PROB (Usage Probability)

    Probability the component is used (for stochastic/option BOMs).

    Useful in expected demand, cost, and risk rollups.

SOURCE_PLANT

    Where the component is sourced/manufactured.

    Helps with supply, lead-time, and tariff impacts.

MAKE_B_UY (Make/Buy flag)

    Whether the item is made internally or bought.

    Drives supply chain decisions and costing.

PATH (Lineage string)

    A breadcrumb from the top to this row.

    Useful for debugging and explaining how the component appears under TL_MATERIAL.


      ========================


