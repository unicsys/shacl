Data Mapping Table:
Property/Relationship in KG	Source Table(s)	Source Column(s)	Logic / Notes
(Relationship) isStateOf	ENG_INST_ITEM	ENG_ITEM_SN	Links the state to the specific EngineComponent.
(Relationship) occursWithin	ENG_INST_ITEM	ENGINE_SN	Links the state to the specific Engine.
(Property) hasFirstInstant	ENG_INST_ITEM	ITEM_INST_DTG	Direct mapping. This is the installation date.
(Property) hasLastInstant	ON_EQUIP_ENG_WO or COMPLETE_TASK	WORKORDER_STAT_DTG or PKT_COMPLETED_DTG	Inferred. Find the earliest completion date of a "removal" job that occurred after the hasFirstInstant.
