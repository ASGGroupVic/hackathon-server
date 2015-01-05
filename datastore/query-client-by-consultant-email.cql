MATCH (co:Consultant {email:'tom.sti@smsmt.com' })-->(en:Engagement)-->(cl:Client)
RETURN cl