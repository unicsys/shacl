#==============================================================================
# AEROSPACE ABBREVIATION LOOKUP QUERY
# Purpose: Find the full form and source information for a given abbreviation
#==============================================================================

PREFIX aafo: <https://ontologyhub.rtx.com/RTXEnterpriseOntologies/AerospaceAbbreviationandFull-formOntology/>
PREFIX bfo: <http://purl.obolibrary.org/obo/>
PREFIX prov: <http://www.w3.org/ns/prov#>
PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
PREFIX dcterms: <http://purl.org/dc/terms/>

#╔════════════════════════════════════════════════════════════╗
#║                    INPUT ABBREVIATION                      ║
#║                            ↓↓↓                             ║
#║                vvvvvvvvvvvvvvvvvvvvvvvvvv                  ║
#║                vvv  CHANGE TEXT BELOW  vvv                 ║
#╚════════════════════════════════════════════════════════════╝

SELECT DISTINCT 
    ?abbreviation 
    ?fullForm 
    ?dataSource 
    ?sourceFile 
    ?dateLoaded
WHERE {
    # Step 1: Find the Information Bearing Entity with the abbreviation text
    ?abbreviationIBE a aafo:InformationBearingEntity ;
                     aafo:hastextvalue ?abbreviation .
    
    # Step 2: Find the Short Form entity that depends on this IBE
    ?shortFormEntity a aafo:ShortForm ;
                     bfo:BFO_0000084 ?abbreviationIBE .
    
    # Step 3: Follow the relationship to get the Long Form
    ?shortFormEntity aafo:expandsTo ?longFormEntity .
    
    # Step 4: Get the Long Form's IBE and text value
    ?longFormEntity a aafo:LongForm ;
                    bfo:BFO_0000084 ?longFormIBE .
    ?longFormIBE aafo:hastextvalue ?fullForm .
    
    # Step 5: Get source/provenance information
    OPTIONAL {
        ?abbreviationIBE prov:wasDerivedFrom ?sourceEntity .
        ?sourceEntity rdfs:label ?dataSource .
        OPTIONAL { ?sourceEntity dcterms:source ?sourceFile }
        OPTIONAL { ?sourceEntity dcterms:created ?dateLoaded }
    }
    
    #████████████████████████████████████████████████████████████
    #█                   ENTER ABBREVIATION BELOW               █
    #█                           ↓↓↓↓↓↓                         █
    #████████████████████████████████████████████████████████████
    
    FILTER(?abbreviation = "TEC")
    
    #████████████████████████████████████████████████████████████
    #█                           ↑↑↑↑↑↑                         █  
    #█             REPLACE "TEC" WITH YOUR ABBREVIATION         █
    #████████████████████████████████████████████████████████████
}

#==============================================================================
# EXAMPLE INPUTS:
# - "ESN" for Engine Serial Number
# - "JCN" for Job Control Number  
# - "FADEC" for Full Authority Digital Engine Control
#==============================================================================
