
// create unique date and relationship. Replace the day, month and year value with parameter values
MERGE (d:Day {day: 5})
MERGE (m:Month {month: 1})
MERGE (y:Year {year: 2015})
MERGE (c:Calendar {name: 'root'})
MERGE (d)-[:AT]-(m)
MERGE (m)-[:AT]-(y)
MERGE (y)-[:AT]-(c)