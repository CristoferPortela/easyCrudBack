'use strict'
module.exports = app => {
    // app.get('/', (req, res) => res.send("oi"))

    const users = app.middlewares.users
    const auth = app.middlewares.auth

    app.get('/employers', users.index)
    app.post('/register', users.store)
    app.post('/login', auth.generateToken)

    app.route('/employers/:id')
        .all(auth.authenticate())
        .get(users.show)
        .put(users.edit)
        .delete(users.kill)
}