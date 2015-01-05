
// create unique date and relationship. Replace the day, month and year value with date parameter values
// replace the email with the consultant email and mood name to what was selected

MATCH (mo:Mood {name: 'bored'}), (cons:Consultant{email: 'warwick.slade@smsmt.com'})
MERGE (day:Day {day: 5})
MERGE (month:Month {month: 1})
MERGE (year:Year {year: 2015})
MERGE (cal:Calendar {name: 'root'})
MERGE (day)-[:AT]-(month)
MERGE (month)-[:AT]-(year)
MERGE (year)-[:AT]-(cal)
CREATE (senti:Sentiment{timeofday:'01:00:00 PM'})-[:AT]->(day)
CREATE (senti)-[:EMOTION]->(mo)
CREATE (cons)-[:FELT]->(senti)
