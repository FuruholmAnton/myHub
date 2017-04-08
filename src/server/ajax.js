let jsonfile = require('jsonfile');


export function getData(url) {
    jsonfile.readFile(url, function(err, obj) {
        console.dir(obj);
    });
}

export function updateData() {
    let file = '/tmp/data.json';
    let obj = { name: 'JP' };

    jsonfile.writeFile(file, obj, function(err) {
        console.error(err);
    });
}
