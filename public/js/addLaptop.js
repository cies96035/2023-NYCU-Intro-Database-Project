var formValue = ['model', 'screen', 'ram', 'rom', 'interface', 'weight', 'price', 'cpu', 'gpu'];
var selectedCGpu = {};
Init();
function Init(){
    document.getElementById('submit').addEventListener('click', function(){
        event.preventDefault();
        for(var i = 0; i < formValue.length; i++){
            if(formValue[i] == 'cpu' || formValue[i] == 'gpu'){
                updateSelectedCGPU(formValue[i]);
            }
        }
        var model = document.getElementById(formValue[0]).value;
        var screen = document.getElementById(formValue[1]).value;
        var ram = document.getElementById(formValue[2]).value;
        var rom = document.getElementById(formValue[3]).value;
        var interface = document.getElementById(formValue[4]).value;
        var weight = document.getElementById(formValue[5]).value;
        var price = document.getElementById(formValue[6]).value;
        var cpu = selectedCGpu['cpu'];
        var gpu = selectedCGpu['gpu'];
        attrList = { 'model': model, 'screen': screen, 'cpu': cpu, 'ram': ram, 'rom': rom, 'gpu': gpu, 'interface': interface, 'weight': weight, 'price': price};
        for(var i = 0; i < formValue.length; i++){
            if(attrList[formValue[i]] == ''){
                alert(formValue[i] + '為必需的');
                return;
            }
        }
        
        fetch('http://localhost:3000/createLaptopXXX', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
            body: JSON.stringify({ model: model, screen: screen, cpu: cpu, ram: ram, rom: rom, gpu: gpu, interface: interface, weight: weight, price: price}),
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            window.location.href = '../html/result.html';
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    });

    
    document.getElementById('reset').addEventListener('click', function(){
        event.preventDefault();
        window.location.href = '../html/result.html';
    });


    for(var i = 0; i < formValue.length; i++){
        if(formValue[i] == 'cpu' || formValue[i] == 'gpu'){
            selectedCGpu[formValue[i]] = 0;
            search(formValue[i]);
            // showCGPU(formValue[i], );
            (function (index) {
                var button = document.getElementById(formValue[index] + 'Button');
                button.addEventListener('click', function(){
                    event.preventDefault();
                    updateSelectedCGPU(formValue[index]);
                    search(formValue[index]);
                    // showCGPU(formValue[index], search(formValue[index]));
                })
            })(i);
        }
    }
}
function updateSelectedCGPU(attrName) {
    var searchResults = document.getElementById(attrName + 'Results');
    var radios = searchResults.querySelectorAll('input[type="radio"]');
    var flg = true;
    for (var i = 0; i < radios.length; i++) {
        var radio = radios[i];
        var row = radio.parentNode.parentNode;

        var selectIdx = row.querySelector('.id').textContent
        if (radio.checked) {
            selectedCGpu[attrName] = parseInt(selectIdx);
            flg = false;
        }
    }
    if(flg){
        selectedCGpu[attrName] = 0;
    }
}

function search(attrName){
    var keyword = document.getElementById(attrName).value;
    // console.log('get data for c/gpu: ', attrName, keyword);

    if(keyword == ''){
        showCGPU(attrName, []);
    }else{
        fetch('http://localhost:3000/addApp_search', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ attrName: attrName, keyword: keyword}),
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            // return data;
            var keys = Object.keys(data);
            var results = [];
            for(var i = 0; i < data[keys[0]].length; i++){
                var result = {};
                for(var j = 0; j < keys.length; j++){
                    result[keys[j]] = data[keys[j]][i];
                }
                results.push(result);
            }
            showCGPU(attrName, results);
            
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    }
}

function showCGPU(attrName, Data){
    // console.log('a', attrName, Data);
    var searchResults = document.getElementById(attrName + 'Results');
    searchResults.innerHTML = '';

    var radiobox = document.getElementById(attrName + 'Noneradio');
    console.log(selectedCGpu[attrName], radiobox);
    if(selectedCGpu[attrName] == 0) radiobox.checked = true;
    // searchResults.appendChild(radiobox);

    if(Data.length == 0){
        return;
    }
    var table = document.createElement('table');

    // append table header
    var tableHeader = document.createElement('tr');
    var headerKeys = Object.keys(Data[0]);
    // headerKeys.unshift(' ');

    // for (var i = 0; i < headerKeys.length; i++) {
    //     var th = document.createElement('th');
    //     if(headerKeys[i] == 'id'){
    //         th.className = 'hidden';
    //     }
    //     th.textContent = headerKeys[i];
    //     tableHeader.appendChild(th);
    // }

    // table.appendChild(tableHeader);

    // append table rows
    for (var i = 0; i < Data.length; i++) {
        var tableRow = document.createElement('tr');
        var rowData = Object.values(Data[i]);
        // var radiobox = document.createElement('button');
        // radiobox.textContent = '確認';
        var radiobox = document.createElement('input');
        radiobox.type = 'radio';
        radiobox.name = attrName + 'radio';
        if(selectedCGpu[attrName] == rowData[0]) radiobox.checked = true;

        var radioboxCell = document.createElement('td');
        radioboxCell.appendChild(radiobox);
        tableRow.appendChild(radioboxCell);

        for (var j = 0; j < rowData.length; j++) {
            var td = document.createElement('td');
            td.textContent = rowData[j];
            td.className = headerKeys[j];
            if(headerKeys[j] == 'id'){
                td.classList.add('hidden');
            }
            tableRow.appendChild(td);
        }

        table.appendChild(tableRow);
    }

    searchResults.appendChild(table);
}


// data = [
//     { Id: 1, cpu: 'a' },
//     { Id: 2, cpu: 'a' },
//     { Id: 3, cpu: 'a' },
//     { Id: 4, cpu: 'a' },
//     { Id: 5, cpu: 'a' }
// ];


// var button2 = document.getElementById('button2');
// button2.addEventListener('click', function() {
//     let model = 'new model';            // string
//     let screen = '15.6\ FHD';           // string begin with {number}\
//     let cpu = 'Intel i7-11800H 2.3GHz'; // string
//     let ram = '8GB DDR4-3200asdfa';     // string begin with {number}GB
//     let rom = '512GB dafwewaw';         // string begin with {number}GB
//     let gpu = 'Intel Iris Xe Graphics'; // string
//     let interface = 'awfdsad';          // string
//     let weight = '1.23Kg/fasfewa';      // string begin with {number}Kg
//     let price = 11300;                  // Integer


//     fetch('http://localhost:3000/createLaptopXXX', {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ model: model, screen: screen, cpu: cpu, ram: ram, rom: rom, gpu: gpu, interface: interface, weight: weight, price: price}),
//     })
//     .then(response => response.json())
//     .then(data => {
//         console.log(data);
//         // do something....
        
//     })
//     .catch((error) => {
//         console.error('Error:', error);
//     });
// });