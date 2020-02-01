const { secret } = require('../../.env')
const jwt = require('jsonwebtoken')
// const bcrypt = require('bcrypt')
const passport = require('passport')
const passpJWT = require('passport-jwt')
const { Strategy, ExtractJwt } = passpJWT

module.exports = app => {

    const generateToken = (req, res) => {
        // if (!req.body.email || !req.body.password) 
        if (!req.body.email)   
            return res.status(400).send("Usuário ou senha faltando")
        

        app.db.collection('futureEmployers')
            .find({ email: req.body.email, deleted: null })
            .toArray((err, result) => {
                if (err) return console.log(err)

                // const pass = bcrypt(compareSync(req.body.password, user.password))

                // if (!pass) return res.status(401)
                try {
                    const now = Math.floor(Date.now() / 1000)

                    const user = result[0]

                    const payload = {
                        id: user._id,
                        name: user.name,
                        email: user.email,
                        iat: now,
                        exp: now + (60 * 60 * 24 *7)
                    }
                    return res.json({ token: jwt.sign(payload, secret) })

                } catch(e) {
                    return res.status(400).send('Usuário não cadastrado')  
                }

            })    
    }

    const getToken = async (req, res) => {
        const data = req.body || null 
        try {
            if (userData) {
                jwt.verify(data.token, secret)
                return res.send(true)
            } 
        } catch(e) {
            return res.send(false)
        }
    }

    const params = {
        secretOrKey: secret,
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
    }

    const strategy = new Strategy(params, (payload, done) => {
        app.db.collection('futureEmployers')
            .find({ _id: payload.id })
            .toArray((err, result) => {
                if (err) done(err, false)

                try {
                    const user = result[0]

                    done(null, user !== [] ? { ...payload } : false)
                } catch(e) {
                    done(e, false)
                }
            })
    })

    passport.use(strategy)

    return { 
        generateToken, 
        getToken, 
        authenticate: () => passport.authenticate('jwt', { session: false }) 
    }
}