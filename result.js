var searchButton = document.getElementById('search-button');
var searchResults = document.getElementById('search-results');

searchButton.addEventListener('click', function() {
  var searchKeyword = document.getElementById('search-input').value;

  var searchData = searchDataFunction(searchKeyword);

  searchResults.innerHTML = '';

  if (searchData.length > 0) {
    for (var i = 0; i < searchData.length; i++) {
      var resultItem = document.createElement('p');
      resultItem.textContent = searchData[i];
      searchResults.appendChild(resultItem);
    }
  } else {
    var noResults = document.createElement('p');
    noResults.textContent = '找不到相應的資料。';
    searchResults.appendChild(noResults);
  }
});

function searchDataFunction(keyword) {
    // 在此可以使用你的資料搜尋邏輯，這裡只是一個示例
    var data = [
      '資料1',
      '資料2',
      '資料3',
      '資料4',
      '資料5'
    ];
  
    var results = [];
  
    for (var i = 0; i < data.length; i++) {
      if (data[i].includes(keyword)) {
        results.push(data[i]);
      }
    }
  
    return results;
  }