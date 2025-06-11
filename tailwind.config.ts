@prefix : <http://www.yourdomain.com/ontology/dido#> .
@prefix iof: <https://spec.industrialontologies.org/iof/ontology/core/Core/> .
@prefix bfo: <http://purl.obolibrary.org/obo/BFO_> .
@prefix cco: <http://www.ontologyrepository.com/CommonCoreOntologies/> .
@prefix owl: <http://www.w3.org/2002/07/owl#> .
@prefix rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#> .
@prefix rdfs: <http://www.w3.org/2000/01/rdf-schema#> .
@prefix skos: <http://www.w3.org/2004/02/skos/core#> .
@prefix xsd: <http://www.w3.org/2001/XMLSchema#> .

<http://www.yourdomain.com/ontology/dido>
  rdf:type owl:Ontology ;
  owl:imports <http://purl.obolibrary.org/obo/bfo.owl> ;
  owl:imports <https://spec.industrialontologies.org/iof/ontology/core/Core.rdf> ;
  rdfs:comment "An ontology for representing the knowledge contained in defense standard Data Item Descriptions (DIDs)."@en ;
  rdfs:label "Data Item Description Ontology (DID-O)"@en .

<http://www.yourdomain.com/ontology/dido>
  rdf:type owl:Ontology ;
  owl:imports <http://purl.obolibrary.org/obo/bfo.owl> ;
  owl:imports <https://spec.industrialontologies.org/iof/ontology/core/Core.rdf> ;
  rdfs:comment "An ontology for representing the knowledge contained in defense standard Data Item Descriptions (DIDs)."@en ;
  rdfs:label "Data Item Description Ontology (DID-O)"@en .

#################################################################
#    Object Properties
#################################################################

# This section is empty for now, we will add properties as needed.

#################################################################
#    Data Properties
#################################################################

# We are reusing CCO data properties, so this section is also empty.
# Example: cco:has_text_value, cco:has_date_value

#################################################################
#    Classes
#################################################################

# We need to declare the class for our main individual.
# This part of the TBox is required for the ABox to be valid.
:ProductEngineeringDesignData rdf:type owl:Class ;
  rdfs:subClassOf iof:DesignSpecification ;
  rdfs:label "Product Engineering Design Data"@en .

#################################################################
#    Individuals (ABox - Instance Data)
#################################################################

# 1. Main Individual Declaration (Facts #1 & #2)
:DI-SESS-81000F rdf:type owl:NamedIndividual ,
                        :ProductEngineeringDesignData ;
  rdfs:label "Data Item Description DI-SESS-81000F"@en .

# 2. Title Formalization (Fact #3)
:Title_of_81000F rdf:type owl:NamedIndividual ,
                         iof:DesignativeInformationContentEntity ;
  iof:isAbout :DI-SESS-81000F ;
  cco:has_text_value "PRODUCT ENGINEERING DESIGN DATA AND ASSOCIATED LISTS" ;
  rdfs:label "Title of DI-SESS-81000F"@en .

# 3. Approval Date Formalization (Fact #4)
:ApprovalDate_for_81000F rdf:type owl:NamedIndividual ,
                                iof:MeasurementInformationContentEntity ;
  iof:isAbout :DI-SESS-81000F ;
  cco:has_date_value "2019-04-17"^^xsd:date ;
  rdfs:label "Approval Date Information for DI-SESS-81000F"@en .

# 4. AMSC Number Formalization (Fact #5)
:AMSCNumber_for_81000F rdf:type owl:NamedIndividual ,
                              iof:Identifier ;
  iof:isAbout :DI-SESS-81000F ;
  cco:has_text_value "10017" ;
  rdfs:label "AMSC Number for DI-SESS-81000F"@en .

# 5. Preparing Activity Formalization (Fact #6)
:PrepActivityCode_for_81000F rdf:type owl:NamedIndividual ,
                                   iof:Identifier ;
  iof:isAbout :DI-SESS-81000F ;
  cco:has_text_value "AR" ;
  rdfs:label "Preparing Activity Code for DI-SESS-81000F"@en .

# 6. Project Number Formalization (Fact #7)
:ProjNumber_for_81000F rdf:type owl:NamedIndividual ,
                               iof:Identifier ;
  iof:isAbout :DI-SESS-81000F ;
  cco:has_text_value "SESS-2019-023" ;
  rdfs:label "Project Number for DI-SESS-81000F"@en .
  

#################################################################
#    Object Properties (Use/relationship Section)
#################################################################

:isRelatedTo rdf:type owl:ObjectProperty ;
  rdfs:label "is related to"@en .

:supersedes rdf:type owl:ObjectProperty ;
  rdfs:subPropertyOf bfo:BFO_0000063 ; # bfo:precedes
  rdfs:label "supersedes"@en .


#################################################################
#    Classes (Use/relationship Section)
#################################################################

# ----- Helper Classes defined in this section -----
:EngineeringData rdf:type owl:Class ;
  rdfs:subClassOf iof:InformationContentEntity ;
  rdfs:label "Engineering Data"@en .

:Item rdf:type owl:Class ;
  rdfs:subClassOf bfo:BFO_0000040 ; # bfo:material_entity
  rdfs:label "Item"@en .

:PurchasedItem rdf:type owl:Class ;
  rdfs:subClassOf :Item ,
                  [ rdf:type owl:Restriction ;
                    owl:onProperty iof:isDescribedBy ;
                    owl:someValuesFrom :ASME_Y14-24
                  ] ;
  owl:equivalentClass [ rdf:type owl:Class ;
                        owl:intersectionOf ( :Item [ rdf:type owl:Restriction ;
                                                     owl:onProperty iof:is_participant_in ;
                                                     owl:someValuesFrom iof:SellingBusinessProcess
                                                   ] [ rdf:type owl:Restriction ;
                                                       owl:onProperty iof:is_participant_in ;
                                                       owl:someValuesFrom iof:SupplyingBusinessProcess
                                                     ] )
                      ] ;
  rdfs:label "Purchased Item"@en ;
  skos:altLabel "vendor item"@en ,
                "vendor-developed item"@en .

:CompetitiveProcurementProcess rdf:type owl:Class ;
  rdfs:subClassOf iof:ProcuringBusinessProcess ;
  rdfs:label "Competitive Procurement Process"@en .

:MaintenanceProcess rdf:type owl:Class ;
  rdfs:subClassOf bfo:BFO_0000015 ; # bfo:process
  rdfs:label "Maintenance Process"@en ;
  rdfs:comment "This process applies to items that are interchangeable with original items."@en .

:Instruction rdf:type owl:Class ;
  rdfs:subClassOf iof:DirectiveInformationContentEntity ;
  rdfs:label "Instruction"@en .

:WorkTask rdf:type owl:Class ;
  rdfs:subClassOf bfo:BFO_0000015 ; # bfo:process
  rdfs:label "Work Task"@en .

:AcquisitionProcess rdf:type owl:Class ;
  rdfs:subClassOf iof:ProcuringBusinessProcess ,
                  [ rdf:type owl:Restriction ;
                    owl:onProperty iof:isAbout ;
                    owl:someValuesFrom :MilitarySystem
                  ] ;
  rdfs:label "Acquisition Process"@en .

:MilitarySystem rdf:type owl:Class ;
  rdfs:subClassOf iof:EngineeredSystem ;
  rdfs:label "Military System"@en .

:Contract rdf:type owl:Class ;
  rdfs:subClassOf iof:Agreement ,
                  [ rdf:type owl:Restriction ;
                    owl:onProperty iof:isAbout ;
                    owl:someValuesFrom [ rdf:type owl:Restriction ;
                                         owl:onProperty iof:isPrescribedBy ;
                                         owl:someValuesFrom :ProductEngineeringDesignData
                                       ]
                  ] ;
  rdfs:label "Contract"@en .

# ----- Quality and Function Classes -----
:AuthoritativeQuality rdf:type owl:Class ;
  rdfs:subClassOf bfo:BFO_0000019 . # bfo:quality
:CompleteQuality rdf:type owl:Class ;
  rdfs:subClassOf bfo:BFO_0000019 .
:HighestLevelDisclosureQuality rdf:type owl:Class ;
  rdfs:subClassOf bfo:BFO_0000019 .

:CompetitiveProcurementSupportFunction rdf:type owl:Class ;
  rdfs:subClassOf bfo:BFO_0000034 , # bfo:function
                  [ rdf:type owl:Restriction ;
                    owl:onProperty bfo:BFO_0000054 ; # bfo:has_realization
                    owl:someValuesFrom :CompetitiveProcurementProcess
                  ] .

:MaintenanceSupportFunction rdf:type owl:Class ;
  rdfs:subClassOf bfo:BFO_0000034 ,
                  [ rdf:type owl:Restriction ;
                    owl:onProperty bfo:BFO_0000054 ;
                    owl:someValuesFrom :MaintenanceProcess
                  ] .

# ----- Axioms amending the main :ProductEngineeringDesignData class -----
:ProductEngineeringDesignData
  rdfs:subClassOf :EngineeringData ,
                  [ rdf:type owl:Restriction ;
                    owl:onProperty iof:isAbout ;
                    owl:someValuesFrom :Item
                  ] ,
                  [ rdf:type owl:Restriction ;
                    owl:onProperty bfo:BFO_0000196 ; # bfo:bearer_of
                    owl:someValuesFrom :AuthoritativeQuality
                  ] ,
                  [ rdf:type owl:Restriction ;
                    owl:onProperty bfo:BFO_0000196 ;
                    owl:someValuesFrom :CompleteQuality
                  ] ,
                  [ rdf:type owl:Restriction ;
                    owl:onProperty bfo:BFO_0000196 ;
                    owl:someValuesFrom :HighestLevelDisclosureQuality
                  ] ,
                  [ rdf:type owl:Restriction ;
                    owl:onProperty iof:hasFunction ;
                    owl:someValuesFrom :CompetitiveProcurementSupportFunction
                  ] ,
                  [ rdf:type owl:Restriction ;
                    owl:onProperty iof:hasFunction ;
                    owl:someValuesFrom :MaintenanceSupportFunction
                  ] .


#################################################################
#    Individuals (Use/relationship Section)
#################################################################

:MIL-STD-31000 rdf:type owl:NamedIndividual ,
                        :Standard ;
  rdfs:label "Standard MIL-STD-31000"@en .

:ASME_Y14-24 rdf:type owl:NamedIndividual ,
                      :Standard ;
  rdfs:label "Standard ASME Y14.24"@en .

:DI-SESS-81001F rdf:type owl:NamedIndividual ,
                        :ProductEngineeringDesignData .
:DI-SESS-81002F rdf:type owl:NamedIndividual ,
                        :ProductEngineeringDesignData .
:DI-SESS-81003F rdf:type owl:NamedIndividual ,
                        :ProductEngineeringDesignData .
:DI-SESS-81000E rdf:type owl:NamedIndividual ,
                        :ProductEngineeringDesignData .

:Instruction_in_81000F rdf:type owl:NamedIndividual ,
                                :Instruction ;
  iof:isAbout :ProductEngineeringDesignData .
# This triple amends the main individual from the previous section
:DI-SESS-81000F
  bfo:BFO_0000101 :Instruction_in_81000F ; # is_carrier_of
  iof:is_input_of :AcquisitionProcess ;
  :isRelatedTo :DI-SESS-81001F ,
               :DI-SESS-81002F ,
               :DI-SESS-81003F ;
  :supersedes :DI-SESS-81000E .

:TheWorkTask_from_31000 rdf:type owl:NamedIndividual ,
                                :WorkTask ;
  iof:has_specified_output :Instruction_in_81000F ;
  iof:isDescribedBy :MIL-STD-31000 .
  


#################################################################
#    Classes (Requirements Section 1 & 2)
#################################################################

:DesignDisclosureInformation rdf:type owl:Class ;
  rdfs:subClassOf iof:DescriptiveInformationContentEntity ,
                  [ rdf:type owl:Restriction ;
                    owl:onProperty bfo:BFO_0000196 ; # bfo:bearer_of
                    owl:someValuesFrom :ClearQuality
                  ] ,
                  [ rdf:type owl:Restriction ;
                    owl:onProperty bfo:BFO_0000196 ;
                    owl:someValuesFrom :AccurateQuality
                  ] ,
                  [ rdf:type owl:Restriction ;
                    owl:onProperty bfo:BFO_0000196 ;
                    owl:someValuesFrom :CompleteQuality
                  ] ,
                  [ rdf:type owl:Restriction ;
                    owl:onProperty iof:hasFunction ;
                    owl:someValuesFrom :ProductionEnablementFunction
                  ] ,
                  [ rdf:type owl:Restriction ;
                    owl:onProperty iof:hasFunction ;
                    owl:someValuesFrom :QualityControlEnablementFunction
                  ] ;
  rdfs:label "Design Disclosure Information"@en .

:Manufacturer rdf:type owl:Class ;
  rdfs:subClassOf iof:Organization ;
  rdfs:label "Manufacturer"@en .

:ProductionProcess rdf:type owl:Class ;
  rdfs:subClassOf iof:ManufacturingProcess ;
  rdfs:label "Production Process"@en .

:QualityControlProcess rdf:type owl:Class ;
  rdfs:subClassOf bfo:BFO_0000015 ; # bfo:process
  rdfs:label "Quality Control Process"@en .

:EndProduct rdf:type owl:Class ;
  rdfs:subClassOf iof:MaterialProduct ,
                  [ rdf:type owl:Restriction ;
                    owl:onProperty bfo:BFO_0000196 ;
                    owl:someValuesFrom :DesignMaturityLevel
                  ] ;
  rdfs:label "End Product"@en .

:DesignMaturityLevel rdf:type owl:Class ;
  rdfs:subClassOf bfo:BFO_0000019 ; # bfo:quality
  rdfs:label "Design Maturity Level"@en ;
  rdfs:comment "The specific level reflected is the current one at the time of data creation."@en .

:LogisticsSupportProduct rdf:type owl:Class ;
  rdfs:subClassOf iof:MaterialProduct ;
  rdfs:label "Logistics Support Product"@en .

:ClearQuality rdf:type owl:Class ;
  rdfs:subClassOf bfo:BFO_0000019 .
:AccurateQuality rdf:type owl:Class ;
  rdfs:subClassOf bfo:BFO_0000019 .

:ProductionEnablementFunction rdf:type owl:Class ;
  rdfs:subClassOf bfo:BFO_0000034 , # bfo:function
                  [ rdf:type owl:Restriction ;
                    owl:onProperty bfo:BFO_0000054 ; # bfo:has_realization
                    owl:someValuesFrom :ProductionProcess
                  ] ;
  rdfs:comment "This function enables a manufacturer of similar products at the same state of the art."@en .

:QualityControlEnablementFunction rdf:type owl:Class ;
  rdfs:subClassOf bfo:BFO_0000034 ,
                  [ rdf:type owl:Restriction ;
                    owl:onProperty bfo:BFO_0000054 ;
                    owl:someValuesFrom :QualityControlProcess
                  ] .

# ----- Axioms amending existing classes -----

:Contract rdfs:comment "A contract specifies the applicable issue (including dates of approvals, amendments, notices, and revisions) of any document cited within a DID."@en .

:Item rdfs:comment "Items produced from PEDD are intended to have physical and functional characteristics that duplicate the specified item."@en .

# Amending :ProductEngineeringDesignData from previous steps
:ProductEngineeringDesignData
  rdfs:subClassOf [ rdf:type owl:Restriction ;
                    owl:onProperty iof:conforms_to ;
                    owl:someValuesFrom :MIL-STD-31000
                  ] ,
                  [ rdf:type owl:Restriction ;
                    owl:onProperty bfo:BFO_0000101 ; # bfo:is_carrier_of
                    owl:someValuesFrom :DesignDisclosureInformation
                  ] ,
                  [ rdf:type owl:Restriction ;
                    owl:onProperty iof:isAbout ;
                    owl:someValuesFrom :EndProduct
                  ] .

# Amending :EngineeringData from previous steps
:EngineeringData
  rdfs:subClassOf [ rdf:type owl:Restriction ;
                    owl:onProperty iof:isAbout ;
                    owl:someValuesFrom :LogisticsSupportProduct
                  ] .
				  

#################################################################
#    Classes (Requirements Section 3 & 4)
#################################################################

:DataFormatSpecification rdf:type owl:Class ;
  rdfs:subClassOf iof:PlanSpecification ,
                  [ rdf:type owl:Restriction ;
                    owl:onProperty iof:isPrescribedBy ;
                    owl:someValuesFrom :TDPOptionSelectionWorksheet
                  ] ;
  rdfs:label "Data Format Specification"@en ;
  rdfs:comment "Possible instances include 'Contractor Format' and 'Government Format'."@en .

:TDPOptionSelectionWorksheet rdf:type owl:Class ;
  rdfs:subClassOf iof:InformationContentEntity ;
  rdfs:label "TDP Option Selection Worksheet"@en .

:RequiredContentInformation rdf:type owl:Class ;
  rdfs:subClassOf iof:InformationContentEntity ;
  rdfs:label "Required Content Information"@en .

:UniqueProcessDetails rdf:type owl:Class ;
  rdfs:subClassOf :RequiredContentInformation ,
                  [ rdf:type owl:Restriction ;
                    owl:onProperty iof:isAbout ;
                    owl:someValuesFrom iof:ManufacturingProcess
                  ] ;
  rdfs:comment "The process being detailed is one that is essential to design and manufacture."@en .

:PhysicalCharacteristicInfo rdf:type owl:Class ;
  rdfs:subClassOf :RequiredContentInformation ,
                  [ rdf:type owl:Restriction ;
                    owl:onProperty iof:isAbout ;
                    owl:someValuesFrom bfo:BFO_0000019 # bfo:quality
                  ] ;
  rdfs:comment "Examples of qualities described include form, finishes, and protective coatings."@en .

:SoftwareProgrammingRequirement rdf:type owl:Class ;
  rdfs:subClassOf iof:RequirementSpecification ,
                  [ rdf:type owl:Restriction ;
                    owl:onProperty iof:isPrescribedBy ;
                    owl:someValuesFrom :ProductEngineeringDesignData
                  ] ,
                  [ rdf:type owl:Restriction ;
                    owl:onProperty iof:isAbout ;
                    owl:someValuesFrom iof:Software # Assuming iof:Software
                  ] ;
  rdfs:comment "Includes description of input media and validation procedures."@en .

# Declaring a few more of the content types for completeness
:PerformanceRating rdf:type owl:Class ; rdfs:subClassOf :RequiredContentInformation .
:DimensionalData rdf:type owl:Class ; rdfs:subClassOf :RequiredContentInformation .

# ----- Axioms amending existing classes -----
:Contract
  rdfs:subClassOf [ rdf:type owl:Restriction ;
                    owl:onProperty iof:isAbout ;
                    owl:someValuesFrom :TDPOptionSelectionWorksheet
                  ] .

:ProductEngineeringDesignData
  rdfs:subClassOf [ rdf:type owl:Restriction ;
                    owl:onProperty iof:isDescribedBy ;
                    owl:someValuesFrom :DataFormatSpecification
                  ] ,
                  [ rdf:type owl:Restriction ;
                    owl:onProperty iof:conforms_to ;
                    owl:someValuesFrom :ASME_Y14-100
                  ] ,
                  [ rdf:type owl:Restriction ;
                    owl:onProperty iof:conforms_to ;
                    owl:someValuesFrom :ASME_Y14-34
                  ] ,
                  [ rdf:type owl:Restriction ;
                    owl:onProperty iof:conforms_to ;
                    owl:someValuesFrom :ASME_Y14-41
                  ] ,
                  [ rdf:type owl:Restriction ;
                    owl:onProperty iof:conforms_to ;
                    owl:someValuesFrom :ASME_Y14-41-1
                  ] ,
                  [ rdf:type owl:Restriction ;
                    owl:onProperty bfo:BFO_0000101 ; # bfo:is_carrier_of
                    owl:someValuesFrom :RequiredContentInformation
                  ] ;
  rdfs:comment "May also be required to conform to Appendices B-E of ASME Y14.100."@en .


#################################################################
#    Individuals (Requirements Section 3 & 4)
#################################################################

:ASME_Y14-100 rdf:type owl:NamedIndividual ,
                       :Standard .
:ASME_Y14-34 rdf:type owl:NamedIndividual ,
                      :Standard .
:ASME_Y14-41 rdf:type owl:NamedIndividual ,
                      :Standard .
:ASME_Y14-41-1 rdf:type owl:NamedIndividual ,
                        :Standard .
						

#################################################################
#    Object Properties (Requirements Section 5 & 6)
#################################################################

:specifiesIdentifierType rdf:type owl:ObjectProperty ;
  rdfs:label "specifies identifier type"@en .


#################################################################
#    Classes (Requirements Section 5 & 6)
#################################################################

:Parameter rdf:type owl:Class ;
  rdfs:subClassOf iof:InformationContentEntity ,
                  [ rdf:type owl:Restriction ;
                    owl:onProperty iof:isAbout ;
                    owl:someValuesFrom :Item
                  ] ;
  rdfs:label "Parameter"@en .

:Unit rdf:type owl:Class ;
  rdfs:subClassOf :Item .
:Assembly rdf:type owl:Class ;
  rdfs:subClassOf iof:Assembly ,
                  :Item .
:Subassembly rdf:type owl:Class ;
  rdfs:subClassOf :Assembly .
:Part rdf:type owl:Class ;
  rdfs:subClassOf bfo:BFO_0000040 . # bfo:material_entity
:Material rdf:type owl:Class ;
  rdfs:subClassOf bfo:BFO_0000040 .

:MechanicalDimension rdf:type owl:Class ;
  rdfs:subClassOf :Parameter ,
                  [ rdf:type owl:Restriction ;
                    owl:onProperty iof:isAbout ;
                    owl:someValuesFrom iof:FabricationProcess
                  ] .
:ElectricalParameter rdf:type owl:Class ;
  rdfs:subClassOf :Parameter ,
                  [ rdf:type owl:Restriction ;
                    owl:onProperty iof:isAbout ;
                    owl:someValuesFrom iof:InstallationProcess
                  ] .
:PhysicalParameter rdf:type owl:Class ;
  rdfs:subClassOf :Parameter ;
  rdfs:comment "Examples include weight, pressure, and viscosity."@en .

:EnvironmentalCondition rdf:type owl:Class ;
  rdfs:subClassOf iof:RequirementSpecification ,
                  [ rdf:type owl:Restriction ;
                    owl:onProperty iof:is_about ;
                    owl:someValuesFrom :Item
                  ] ;
  rdfs:comment "Meeting this condition enables an item to perform effectively in an end item, helping the end item meet its own specification requirements."@en .

:CAGECode rdf:type owl:Class ;
  rdfs:subClassOf iof:Identifier ,
                  [ rdf:type owl:Restriction ;
                    owl:onProperty iof:is_about ;
                    owl:someValuesFrom :ProductEngineeringDesignData
                  ] .
:DocumentNumber rdf:type owl:Class ;
  rdfs:subClassOf iof:Identifier ,
                  [ rdf:type owl:Restriction ;
                    owl:onProperty iof:is_about ;
                    owl:someValuesFrom :ProductEngineeringDesignData
                  ] .

# ----- Axioms amending existing classes -----
:ProductEngineeringDesignData
  rdfs:subClassOf [ rdf:type owl:Restriction ;
                    owl:onProperty bfo:BFO_0000101 ; # bfo:is_carrier_of
                    owl:someValuesFrom :Parameter
                  ] ,
                  [ rdf:type owl:Restriction ;
                    owl:onProperty bfo:BFO_0000101 ;
                    owl:someValuesFrom :EnvironmentalCondition
                  ] .

:Item
  rdfs:subClassOf [ rdf:type owl:Restriction ;
                    owl:onProperty iof:satisfies_requirement ;
                    owl:someValuesFrom :EnvironmentalCondition
                  ] .

:TDPOptionSelectionWorksheet
  rdfs:subClassOf [ rdf:type owl:Restriction ;
                    owl:onProperty :specifiesIdentifierType ;
                    owl:someValuesFrom :CAGECode
                  ] ,
                  [ rdf:type owl:Restriction ;
                    owl:onProperty :specifiesIdentifierType ;
                    owl:someValuesFrom :DocumentNumber
                  ] .
				  


#################################################################
#    Classes (Requirements Section 7)
#################################################################

:DesignDataType rdf:type owl:Class ;
  rdfs:subClassOf iof:InformationContentEntity ;
  rdfs:label "Design Data Type"@en ;
  rdfs:comment "Examples include Drawings, Models, and 3Di Viewables."@en .

:SourceQualificationProcess rdf:type owl:Class ;
  rdfs:subClassOf iof:TestingProcess ,
                  [ rdf:type owl:Restriction ;
                    owl:onProperty iof:precedes ;
                    owl:someValuesFrom iof:ProcuringBusinessProcess
                  ] ,
                  [ rdf:type owl:Restriction ;
                    owl:onProperty iof:has_function ;
                    owl:someValuesFrom iof:RequirementSatisfactionFunction # Assuming this class exists from IOF/CCO
                  ] ;
  rdfs:label "Source Qualification Process"@en ;
  rdfs:comment "This is a testing process to ensure an item satisfies specified requirements."@en .

:CriticalApplicationRole rdf:type owl:Class ;
  rdfs:subClassOf bfo:BFO_0000023 ; # bfo:role
  rdfs:label "Critical Application Role"@en .

:StandardMicrocircuitDrawing rdf:type owl:Class ;
  rdfs:subClassOf :Standard ,
                  [ rdf:type owl:Restriction ;
                    owl:onProperty iof:prescribes ;
                    owl:someValuesFrom [ rdf:type owl:Restriction ;
                                         owl:onProperty iof:isAbout ;
                                         owl:someValuesFrom :Microcircuit
                                       ]
                  ] ;
  rdfs:label "Standard Microcircuit Drawing"@en .

:Microcircuit rdf:type owl:Class ;
  rdfs:subClassOf iof:MaterialArtifact ;
  rdfs:label "Microcircuit"@en .

# ----- Axioms amending existing classes from previous steps -----
:TDPOptionSelectionWorksheet
  rdfs:subClassOf [ rdf:type owl:Restriction ;
                    owl:onProperty iof:prescribes ;
                    owl:someValuesFrom :DesignDataType
                  ] .

# Note: We need to declare the VendorItemControlDocument and SourceControlDocument classes from the Use/relationship section first
# if they haven't been added yet from that formalization block.
# Assuming they exist, we add the new subclass axioms to them.

:VendorItemControlDocument
  rdfs:subClassOf [ rdf:type owl:Restriction ;
                    owl:onProperty iof:prescribes ;
                    owl:someValuesFrom [ rdf:type owl:Restriction ;
                                         owl:onProperty iof:isAbout ;
                                         owl:someValuesFrom :PurchasedItem
                                       ]
                  ] ;
  rdfs:comment "This is used only when the purchased item is approved for design and used without alteration, selection, or source qualification."@en .

:SourceControlDocument
  rdfs:subClassOf [ rdf:type owl:Restriction ;
                    owl:onProperty iof:prescribes ;
                    owl:someValuesFrom [ rdf:type owl:Restriction ;
                                         owl:onProperty iof:isAbout ;
                                         owl:someValuesFrom [ rdf:type owl:Class ;
                                                              owl:intersectionOf ( :PurchasedItem [ rdf:type owl:Restriction ;
                                                                                                    owl:onProperty iof:has_role ;
                                                                                                    owl:someValuesFrom :CriticalApplicationRole
                                                                                                  ] [ rdf:type owl:Restriction ;
                                                                                                      owl:onProperty iof:is_participant_in ;
                                                                                                      owl:someValuesFrom :SourceQualificationProcess
                                                                                                    ] )
                                                            ]
                                       ]
                  ] ;
  rdfs:comment "Also applies only if item is approved for design and can be met by one or more sources."@en .


#################################################################
#    Individuals (Requirements Section 7)
#################################################################

:MIL-HDBK-780 rdf:type owl:NamedIndividual ,
                      :StandardMicrocircuitDrawing ;
  rdfs:label "Standard MIL-HDBK-780"@en .
