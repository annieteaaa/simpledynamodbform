//Creating the table (only needs to be done once if you haven't created the table)
//run with 'node registerTable.js'

//set up necessary aws sdk
const AWS = require("aws-sdk");
AWS.config.update({
  region: "local",
  endpoint: "http://localhost:8000",
});

//initialize dynamoDB for use with adding new table
var dynamodb = new AWS.DynamoDB();

//define necessary paramters for our table
var params = {
  TableName: "Registrations",
  KeySchema: [
    { AttributeName: "id", KeyType: "HASH" }, //Partition key
  ],
  AttributeDefinitions: [{ AttributeName: "id", AttributeType: "N" }],
  ProvisionedThroughput: {
    ReadCapacityUnits: 5,
    WriteCapacityUnits: 5,
  },
};

//create our local dynamodb table
dynamodb.createTable(params, function (err, data) {
  if (err) {
    console.error("Error JSON.", JSON.stringify(err, null, 2));
  } else {
    console.log("Created table.", JSON.stringify(data, null, 2));
  }
});
