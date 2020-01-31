process.env.NODE_ENV = 'test'

const expect = require('chai').expect
// const should = require('chai').should()
const { emailValidate, notNull }  = require('../src/middlewares/exceptions')('')

describe('Exceptions validate', () => {

        it('should not throw Email inválido', () => {
            expect(emailValidate('cris@mail.com', 'Email inválido'))
                .to.equal(true)
        })
        
        it('should throw email inválido', () => {
            expect(() => emailValidate('cris', 'Email inválido'))
                .to.throw('Email inválido')
        })
    
        it('should not throw campo não deve ser nulo', () => {
            expect(notNull('null', 'Campo não deve ser nulo'))
                .to.equal(true)
        })  
    
        it('should throw campo não deve ser nulo', () => {
            expect(() => notNull(null, 'Campo não deve ser nulo'))
                .to.throw('Campo não deve ser nulo')
        })
          
})
