const express = require('express')
const bp = require('body-parser')
const mongo = require('mongodb').MongoClient
const ObjectID = require('mongodb').ObjectID

const app = express()

const conn = "mongodb://localhost:27017"

app.set('view engine', 'ejs')

app.use(bp.urlencoded({ extended: true }))

app.get('/', (req, res) => {
    res.render('index.ejs')
})

app.get('/employers', (req, res) => {
    db.collection('futureEmployers').find().toArray((err, results) => {
        if (err) return console.log(err)
        res.render('employers.ejs', { data: results })
    })
})

app.route('/employers/:id')
.get((req, res) => {
    let id = req.params.id
    db.collection('futureEmployers').find({_id: ObjectID(id)}).toArray((err, results) => {
        if (err) return res.send(err)
        res.render('employer.ejs', { data: results })
    })  
})
.post((req, res) => {
    let id = req.params.id
    console.log(req.body)
    db.collection('futureEmployers').updateOne({_id: ObjectID(id)}, {$set: req.body}, (err, results) => {
        if (err) return console.log(err)
        console.log(req.body)
        res.redirect('/')
    })  
})

app.post('/register', (req, res) => {
    
    db.collection('futureEmployers').insertOne(req.body, (err, result) =>{
        if (err) return console.log(err)

        res.redirect('/')
    })
})

mongo.connect(conn, (err, client) => {
    if (err) return console.log(err)

    db = client.db('easyCrud')

    app.listen(1414, () => {
        console.log("Server running on 1414")
    })
})
