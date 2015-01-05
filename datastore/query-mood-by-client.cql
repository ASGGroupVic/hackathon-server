match (mood: Mood)<--(senti: Sentiment)-->(cl:Client{clientCode:'123'})
return mood.name, count(*);