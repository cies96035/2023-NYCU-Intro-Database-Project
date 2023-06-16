// button2.addEventListener('click', function() {
//     var gameKeyword = "APEX";


// });



var formValue = ['name', 'ram', 'rom', 'cpu_AMD', 'cpu_Intel', 'gpu_AMD', 'gpu_Nvidia', 'thumbnail'];
var selectedValues = {};

Init();

function Init(){

    document.getElementById('submit').addEventListener('click', function(){
        event.preventDefault();
        for(var i = 3; i < formValue.length; i++){
            updateSelectedValues(formValue[i]);
        }
        submitApp();
    });

    document.getElementById('reset').addEventListener('click', function(){
        event.preventDefault();
        window.location.href = '../html/searchApp.html';
    });


    for(var i = 3; i < formValue.length; i++){
        selectedValues[formValue[i]] = 0;
        search(formValue[i]);
        (function (index) {
            var button = document.getElementById(formValue[index] + 'Button');
            button.addEventListener('click', function(){
                event.preventDefault();
                updateSelectedValues(formValue[index]);
                search(formValue[index]);
                // showCGPU(formValue[index], search(formValue[index]));
            })
        })(i);
    }
}

function submitApp(){
    console.log(selectedValues);
    var name = document.getElementById(formValue[0]).value;
    var ram = document.getElementById(formValue[1]).value;
    var rom = document.getElementById(formValue[2]).value;
    var cpu_AMD = selectedValues[formValue[3]];
    var cpu_Intel = selectedValues[formValue[4]];
    var gpu_AMD = selectedValues[formValue[5]];
    var gpu_Nvidia = selectedValues[formValue[6]];
    let url = selectedValues[formValue[7]];
    if(name == ''){
        alert('名稱不能為空');
        return;
    }else if(cpu_AMD == 0 && cpu_Intel == 0){   
        alert('至少得選一個CPU');
        return;
    }else if(gpu_AMD == 0 && gpu_Nvidia == 0){
        alert('至少得選一個GPU');
        return;
    }else if(url === 0){
        url = 'none';
    }
    
    console.log(url);
    fetch('http://localhost:3000/addApp_submit', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: name, cpu_AMD: cpu_AMD, cpu_Intel: cpu_Intel, ram: ram, gpu_AMD: gpu_AMD, gpu_Nvidia: gpu_Nvidia, rom: rom, url: url}),
    })
    .then(response => response.json())
    .then(data => {
        console.log(data);
        window.location.href = '../html/searchApp.html';
        // do something....
    })
    .catch((error) => {
        console.error('Error:', error);
    });
}

function updateSelectedValues(attrName) {
    var searchResults = document.getElementById(attrName + 'Results');
    var radios = searchResults.querySelectorAll('input[type="radio"]');
    var flg = true;
    for (var i = 0; i < radios.length; i++) {
        var radio = radios[i];
        var row = radio.parentNode.parentNode;
        // if(attrName == 'thumbnail'){
        //     console.log(row)
        //     var selectIdx = row.querySelector('.url').textContent;
        //     if (radio.checked) {
        //         selectedValues[attrName] = selectIdx;
        //         flg = false;
        //     }
        // }else{
        // }
        var selectIdx;
        if(attrName != 'thumbnail'){
            selectIdx = row.querySelector('.name').textContent;
        }else{
            selectIdx = row.querySelector('.id').textContent;
        }
        // console.log(selectIdx);
        if (radio.checked) {
            selectedValues[attrName] = selectIdx;
            // if(attrName != 'thumbnail'){
            //     selectedValues[attrName] = parseInt(selectedValues[attrName]);
            // }
            flg = false;
        }
    }
    if(flg){
        selectedValues[attrName] = 'none';
    }
}

function search(attrName){
    var keyword = document.getElementById(attrName).value;
    // console.log('get data for c/gpu: ', attrName, keyword);

    if(keyword == ''){
        showCGPU(attrName, []);
    }else if(attrName == 'thumbnail'){
        fetch('http://localhost:3000/fetchImages', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ keyword: keyword }),
        })
        .then(response => response.json())
        .then(data => {
            data = data["images"];
            var results = [];
            for(var i = 0; i < data.length; i++){
                var result = {};
                result['image'] = data[i]['image'];
                result['id'] = data[i]['url'];
                results.push(result);
            }
            showCGPU(attrName, results);
        })
        .catch((error) => {
            console.error('Error:', error);
        });
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
            // console.log(data);
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
    console.log('a', Data);
    var searchResults = document.getElementById(attrName + 'Results');
    searchResults.innerHTML = '';

    var radiobox = document.getElementById(attrName + 'Noneradio');
    console.log(selectedValues[attrName], radiobox);
    if(selectedValues[attrName] == 0) radiobox.checked = true;
    // searchResults.appendChild(radiobox);

    if(Data.length == 0){
        return;
    }
    var table = document.createElement('table');

    // append table header
    var tableHeader = document.createElement('tr');
    var headerKeys = Object.keys(Data[0]);
    // headerKeys.unshift('');

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
        if(selectedValues[attrName] == rowData[0]) radiobox.checked = true;

        var radioboxCell = document.createElement('td');
        radioboxCell.appendChild(radiobox);
        tableRow.appendChild(radioboxCell);

        for (var j = 0; j < rowData.length; j++) {
            var td = document.createElement('td');
            if(headerKeys[j] == 'image'){
                var imgElement = document.createElement('img');
                imgElement.src = rowData[j]; // directly set the base64 string as src
                td.appendChild(imgElement);
            }else{
                td.textContent = rowData[j];
            }
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