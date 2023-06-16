var searchResults = document.getElementById('searchResults');
var buttonAdd = document.getElementById('buttonAdd');

getLaptopData();

function modifyButton(row) {
    var PriceTd = row.querySelector('.price');
    
    var oldPrice = PriceTd.textContent;

    PriceTd.textContent = '';

    var input = document.createElement('input');
    input.value = oldPrice;
    PriceTd.appendChild(input);
}

function saveModifyButton(row) {
    var PriceTd = row.querySelector('.price');
    var IdTd = row.querySelector('.id');
    var input = PriceTd.querySelector('input');
    var newPrice = input.value;
    var id = IdTd.textContent;
    PriceTd.textContent = newPrice;
    console.log('modify laptop price:', id, newPrice);

    fetch('http://localhost:3000/updateLaptopXXX', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: id, price: newPrice}),
    })
    .then(response => response.json())
    .then(data => {
        console.log(data);
    })
    .catch((error) => {
        console.error('Error:', error);
    });
}

function removeLaptop(row) {
    var id = row.querySelector('.id').textContent;
    console.log('remove laptop:', id);
    fetch('http://localhost:3000/deleteLaptopXXX', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
        body: JSON.stringify({ id: id }),
    })
    .then(response => response.json())
    .then(data => {
        console.log(data);
        // do something....

    })
    .catch((error) => {
        console.error('Error:', error);
    });
    row.remove();
}

function showTableWithData(Data) {
    searchResults.innerHTML = ''; // clear result

    const buttonName = ['modify', 'remove'];
    const buttonText = { 'modify': ['修改價格', '確認'], 'remove': ['移除筆電', '確定?'] };
    const passKey = ['interface', 'cpu', 'ram', 'rom', 'gpu'];
    if (Data.length > 0) {
        var table = document.createElement('table');

        // append table header
        var tableHeader = document.createElement('tr');
        var headerKeys = Object.keys(Data[0]);

        for (var i = 0; i < headerKeys.length; i++) {
            if (passKey.includes(headerKeys[i])) {
                continue;
            }
            var th = document.createElement('th');
            th.textContent = headerKeys[i];
            tableHeader.appendChild(th);
            if(headerKeys[i] == 'id'){
                th.className = 'hidden';
            }
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
                if (passKey.includes(headerKeys[j])) {
                    continue;
                }
                var td = document.createElement('td');
                td.textContent = rowData[j];
                td.className = headerKeys[j];
                if(headerKeys[j] == 'id'){
                    td.classList.add('hidden');
                }
                tableRow.appendChild(td);
            }
            for (var j = 0; j < 2; j++) {
                var td = document.createElement('td');
                var button;
                td.className = buttonName[j];
                button = document.createElement('button');
                button.className = buttonName[j] + 'Button';
                // button.classList.ap
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
        }else{
            storedDatas[storedDatasName[i]] = JSON.parse(storedDatas[storedDatasName[i]]);
        }
    }
    let myConstraints = {};
    myConstraints['appId'] = storedDatas[storedDatasName[0]];
    console.log('aaa');
    console.log(myConstraints['appId']);
    console.log('bbb');
    myConstraints['screen'] = storedDatas[storedDatasName[1]];
    console.log(myConstraints['screen'])
    myConstraints['price'] = storedDatas[storedDatasName[2]];
    myConstraints['weight'] = storedDatas[storedDatasName[3]];

    console.log(myConstraints);
    fetch('http://localhost:3000/searchLaptopXXX', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ constraints: myConstraints}),
    })
    .then(response => response.json())
    .then(data => {
        console.log(data);
        // do something....
        
        showTableWithData(data);

    })
    .catch((error) => {
        console.error('Error:', error);
    });
}

// TODO: add application
document.getElementById('buttonAdd').addEventListener('click', function () {
    window.location.href = '../html/addLaptop.html';
});

document.getElementById('buttonBack').addEventListener('click', function () {
    window.location.href = '../html/hardwareStrict.html';
});
