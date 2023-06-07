var attributeList = ["screenSize", "price", "weight"]
var buttonNext = document.getElementById('buttonNext');

function handleChange(attributeName) {
    var attrRadio = document.querySelector('input[name="' + attributeName + '"]:checked');
    console.log(attrRadio);
    var attrCustomDiv = document.getElementById(attributeName + 'Custom');

    if (attrRadio && attrRadio.value === 'other') {
        attrCustomDiv.style.display = 'block';
    } else {
        attrCustomDiv.style.display = 'none';
    }
}

function SaveAttribute() {
    for (var i = 0; i < attributeList.length; i++) {
        var limit = []
        var attributeName = attributeList[i];
        var attrRadio = document.querySelector('input[name="' + attributeName + '"]:checked');
        if (attrRadio === null){
            limit = [0, 100];
            continue;
        } 
        if (attrRadio.value === 'other') {
            limit = [
                parseInt(document.getElementById(attributeName + 'MinInput').value),
                parseInt(document.getElementById(attributeName + 'MaxInput').value)
            ];
        } else {
            var rangeValues = attrRadio.value.split('~');
            limit = [
                parseInt(rangeValues[0]),
                parseInt(rangeValues[1])
            ];
        }
        localStorage.setItem(attributeName, limit);
    }
    console.log(limit);
}


buttonNext.addEventListener('click', function() {
    SaveAttribute();
    window.location.href = 'result.html';
});

for (var i = 0; i < attributeList.length; i++){
    var Radios = document.querySelectorAll('input[name="' + attributeList[i] + '"]');
    for (var j = 0; j < Radios.length; j++) {
        Radios[j].addEventListener('change', (function(attribute) {
            return function() {
                handleChange(attribute);
            };
        })(attributeList[i]));
    }
}