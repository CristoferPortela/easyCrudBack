'use strict'
module.exports = app => {
    // app.get('/', (req, res) => res.send("oi"))

    const users = app.middlewares.users


    app.get('/employers', users.index)
    app.post('/register', users.store)
    app.post('/login', app.middlewares.auth.generateToken)

    app.route('/employers/:id')
        .all(app.middlewares.auth.authenticate())
        .get(users.show)
        .put(users.edit)
        .delete(users.kill)
}