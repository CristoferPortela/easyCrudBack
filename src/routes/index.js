'use strict'
module.exports = app => {
    app.get('/', (req, res) => {
        console.log("oi")
        res.send("oi")
    })

    const mid = app.middlewares

    app.get('/employers', mid.users.find)

    app.route('/employers/:id')
        .get(mid.users.getEmployers)
        .put(mid.users.postEmployers)

    app.post('/register', mid.users.register)
}