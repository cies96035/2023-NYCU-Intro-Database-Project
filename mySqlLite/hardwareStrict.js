var buttonNext = document.getElementById('buttonNext');

var urlParams = new URLSearchParams(window.location.search);
var selectData = urlParams.get('selectData');
alert('接收到的資料為：' + selectData)


buttonNext.addEventListener('click', function() {
    // TODO: store the data between pages
    window.location.href = 'result.html';
});
