const app = require('express')()
const consign = require('consign')

consign({ cwd: 'src' })
    .then('middlewares')
    .then('routes')
    .into(app)

test('DB connection', () => {
    expect(app.middlewares.users.index)
        .toHaveBeenCalledWith(200)

})