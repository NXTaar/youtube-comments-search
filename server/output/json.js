const jsonfile = require('jsonfile');
const destinationPath = require('config').get('app.jsonOutput')
const path = require('path')

const writeToJSON = ({filename, target}) => {
    let destination = path.resolve(process.cwd(), destinationPath, `${filename}.json`)
    return new Promise((res, rej) => {
        jsonfile.writeFile(destination, target, {spaces: 2}, function (err, data) {
            if (err) rej(err);
            if(data == null) res(console.log(`${filename}.json written`));
        })
    }).catch(err => console.log(err));
}

module.exports = writeToJSON