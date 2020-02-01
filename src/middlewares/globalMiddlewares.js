'use strict'
const bp = require('body-parser')
const cors = require('cors')

/**
 *  Here we will hold the general middleware features
 *  they will be used in ALL the routes
 */

module.exports = app => {

    app.use(cors())
    app.use(bp.urlencoded({ extended: true }))
    app.use(bp.json())
}