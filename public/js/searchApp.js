var selectData = new Set(JSON.parse(localStorage.getItem("selectApp")));
var searchResults = document.getElementById('searchResults');
Init();

function Init() {

    searchDataFunction('');

    document.getElementById('searchButton').addEventListener('click', function () {
        var searchKeyword = document.getElementById('searchInput').value;
        searchDataFunction(searchKeyword);
        // var searchData = searchDataFunction(searchKeyword);
        // showTableWithDate(searchData);
    });

    document.getElementById('buttonAdd').addEventListener('click', function () {
        updateSelectSet();
        window.location.href = '../html/addApp.html';
    });

    document.getElementById('buttonNext').addEventListener('click', function () {
        updateSelectSet();
        window.location.href = '../html/hardwareStrict.html';
    });

    document.getElementById('buttonBack').addEventListener('click', function () {
        updateSelectSet();
        window.location.href = '../html/mainpage.html';
    });

}

// research or go to next page -> update selectData
function updateSelectSet() {
    var checkboxes = searchResults.querySelectorAll('input[type="checkbox"]');

    for (var i = 0; i < checkboxes.length; i++) {
        var checkbox = checkboxes[i];
        var row = checkbox.parentNode.parentNode;
        var selectIdx = row.querySelector('.gameId').textContent;
        console.log(selectIdx);
        if (checkbox.checked) {
            selectData.add(parseInt(selectIdx))
        } else {
            selectData.delete(parseInt(selectIdx))
        }
    }
    console.log("aasd");
    console.log(selectData);
    var setString = JSON.stringify(Array.from(selectData));
    localStorage.setItem('selectApp', setString);
}

// input: keyword, output applications
function searchDataFunction(keyword) {

    fetch('http://localhost:3000/searchApp_searchDataFunction', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ keyword: keyword }),
    })
    .then(response => response.json())
    .then(data => {
        console.log(data);

        // data.thumbnail is an array of base64 encoded strings
    
        
        var keys = Object.keys(data);
        var results = [];
        for(var i = 0; i < data[keys[0]].length; i++){
            var result = {};
            for(var j = 0; j < keys.length; j++){
                if(keys[j] == 'thumbnail'){
                    var binary = atob(data[keys[j]][i]);
                    var array = [];
                    for (var k = 0; k < binary.length; k++) {
                        array.push(binary.charCodeAt(k));
                    }
                    var blob = new Blob([new Uint8Array(array)], {type: 'image/jpeg'});
                    var objectURL = URL.createObjectURL(blob);
                    result[keys[j]] = objectURL;
                }else{
                    result[keys[j]] = data[keys[j]][i];
                }
            }
            results.push(result);
            console.log(i);
        }
        console.log(results);
        showTableWithDate(results);
    })
    .catch((error) => {
        console.error('Error:', error);
    });
}

function showTableWithDate(Data) {
    console.log(Data);
    updateSelectSet();
    searchResults.innerHTML = ''; // clear result

    if (Data.length == 0) {
        var noResults = document.createElement('p');
        noResults.textContent = '找不到相應的資料。';
        searchResults.appendChild(noResults);
        return;
    }

    var table = document.createElement('table');

    // append table header
    var tableHeader = document.createElement('tr');
    var headerKeys = Object.keys(Data[0]);
    headerKeys.unshift('select');

    for (var i = 0; i < headerKeys.length; i++) {
        var th = document.createElement('th');
        th.textContent = headerKeys[i];
        if(headerKeys[i] == 'gameId'){
            th.classList.add('hidden');
        }
        tableHeader.appendChild(th);
    }

    table.appendChild(tableHeader);

    // append table rows
    for (var i = 0; i < Data.length; i++) {
        var tableRow = document.createElement('tr');
        var rowData = Object.values(Data[i]);
        var checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        if (selectData.has(rowData[0])) {
            checkbox.checked = true;
        }

        var checkboxCell = document.createElement('td');
        checkboxCell.appendChild(checkbox);
        tableRow.appendChild(checkboxCell);

        for (var j = 0; j < rowData.length; j++) {
            var td = document.createElement('td');
            td.className = headerKeys[j + 1];
            if(headerKeys[j + 1] == 'thumbnail'){
                var img = document.createElement('img');
                img.src = rowData[j];
                td.appendChild(img);
            }else if(headerKeys[j + 1] == 'gameId'){
                td.classList.add('hidden');
                td.textContent = rowData[j];
            }else{
                td.textContent = rowData[j];
            }
            
            tableRow.appendChild(td);
        }

        table.appendChild(tableRow);
    }

    searchResults.appendChild(table);
}


