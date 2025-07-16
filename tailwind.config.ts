I understand! Great news that the SPARQL endpoint is running successfully. Let me provide you with a comprehensive set of SPARQL queries that will help you explore the integrated data from both universities.

## Understanding the Data Model

First, let's understand what we have:
- **uni1**: Uses `student`, `academic`, `course`, `teaching`, and `course-registration` tables
- **uni2**: Uses `person`, `course`, and `registration` tables
- Both are mapped to the same ontology classes (`:Student`, `:Teacher`, `:Course`, etc.)

## Better SPARQL Queries

### 1. **Find All Teachers from Both Universities**
```sparql
PREFIX : <http://example.org/voc#>
PREFIX foaf: <http://xmlns.com/foaf/0.1/>

SELECT ?teacher ?firstName ?lastName ?university
WHERE {
  ?teacher :teaches ?course .
  ?teacher foaf:firstName ?firstName ;
           foaf:lastName ?lastName .
  ?course :isGivenAt ?university .
}
ORDER BY ?university ?lastName
```

### 2. **List All Courses with Their Teachers**
```sparql
PREFIX : <http://example.org/voc#>
PREFIX foaf: <http://xmlns.com/foaf/0.1/>

SELECT ?course ?title ?teacher ?firstName ?lastName
WHERE {
  ?course a :Course ;
          :title ?title .
  OPTIONAL {
    ?teacher :teaches ?course ;
             foaf:firstName ?firstName ;
             foaf:lastName ?lastName .
  }
}
ORDER BY ?title
```

### 3. **Find Students and Their Courses**
```sparql
PREFIX : <http://example.org/voc#>
PREFIX foaf: <http://xmlns.com/foaf/0.1/>

SELECT ?student ?firstName ?lastName ?course ?title
WHERE {
  ?student a :Student ;
           foaf:firstName ?firstName ;
           foaf:lastName ?lastName ;
           :attends ?course .
  ?course :title ?title .
}
ORDER BY ?lastName, ?firstName
```

### 4. **Academic Hierarchy - Show All Faculty by Position**
```sparql
PREFIX : <http://example.org/voc#>
PREFIX foaf: <http://xmlns.com/foaf/0.1/>

SELECT ?person ?firstName ?lastName ?type
WHERE {
  ?person a ?type ;
          foaf:firstName ?firstName ;
          foaf:lastName ?lastName .
  FILTER(?type IN (:FullProfessor, :AssociateProfessor, :AssistantProfessor, :PostDoc, :ExternalTeacher))
}
ORDER BY ?type ?lastName
```

### 5. **Courses by Teaching Method (Lecture vs Lab)**
```sparql
PREFIX : <http://example.org/voc#>
PREFIX foaf: <http://xmlns.com/foaf/0.1/>

SELECT ?course ?title ?lecturer ?lecturerName ?labTeacher ?labTeacherName
WHERE {
  ?course a :Course ;
          :title ?title .
  OPTIONAL {
    ?lecturer :givesLecture ?course ;
              foaf:firstName ?lecFirstName ;
              foaf:lastName ?lecLastName .
    BIND(CONCAT(?lecFirstName, " ", ?lecLastName) AS ?lecturerName)
  }
  OPTIONAL {
    ?labTeacher :givesLab ?course ;
                foaf:firstName ?labFirstName ;
                foaf:lastName ?labLastName .
    BIND(CONCAT(?labFirstName, " ", ?labLastName) AS ?labTeacherName)
  }
}
```

### 6. **Cross-University Statistics**
```sparql
PREFIX : <http://example.org/voc#>

SELECT ?university (COUNT(DISTINCT ?person) AS ?personCount) (COUNT(DISTINCT ?course) AS ?courseCount)
WHERE {
  {
    ?person a foaf:Person .
    ?course :isGivenAt ?university .
    FILTER(STRSTARTS(STR(?person), "http://example.org/voc#uni1/"))
    FILTER(?university = :uni1/university)
  }
  UNION
  {
    ?person a foaf:Person .
    ?course :isGivenAt ?university .
    FILTER(STRSTARTS(STR(?person), "http://example.org/voc#uni2/"))
    FILTER(?university = :uni2/university)
  }
}
GROUP BY ?university
```

### 7. **Find All Researchers**
```sparql
PREFIX : <http://example.org/voc#>
PREFIX foaf: <http://xmlns.com/foaf/0.1/>

SELECT ?researcher ?firstName ?lastName ?type
WHERE {
  ?researcher a :Researcher ;
              a ?type ;
              foaf:firstName ?firstName ;
              foaf:lastName ?lastName .
  FILTER(?type != :Researcher && ?type != :FacultyMember && ?type != foaf:Person)
}
ORDER BY ?type ?lastName
```

### 8. **Course Enrollment Details**
```sparql
PREFIX : <http://example.org/voc#>
PREFIX foaf: <http://xmlns.com/foaf/0.1/>

SELECT ?course ?title (COUNT(DISTINCT ?student) AS ?enrollmentCount) ?university
WHERE {
  ?course a :Course ;
          :title ?title ;
          :isGivenAt ?university .
  OPTIONAL {
    ?student :attends ?course .
  }
}
GROUP BY ?course ?title ?university
ORDER BY DESC(?enrollmentCount)
```

### 9. **Teaching Load per Academic**
```sparql
PREFIX : <http://example.org/voc#>
PREFIX foaf: <http://xmlns.com/foaf/0.1/>

SELECT ?teacher ?firstName ?lastName (COUNT(DISTINCT ?course) AS ?courseCount)
WHERE {
  ?teacher :teaches ?course ;
           foaf:firstName ?firstName ;
           foaf:lastName ?lastName .
}
GROUP BY ?teacher ?firstName ?lastName
ORDER BY DESC(?courseCount)
```

### 10. **Advanced: Find All Teaching Relationships**
```sparql
PREFIX : <http://example.org/voc#>
PREFIX foaf: <http://xmlns.com/foaf/0.1/>

SELECT ?teacher ?teacherName ?predicate ?course ?courseTitle
WHERE {
  ?teacher ?predicate ?course ;
           foaf:firstName ?firstName ;
           foaf:lastName ?lastName .
  ?course a :Course ;
          :title ?courseTitle .
  FILTER(?predicate IN (:teaches, :givesLecture, :givesLab))
  BIND(CONCAT(?firstName, " ", ?lastName) AS ?teacherName)
}
ORDER BY ?teacherName ?predicate
```

## Testing the Integration

To verify that the integration is working correctly, try this query that should return data from both universities:

```sparql
PREFIX : <http://example.org/voc#>

SELECT ?entity ?source
WHERE {
  {
    ?entity a :Course .
    BIND("uni1" AS ?source)
    FILTER(STRSTARTS(STR(?entity), "http://example.org/voc#uni1/"))
  }
  UNION
  {
    ?entity a :Course .
    BIND("uni2" AS ?source)
    FILTER(STRSTARTS(STR(?entity), "http://example.org/voc#uni2/"))
  }
}
```

This should show:
- Linear Algebra from uni1
- Information security from uni2

## Future Improvements

Since you mentioned wanting to improve the system further, here are some ideas:

1. **Add more mappings** for additional relationships
2. **Create views** in PostgreSQL to simplify complex joins
3. **Add reasoning capabilities** using Ontop's features
4. **Implement federation** with other SPARQL endpoints
5. **Add custom functions** for data transformation
6. **Performance optimization** with indexes and materialized views

Would you like me to elaborate on any of these queries or help you implement specific improvements?
