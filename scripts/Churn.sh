git log --all --numstat -M -C --name-only | grep -E '^(app|lib)/' | sort | uniq -c | sort | awk 'BEGIN {print "count,file"} {print $1 "," $2}' > Churn.csv