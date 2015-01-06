//Create new sentiment and observation and link them to client, mood and tags


LOAD CSV WITH HEADERS FROM 'https://s3-ap-southeast-2.amazonaws.com/hackathon-server/sentimentAndObservation.csv' AS line
MATCH (cons:Consultant{email: line.email}), (client:Client{clientCode: line.clientcode})
MERGE (mo:Mood {name: line.mood})
MERGE (day:Day {day: toInt(line.day), month: toInt(line.month), year:toInt(line.year)})
MERGE (month:Month {month: toInt(line.month), year: toInt(line.year)})
MERGE (year:Year {year: toInt(line.year)})
MERGE (cal:Calendar {name: 'root'})
MERGE (day)-[:AT]-(month)
MERGE (month)-[:AT]-(year)
MERGE (year)-[:AT]-(cal)
CREATE (senti:Sentiment{timeofday:line.time, comment: line.comment})-[:AT]->(day)
CREATE (senti)-[:EMOTION]->(mo)
CREATE (senti)-[:TOWARDS]->(client)
CREATE (cons)-[:FELT]->(senti)
FOREACH(t in split(line.tags, ",") | 
	MERGE (newTag:Tag{tag:t}) 
	CREATE (senti)-[:TAGGED]->(newTag));

