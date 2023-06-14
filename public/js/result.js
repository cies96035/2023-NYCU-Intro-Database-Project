var searchResults = document.getElementById('searchResults');

showTableWithDate
function showTableWithDate(){
    Data = getLaptopData();
    updateSelectSet();
    searchResults.innerHTML = ''; // clear result
    
    if (Data.length > 0) {
        var table = document.createElement('table');
        
        // append table header
        var tableHeader = document.createElement('tr');
        var headerKeys = Object.keys(Data[0]);

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

function getLaptopData(){
    var inf = 1e7;
    var storedDatasName = ["selectApp", "screenSize", "price", "weight"];
    var storedDatas = {};
    for(var i = 0; i < storedDatasName.length; i++){
        storedDatas[storedDatasName[i]] = localStorage.getItem(storedDatasName[i]);
        if(storedDatas[storedDatasName[i]] === null){
            if(i == 0){
                storedDatas[storedDatasName[i]] = [];
            }else{
                storedDatas[storedDatasName[i]] = [-1e7, 1e7];
            }
        }
        console.log(storedDatas[storedDatasName[i]]);
    }

    // TODO: get some data
    var data = [
        {id: 1, name: "A", price: 1},
        {id: 2, name: "A", price: 1},
        {id: 3, name: "A", price: 1},
        {id: 4, name: "A", price: 1},
        {id: 5, name: "A", price: 1},
    ];

    return data
}