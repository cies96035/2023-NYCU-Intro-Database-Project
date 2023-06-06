var express = require('express');
var app = express();
const file = './epd.db';

//載入 sqlite3
var sqlite3 = require('sqlite3').verbose();
//新增一個sqlite3的資料庫test.db
var db = new sqlite3.Database(file);

db.serialize(function () {
let today = new Date();
  
  //新增資料
  var sqlInsert = 'INSERT INTO User(name_c,createTime,other) VALUES (?,?,?)';
  db.run(sqlInsert, ['Terry', today.toLocaleDateString() + ' ' + today.toTimeString(),'fordemo']);
  console.log('insert success');

  //查詢資料
  var sqlSELEC = 'SELECT rowid AS No,name_c,createTime FROM User';
  db.each(sqlSELEC, function (err, row) {
    console.log('No' + row.No + ':' + row.name_c + ':' + row.createTime);
  });

  //更新資料
  var sqlUPDATE = 'update User set name_c = ? where name_c = ?';
  db.run(sqlUPDATE, ['John', 'Terry']);
  console.log('update');

  //查詢更新後的資料
  var sqlUpdateSearch =
    'SELECT rowid AS No, name_c ,createTime FROM User where name_c =?';
  db.each(sqlUpdateSearch, 'LuLu', function (err, row) {
    console.log(row.id + ': ' + row.name);
  });

  //刪除資料
  var sqlDel = 'delete from User where name_c=?';
  db.run(sqlDel, ['Jhon']);
});

db.close();  //資料庫關閉

//開啟一個web server

app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.listen(3000, function () {
  console.log('mySqlLite listening on port 3000!');
});
