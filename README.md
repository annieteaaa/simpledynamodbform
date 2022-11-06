Run the following to start the application:

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
VIEW TABLES: aws dynamodb list-tables --endpoint-url http://localhost:8000
