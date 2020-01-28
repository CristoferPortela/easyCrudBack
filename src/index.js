'use strict'
// the express app function
const app = require('express')()
// used for make easier to separete the application in modules
const consign = require('consign')
// requiring and configuring mongodb
const mongo = require('mongodb').MongoClient
const conn = "mongodb://localhost:27017"

// connection with db

mongo.connect(conn, (err, client) => {
    if (err) return console.log(err)

    // this will allow me to use the db connection in the consign autoload
    const db = client.db('easyCrud')
    app.db = db

})

// the autoload with consign
consign({ cwd: 'src' })
    .then('middlewares')
    .then('routes')
    .into(app)


const port = 2020

app.listen(port, () => console.log(`Server running on ${port}`))