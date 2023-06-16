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

app.post('/addApp_submit', async (req, res) => {
    var name = req.body.name;
    var cpu_AMD = req.body.cpu_AMD;
    var cpu_Intel = req.body.cpu_Intel;
    var gpu_AMD = req.body.gpu_AMD;
    var gpu_Nvidia = req.body.gpu_Nvidia;
    var ram = req.body.ram;
    var rom = req.body.rom;
    var url = req.body.url;
    console.log(req.body);

    try {
        await appFunction.createGame(name, cpu_AMD, cpu_Intel, ram, gpu_AMD, gpu_Nvidia, rom, url);
        res.json({ message: 'Game created successfully' });
    } catch (error) {
        console.error('Error in /addApp_submit:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

app.post('/searchLaptopXXX', (req, res) => {
    var appId = req.body.constraints['appId'];
    var Smin = req.body.constraints['screen'][0];
    var Smax = req.body.constraints['screen'][1];
    var Wmin = req.body.constraints['weight'][0];
    var Wmax = req.body.constraints['weight'][1];
    var Pmin = req.body.constraints['price'][0];
    var Pmax = req.body.constraints['price'][1];

    appFunction.searchLaptops(appId, Smin, Smax, Wmin, Wmax, Pmin, Pmax)
    .then(function(result) {res.json(result);});
})

app.post('/createLaptopXXX', (req, res) => {
    var model = req.body.model;
    var screen = req.body.screen;
    var cpu = req.body.cpu;
    var ram = req.body.ram;
    var rom = req.body.rom;
    var gpu = req.body.gpu;
    var interface = req.body.interface;
    var weight = req.body.weight;
    var price = req.body.price;
    console.log(req.body);


    appFunction.createLaptop(model, screen, cpu, ram, rom, gpu, interface, weight, price)
    .then(function() {res.json('createLaptop complete!!')});
})

app.post('/updateLaptopXXX', (req, res) => {
    var id = req.body.id;
    var price = req.body.price;

    appFunction.updateLaptop(id, price)
    .then(function() {res.json('updateLaptop complete!!')});
})

app.post('/deleteLaptopXXX', (req, res) => {
    var id = req.body.id;

    appFunction.deleteLaptop(id)
    .then(function() {res.json('deleteLaptop complete!!')});
})

app.post('/fetchImages', (req, res) => {
    var keyword = req.body.keyword;
    appFunction.getGameIds(keyword)
    .then(function(gameIds) {return appFunction.getGameCapsuleImages(gameIds)})
    .then(function(urlList) {return appFunction.fetchImagesFromUrls(urlList)})
    .then(function(images) {
        res.json({images: images});
    })
    .catch(function(error) {
        res.status(500).json({error: error.message});
    });
});

app.listen(3000, () => {
    console.log('伺服器已在聆聽第3000號port');
});