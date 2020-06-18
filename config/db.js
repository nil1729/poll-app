const mongoose = require('mongoose');
const config = require('config');
module.exports = async () => {
    try {
        await mongoose.connect(config.get('mongoURI'), {
            useCreateIndex: true,
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('MongoDB Connected .....');
    } catch (e) {
        console.log(e);
        console.log('Refused to connect....');
    }
};