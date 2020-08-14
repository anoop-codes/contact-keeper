module.exports = (app) => {
    app.use('/api/users', require('../routers/users'));
    app.use('/api/auth', require('../routers/auth'));
    app.use('/api/contacts', require('../routers/contacts'));
}