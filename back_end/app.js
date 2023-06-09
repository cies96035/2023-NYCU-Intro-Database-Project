const sqlite3 = require('sqlite3').verbose();
let sql;

// connect to DB
const db = new sqlite3.Database('./project.db',sqlite3.OPEN_READWRITE, (err) => {
    if (err) return console.error(err.message);
})

// input appKeyword is a string
// function return a object contains 2 array
// one is game.id, the other is game.name
function searchApplicationsByKeyword(appKeyword) {
    return new Promise((resolve, reject) => {
        sql = `SELECT * FROM game WHERE game.name LIKE '%${appKeyword}%';`;

        db.all(sql, (err, rows) => {
            if (err) {
                console.error('searchApplicationsByKeyword failed!!');
                console.error(err.message);
            }
            else {
                console.log('searchApplicationsByKeyword complete!!');
                const result1 = rows.map(row => row.id);
                const result2 = rows.map(row => row.name);
                const result3 = rows.map(row => row.image.toString('base64')); // Convert to base64
                resolve({gameId: result1, name: result2, thumbnail: result3});
            }
        });
    });
}


function createTablesOfTheLowerPerformance(){
    return new Promise((resolve, reject) => {
        sql = 'CREATE TABLE theLowerPerformanceOfCPU(id INTEGER PRIMARY KEY, performance INTEGER);';
        db.run(sql, (err) => {
            if(err) {
                console.error('create TABLE theLowerPerformanceOfCPU failed!!');
                console.error(err.message);
            }
            else {
                console.log('create TABLE theLowerPerformanceOfCPU complete!!');
                sql = 'CREATE TABLE theLowerPerformanceOfGPU(id INTEGER PRIMARY KEY, performance INTEGER);';
                db.run(sql, (err) => {
                    if(err) {
                        console.error('create TABLE theLowerPerformanceOfGPU failed!!');
                        console.error(err.message);
                    }
                    else {
                        console.log('create TABLE theLowerPerformanceOfGPU complete!!');
                        resolve();
                    }
                })
            }
        })
    })
}

function fillIntheLowerPerformanceOfCPUTable(appId) {
    return new Promise((resolve, reject) => {
        // Array to hold promises
        let promises = [];

        for(let i = 0; i < appId.length; i++){
            // Create a new promise for each insert
            let insertPromise = new Promise((insertResolve, insertReject) => {
                sql = 'SELECT cpu.performance AS performance FROM game, cpu WHERE game.id = (?) AND game.cpu_AMD = cpu.name;';
                db.all(sql, [appId[i]], (err, rows) => {
                    if (err) {
                        console.error('fillIntheLowerPerformanceOfCPUTable failed!!');
                        console.error(err.message);
                    }
                    else {
                        const result1 = rows.map(row => row.performance);
                        
                        sql = 'SELECT cpu.performance AS performance FROM game, cpu WHERE game.id = (?) AND game.cpu_Intel = cpu.name;';
                        db.all(sql, [appId[i]], (err, rows) => {
                            if (err) {
                                console.error('fillIntheLowerPerformanceOfCPUTable failed!!');
                                console.error(err.message);
                            }
                            else {
                                const result2 = rows.map(row => row.performance);
                                var result;
                                
                                if (result1[0] <= result2[0]){
                                    result = result1[0];
                                }
                                else{
                                    result = result2[0];
                                }

                                sql = 'INSERT INTO theLowerPerformanceOfCPU(performance) VALUES (?)';
                                db.run(sql, [result], (err) => {
                                    if (err) {
                                        console.error('fillIntheLowerPerformanceOfCPUTable failed!!');
                                        console.error(err.message);
                                    }
                                    else {
                                        insertResolve(); // resolve this promise
                                    }
                                })
                            }
                        })
                    }
                })
            })

            
            // Add the promise to the array
            promises.push(insertPromise);
        }

        Promise.all(promises)
            .then(function() {
                console.log('fillIntheLowerPerformanceOfCPUTable complete!!')
                resolve();
            })
            .catch((error) => reject(error));
    });
}

function fillIntheLowerPerformanceOfGPUTable(appId) {
    return new Promise((resolve, reject) => {
        // Array to hold promises
        let promises = [];

        for(let i = 0; i < appId.length; i++){
            // Create a new promise for each insert
            let insertPromise = new Promise((insertResolve, insertReject) => {
                sql = 'SELECT gpu.performance AS performance FROM game, gpu WHERE game.id = (?) AND game.gpu_AMD = gpu.name;';
                db.all(sql, [appId[i]], (err, rows) => {
                    if (err) {
                        console.error('fillIntheLowerPerformanceOfGPUTable failed!!');
                        console.error(err.message);
                    }
                    else {
                        const result1 = rows.map(row => row.performance);
                        
                        sql = 'SELECT gpu.performance AS performance FROM game, gpu WHERE game.id = (?) AND game.gpu_Nvidia = gpu.name;';
                        db.all(sql, [appId[i]], (err, rows) => {
                            if(err) {
                                console.error('fillIntheLowerPerformanceOfGPUTable failed!!');
                                console.error(err.message);
                            }
                            else {
                                const result2 = rows.map(row => row.performance);
                                var result;
                                if (result1[0] <= result2[0]){
                                    result = result1[0];
                                }
                                else{
                                    result = result2[0];
                                }

                                sql = 'INSERT INTO theLowerPerformanceOfGPU(performance) VALUES (?)';
                                db.run(sql, [result], (err) => {
                                    if (err) {
                                        console.error('fillIntheLowerPerformanceOfGPUTable failed!!');
                                        console.error(err.message);
                                    }
                                    else {
                                        insertResolve(); // resolve this promise
                                    }
                                })
                            }
                        })
                    }
                })
            })

            
            // Add the promise to the array
            promises.push(insertPromise);
        }

        Promise.all(promises)
            .then(function() {
                console.log('fillIntheLowerPerformanceOfGPUTable complete!!')
                resolve();
            })
            .catch((error) => reject(error));
    });
}

function removeLowerPerformanceTables(){
    return new Promise((resolve, reject) => {
        sql = 'DROP TABLE theLowerPerformanceOfCPU;';
        db.run(sql, (err) => {
            if(err) {
                console.error('removeLowerPerformanceTables failed!!');
                console.error(err.message);
            }
            else {
                sql = 'DROP TABLE theLowerPerformanceOfGPU;';
                db.run(sql, (err) => {
                    if(err) {
                        console.error('removeLowerPerformanceTables failed!!');
                        console.error(err.message);
                    }
                    else {
                        console.log('removeLowerPerformanceTables complete!!');
                        resolve();
                    }
                })
            }
        })
    })
}

function searchLaptopsByAppId3(){
    return new Promise((resolve, reject) => {
        sql =   `WITH available_cpus AS (
                    SELECT DISTINCT cpu.name AS name
                    FROM cpu
                    WHERE cpu.performance >= (SELECT MAX(performance) FROM theLowerPerformanceOfCPU)
                ),
                available_gpus AS (
                    SELECT DISTINCT gpu.name AS name
                    FROM gpu
                    WHERE gpu.performance >= (SELECT MAX(performance) FROM theLowerPerformanceOfGPU)
                )
                SELECT DISTINCT laptop.id AS id
                FROM laptop
                JOIN available_cpus ON laptop.cpu LIKE '%' || available_cpus.name || '%'
                JOIN available_gpus ON laptop.gpu LIKE '%' || available_gpus.name || '%'
                ORDER BY laptop.id ASC;`;
            
        db.all(sql, (err, rows) => {
            if (err) {
                console.error('searchLaptopsByAppId failed!!');
                console.error(err.message);
            }
            else {
                console.error('searchLaptopsByAppId complete!!');
                const result = rows.map(row => row.id);
                resolve(result);
            }
        })
    })
}

function searchLaptopsByAppId4(appId){
    return new Promise((resolve, reject) => {
        var finalresult;
        createTablesOfTheLowerPerformance()
        .then(function() {return fillIntheLowerPerformanceOfCPUTable(appId);})
        .then(function() {return fillIntheLowerPerformanceOfGPUTable(appId);})
        .then(function() {return searchLaptopsByAppId3();})
        .then(function(result) { finalresult = result; return removeLowerPerformanceTables();})
        .then(function() {resolve(finalresult);})
    })
}

function searchLaptopsByScreenConstraint(min, max){
    return new Promise((resolve, reject) => {
        sql =   `SELECT laptop.id AS id
                FROM laptop
                WHERE CAST(SUBSTR(screen, 1, INSTR(screen, '\"') - 1) AS REAL) BETWEEN ? AND ?
                ORDER BY laptop.id ASC;
                `;
        db.all(sql, [min, max], (err, rows) => {
            if(err) {
                console.error('searchLaptopsByScreenConstraint failed!!');
                console.error(err.message);
            }
            else {
                console.log('searchLaptopsByScreenConstraint complete!!');
                const result = rows.map(row => row.id);
                resolve(result);
            }
        });
    });
}

function searchLaptopsByWeightConstraint(min, max){
    return new Promise((resolve, reject) => {
        sql =   `SELECT laptop.id AS id
                FROM laptop
                WHERE CAST(SUBSTR(weight, 1, INSTR(weight, 'Kg') - 1) AS REAL) BETWEEN ? AND ?
                ORDER BY laptop.id ASC;
                `;
        db.all(sql, [min, max], (err, rows) => {
            if (err) {
                console.error('searchLaptopsByWeightConstraint failed!!');
                console.error(err.message);
            }
            else {
                console.log('searchLaptopsByWeightConstraint complete!!');
                const result = rows.map(row => row.id);
                resolve(result);
            }
        });
    });
}

function searchLaptopsByPriceConstraint(min, max){
    return new Promise((resolve, reject) => {
        sql =   `SELECT laptop.id AS id
                FROM laptop
                WHERE laptop.price BETWEEN ? AND ?
                ORDER BY laptop.id ASC;
                `;
        db.all(sql, [min, max], (err, rows) => {
            if(err) {
                console.error('searchLaptopsByPriceConstraint failed!!');
                console.error(err.message);
            }
            else {
                console.log('searchLaptopsByPriceConstraint complete!!');
                const result = rows.map(row => row.id);
                resolve(result);
            }
        });
    });
}

function intersectionOfTwo(arr1, arr2) {
    let i = 0;
    let j = 0;
    let result = [];
    
    while (i < arr1.length && j < arr2.length) {
        if (arr1[i] < arr2[j]) {
            i++;
        } else if (arr1[i] > arr2[j]) {
            j++;
        } else {
            result.push(arr1[i]);
            i++;
            j++;
        }
    }
    
    return result;
}

function intersectionOfThree(arr1, arr2, arr3) {
    let intersection12 = intersectionOfTwo(arr1, arr2);
    let intersection123 = intersectionOfTwo(intersection12, arr3);
    
    return intersection123;
}

function intersectionOfFour(arr1, arr2, arr3, arr4) {
    let intersection12 = intersectionOfTwo(arr1, arr2);
    let intersection123 = intersectionOfTwo(intersection12, arr3);
    let intersection1234 = intersectionOfTwo(intersection123, arr4);
    
    return intersection1234;
}

function searchLaptopsId(appId, Smin, Smax, Wmin, Wmax, Pmin, Pmax){
    return new Promise((resolve, reject) => {
        if(appId.length==0){
            let arr2;
            let arr3;
            let arr4;
            searchLaptopsByScreenConstraint(Smin, Smax)
            .then(function(result) {arr2 = result; return searchLaptopsByWeightConstraint(Wmin, Wmax);})
            .then(function(result) {arr3 = result; return searchLaptopsByPriceConstraint(Pmin, Pmax);})
            .then(function(result) {
                arr4 = result;
                let finalresult = intersectionOfThree(arr2, arr3, arr4);
                resolve(finalresult);
            })
        }
        else{
            let arr1;
            let arr2;
            let arr3;
            let arr4;
            searchLaptopsByAppId4(appId)
            .then(function(result) {arr1 = result; return searchLaptopsByScreenConstraint(Smin, Smax);})
            .then(function(result) {arr2 = result; return searchLaptopsByWeightConstraint(Wmin, Wmax);})
            .then(function(result) {arr3 = result; return searchLaptopsByPriceConstraint(Pmin, Pmax);})
            .then(function(result) {
                arr4 = result;
                let finalresult = intersectionOfFour(arr1, arr2, arr3, arr4);
                resolve(finalresult);
            })
        }
    })
}

function searchLaptops(appId, Smin, Smax, Wmin, Wmax, Pmin, Pmax){
    return new Promise((resolve, reject) => {
        searchLaptopsId(appId, Smin, Smax, Wmin, Wmax, Pmin, Pmax)
        .then(function(result) {
            let finalresult = [];
            let promises = [];

            for(let i = 0; i < result.length; i++){
                let insertPromise = new Promise((insertResolve, insertReject) => {
                    sql = 'SELECT * FROM laptop WHERE laptop.id = (?);';
                    db.all(sql, [result[i]], (err, rows) => {
                        if (err) {
                            console.error('searchLaptops failed!!');
                            console.error(err.message);
                        }
                        else {
                            finalresult.push(rows[0]);
                            insertResolve();
                        }
                    })
                })
                
                promises.push(insertPromise);
            }

            Promise.all(promises)
            .then(function() {
                resolve(finalresult);
            })
        })

    })
}

// data contains all the rows that laptop has
function createLaptop(model, screen, cpu, ram, rom, gpu, interface, weight, price){
    return new Promise((resolve, reject) => {
        sql = 'INSERT INTO laptop(model, screen, cpu, ram, rom, gpu, interface, weight, price) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)';
        db.run(
            sql,
            [model, screen, cpu, ram, rom, gpu, interface, weight, price],
            (err) => {
                if(err) {
                    console.error('createLaptop failed!!');
                    console.error(err.message);
                }
                else{
                    console.log('createLaptop complete!!');
                    resolve();
                }
            }
        );
    });
}

// data contains 1. the target model name and 2. the new price
function updateLaptop(id, price){
    return new Promise((resolve, reject) => {
        sql = 'UPDATE laptop SET price = ? WHERE id = ?';
        db.run(
            sql,
            [price, id],
            (err) => {
                if(err) {
                    console.error('updateLaptop failed!!');
                    console.error(err.message);
                }
                else {
                    console.log('updateLaptop complete!!');
                    resolve();
                }
            }
        );
    });
}

// data is the target model name
function deleteLaptop(id){
    return new Promise((resolve, reject) => {
        sql = 'DELETE FROM laptop WHERE id = ?';
        db.run(
            sql,
            [id],
            (err) => {
                if(err) {
                    console.error('deleteLaptop failed!!');
                    console.error(err.message);
                }
                else {
                    console.log('deleteLaptop complete!!');
                    resolve();
                }
            }
        );
    });
}


async function createGame(name, cpu_AMD, cpu_Intel, ram, gpu_AMD, gpu_Nvidia, rom, url) {
    try {
        // Insert a new game into the database
        const sql = 'INSERT INTO game(name, cpu_AMD, cpu_Intel, ram, gpu_AMD, gpu_Nvidia, rom) VALUES (?, ?, ?, ?, ?, ?, ?)';
        await new Promise((resolve, reject) => {
            db.run(sql, [name, cpu_AMD, cpu_Intel, ram, gpu_AMD, gpu_Nvidia, rom], (err) => {
                if (err) {
                    console.error('createGame failed!!');
                    console.error(err.message);
                    reject(err);
                } else {
                    console.log('createGame complete!!');
                    resolve();
                }
            });
        });
        
        console.log('a', url);
        if(url == 'none'){
            url = 'https://i.imgur.com/icrHei5.jpg';
        }
        // Set a default image for the newly created game
        await updateGameImage(name, url);

    } catch (error) {
        console.error('Error:', error);
    }
}

async function updateGameImage(game_name, URL) {
    const fetch = (await import('node-fetch')).default;

    try {
        const response = await fetch(URL);
        const arrayBuffer = await response.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        const sql = 'UPDATE game SET image = ? WHERE name = ?';
        await new Promise((resolve, reject) => {
            db.run(sql, [buffer, game_name], (err) => {
                if (err) {
                    console.error(err);
                    reject(err);
                } else {
                    console.log('Image updated successfully!');
                    resolve();
                }
            });
        });
    } catch (error) {
        console.error('Error:', error);
    }
}



function getGameIds(keyword) {
    return import('node-fetch')
        .then(({ default: fetch }) => {
            return fetch('https://api.steampowered.com/ISteamApps/GetAppList/v2');
        })
        .then(response => {
            return response.json();
        })
        .then(data => {
            const games = data.applist.apps.filter(app => app.name.toLowerCase().includes(keyword.toLowerCase()));

            if (games.length > 0) {
                const gameIds = games.map(game => game.appid.toString());
                console.log(`Found ${gameIds.length} games with the keyword "${keyword}".`);
                return gameIds;
            } else {
                console.log(`No games found with the keyword "${keyword}".`);
                return [];
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

function getGameCapsuleImages(gameIds) {
    const fetchPromises = gameIds.map(gameId => {
        return import('node-fetch').then(({default: fetch}) => {
            return fetch(`https://store.steampowered.com/api/appdetails?appids=${gameId}`)
                .then(response => response.json())
                .then(data => {
                    if (data[gameId] && data[gameId].success && data[gameId].data.type === 'game') {
                        return data[gameId].data.capsule_imagev5;
                    } else {
                        console.log(`No data found for game with appid ${gameId} or type is not 'game'`);
                        return null;
                    }
                });
        });
    });

    return Promise.all(fetchPromises)
        .then(images => images.filter(img => img !== null))
        .catch(error => {
            console.error('Error:', error);
        });
}

function fetchImagesFromUrls(urlList) {
    const fetchPromises = urlList.map(url => {
        return import('node-fetch').then(({ default: fetch }) => {
            return fetch(url);
        })
        .then(response => response.arrayBuffer())
        .then(arrayBuffer => {
            // Convert arrayBuffer to base64
            const base64 = Buffer.from(arrayBuffer).toString('base64');
            return { url, image: `data:image/jpeg;base64,${base64}` };
        });
    });

    return Promise.all(fetchPromises);
}

function searchCpu_AMDByKeyword(keyword) {
    return new Promise((resolve, reject) => {
        sql = `SELECT * FROM cpu WHERE cpu.name LIKE '%${keyword}%' AND cpu.brand = 'AMD' AND cpu.name <> 'none';`;

        db.all(sql, (err, rows) => {
            if(err) {
                console.error('searchCpu_AMDByKeyword failed!!');
                console.error(err.message);
            }
            else {
                console.log('searchCpu_AMDByKeyword complete!!');
                const result1 = rows.map(row => row.id);
                const result2 = rows.map(row => row.name);
                resolve({id: result1, name: result2});
            }
        });
    });
}

function searchCpu_IntelByKeyword(keyword) {
    return new Promise((resolve, reject) => {
        sql = `SELECT * FROM cpu WHERE cpu.name LIKE '%${keyword}%' AND cpu.brand = 'Intel' AND cpu.name <> 'none';`;

        db.all(sql, (err, rows) => {
            if(err) {
                console.error('searchCpu_IntelByKeyword failed!!');
                console.error(err.message);
            }
            else {
                console.log('searchCpu_IntelByKeyword complete!!');
                const result1 = rows.map(row => row.id);
                const result2 = rows.map(row => row.name);
                resolve({id: result1, name: result2});
            }
        });
    })
}

function searchGpu_AMDByKeyword(keyword) {
    return new Promise((resolve, reject) => {
        sql = `SELECT * FROM gpu WHERE gpu.name LIKE '%${keyword}%' AND gpu.brand = 'AMD' AND gpu.name <> 'none';`;

        db.all(sql, (err, rows) => {
            if(err) {
                console.error('searchGpu_AMDByKeyword failed!!');
                console.error(err.message);
            }
            else {
                console.log('searchGpu_AMDByKeyword complete!!');
                const result1 = rows.map(row => row.id);
                const result2 = rows.map(row => row.name);
                resolve({id: result1, name: result2});
            }
        });
    })
}

function searchGpu_NvidiaByKeyword(keyword) {
    return new Promise((resolve, reject) => {
        sql = `SELECT * FROM gpu WHERE gpu.name LIKE '%${keyword}%' AND gpu.brand = 'Nvidia' AND gpu.name <> 'none';`;

        db.all(sql, (err, rows) => {
            if (err) {
                console.error('searchGpu_NvidiaByKeyword failed!!');
                console.error(err.message);
            }
            else {
                console.log('searchGpu_NvidiaByKeyword complete!!');
                const result1 = rows.map(row => row.id);
                const result2 = rows.map(row => row.name);
                resolve({id: result1, name: result2});
            }
        });
    })
}

// 整合上述四個function成同一個function
// 整合上述六個function成同一個function
function search(attrName, keyword) {
    return new Promise((resolve, reject) => {
        if(attrName == 'cpu'){
            searchCpuByKeyword(keyword)
            .then(function(result) {resolve(result);})
        }
        else if(attrName == 'cpu_AMD'){
            searchCpu_AMDByKeyword(keyword)
            .then(function(result) {resolve(result);})
        }
        else if (attrName == 'cpu_Intel'){
            searchCpu_IntelByKeyword(keyword)
            .then(function(result) {resolve(result);})
        }
        else if (attrName == 'gpu'){
            searchGpuByKeyword(keyword)
            .then(function(result) {resolve(result);})
        }
        else if (attrName == 'gpu_AMD'){
            searchGpu_AMDByKeyword(keyword)
            .then(function(result) {resolve(result);})
        }
        else if (attrName == 'gpu_Nvidia'){
            searchGpu_NvidiaByKeyword(keyword)
            .then(function(result) {resolve(result);})
        }
        else{
            console.error('attrName(cpu_AMD, cpu_Intel, gpu_AMD, gpu_Nvidia) does not exist!!');
            reject();
        }
    })
}

function searchCpuByKeyword(keyword) {
    return new Promise((resolve, reject) => {
        sql = `SELECT * FROM cpu WHERE cpu.name LIKE '%${keyword}%' AND cpu.name <> 'none';`;

        db.all(sql, (err, rows) => {
            if(err) {
                console.error('searchCpuByKeyword failed!!');
                console.error(err.message);
            }
            else {
                console.log('searchCpuByKeyword complete!!');
                const result1 = rows.map(row => row.id);
                const result2 = rows.map(row => row.name);
                resolve({id: result1, name: result2});
            }
        });
    });
}

function searchGpuByKeyword(keyword) {
    return new Promise((resolve, reject) => {
        sql = `SELECT * FROM gpu WHERE gpu.name LIKE '%${keyword}%' AND gpu.name <> 'none';`;

        db.all(sql, (err, rows) => {
            if(err) {
                console.error('searchGpuByKeyword failed!!');
                console.error(err.message);
            }
            else {
                console.log('searchGpuByKeyword complete!!');
                const result1 = rows.map(row => row.id);
                const result2 = rows.map(row => row.name);
                resolve({id: result1, name: result2});
            }
        });
    })
}

// createTableOfAppId()
// .then(function() { return fillInAppIdTable([2]);})
// .then(function() { return searchLaptopsByAppId();})
// .then(function(result) { console.log(result); return removeTableOfAppId();})
// .then(function() { console.log('removed successfully!!'); })


// searchLaptopsByScreenConstraint(1, 100)
// .then(function(result) {console.log(result.screen);});

/******* 記得把database的Kg, kg, 克，一致改成Kg */
// searchLaptopsByWeightConstraint(0, 0.999)
// .then(function(result) { console.log(result.weight);});

// searchLaptopsByPriceConstraint(160000, 300000)
// .then(function(result) { console.log(result.price);});

// let laptopData = ["model1", "20\\\" efaewfew", "Intel i7-1260P 123", "fewafwe", "afwfw", "Intel Iris Xe Graphics", "fawefaw", "100Kg efwafe", 10];
// createLaptop(laptopData)
// .then(function() {console.log('create successfully!');});

// let laptopData = ["model1", 140];
// updateLaptop(laptopData)
// .then(function() {console.log('update successfully!');});

// let laptopData = "model1";
// deleteLaptop(laptopData)
// .then(function() {console.log('delete successfully!');});

// sql = 'DROP TABLE theLowerPerformanceOfCPU';
// db.run(sql);
// sql = 'DROP TABLE theLowerPerformanceOfGPU';
// db.run(sql);

// searchLaptops([], 0, 100, 0, 100, 100000, 200000)
// .then(function(result) {console.log(result)})



module.exports = {
    searchApplicationsByKeyword,
    search,
    createGame,
    searchLaptops,
    createLaptop,
    updateLaptop,
    deleteLaptop,
    getGameIds,
    getGameCapsuleImages,
    fetchImagesFromUrls
}

// var button2 = document.getElementById('button2');
// button2.addEventListener('click', function() {
//     let myConstraints = {};
//     myConstraints['appId'] = [1, 2];
//     myConstraints['screen'] = [0, 100];
//     myConstraints['weight'] = [0, 100];
//     myConstraints['price'] = [100000, 200000];


//     fetch('http://localhost:3000/searchLaptopXXX', {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ constraints: myConstraints}),
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