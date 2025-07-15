@prefix : <http://example.org/university#> .
@prefix owl: <http://www.w3.org/2002/07/owl#> .
@prefix rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#> .
@prefix rdfs: <http://www.w3.org/2000/01/rdf-schema#> .
@prefix xsd: <http://www.w3.org/2001/XMLSchema#> .

# Ontology declaration
<http://example.org/university> rdf:type owl:Ontology ;
    rdfs:label "University Ontology" ;
    rdfs:comment "A simple ontology for testing purposes" .

# Classes
:Person rdf:type owl:Class ;
    rdfs:label "Person" ;
    rdfs:comment "A human being" .

:Student rdf:type owl:Class ;
    rdfs:label "Student" ;
    rdfs:comment "A person who studies at a university" ;
    rdfs:subClassOf :Person .

:Professor rdf:type owl:Class ;
    rdfs:label "Professor" ;
    rdfs:comment "A person who teaches at a university" ;
    rdfs:subClassOf :Person .

:Course rdf:type owl:Class ;
    rdfs:label "Course" ;
    rdfs:comment "An academic course" .

:Department rdf:type owl:Class ;
    rdfs:label "Department" ;
    rdfs:comment "An academic department" .

# Object Properties (Relations)
:enrolledIn rdf:type owl:ObjectProperty ;
    rdfs:label "enrolled in" ;
    rdfs:comment "Relates a student to a course" ;
    rdfs:domain :Student ;
    rdfs:range :Course .

:teaches rdf:type owl:ObjectProperty ;
    rdfs:label "teaches" ;
    rdfs:comment "Relates a professor to a course" ;
    rdfs:domain :Professor ;
    rdfs:range :Course .

:belongsTo rdf:type owl:ObjectProperty ;
    rdfs:label "belongs to" ;
    rdfs:comment "Relates a course to a department" ;
    rdfs:domain :Course ;
    rdfs:range :Department .

:workAt rdf:type owl:ObjectProperty ;
    rdfs:label "works at" ;
    rdfs:comment "Relates a professor to a department" ;
    rdfs:domain :Professor ;
    rdfs:range :Department .

# Data Properties
:hasName rdf:type owl:DatatypeProperty ;
    rdfs:label "has name" ;
    rdfs:comment "The name of a person" ;
    rdfs:domain :Person ;
    rdfs:range xsd:string .

:hasAge rdf:type owl:DatatypeProperty ;
    rdfs:label "has age" ;
    rdfs:comment "The age of a person" ;
    rdfs:domain :Person ;
    rdfs:range xsd:int .

:hasCredits rdf:type owl:DatatypeProperty ;
    rdfs:label "has credits" ;
    rdfs:comment "Number of credits for a course" ;
    rdfs:domain :Course ;
    rdfs:range xsd:int .

# Axioms and Constraints
:Student owl:disjointWith :Professor .

:enrolledIn rdf:type owl:FunctionalProperty .

# Sample instances
:john rdf:type :Student ;
    :hasName "John Smith" ;
    :hasAge 20 ;
    :enrolledIn :math101 .

:jane rdf:type :Professor ;
    :hasName "Jane Doe" ;
    :hasAge 45 ;
    :teaches :math101 ;
    :workAt :mathDept .

:math101 rdf:type :Course ;
    :hasName "Introduction to Mathematics" ;
    :hasCredits 3 ;
    :belongsTo :mathDept .

:mathDept rdf:type :Department ;
    :hasName "Mathematics Department" .
