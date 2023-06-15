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

app.listen(3000, () => {
    console.log('伺服器已在聆聽第3000號port');
});