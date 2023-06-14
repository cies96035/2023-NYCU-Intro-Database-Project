var myapp = require('./app.js');

var appKeyword = "APEX";


myapp.searchApplicationsByKeyword(appKeyword)
.then(result => {
    for(var i = 0; i < result.appName.length; i++){
        console.log(result.appId[i]);
        console.log(result.appName[i]);
    }
})