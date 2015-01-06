MATCH (co:Consultant)-->(en:Engagement)-->(cl:Client {clientCode:"456"}) RETURN co;
