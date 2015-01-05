// delete all seed data
MATCH (n)
OPTIONAL MATCH (n)-[r]-()
DELETE n,r;

// create some consultants
CREATE (:Consultant {firstName:"War", lastName:"Sla", phone:"0407111222", email:"war.sla@smsmt.com", employeeId:"2401"})
CREATE (:Consultant {firstName:"Ada", lastName:"Roz", phone:"0417222333", email:"ada.roz@smsmt.com", employeeId:"2405"})
CREATE (:Consultant {firstName:"Fad", lastName:"Sud", phone:"0411333444", email:"fad.sud@smsmt.com", employeeId:"2402"})
CREATE (:Consultant {firstName:"And", lastName:"Hit", phone:"0400444555", email:"and.hit@smsmt.com", employeeId:"2403"})
CREATE (:Consultant {firstName:"Tom", lastName:"Sti", phone:"0400555666", email:"tom.sti@smsmt.com", employeeId:"2404"});

// create some clients
CREATE (:Client {name:"Telstra", contact:"TelstraContact", clientCode:"123"})
CREATE (:Client {name:"Australia Post", contact:"APContact", clientCode:"456"});

// create some moods
CREATE (:Mood {name:"bored", description:"this place is doing nothing for me - think i might go surf SEEK"})
CREATE (:Mood {name:"happy", description:"I am enjoying myself right about now"})
CREATE (:Mood {name:"postal", description:"I cant take this sh!t anymore"})
CREATE (:Mood {name:"indifferent", description:"just doing my thang - nothing good to report, nothing bad to report"});

// create engagements
CREATE (:Engagement {name:"Contact Centre Optimisiation", Client:"Telstra"})
CREATE (:Engagement {name:"Cloud Migration", Client:"Australia Post"});

// link the engagements to clients
MATCH (e:Engagement),(c:Client)
WHERE c.name="Telstra" AND e.name="Contact Centre Optimisiation"
CREATE (e)-[r:with]->(c);

MATCH (e:Engagement),(c:Client)
WHERE c.name="Australia Post" AND e.name="Cloud Migration"
CREATE (e)-[r:with]->(c);

// link the consultants to engagements
match (c:Consultant),(e:Engagement)
where c.employeeId = "2401" AND e.name="Contact Centre Optimisiation"
create (c)-[:engagedOn]->(e);

match (c:Consultant),(e:Engagement)
where c.employeeId = "2405" AND e.name="Contact Centre Optimisiation"
create (c)-[:engagedOn]->(e);

match (c:Consultant),(e:Engagement)
where c.employeeId = "2402" AND e.name="Contact Centre Optimisiation"
create (c)-[:engagedOn]->(e);

match (c:Consultant),(e:Engagement)
where c.employeeId = "2403" AND e.name="Contact Centre Optimisiation"
create (c)-[:engagedOn]->(e);

match (c:Consultant),(e:Engagement)
where c.employeeId = "2404" AND e.name="Contact Centre Optimisiation"
create (c)-[:engagedOn]->(e);

match (c:Consultant),(e:Engagement)
where c.employeeId = "2404" AND e.name="Cloud Migration"
create (c)-[:engagedOn]->(e);
