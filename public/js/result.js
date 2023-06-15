var searchResults = document.getElementById('searchResults');
var buttonAdd = document.getElementById('buttonAdd');

showTableWithData();

function modifyButton(row) {
    var PriceTd = row.querySelector('.price');
    var oldPrice = PriceTd.textContent;
    PriceTd.textContent = '';
    var input = document.createElement('input');
    PriceTd.appendChild(input);
    input.value = oldPrice;
}

function saveModifyButton(row) {
    var PriceTd = row.querySelector('.price');
    var IdTd = row.querySelector('.id');
    var input = PriceTd.querySelector('input');
    var newPrice = input.value;
    var id = IdTd.textContent;
    PriceTd.textContent = newPrice;
    console.log('modify laptop price:', id, newPrice);
}

function removeLaptop(row) {
    var id = row.querySelector('.id').textContent;
    console.log('remove laptop:', id);
    row.remove();
}

function showTableWithData() {
    Data = getLaptopData();
    searchResults.innerHTML = ''; // clear result

    const buttonName = ['modify', 'remove'];
    const buttonText = { 'modify': ['修改價格', '確認'], 'remove': ['移除筆電', '確定?'] };

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
        for (var i = 0; i < buttonName.length; i++) {
            var th = document.createElement('th');
            th.textContent = buttonName[i];
            tableHeader.appendChild(th);
            table.appendChild(tableHeader);
        }

        // append table rows
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
            for (var j = 0; j < 2; j++) {
                var td = document.createElement('td');
                var button;
                td.className = buttonName[j];
                button = document.createElement('button');
                button.className = buttonName[j] + 'Button';
                button.textContent = buttonText[buttonName[j]][0];
                td.appendChild(button);
                tableRow.appendChild(td);
            }

            tableRowList.push(tableRow);

            (function (index) {
                var modifiedButton = tableRowList[index].querySelector('.modifyButton');
                modifiedButton.addEventListener('click', function () {
                    if (modifiedButton.textContent == buttonText['modify'][0]) {
                        modifiedButton.textContent = buttonText['modify'][1];
                        modifyButton(tableRowList[index]);
                    } else {
                        modifiedButton.textContent = buttonText['modify'][0];
                        saveModifyButton(tableRowList[index]);
                    }
                });

                var removeButton = tableRowList[index].querySelector('.removeButton');
                removeButton.addEventListener('click', function () {
                    if (removeButton.textContent == buttonText['remove'][0]) {
                        removeButton.textContent = buttonText['remove'][1];
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
    }
    console.log(storedDatas);

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

// TODO: add application
buttonAdd.addEventListener('click', function () {
    window.location.href = '../html/addLaptop.html';
});