// contains ignore case
MATCH (cl:Client) where cl.name =~ '(?i).*els.*' RETURN cl;
