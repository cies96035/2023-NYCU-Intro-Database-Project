
// 建立資料庫連線
const db = new sqlite3.Database(':memory:'); // 使用記憶體資料庫，也可以指定檔案路徑來使用實體檔案

// 建立資料表
db.serialize(() => {
  db.run('CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY, name TEXT)');
  db.run("INSERT INTO users (name) VALUES ('John Doe')");
  db.run("INSERT INTO users (name) VALUES ('Jane Smith')");
  
  // 查詢資料
  db.each('SELECT * FROM users', (err, row) => {
    if (err) {
      console.error(err);
    } else {
      console.log(row.id, row.name);
    }
  });
});

// 關閉資料庫連線
db.close();
