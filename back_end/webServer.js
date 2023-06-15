const express = require('express');
const app = express();
const path = require('path');

var appFunction = require('./app.js');

// Middleware for parsing JSON payloads
app.use(express.json());

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, '../public')));

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://127.0.0.1:3000');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    next();
  });

app.post('/searchApp_searchDataFunction', (req, res) => {
    var keyword = req.body.keyword;

    appFunction.searchApplicationsByKeyword(keyword)
    .then(function(result) {res.json(result)});
});

app.post('/addApp_search', (req, res) => {
    var attrName = req.body.attrName; 
    var keyword = req.body.keyword; 

    appFunction.search(attrName, keyword)
    .then(function(result) {res.json(result);})
})

app.post('/addApp_submit', (req, res) => {
    var name = req.body.name;
    var cpu_AMD = req.body.cpu_AMD;
    var cpu_Intel = req.body.cpu_Intel;
    var gpu_AMD = req.body.gpu_AMD;
    var gpu_Nvidia = req.body.gpu_Nvidia;
    var ram = req.body.ram;
    var rom = req.body.rom;

    appFunction.createGame(name, cpu_AMD, cpu_Intel, ram, gpu_AMD, gpu_Nvidia, rom)
})


app.listen(3000, () => {
    console.log('伺服器已在聆聽第3000號port');
});