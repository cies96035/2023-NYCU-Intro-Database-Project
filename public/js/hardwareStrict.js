var attributeList = ["screenSize", "price", "weight"];

Init();

function Init(){
    for (var i = 0; i < attributeList.length; i++) {
        var radios = document.querySelectorAll('input[name="' + attributeList[i] + '"]');
        for (var j = 0; j < radios.length; j++) {
            radios[j].addEventListener('change', (function (attribute) {
                return function () {
                    handleChange(attribute);
                };
            })(attributeList[i]));
        }
    }

    document.getElementById('buttonNext').addEventListener('click', function () {
        SaveAttribute();
        window.location.href = '../html/result.html';
    });
}

function handleChange(attributeName) {
    var attrRadio = document.querySelector('input[name="' + attributeName + '"]:checked');
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
        if (attrRadio === null) {
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
        localStorage.setItem(attributeName, JSON.stringify(limit));
    }
    console.log(limit);
}
