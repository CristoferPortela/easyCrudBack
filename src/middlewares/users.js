'use strict'
const ObjectID = require('mongodb').ObjectID

module.exports = app => {
    
    const find = (req, res) => {
        app.db.collection('futureEmployers').find().toArray((err, results) => {
            if (err) return console.log(err)
            res.json(results)
        })
    }

    const getEmployers = (req, res) => {
        let id = req.params.id
        app.db.collection('futureEmployers')
            .find({_id: ObjectID(id)}).toArray((err, results) => {
                if (err) return res.send(err)
                res.json(results)
            })  
    }

    const postEmployers = (req, res) => {
        let id = req.params.id
        console.log(req.body)
        app.db.collection('futureEmployers')
            .updateOne({_id: ObjectID(id)}, {$set: req.body}, (err, results) => {
                if (err) return console.log(err)

                res.redirect('/')
            })  
    }

    const register = (req, res) => {

        app.db.collection('futureEmployers').insertOne(req.body, (err, result) =>{
            if (err) return console.log(err)
    
            res.redirect('/')
        })
    }

    return { find, getEmployers, postEmployers, register }
}