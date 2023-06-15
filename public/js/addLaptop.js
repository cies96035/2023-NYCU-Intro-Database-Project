var formValue = ['name', 'cpu_AMD', 'cpu_Intel', 'gpu_AMD', 'gpu_Nvidia'];
var selectedCGpu = {};

function updateSelectedCGPU(attrName) {
    var searchResults = document.getElementById(attrName + 'Results');
    var radios = searchResults.querySelectorAll('input[type="radio"]');

    for (var i = 0; i < radios.length; i++) {
        var radio = radios[i];
        var row = radio.parentNode.parentNode;

        var selectIdx = row.querySelector('.Id').textContent
        if (radio.checked) {
            selectedCGpu[attrName] = parseInt(selectIdx);
        }
    }
}

function updateAllSelectedCGPU(){
    for(var i = 1; i < formValue.length; i++){
        updateSelectedCGPU(formValue[i]);
    }
}

function search(attrName){
    var keyword = document.getElementById(attrName).value;
    console.log('get data for c/gpu: ', attrName, keyword);

    // TODO: replace with sqlite
    var data = [
        { Id: 0, cpu: 'None' },
        { Id: 1, cpu: 'a' },
        { Id: 2, cpu: 'a' },
        { Id: 3, cpu: 'a' },
        { Id: 4, cpu: 'a' },
        { Id: 5, cpu: 'a' }
    ];
    return data;
}

function showCGPU(attrName, Data){
    var searchResults = document.getElementById(attrName + 'Results');
    searchResults.innerHTML = '';

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
    console.log('add game:', name, selectedCGpu);

});
resetButton.addEventListener('click', function(){
    window.location.href = '../html/searchApp.html';
});


for(var i = 1; i < formValue.length; i++){
    selectedCGpu[formValue[i]] = 0;
    (function (index) {
        var button = document.getElementById(formValue[index] + 'Button');
        button.addEventListener('click', function(){
            event.preventDefault();
            updateSelectedCGPU(formValue[index]);
            showCGPU(formValue[index], search(formValue[index]));
        })
    })(i);
}