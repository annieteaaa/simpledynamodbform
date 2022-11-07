Run the following to start the application (run each in separate terminals):

```
cd server/dynamodb_local_latest
java -Djava.library.path=./DynamoDBLocal_lib -jar DynamoDBLocal.jar -sharedDb
```

```
cd server
npm run dev
```

```
cd client
yarn start
```

To view tables:

```
aws dynamodb list-tables --endpoint-url http://localhost:8000
```

aws dynamodb describe-table --table-name Registrations --endpoint-url http://localhost:8000
