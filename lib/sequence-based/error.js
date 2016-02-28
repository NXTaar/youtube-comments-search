const sequenceGenerator = require('./seqGenerator');
const dateFormat = require('dateformat');

sequenceGenerator.errors.subscribe(err => {
    console.log(err); //debug
    console.log('Error! See in logs');
    // Output.writeToJson(`error Type-${err.apiType} Code-${err.err.code} Client-${err.clientId} Date-${dateFormat('dd-mm-yyyy-HH-MM-ss-ms')}`, err);
})