var formValue = ['name', 'cpu_AMD', 'cpu_Intel', 'gpu_AMD', 'gpu_Nvidia', 'ram', 'rom'];
var selectedCGpu = {};

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

function updateAllSelectedCGPU(){
    for(var i = 1; i < 5; i++){
        updateSelectedCGPU(formValue[i]);
    }
}

function search(attrName){
    var keyword = document.getElementById(attrName).value;
    console.log('get data for c/gpu: ', attrName, keyword);

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
    console.log('a', attrName, Data);
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
            td.className = headerKeys[j + 1];
            tableRow.appendChild(td);
        }

        table.appendChild(tableRow);
    }

    searchResults.appendChild(table);
}

var submitButton = document.getElementById('submit');
var resetButton = document.getElementById('reset');

submitButton.addEventListener('click', function(){
    event.preventDefault();
    updateAllSelectedCGPU();
    var name = document.getElementById(formValue[0]).value;
    var ram = document.getElementById(formValue[5]).value;
    var rom = document.getElementById(formValue[6]).value;
    if(name == ''){
        alert('名稱不能為空');
        return;
    }else if(selectedCGpu[formValue[1]] == 0 && selectedCGpu[formValue[2]] == 0){   
        alert('至少得選一個CPU');
        return;
    }else if(selectedCGpu[formValue[3]] == 0 && selectedCGpu[formValue[4]] == 0){
        alert('至少得選一個GPU');
        return;
    }
    var cpu_AMD = selectedCGpu[formValue[1]];
    var cpu_Intel = selectedCGpu[formValue[2]];
    var gpu_AMD = selectedCGpu[formValue[3]];
    var gpu_Nvidia = selectedCGpu[formValue[4]];
    fetch('http://localhost:3000/addApp_submit', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: name, cpu_AMD: cpu_AMD, cpu_Intel: cpu_Intel, ram: ram, gpu_AMD: gpu_AMD, gpu_Nvidia: gpu_Nvidia, rom: rom}),
    })
    .then(response => response.json())
    .then(data => {
        console.log(data);
        // do something....
    })
    .catch((error) => {
        console.error('Error:', error);
    });

    // window.location.href = '../html/searchApp.html';
    // console.log('add game:', name, selectedCGpu);

});
resetButton.addEventListener('click', function(){
    event.preventDefault();
    window.location.href = '../html/searchApp.html';
});


for(var i = 1; i < 5; i++){
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

// data = [
//     { Id: 1, cpu: 'a' },
//     { Id: 2, cpu: 'a' },
//     { Id: 3, cpu: 'a' },
//     { Id: 4, cpu: 'a' },
//     { Id: 5, cpu: 'a' }
// ];