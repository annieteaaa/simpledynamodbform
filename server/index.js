//import necessary packages and configurations
const express = require("express");
const bodyParser = require("body-parser");
const AWS = require("aws-sdk");
AWS.config.update({
  region: "local",
  endpoint: "http://localhost:8000",
});

//create our app
const app = express();
app.use(bodyParser.json());

//POST method for inserting into table
//possible changes: make it so that id is unique every time
//(right now we are using a single non-changing id of 1 just for our one person registration)
app.post("/register", (req, res) => {
  //retrieve request body
  const info = req.body;

  //define parameters and item for dynamodb
  var params = {
    TableName: "Registrations",
    Item: {
      id: info.id,
      firstName: info.firstName,
      lastName: info.lastName,
      email: info.email,
      phone: info.phone,
    },
  };

  //start up document client for dynamodb and put item
  var docClient = new AWS.DynamoDB.DocumentClient();
  docClient.put(params, function (err, data) {
    if (err) {
      console.error(err);
    } else {
      console.log("PutItem succeeded:", info.firstName);
    }
  });

  //return the id and set status code
  res.send({ id: info.id });
  res.statusCode = 200;
});

//GET method for retrieving from dynamoDB by id
app.get("/registration/:id", async (req, res) => {
  try {
    //define necessary parameters for dynamodb
    const id = req.params.id;
    var params = {
      TableName: "Registrations",
      Key: {
        id: { N: id },
      },
    };
    //start up dynamodb and get item from our table
    var ddb = new AWS.DynamoDB({ apiVersion: "2012-08-10" });
    const response = await ddb.getItem(params, function (err, data) {
      if (err) {
        console.log("Error", err);
      } else {
        res.send(data.Item);
      }
    });
    res.status = 200;
    return response;
  } catch (e) {
    console.error(e);
  }
});

const PORT = process.env.PORT || 7789;

app.listen(PORT, () => {
  console.log("Server started on port 7789");
});
