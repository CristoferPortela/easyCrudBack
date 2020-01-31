process.env.NODE_ENV = 'test'

const chai = require('chai')
const chaiHttp = require('chai-http')
const server = require('../src')

const should = require('chai').should

chai.use(chaiHttp)

describe('/GET employers', () => {
    afterEach(done => {
        () => server.close();
        done()
    })
    it('Should get all the registered users', done => {
        chai.request(server)
            .get('/employers')
            .end((err, res) => {

                () => res.should.have.status(200);
                () => res.body.should.be.a('array');
                
                done()
            })
    })
})
