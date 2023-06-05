// todo : record the select items


var searchButton = document.getElementById('search-button');
var searchResults = document.getElementById('search-results');
var buttonAdd = document.getElementById('buttonAdd');
var buttonNext = document.getElementById('buttonNext');

searchButton.addEventListener('click', function() {
    var searchKeyword = document.getElementById('search-input').value;
    var searchData = searchDataFunction(searchKeyword);

    searchResults.innerHTML = '';

    // create table ->
    if (searchData.length > 0) {
        var table = document.createElement('table');
        var tableHeader = document.createElement('tr');
        var headerKeys = Object.keys(searchData[0]);
        headerKeys.unshift('select');

    // table header
    for (var i = 0; i < headerKeys.length; i++) {
      var th = document.createElement('th');
      th.textContent = headerKeys[i];
      tableHeader.appendChild(th);
    }
    table.appendChild(tableHeader);

    // table rows
    for (var i = 0; i < searchData.length; i++) {
        var tableRow = document.createElement('tr');
        var rowData = Object.values(searchData[i]);

        var checkbox = document.createElement('input');
        checkbox.type = 'checkbox';

        var checkboxCell = document.createElement('td');
        checkboxCell.appendChild(checkbox);
        tableRow.appendChild(checkboxCell);

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


// input: keyword, output applications
function searchDataFunction(keyword) {

    // TODO: replace with sqlite
    var data = [
        { name: '資料1', thumbnail: '類別1' },
        { name: '資料2', thumbnail: '類別2' },
        { name: '資料3', thumbnail: '類別1' },
        { name: '資料4', thumbnail: '類別2' },
        { name: '資料5', thumbnail: '類別1' },
        { name: '資料11', thumbnail: '類別1' },
        { name: '資料12', thumbnail: '類別1' },
        { name: '資料13', thumbnail: '類別1' },
        { name: '資料14', thumbnail: '類別1' },
        { name: '資料21', thumbnail: '類別2' },
        { name: '資料22', thumbnail: '類別2' },
        { name: '資料23', thumbnail: '類別2' },
        { name: '資料24', thumbnail: '類別2' },
        { name: '資料31', thumbnail: '類別1' },
        { name: '資料32', thumbnail: '類別1' },
        { name: '資料33', thumbnail: '類別1' },
        { name: '資料34', thumbnail: '類別1' },
        { name: '資料41', thumbnail: '類別2' },
        { name: '資料42', thumbnail: '類別2' },
        { name: '資料43', thumbnail: '類別2' },
        { name: '資料44', thumbnail: '類別2' },
        { name: '資料51', thumbnail: '類別1' },
        { name: '資料52', thumbnail: '類別1' },
        { name: '資料53', thumbnail: '類別1' },
        { name: '資料54', thumbnail: '類別1' }
    ];

    var results = [];

    for (var i = 0; i < data.length; i++) {
        if (data[i].name.includes(keyword) || data[i].thumbnail.includes(keyword)) {
            results.push(data[i]);
        }
    }

  return results;
}


// TODO: add application
buttonNext.addEventListener('click', function() {

    window.location.href = 'hardwareStrict.html'
});

buttonNext.addEventListener('click', function() {

    // TODO: store the data between pages
    window.location.href = 'hardwareStrict.html'
});