'use strict'
module.exports = app => {
    app.get('/', (req, res) => res.send("oi"))

    const users = app.middlewares.users


    app.get('/employers', users.index)

    app.route('/employers/:id')
        .get(users.show)
        .put(users.edit)

    app.post('/register', users.store)
}