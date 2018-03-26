# posts account data
curl -H "Content-Type: application/json" -X POST -d '{"name": "savings", "balance": "1000"}' "http://localhost:3000/accounts"

#gets account data
curl "http://localhost:3000/accounts"

#updates account data at a specific id
curl -H "Content-Type: application/json" -X PUT -d '{"balance": "1500"}' "http://localhost:3000/accounts/ID"

#deletes account data at a specific id
curl -X DELETE "http://localhost:3000/accounts/ID"
