/* Amplify Params - DO NOT EDIT
You can access the following resource attributes as environment variables from your Lambda function
var environment = process.env.ENV
var region = process.env.REGION

Amplify Params - DO NOT EDIT */

const AWS = require('aws-sdk');
var awsServerlessExpressMiddleware = require('aws-serverless-express/middleware');
var bodyParser = require('body-parser');
var express = require('express');

AWS.config.update({region: process.env.TABLE_REGION});

const dynamodb = new AWS.DynamoDB.DocumentClient();

let tableName = "GamesTable";
if (process.env.ENV && process.env.ENV !== "NONE") {
    tableName = tableName + '-' + process.env.ENV;
}

const userIdPresent = false; // TODO: update in case is required to use that definition
const partitionKeyName = "uuid";
const partitionKeyType = "S";
const sortKeyName = "";
const sortKeyType = "";
const hasSortKey = sortKeyName !== "";
const path = "/games";
const UNAUTH = 'UNAUTH';
const hashKeyPath = '/:' + partitionKeyName;
const sortKeyPath = hasSortKey ? '/:' + sortKeyName : '';

// declare a new express app
const app = express();
app.use(bodyParser.json());
app.use(awsServerlessExpressMiddleware.eventContext());

// Enable CORS for all methods
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next()
});

// convert url string param to expected Type
const convertUrlType = (param, type) => {
    switch (type) {
        case "N":
            return Number.parseInt(param);
        default:
            return param;
    }
};

/********************************
 * HTTP Get method for list objects *
 ********************************/

app.get(path, function (req, res) {

    let scanParams = {
        TableName: tableName,
        FilterExpression: 'scoreP1 >= :num OR scoreP2 >= :num',
        ExpressionAttributeValues: {
            ":num": 5
        }
    };

    const compare = (a, b) => {
        return a.date > b.date ? -1 : b.date > a.date ? 1 : 0;
    };

    dynamodb.scan(scanParams, (err, data) => {
        if (err) {
            res.statusCode = 500;
            res.json({error: 'Could not load items: ' + err});
        } else {

            const isValid = (item) => {
                return 'date' in item;
            };

            let filteredItems = data.Items.filter(isValid);
            filteredItems.sort(compare);
            res.json(filteredItems);
        }
    });
});

/*****************************************
 * HTTP Get method for get single object *
 *****************************************/

// app.get(path + '/object' + hashKeyPath + sortKeyPath, function (req, res) {
//     var params = {};
//     if (userIdPresent && req.apiGateway) {
//         params[partitionKeyName] = req.apiGateway.event.requestContext.identity.cognitoIdentityId || UNAUTH;
//     } else {
//         params[partitionKeyName] = req.params[partitionKeyName];
//         try {
//             params[partitionKeyName] = convertUrlType(req.params[partitionKeyName], partitionKeyType);
//         } catch (err) {
//             res.statusCode = 500;
//             res.json({error: 'Wrong column type ' + err});
//         }
//     }
//     if (hasSortKey) {
//         try {
//             params[sortKeyName] = convertUrlType(req.params[sortKeyName], sortKeyType);
//         } catch (err) {
//             res.statusCode = 500;
//             res.json({error: 'Wrong column type ' + err});
//         }
//     }
//
//     let getItemParams = {
//         TableName: tableName,
//         Key: params
//     };
//
//     dynamodb.get(getItemParams, (err, data) => {
//         if (err) {
//             res.statusCode = 500;
//             res.json({error: 'Could not load items: ' + err.message});
//         } else {
//             if (data.Item) {
//                 res.json(data.Item);
//             } else {
//                 res.json(data);
//             }
//         }
//     });
// });


/************************************
 * HTTP put method for insert object *
 *************************************/

app.put(path, function (req, res) {

    if (userIdPresent) {
        req.body['userId'] = req.apiGateway.event.requestContext.identity.cognitoIdentityId || UNAUTH;
    }

    if (!('uuid' in req.body && 'shapeP1' in req.body)) {
        res.statusCode = 500;
        res.json({error: "Required keys: uuid, shapeP1"});
        return;
    }

    const shapes = ['rock', 'paper', 'scissors'];
    const shapeP1 = req.body['shapeP1'];

    if (!shapes.includes(shapeP1)) {
        res.statusCode = 500;
        res.json({error: "Valid shapes: rock, paper, scissors"});
        return;
    }

    const randomIndex = Math.floor(Math.random() * 3);
    const shapeP2 = shapes[randomIndex];

    var params = {};
    params[partitionKeyName] = convertUrlType(req.body[partitionKeyName], partitionKeyType);
    console.log(params);

    let getItemParams = {
        TableName: tableName,
        Key: params
    };

    dynamodb.get(getItemParams, (err, data) => {

        const currentGame = data.Item;

        if (err) {
            res.statusCode = 500;
            res.json({error: 'GET: Could not load items: ' + err.message});
        } else {

            if (shapeP1 === 'rock') {
                if (shapeP2 === 'paper') currentGame['scoreP2']++;
                else if (shapeP2 === 'scissors') currentGame['scoreP1']++;
            } else if (shapeP1 === 'scissors') {
                if (shapeP2 === 'paper') currentGame['scoreP1']++;
                else if (shapeP2 === 'rock') currentGame['scoreP2']++;
            } else if (shapeP1 === 'paper') {
                if (shapeP2 === 'scissors') currentGame['scoreP2']++;
                else if (shapeP2 === 'rock') currentGame['scoreP1']++;
            }

            let updateItemParams = {
                TableName: tableName,
                Key:{
                    'uuid': req.body['uuid'],
                },
                UpdateExpression: 'set scoreP1 = :p1, scoreP2 = :p2',
                ExpressionAttributeValues:{
                    ':p1': currentGame['scoreP1'],
                    ':p2': currentGame['scoreP2']
                },
                ReturnValues:'UPDATED_NEW'
            };

            dynamodb.update(updateItemParams, (err, data) => {
                if (err) {
                    res.statusCode = 500;
                    res.json({
                        error: 'UPDATE: ' + err,
                        url: req.url,
                        body: {
                            body: req.body,
                            currentGame: currentGame
                        }
                    });
                } else {
                    const output = {
                        scoreP1: currentGame['scoreP1'],
                        scoreP2: currentGame['scoreP2'],
                        shapeP1: shapeP1,
                        shapeP2: shapeP2
                    };

                    res.json({success: 'put call succeed!', url: req.url, data: output})
                }
            });
        }
    });
});

/************************************
 * HTTP post method for insert object *
 *************************************/

app.post(path, function (req, res) {

    if (userIdPresent) {
        req.body['userId'] = req.apiGateway.event.requestContext.identity.cognitoIdentityId || UNAUTH;
    }

    let putItemParams = {
        TableName: tableName,
        Item: req.body
    };

    dynamodb.put(putItemParams, (err, data) => {
        if (err) {
            res.statusCode = 500;
            res.json({error: err, url: req.url, body: req.body});
        } else {
            res.json({success: 'post call succeed!', url: req.url, data: data})
        }
    });
});

/**************************************
 * HTTP remove method to delete object *
 ***************************************/

// app.delete(path + '/object' + hashKeyPath + sortKeyPath, function (req, res) {
//     var params = {};
//     if (userIdPresent && req.apiGateway) {
//         params[partitionKeyName] = req.apiGateway.event.requestContext.identity.cognitoIdentityId || UNAUTH;
//     } else {
//         params[partitionKeyName] = req.params[partitionKeyName];
//         try {
//             params[partitionKeyName] = convertUrlType(req.params[partitionKeyName], partitionKeyType);
//         } catch (err) {
//             res.statusCode = 500;
//             res.json({error: 'Wrong column type ' + err});
//         }
//     }
//     if (hasSortKey) {
//         try {
//             params[sortKeyName] = convertUrlType(req.params[sortKeyName], sortKeyType);
//         } catch (err) {
//             res.statusCode = 500;
//             res.json({error: 'Wrong column type ' + err});
//         }
//     }
//
//     let removeItemParams = {
//         TableName: tableName,
//         Key: params
//     };
//
//     dynamodb.delete(removeItemParams, (err, data) => {
//         if (err) {
//             res.statusCode = 500;
//             res.json({error: err, url: req.url});
//         } else {
//             res.json({url: req.url, data: data});
//         }
//     });
// });


app.listen(3000, function () {
    console.log("App started")
});

// Export the app object. When executing the application local this does nothing. However,
// to port it to AWS Lambda we will create a wrapper around that will load the app from
// this file
module.exports = app;
