const express = require('express');
const app = express();

const path = require('path');

const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database(path.join(__dirname, 'database/test.db'));

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));

app.get('/insert', )

// app.get('/stringArray2', (req, res) => {
//     res.json('b');
// })

app.listen(3000, () => {
    console.log('伺服器已在聆聽第3000號port');
});


db.close();
