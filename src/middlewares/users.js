'use strict'
const ObjectID = require('mongodb').ObjectID

module.exports = app => {
    
    const { emailValidate, notNull } = app.middlewares.exceptions

    const index = (req, res) => {
        app.db.collection('futureEmployers').find().toArray((err, results) => {
            if (err) return console.log(err)
            res.json(results)
        })
    }

    const show = (req, res) => {

        let id = req.params.id

        app.db.collection('futureEmployers')
            .find({ _id: ObjectID(id) }).toArray((err, results) => {
                if (err) return res.send(err)
                res.json(results)
            })
    }

    const edit = (req, res) => {

        let id = req.params.id

        app.db.collection('futureEmployers')
            .updateOne({ _id: ObjectID(id) }, {$set: req.body}, (err, result) => {

                if (err) return console.log(err)

                res.redirect(`/employers/${ id }`)
            })  
    }

    const store = (req, res) => {

        try {
            emailValidate(req.body.email, "Email incorreto")
            notNull(req.body.name, "Nome não citado")
            notNull(req.body.field, "Campo de trabalho desejado não citado")
            notNull(req.body.name, "Por favor, envie o curriculo")
        } catch (e) {
            return res.status(400).send(e)
        }        

        const store = {
            name: req.body.name,
            field: req.body.field,
            email: req.body.email,
            tel: req.body.tel,
            curriculum: req.body.curriculum
        }

        app.db.collection('futureEmployers').insertOne(store, (err, result) =>{
            if (err) return console.log(err)
    
            res.redirect(`/employers/${ result.ops[0]._id }`)
        })
    }

    return { index, show, edit, store }
}