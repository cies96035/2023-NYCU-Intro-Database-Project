var searchResults = document.getElementById('searchResults');

function modifyButton(PriceTd) {
    var tmp = PriceTd.textContent;
    PriceTd.textContent = '';
    var input = document.createElement('input');
    PriceTd.appendChild(input);
    input.value = tmp;
}
function saveModifyButton(PriceTd) {
    var input = PriceTd.querySelector('input');
    var tmp = input.value;
    PriceTd.textContent = tmp;

    // todo 
}

function removeLaptop(row){
    var id = row.querySelector('.id')
    console.log(id.textContent);

    // todo: input Laptop id, remove it
    
    row.remove();
}
showTableWithData();
function showTableWithData() {
    Data = getLaptopData();
    searchResults.innerHTML = ''; // clear result

    if (Data.length > 0) {
        var table = document.createElement('table');

        // append table header
        var tableHeader = document.createElement('tr');
        var headerKeys = Object.keys(Data[0]);
        var buttonName = ['modify', 'remove'];
        var buttonText = ['修改價格', '移除筆電'];

        for (var i = 0; i < headerKeys.length; i++) {
            var th = document.createElement('th');
            th.textContent = headerKeys[i];
            tableHeader.appendChild(th);
        }
        // for (var j = 0; j<)
        var th = document.createElement('th');
        th.textContent = 'modify';
        tableHeader.appendChild(th);
        table.appendChild(tableHeader);
        var th = document.createElement('th');
        th.textContent = 'remove';
        tableHeader.appendChild(th);
        table.appendChild(tableHeader);

        // append table rows
        var buttonList = [];
        var removeButtonList = [];
        var PriceTdList = [];
        var tableRowList = [];
        for (var i = 0; i < Data.length; i++) {
            var tableRow = document.createElement('tr');
            var rowData = Object.values(Data[i]);
            for (var j = 0; j < rowData.length; j++) {
                var td = document.createElement('td');
                td.textContent = rowData[j];
                td.className = headerKeys[j];
                tableRow.appendChild(td);
            }

            for (var j = 0; j < 2; j++){
                
            }
            var button;
            var td = document.createElement('td');
            td.className = 'modify';
            button = document.createElement('button');
            button.className = 'modifyButton';
            button.textContent = '修改價格';
            td.appendChild(button);
            tableRow.appendChild(td);
            
            
            var td = document.createElement('td');
            td.className = 'remove';
            button = document.createElement('button');
            button.className = 'removeButton';
            button.textContent = '移除筆電';
            td.appendChild(button);
            tableRow.appendChild(td);

            tableRowList.push(tableRow);
            (function (index) {
                var modifiedButton = tableRowList[index].querySelector('.modifyButton');
                var PriceTd = tableRowList[index].querySelector('.price');
                modifiedButton.addEventListener('click', function () {
                    if (modifiedButton.textContent == '修改價格') {
                        modifiedButton.textContent = '確認';
                        modifyButton(PriceTd);
                    } else {
                        modifiedButton.textContent = '修改價格';
                        saveModifyButton(PriceTd);
                    }
                });

                var removeButton = tableRowList[index].querySelector('.removeButton');
                removeButton.addEventListener('click', function () {
                    if (removeButton.textContent == '移除筆電') {
                        removeButton.textContent = '確認?';
                    } else {
                        removeLaptop(tableRowList[index]);
                    }
                })

            })(i);

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

function getLaptopData() {
    var inf = 1e7;
    var storedDatasName = ["selectApp", "screenSize", "price", "weight"];
    var storedDatas = {};
    for (var i = 0; i < storedDatasName.length; i++) {
        storedDatas[storedDatasName[i]] = localStorage.getItem(storedDatasName[i]);
        if (storedDatas[storedDatasName[i]] === null) {
            if (i == 0) {
                storedDatas[storedDatasName[i]] = [];
            } else {
                storedDatas[storedDatasName[i]] = [-1e7, 1e7];
            }
        }
        console.log(storedDatas[storedDatasName[i]]);
    }

    // TODO: get some data
    var data = [
        { id: 1, name: "A", price: 1 },
        { id: 2, name: "A", price: 1 },
        { id: 3, name: "A", price: 1 },
        { id: 4, name: "A", price: 1 },
        { id: 5, name: "A", price: 1 },
    ];

    return data
}