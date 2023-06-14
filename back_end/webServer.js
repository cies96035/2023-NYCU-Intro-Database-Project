const express = require('express');
const app = express();
const path = require('path');

var stringArray = ['banana', 'a', 'b', 'c'];

// Middleware for parsing JSON payloads
app.use(express.json());

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));

app.get('/stringArray', (req, res) => {
    res.json(stringArray);
});

// New route for handling POST requests
app.post('/processArray', (req, res) => {
    var clientArray = req.body.array;
    console.log("Received array: ", clientArray);

    // Perform some function on the array
    clientArray.push('newItem');

    res.json(clientArray);
});

app.listen(3000, () => {
    console.log('伺服器已在聆聽第3000號port');
});