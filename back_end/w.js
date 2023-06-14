var button1 = document.getElementById('button1');
button1.addEventListener('click', function() {
    fetch('http://localhost:3000/stringArray')
        .then(
            function(response) {
            console.log(response);
            return response.json();
        })
        .then(data => {
            for(var i = 0; i < data.length; i++){
                console.log(data[i]);
            }
            // console.log(data);
            var strArray = document.createElement('ul');

            data.forEach(item => {
                var li = document.createElement('li');
                li.appendChild(document.createTextNode(item));
                strArray.appendChild(li);
            });

            document.body.appendChild(strArray);
        })
        .catch(error => console.error('Error:', error));
});

var clientArray = ['clientItem1', 'clientItem2'];

var button2 = document.getElementById('button2');
button2.addEventListener('click', function() {
    fetch('http://localhost:3000/processArray', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ array: clientArray }),
    })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            var strArray = document.createElement('ul');

            data.forEach(item => {
                var li = document.createElement('li');
                li.appendChild(document.createTextNode(item));
                strArray.appendChild(li);
            });

            document.body.appendChild(strArray);
        })
        .catch((error) => {
            console.error('Error:', error);
        });
});