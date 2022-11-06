const express = require("express");
const bodyParser = require("body-parser");
const AWS = require("aws-sdk");
AWS.config.update({
  region: "local",
  endpoint: "http://localhost:8000",
});

const app = express();

app.use(bodyParser.json());
app.post("/register", (req, res) => {
  const info = req.body;

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
  var docClient = new AWS.DynamoDB.DocumentClient();
  docClient.put(params, function (err, data) {
    if (err) {
      console.error(err);
    } else {
      console.log("PutItem succeeded:", info.firstName);
    }
  });

  res.send({ id: info.id });
  res.statusCode = 200;
});

app.get("/registration/:id", async (req, res) => {
  try {
    const id = req.params.id;
    var params = {
      TableName: "Registrations",
      Key: {
        id: { N: id },
      },
    };

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
