// contains ignore case
MATCH (cl:Consultant) where cl.firstName =~ '(?i).*a.*' or cl.lastName =~ '(?i).*a.*' RETURN cl
