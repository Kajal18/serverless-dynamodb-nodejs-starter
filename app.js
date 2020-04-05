const sls = require('serverless-http')//Handle the GET endpoint on the root route /
const express = require('express')
const bodyParser = require('body-parser')
const AWS = require('aws-sdk')
const app = express()
app.use(bodyParser.json({ strict: false }));
const UserTable = process.env.USER_TABLE
const dynamoDb = new AWS.DynamoDB.DocumentClient()

console.log('-------------env', process.env)
console.log({ UserTable })
app.post('/users', async (req, res) => {
    const { body } = req
    const { id, name } = body
    const params = {
        TableName: UserTable,
        Item: {
            id: id,
            name: name
        }
    }
    await dynamoDb.put(params, (err) => {
        if (err) {
            console.log(err);
            // res.status(400).json({
            //     error: `Could not create user ${id}`
            // })
        }
        return res.json({ id, name });
    });
})
// app.get('/users/:id', async (req, res, next) => {
//     const params = {
//         TableName: UserTable,
//         Key: {
//             id: req.params.id
//         }
//     }
//     dynamoDb.get(params, (err, result) => {
//         if (err) {
//             console.log(err);
//         }
//         if (result.Item) {
//             const { id, name } = result.Item;
//             return res.json({ id, name });
//         } else {
//             return res.status(404).json({ error: `User ${id} not found` });
//         }
//     });
// })

module.exports.server = sls(app)