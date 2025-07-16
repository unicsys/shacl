@prefix : <http://example.com/company#> .
@prefix rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#> .
@prefix rdfs: <http://www.w3.org/2000/01/rdf-schema#> .
@prefix xsd: <http://www.w3.org/2001/XMLSchema#> .

# -- Classes --
:Employee a rdfs:Class ;
    rdfs:label "Employee" .

:Department a rdfs:Class ;
    rdfs:label "Department" .

:Project a rdfs:Class ;
    rdfs:label "Project" .

# -- Datatype Properties (Attributes) --
:firstName a rdf:Property ;
    rdfs:domain :Employee ;
    rdfs:range xsd:string .

:lastName a rdf:Property ;
    rdfs:domain :Employee ;
    rdfs:range xsd:string .

:email a rdf:Property ;
    rdfs:domain :Employee ;
    rdfs:range xsd:string .

:hireDate a rdf:Property ;
    rdfs:domain :Employee ;
    rdfs:range xsd:date .

:jobTitle a rdf:Property ;
    rdfs:domain :Employee ;
    rdfs:range xsd:string .

:departmentName a rdf:Property ;
    rdfs:domain :Department ;
    rdfs:range xsd:string .

# -- Object Properties (Relationships) --
:worksIn a rdf:Property ;
    rdfs:domain :Employee ;
    rdfs:range :Department .

:leadsProject a rdf:Property ;
    rdfs:domain :Employee ;
    rdfs:range :Project .
