match (mood: Mood)<--(senti: Sentiment)<--(c: Consultant)-->(e:Engagement)-->(cl:Client{clientCode:'123'})
return mood.name, count(*)