const fs = require('fs');

function read() {
    return JSON.parse(fs.readFileSync('./db.json', 'utf-8'));
}

class table {
    constructor(name, schematic) {
        let cdb = read();
        cdb.tables[name] = {}
        cdb.tables[name].schematic = schematic;
        cdb.tables[name].data = [];
        this.name = name;
        this.schematic = schematic;
        fs.writeFileSync('./db.json', JSON.stringify(cdb));
    }

    insert(data) {
        let cdb = read();
        cdb.tables[this.name].data.push(data);
        fs.writeFileSync('./db.json', JSON.stringify(cdb));
    }
    
    select(query) {
        let cdb = read();
        let data = cdb.tables[this.name].data;
        let result = [];
        // ex select({name: 'John'})
        for (let i = 0; i < data.length; i++) {
            let match = true;
            for (let key in query) {
                if (data[i][key] !== query[key]) {
                    match = false;
                }
            }
            if (match) {
                result.push(data[i]);
            }
        }
        return result;
    }
}

class schematic {
    constructor(name, type) {
        let cdb = read();
        cdb.schematics[name] = type;
    }
}

function sort(arr,query){
    // sort([{a:1},{a:2}], {a:1}) == [{a:1,b:2}]
    // sort([{a:1},{a:2}], {a:-1}) == [{a:2},{a:1}]

    let result = [];
    let keys = Object.keys(query);
    let values = Object.values(query);
    let sorted = arr.sort((a,b) => {
        if (values[0] === 1) {
            return a[keys[0]] - b[keys[0]];
        } else {
            return b[keys[0]] - a[keys[0]];
        }
    });
    return sorted;
}

module.exports = {
    table: table,
    schematic: schematic,
    sort: sort
};

// let user = new table('user', {});
// user.insert({name: 'John', age: 20, rank:3});
// user.insert({name: 'Jane', age: 21, rank:2});
// user.insert({name: 'Jack', age: 21, rank:1});
// console.log(user.select({age: 21}));
// console.log(sort(user.select({age: 21}), {cheese: 1}));