const mongoose = require('mongoose');
const config = require('config');

const db = config.get('dbUrl');

module.exports = async () => {

    try {
        const connection = await mongoose.connect(db, {
            useNewUrlParser: true,
            useCreateIndex: true,
            useFindAndModify: false,
            useUnifiedTopology: true
        });

        if (connection) {
            console.log('DB Connected Succfully !')
        }

    } catch (error) {
        console.error('Error:', 'Not able to connect the dataBase')
    }
}