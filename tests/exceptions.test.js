const { emailValidate, notNull }  = require('../src/middlewares/exceptions')('')

test('Email validator: Should throw error', () => {
    expect(emailValidate('cris@mail.com', 'Email inválido'))
        .toBeUndefined();
    
    expect(() => emailValidate('cris', 'Email inválido'))
        .toThrow('Email inválido')
});

test('Not null test', () => {
    expect(notNull('null', 'Campo não deve ser nulo'))
        .toBeUndefined();

    expect(() => notNull(null, 'Campo não deve ser nulo'))
        .toThrow('Campo não deve ser nulo');
});