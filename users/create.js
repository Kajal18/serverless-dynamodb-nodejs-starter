const sls = require('serverless-http')//Handle the GET endpoint on the root route /
const AWS = require('aws-sdk')
const UserTable = process.env.USER_TABLE
const dynamoDb = new AWS.DynamoDB.DocumentClient()

module.exports.create = (event, context, callback) => {
    const data = JSON.parse(event.body);
    const params = {
        TableName: UserTable,
        Item: {
            id: data.id,
            name: data.name
        }
    }
    dynamoDb.put(params, (err) => {
        if (err) {
            console.log(err);
        }
        const response = {
            statusCode: 200,
            body: JSON.stringify(params.Item),
        };
        callback(null, response);
    });
}