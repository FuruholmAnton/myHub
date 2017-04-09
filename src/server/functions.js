import jsonfile from 'jsonfile';


export function getData(url) {
    return new Promise(function(resolve, reject) {
        jsonfile.readFile(url, function(err, obj) {
            console.log('getData');

            console.dir(err);
            console.dir(obj);
            resolve(obj);
            return obj;
        });
    });
}

export function updateData() {
    return new Promise(function(resolve, reject) {
        let file = '/tmp/data.json';
        let obj = { name: 'JP' };

        jsonfile.writeFile(file, obj, function(err) {
            console.error(err);
            resolve(obj);
        });
    });
}
