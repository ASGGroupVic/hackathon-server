match (obs:Observation)-->(day:Day)-->(month:Month)-->(year: Year), (obs)--(cl:Client{clientCode:'123'})
optional match (obs)-->(tag:Tag)
return obs.timeofday, day.day, day.month, day.year, obs.text, collect(tag.tag) order by day.year, day.month, day.day, obs.timeofday;