'use strict'
// the express app function
const app = require('express')()
// used for make easier to separete the application in modules
const consign = require('consign')

// the autoload with consign
consign({ cwd: 'src' })
    .include('db.js')
    .then('middlewares/auth.js')
    .then('middlewares')
    .then('routes')
    .into(app)


const port = 2020

const server = app.listen(port, () => console.log(`Server running on ${port}`))

module.exports = { server, app}