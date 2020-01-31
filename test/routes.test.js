process.env.NODE_ENV = 'test'

const chai = require('chai')
const chaiHttp = require('chai-http')
const { server, app } = require('../src')

const should = require('chai').should

const store = {
    name: 'Initial example',
    field: 'Designer',
    email: 'example@mail.com',
    tel: '001122334455',
    curriculum: 'file://path',
    deleted: null
}

chai.use(chaiHttp)

describe('Initialize database', () => {
    it('Should initialize the database', done => {
        app.db.collection('futureEmployers')
            .deleteMany({})

        app.db.collection('futureEmployers')
            .insert(store, (err, result) => {
                if (err) console.log(err)
            })
        done()
    })
})

describe('/GET employers', () => {
    it('Should get the initialized database user', done => {
        chai.request(server)
            .get('/employers')
            .end((err, res) => {

                () => res.should.have.status(200);
                () => res.body.should.be.a('array');
                () => res.body.should.be.equal([store])
                
                done()
            })
    })

    it('Should close the server', done => {
        server.close();
        done()
    })
})
