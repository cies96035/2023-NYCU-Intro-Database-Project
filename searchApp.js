// todo : record the select items

var searchButton = document.getElementById('searchButton');
var searchResults = document.getElementById('searchResults');
var buttonAdd = document.getElementById('buttonAdd');
var buttonNext = document.getElementById('buttonNext');
var selectData = new Set();

showTableWithDate(searchDataFunction(''));
// research or go to next page -> update selectData
function updateSelectSet(){
    var table = document.getElementById('searchResults');
    var checkboxes = table.querySelectorAll('input[type="checkbox"]');
    
    var selectedRows = [];
    for (var i = 0; i < checkboxes.length; i++) {
        var checkbox = checkboxes[i];
        var row = checkbox.parentNode.parentNode;

        if (checkbox.checked) {
            selectedRows.push(row);
            selectData.add(row.querySelector('.name').textContent)
        }else{
            selectData.delete(row.querySelector('.name').textContent)
        }
    }
}
function showTableWithDate(Data){
    updateSelectSet();
    searchResults.innerHTML = ''; // clear result
    
    if (Data.length >= 0) {
        var table = document.createElement('table');

        
        // append table header
        var tableHeader = document.createElement('tr');
        var headerKeys = Object.keys(Data[0]);
        headerKeys.unshift('select');

        for (var i = 0; i < headerKeys.length; i++) {
            var th = document.createElement('th');
            th.textContent = headerKeys[i];
            tableHeader.appendChild(th);
        }

        table.appendChild(tableHeader);
    
        // append table rows
        for (var i = 0; i < Data.length; i++) {
            var tableRow = document.createElement('tr');
            var rowData = Object.values(Data[i]);
            var checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            if(selectData.has(rowData[0])){
                checkbox.checked = true;
            }
    
            var checkboxCell = document.createElement('td');
            checkboxCell.appendChild(checkbox);
            tableRow.appendChild(checkboxCell);
    
            for (var j = 0; j < rowData.length; j++) {
                var td = document.createElement('td');
                td.textContent = rowData[j];
                td.className = headerKeys[j + 1];
                tableRow.appendChild(td);
            }
    
            table.appendChild(tableRow);
        }
    
        searchResults.appendChild(table);
    } else {
        // no use
        var noResults = document.createElement('p');
        noResults.textContent = '找不到相應的資料。';
        searchResults.appendChild(noResults);
    }
}

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
        { name: '資料22', thumbnail: '類別2' }
    ];

    var results = [];

    for (var i = 0; i < data.length; i++) {
        if (data[i].name.includes(keyword) || data[i].thumbnail.includes(keyword)) {
            results.push(data[i]);
        }
    }

    return results;
}
searchButton.addEventListener('click', function() {
    var searchKeyword = document.getElementById('searchInput').value;
    var searchData = searchDataFunction(searchKeyword);
    
    
    // create table ->
    showTableWithDate(searchData);
});


// TODO: add application
buttonAdd.addEventListener('click', function() {
    // window.location.href = 'hardwareStrict.html?selectData=' + encodeURIComponent(data);
});

buttonNext.addEventListener('click', function() {
    // TODO: store the data between pages
    updateSelectSet()
    window.location.href = 'hardwareStrict.html?selectData=' + encodeURIComponent(selectData);
});


