const mongoose = require('mongoose');
const config = require('config');

mongoose.Promise = global.Promise;

mongoose.connect(config.get('database'), () => { console.log('connected to DB!') });

mongoose.connection.on('error', console.error.bind(console, 'connection error:'));

module.exports = mongoose;