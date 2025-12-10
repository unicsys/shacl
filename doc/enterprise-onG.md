from rdflib import URIRef, Literal, RDF, RDFS, XSD
from .config import REL_DESIGNATES, REL_DEPENDS_ON, PROP_HAS_TEXT_VALUE, CCO

class CCOGraphBuilder:
    def __init__(self, graph):
        self.g = graph

    def create_designative_pattern(self, entity_iri, ice_iri, ibe_iri, 
                                   entity_label, ice_label, ibe_label, 
                                   literal_value, ice_class,
                                   # Default to String/TextValue if not specified
                                   data_property=PROP_HAS_TEXT_VALUE,
                                   data_type=XSD.string):
        """
        Creates Diamond Pattern: 
        Entity <- designates - ICE - depends_on -> IBE - [property] -> Literal(Type)
        """
        entity_node = URIRef(entity_iri)
        ice_node = URIRef(ice_iri)
        ibe_node = URIRef(ibe_iri)
        
        # Labels
        self.g.add((entity_node, RDFS.label, Literal(entity_label)))
        self.g.add((ice_node, RDFS.label, Literal(ice_label)))
        self.g.add((ibe_node, RDFS.label, Literal(ibe_label)))
        
        # Types
        self.g.add((ice_node, RDF.type, ice_class))
        self.g.add((ibe_node, RDF.type, CCO.InformationBearingEntity))
        
        # Relations (Using Config Constants)
        self.g.add((ice_node, REL_DESIGNATES, entity_node))
        self.g.add((ice_node, REL_DEPENDS_ON, ibe_node))
        
        # Literal (With Datatype)
        if literal_value is not None:
             self.g.add((ibe_node, data_property, Literal(literal_value, datatype=data_type)))

    def add_type(self, entity_iri, class_type):
        self.g.add((URIRef(entity_iri), RDF.type, class_type))

    def add_relationship(self, subject_iri, predicate, object_iri):
        self.g.add((URIRef(subject_iri), predicate, URIRef(object_iri)))
