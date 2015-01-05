
// create unique date and relationship. Replace the day, month and year value with date parameter values
// replace the email with the consultant email and mood name to what was selected

// DATA for JUL 2014
LOAD CSV FROM './sentiments.csv' AS line
MATCH (mo:Mood {name: line.mood}), (cons:Consultant{email: line.email}), (client:Client{clientCode: line.clientcode})
MERGE (day:Day {day: toInt(line.day), month: toInt(line.month), year:toInt(line.year)})
MERGE (month:Month {month: toInt(line.month), year: toInt(line.year)})
MERGE (year:Year {year: toInt(line.year)})
MERGE (cal:Calendar {name: 'root'})
MERGE (day)-[:AT]-(month)
MERGE (month)-[:AT]-(year)
MERGE (year)-[:AT]-(cal)
CREATE (senti:Sentiment{timeofday:'01:00:00 PM'})-[:AT]->(day)
CREATE (senti)-[:EMOTION]->(mo)
CREATE (senti)-[:TOWARDS]->(client)
CREATE (cons)-[:FELT]->(senti);
