'use strict'
module.exports = app => {
    // app.get('/', (req, res) => res.send("oi"))

    const users = app.middlewares.users


    app.get('/employers', users.index)

    app.route('/employers/:id')
        .get(users.show)
        .put(users.edit)
        .delete(users.kill)

    app.post('/register', users.store)
}