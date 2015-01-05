// delete all seed data
match (w) delete w

// create some consultants
CREATE (:Consultant {firstName:"Warwick", lastName:"Slade", phone:"0407433955", email:"warwick.slade@smsmt.com", employeeId:"2401"})
CREATE (:Consultant {firstName:"Adam", lastName:"Rozencwajg", phone:"0417382311", email:"adam.rozencwajg@smsmt.com", employeeId:"955"})
CREATE (:Consultant {firstName:"Fadrian", lastName:"Sudaman", phone:"0411371359", email:"fadrian.sudaman@smsmt.com", employeeId:"2402"})
CREATE (:Consultant {firstName:"Andy", lastName:"Hitchman", phone:"0400999333", email:"andrew.hitchman@smsmt.com", employeeId:"103"})
CREATE (:Consultant {firstName:"Tom", lastName:"Stianos", phone:"0400911911", email:"tom.stianos@smsmt.com", employeeId:"1"})

// create some clients
CREATE (:Client {name:"Telstra", contact:"Matthias Hansen"})
CREATE (:Client {name:"Australia Post", contact:"Ayten Ozenc"})

// create some moods
CREATE (:mood {name:"bored", description:"this place is doing nothing for me - think i might go surf SEEK"})
CREATE (:mood {name:"happy", description:"I am enjoying myself right about now"})
CREATE (:mood {name:"postal", description:"I cant take this sh!t anymore"})
CREATE (:mood {name:"indifferent", description:"just doing my thang - nothing good to report, nothing bad to report"})