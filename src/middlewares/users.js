'use strict'
const ObjectID = require('mongodb').ObjectID

module.exports = app => {
    
    const { emailValidate, notNull } = app.middlewares.exceptions

    const index = (req, res) => {

        app.db.collection('futureEmployers')
            .find({ deleted: null })
                .toArray((err, results) => {
                if (err) return console.log(err)
                
                res.status(200)
                return res.json(results)
            })
    }

    const show = (req, res) => {

        let id = req.params.id

        app.db.collection('futureEmployers')
            .find({ _id: ObjectID(id) }).toArray((err, results) => {
                if (err) return res.send(err)
                return res.json(results)
            })
    }

    const edit = (req, res) => {

        let id = req.params.id

        if (id === undefined)
            return res.redirect('/employers')

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
            //notNull(req.body.curriculum, "Por favor, envie o curriculo")
        } catch (e) {
            return res.status(400).send(e)
        }        
// colocar cidade e estado
        const store = {
            name: req.body.name,
            field: req.body.field,
            email: req.body.email,
            tel: req.body.tel,
            curriculum: req.body.curriculum,
            deleted: null
        }

        app.db.collection('futureEmployers').insertOne(store, (err, result) =>{
            if (err) return console.log(err)
    
            //res.redirect(`/employers/${ result.ops[0]._id }`)
	        res.json(result.ops)        
	    })
    }

    const kill = (req, res) => {

        // this is a kind of soft delete, once we do not want to lose all our
        // data, but just not want to display it

        let id = req.params.id

        if (id === undefined)
            return res.redirect('/employers')

        app.db.collection('futureEmployers')
            .updateOne({ _id: ObjectID(id) }, {$set: { deleted: new Date() }}, (err, result) => {

                if (err) return console.log(err)

                res.redirect(`/employers`)
            })  
    }

    return { index, show, edit, store, kill }
}
