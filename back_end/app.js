const sqlite3 = require('sqlite3').verbose();
let sql;

// connect to DB
const db = new sqlite3.Database('./project.db',sqlite3.OPEN_READWRITE, (err) => {
    if (err) return console.error(err.message);
})

// input appKeyword is a string
// function return a object contains 2 array
// one is game.id, the other is game.name
function searchApplicationsByKeyword(appKeyword) {
    return new Promise((resolve, reject) => {
        sql = `SELECT * FROM game WHERE game.name LIKE '%${appKeyword}%';`;

        db.all(sql, (err, rows) => {
            const result1 = rows.map(row => row.id);
            const result2 = rows.map(row => row.name);
            resolve({appId: result1, appName: result2});
        });
    });
}

// return all an integer array that contains all laptops' ids
function returnAllLaptopsId(){
    return new Promise((resolve, reject) => {
        sql = `SELECT * FROM laptop;`;

        db.all(sql, (err, rows) => {
            const result = rows.map(row => row.id);
            resolve(result);
        });
    });
}

// create a new table containning appId
// input appId is an integer array
function createTableOfAppId(){
    return new Promise((resolve, reject) => {
        sql = 'CREATE TABLE appId(id INTEGER PRIMARY KEY);';
        db.run(sql, (err) => {
            resolve();
        });
    });
}

function fillInAppIdTable(appId) {
    return new Promise((resolve, reject) => {
        for(var i = 0; i < appId.length; i++){
            sql = 'INSERT INTO appId(id) VALUES (?)';
            db.run(
                sql,
                [appId[i]],
                (err) => {
                    if (err) return console.error(err.message);
                }
            );
        }
        resolve();
    });
}

function returnAllAppId(){
    return new Promise((resolve, reject) => {
        sql = `SELECT * FROM appId;`;

        db.all(sql, (err, rows) => {
            const result = rows.map(row => row.id);
            resolve(result);
        });
    });
}

function removeTableOfAppId(){
    return new Promise((resolve, reject) => {
        sql = 'DROP TABLE appId;';
        db.run(sql, (err) => {
            resolve();
        });
    });
}

// lower requirement
function searchLaptopsByAppId(){
    return new Promise((resolve, reject) => {
        sql =   `WITH lowest_cpu_performance AS (
                    SELECT cpu.performance AS performance
                    FROM appId
                    JOIN game ON appId.id = game.id
                    JOIN cpu ON (game.cpu_AMD = cpu.name OR game.cpu_Intel = cpu.name)
                    ORDER BY cpu.performance ASC
                    LIMIT 1
                ),
                lowest_gpu_performance AS (
                    SELECT gpu.performance AS performance
                    FROM appId
                    JOIN game ON appId.id = game.id
                    JOIN gpu ON (game.gpu_AMD = gpu.name OR game.gpu_Nvidia = gpu.name)
                    ORDER BY gpu.performance ASC
                    LIMIT 1
                ),
                available_cpus AS (
                    SELECT cpu.name AS name
                    FROM cpu
                    WHERE cpu.performance >= (SELECT performance FROM lowest_cpu_performance)
                ),
                available_gpus AS (
                    SELECT gpu.name AS name
                    FROM gpu
                    WHERE gpu.performance >= (SELECT performance FROM lowest_gpu_performance)
                )
                SELECT *
                FROM laptop
                JOIN available_cpus ON laptop.cpu LIKE '%' || available_cpus.name || '%'
                JOIN available_gpus ON laptop.gpu LIKE '%' || available_gpus.name || '%';`;
            
        db.all(sql, (err, rows) => {
            const result = rows.map(row => row.model);
            resolve(result);
        })
    })
}

function searchLaptopsByScreenConstraint(min, max){
    return new Promise((resolve, reject) => {
        sql =   `SELECT *
                FROM laptop
                WHERE CAST(SUBSTR(screen, 1, INSTR(screen, '\"') - 1) AS REAL) BETWEEN ? AND ?;
                `;
        db.all(sql, [min, max], (err, rows) => {
            const result1 = rows.map(row => row.model);
            const result2 = rows.map(row => row.screen);
            resolve({model: result1, screen: result2});
        });
    });
}

function searchLaptopsByWeightConstraint(min, max){
    return new Promise((resolve, reject) => {
        sql =   `SELECT *
                FROM laptop
                WHERE CAST(SUBSTR(weight, 1, INSTR(weight, 'Kg') - 1) AS REAL) BETWEEN ? AND ?;
                `;
        db.all(sql, [min, max], (err, rows) => {
            const result1 = rows.map(row => row.model);
            const result2 = rows.map(row => row.weight);
            resolve({model: result1, weight: result2});
        });
    });
}

function searchLaptopsByPriceConstraint(min, max){
    return new Promise((resolve, reject) => {
        sql =   `SELECT *
                FROM laptop
                WHERE laptop.price BETWEEN ? AND ?
                ORDER BY laptop.price ASC;
                `;
        db.all(sql, [min, max], (err, rows) => {
            const result1 = rows.map(row => row.model);
            const result2 = rows.map(row => row.price);
            resolve({model: result1, price: result2});
        });
    });
}

// data contains all the rows that laptop has
function createLaptop(data){
    return new Promise((resolve, reject) => {
        sql = 'INSERT INTO laptop(model, screen, cpu, ram, rom, gpu, interface, weight, price) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)';
        db.run(
            sql,
            data,
            (err) => {
                resolve();
            }
        );
    });
}

// data contains 1. the target model name and 2. the new price
function updateLaptop(data){
    return new Promise((resolve, reject) => {
        sql = 'UPDATE laptop SET price = ? WHERE model = ?';
        db.run(
            sql,
            [data[1], data[0]],
            (err) => {
                resolve();
            }
        );
    });
}

// data is the target model name
function deleteLaptop(data){
    return new Promise((resolve, reject) => {
        sql = 'DELETE FROM laptop WHERE model = ?';
        db.run(
            sql,
            data,
            (err) => {
                resolve();
            }
        );
    });
}

// createTableOfAppId()
// .then(function() { return fillInAppIdTable([2]);})
// .then(function() { return returnAllAppId();})
// .then(function(result) { console.log(result); return searchLaptopsByAppId();})
// .then(function(result) { console.log(result); return removeTableOfAppId();})
// .then(function() { console.log('removed successfully!!'); })


// searchLaptopsByScreenConstraint(1, 100)
// .then(function(result) {console.log(result.screen);});

/******* 記得把database的Kg, kg, 克，一致改成Kg */
// searchLaptopsByWeightConstraint(0, 0.999)
// .then(function(result) { console.log(result.weight);});

// searchLaptopsByPriceConstraint(160000, 300000)
// .then(function(result) { console.log(result.price);});

// let laptopData = ["model1", "20\\\" efaewfew", "Intel i7-1260P 123", "fewafwe", "afwfw", "Intel Iris Xe Graphics", "fawefaw", "100Kg efwafe", 10];
// createLaptop(laptopData)
// .then(function() {console.log('create successfully!');});

// let laptopData = ["model1", 140];
// updateLaptop(laptopData)
// .then(function() {console.log('update successfully!');});

// let laptopData = "model1";
// deleteLaptop(laptopData)
// .then(function() {console.log('delete successfully!');});


module.exports = {
    searchApplicationsByKeyword
}

