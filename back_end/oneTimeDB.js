const sqlite3 = require('sqlite3').verbose();
let sql;

// connect to DB
const db = new sqlite3.Database('./project.db',sqlite3.OPEN_READWRITE, (err) => {
    if (err) return console.error(err.message);
})

// Create tables
// sql = 'CREATE TABLE laptop(id INTEGER PRIMARY KEY, model, screen, cpu, ram, rom, gpu, interface, weight, price INTEGER)';
// db.run(sql);
// sql = 'CREATE TABLE cpu(id INTEGER PRIMARY KEY, name, clock REAL, core INTEGER, thread INTEGER, turbo REAL, cache, brand, performance REAL, website)';
// db.run(sql);
// sql = 'CREATE TABLE gpu(id INTEGER PRIMARY KEY, name, performance REAL, brand, website)';
// db.run(sql);
// sql = 'CREATE TABLE game(id INTEGER PRIMARY KEY, name, os, cpu_AMD, cpu_Intel, ram, gpu_AMD, gpu_Nvidia, rom)';
// db.run(sql);


// *****************************************
// importing ./laptop.xlsx into laptop table
// *****************************************
// const XLSX = require('xlsx');
// const knex = require('knex')({
//     client: 'sqlite3',
//     connection: {
//         filename: "./project.db"
//     },
//     useNullAsDefault: true
// });

// // Read the Excel file
// const workbook = XLSX.readFile('./laptop.xlsx');

// // Get the first worksheet
// const sheetName = workbook.SheetNames[0];
// const worksheet = workbook.Sheets[sheetName];

// // Convert the worksheet to JSON
// const rows = XLSX.utils.sheet_to_json(worksheet);

// // Insert the rows into the database
// knex('laptop').insert(rows).then(() => {
//     console.log('Data imported successfully');
// }).catch((error) => {
//     console.error('Error:', error);
// }).finally(() => {
//     knex.destroy();
// });

// *****************************************
// importing ./cpu.xlsx into cpu table
// *****************************************
// const XLSX = require('xlsx');
// const knex = require('knex')({
//     client: 'sqlite3',
//     connection: {
//         filename: "./project.db"
//     },
//     useNullAsDefault: true
// });

// // Read the Excel file
// const workbook = XLSX.readFile('./cpu.xlsx');

// // Get the first worksheet
// const sheetName = workbook.SheetNames[0];
// const worksheet = workbook.Sheets[sheetName];

// // Convert the worksheet to JSON
// const rows = XLSX.utils.sheet_to_json(worksheet);

// // Insert the rows into the database
// knex('cpu').insert(rows).then(() => {
//     console.log('Data imported successfully');
// }).catch((error) => {
//     console.error('Error:', error);
// }).finally(() => {
//     knex.destroy();
// });

// *****************************************
// importing ./gpu.xlsx into gpu table
// *****************************************
// const XLSX = require('xlsx');
// const knex = require('knex')({
//     client: 'sqlite3',
//     connection: {
//         filename: "./project.db"
//     },
//     useNullAsDefault: true
// });

// // Read the Excel file
// const workbook = XLSX.readFile('./gpu.xlsx');

// // Get the first worksheet
// const sheetName = workbook.SheetNames[0];
// const worksheet = workbook.Sheets[sheetName];

// // Convert the worksheet to JSON
// const rows = XLSX.utils.sheet_to_json(worksheet);

// // Insert the rows into the database
// knex('gpu').insert(rows).then(() => {
//     console.log('Data imported successfully');
// }).catch((error) => {
//     console.error('Error:', error);
// }).finally(() => {
//     knex.destroy();
// });


// *****************************************
// importing ./game.xlsx into game table
// *****************************************
// const XLSX = require('xlsx');
// const knex = require('knex')({
//     client: 'sqlite3',
//     connection: {
//         filename: "./project.db"
//     },
//     useNullAsDefault: true
// });

// // Read the Excel file
// const workbook = XLSX.readFile('./game.xlsx');

// // Get the first worksheet
// const sheetName = workbook.SheetNames[0];
// const worksheet = workbook.Sheets[sheetName];

// // Convert the worksheet to JSON
// const rows = XLSX.utils.sheet_to_json(worksheet);

// // Insert the rows into the database
// knex('game').insert(rows).then(() => {
//     console.log('Data imported successfully');
// }).catch((error) => {
//     console.error('Error:', error);
// }).finally(() => {
//     knex.destroy();
// });



// **************************
// Insert data into table cpu
// **************************
// sql = 'INSERT INTO cpu(id, name, brand, performance) VALUES (?, ?, ?, ?)';
// db.run(
//     sql,
//     [-1,"none", "AMD", 100000],
//     (err) => {
//         if (err) return console.error(err.message);
//     }
// );


// **************************
// Insert data into table gpu
// **************************
// sql = 'INSERT INTO gpu(id, name, performance, brand) VALUES (?, ?, ?, ?)';
// db.run(
//     sql,
//     [-1, "none", 100000, "AMD"],
//     (err) => {
//         if (err) return console.error(err.message);
//     }
// );



// **************
// testing query
// **************
// sql = "SELECT * FROM cpu"

// db.all(sql, (err, rows) => {
//     console.log(rows);
// })