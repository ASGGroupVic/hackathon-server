
// create unique date and relationship. Replace the day, month and year value with date parameter values
// replace the email with the consultant email and mood name to what was selected

MERGE (d:Day {day: 5})
MERGE (m:Month {month: 1})
MERGE (y:Year {year: 2015})
MERGE (c:Calendar {name: 'root'})
MERGE (d)-[:AT]-(m)
MERGE (m)-[:AT]-(y)
MERGE (y)-[:AT]-(c)
CREATE (s:Sentiment{timeofday:'01:00:00 PM'})-[:AT]->(d)
CREATE (s)-[:EMOTION]->(mood {name: 'bored'})
CREATE (cons:Consultant{email: 'warwick.slade@smsmt.com'})-[:FELT]->(s)