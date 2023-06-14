// todo : record the select items

var searchButton = document.getElementById('searchButton');
var searchResults = document.getElementById('searchResults');
var buttonAdd = document.getElementById('buttonAdd');
var buttonNext = document.getElementById('buttonNext');
var selectData = new Set();

showTableWithDate(searchDataFunction(''));

// research or go to next page -> update selectData
function updateSelectSet(){
    var checkboxes = searchResults.querySelectorAll('input[type="checkbox"]');
    
    for (var i = 0; i < checkboxes.length; i++) {
        var checkbox = checkboxes[i];
        var row = checkbox.parentNode.parentNode;

        var selectIdx = row.querySelector('.gameId').textContent
        if (checkbox.checked) {
            selectData.add(parseInt(selectIdx))
        }else{
            selectData.delete(parseInt(selectIdx))
        }
    }
}


function showTableWithDate(Data){
    updateSelectSet();
    searchResults.innerHTML = ''; // clear result
    
    if (Data.length > 0) {
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
        { gameId: 1, name: 'g1', thumbnail: 'a' },
        { gameId: 2, name: 'g2', thumbnail: 'b' },
        { gameId: 3, name: 'g3', thumbnail: 'c' },
        { gameId: 4, name: 'g4', thumbnail: 'd' },
        { gameId: 5, name: 'g5', thumbnail: 'e' }
    ];

    var results = [];

    for (var i = 0; i < data.length; i++) {
        if (data[i].name.includes(keyword)) {
            results.push(data[i]);
        }
    }
    return results;
}

searchButton.addEventListener('click', function() {
    var searchKeyword = document.getElementById('searchInput').value;
    var searchData = searchDataFunction(searchKeyword);
    
    showTableWithDate(searchData);
});


// TODO: add application
buttonAdd.addEventListener('click', function() {
});

buttonNext.addEventListener('click', function() {
    // console.log(selectData);
    // TODO: store the data between pages
    updateSelectSet()
    // console.log(Array.from(selectData))
    var setString = JSON.stringify(Array.from(selectData));
    // var setString = Array.from(selectData);
    localStorage.setItem('selectApp', setString);
    
    window.location.href = '../html/hardwareStrict.html'
});


