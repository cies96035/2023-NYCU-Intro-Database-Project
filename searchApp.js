// 獲取搜尋按鈕和搜尋結果的參考
var searchButton = document.getElementById('search-button');
var searchResults = document.getElementById('search-results');

// 綁定搜尋按鈕的點擊事件
searchButton.addEventListener('click', function() {
  // 獲取輸入框中的搜尋關鍵字
  var searchKeyword = document.getElementById('search-input').value;

  // 使用搜尋關鍵字進行資料搜尋
  var searchData = searchDataFunction(searchKeyword);

  // 清空搜尋結果
  searchResults.innerHTML = '';

  // 顯示搜尋結果
  if (searchData.length > 0) {
    var table = document.createElement('table');
    var tableHeader = document.createElement('tr');
    var headerKeys = Object.keys(searchData[0]);

    // 創建表頭
    for (var i = 0; i < headerKeys.length; i++) {
      var th = document.createElement('th');
      th.textContent = headerKeys[i];
      tableHeader.appendChild(th);
    }
    table.appendChild(tableHeader);

    // 填充資料
    for (var i = 0; i < searchData.length; i++) {
      var tableRow = document.createElement('tr');
      var rowData = Object.values(searchData[i]);

      for (var j = 0; j < rowData.length; j++) {
        var td = document.createElement('td');
        td.textContent = rowData[j];
        tableRow.appendChild(td);
      }

      table.appendChild(tableRow);
    }

    searchResults.appendChild(table);
  } else {
    var noResults = document.createElement('p');
    noResults.textContent = '找不到相應的資料。';
    searchResults.appendChild(noResults);
  }
});

// 模擬資料搜尋的函數，返回符合關鍵字的資料
function searchDataFunction(keyword) {
  // 在此可以使用你的資料搜尋邏輯，這裡只是一個示例
  var data = [
    { id: 1, name: '資料1', category: '類別1' },
    { id: 2, name: '資料2', category: '類別2' },
    { id: 3, name: '資料3', category: '類別1' },
    { id: 4, name: '資料4', category: '類別2' },
    { id: 5, name: '資料5', category: '類別1' }
  ];

  var results = [];

  for (var i = 0; i < data.length; i++) {
    if (data[i].name.includes(keyword) || data[i].category.includes(keyword)) {
      results.push(data[i]);
    }
  }

  return results;
}

// 在表格中的某個格子被點擊時觸發的處理函式
function handleCellClick(event) {
  // 取得被點擊的格子
  var selectedCell = event.target;

  // 添加/移除選取的樣式
  selectedCell.classList.toggle('selected');
}

// 獲取所有的格子元素
var cells = document.querySelectorAll('td');

// 逐個綁定事件監聽器
cells.forEach(function(cell) {
  cell.addEventListener('click', handleCellClick);
});
