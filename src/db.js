// requiring and configuring mongodb
const mongo = require('mongodb').MongoClient
const conn = "mongodb://localhost:27017"

// connection with db
module.exports = app => {

    mongo.connect(conn, (err, client) => {
        if (err) return console.log(err)
    
        let dbName = 'easyCrud'
        // check if is testing, if true, change the database
        if (process.env.NODE_ENV === 'test')
            dbName = 'test'

        // this will allow me to use the db connection in the consign autoload
        const db = client.db(dbName)

        return app.db = db
    })
}

