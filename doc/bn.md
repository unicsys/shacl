from rdflib import Namespace

# =============================================================================
# 1. BASE URIS
# =============================================================================
ENTERPRISE_BASE_URI = "https://data.rtx.com/graph/" 
RTX_ONTO_IRI = "https://ontologyhub.rtx.com/RTXEnterpriseOntologies/OCKMSDigitalThreadOntology"

# =============================================================================
# 2. NAMESPACES
# =============================================================================
OCKMS = Namespace(RTX_ONTO_IRI + "/")
IOF   = Namespace("https://spec.industrialontologies.org/ontology/core/Core/")
BFO   = Namespace("http://purl.obolibrary.org/obo/BFO_")
CCO   = Namespace("http://www.ontologyrepository.com/CommonCoreOntologies/")
RO    = Namespace("http://purl.obolibrary.org/obo/RO_")

# =============================================================================
# 3. PROPERTY MAP
# =============================================================================
# Object Properties
REL_DESIGNATES    = IOF.designates
REL_PRESCRIBES    = IOF.prescribes
REL_DESCRIBES     = IOF.describes
REL_HAS_OUTPUT    = IOF.hasOutput
REL_DEPENDS_ON    = BFO["0000084"] # generically depends on
REL_HAS_PART      = BFO["0000110"] # has continuant part at all times
REL_HAS_OCC_PART  = BFO["0000117"] # has occurrent part
REL_BEARER_OF     = BFO["0000196"] # bearer of
REL_OCCUPIES_TIME = BFO["0000199"] # occupies temporal region
REL_HAS_QUALITY   = RO["0000086"]  # has quality
REL_LOCATED_IN    = BFO["0000171"] # located in

# Data Properties
PROP_HAS_TEXT_VALUE = OCKMS.hasTextValue
PROP_HAS_DEC_VALUE  = OCKMS.hasDecimalValue
PROP_HAS_TIME_VALUE = IOF.hasDateTimeInstantValue

# =============================================================================
# 4. IRI CATEGORIES (MASTER LIST)
# =============================================================================

# STEP 0: SYSTEM
CAT_SYS_DESIGN    = "system_design"
CAT_SYS_INST      = "engineered_system"
CAT_ID_SYS_DES    = "system_design_identifier"
CAT_ID_SYS_SN     = "system_serial_number"

# STEP 1-3: CCA IDENTITY
CAT_CCA_INST      = "circuit_card_assembly"
CAT_CCA_DESIGN    = "circuit_card_assembly_design"
CAT_CCA_REV       = "circuit_card_assembly_design_revision"
CAT_ID_CCA        = "circuit_card_assembly_identifier"
CAT_ID_DESIGN     = "circuit_card_assembly_design_identifier"
CAT_ID_REV        = "circuit_card_assembly_design_revision_identifier"

# STEP 4: DEFECTS
CAT_DEFECT        = "defect"
CAT_ID_DEFECT     = "defect_classification_code"
CAT_DESC_DEFECT   = "defect_classification_description"

# STEP 5: COMPONENTS
CAT_COMPONENT           = "electronic_component"
CAT_COMP_PN             = "component_part_number"
CAT_ELEC_COMP_DESIGN    = "electronic_component_design"
CAT_ID_ELEC_COMP_DESIGN = "electronic_component_design_identifier"

# STEP 6: LOCATIONS
CAT_COMP_LOC      = "electronic_component_location"
CAT_ID_COMP_LOC   = "electronic_component_location_identifier"
CAT_REF_DES       = "reference_designator"

# STEP 7: PROCESS & TIME
CAT_INSP_PROC     = "inspection_process"
CAT_REC_PROC      = "defect_recording_process"
CAT_TIME_INT      = "temporal_interval"
CAT_ID_TIME       = "temporal_interval_identifier"

# GENERIC
CAT_IBE           = "information_bearing_entity"
