const fs = require('fs');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


app.all('*', function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Headers', 'Content-Type,Content-Length, Authorization, Accept,X-Requested-With')
    res.header('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE,OPTIONS')
    res.header('X-Powered-By', ' 3.2.1')
    req.method == "OPTIONS" ? res.send(200) : next()
})

app.post('/question', (req, res) => {
    const roomcode = req.body.roomcode;
    const questions = req.body.question;
    const questionPath = '../static/question.json';
    const codePath = '../static/roomcode.json';

    // Read existing JSON data from the file
    fs.readFile(questionPath, (err, data) => {
        if (err && err.code !== 'ENOENT') {
            throw err;
        }

        // Parse existing JSON data, or create an empty object if the file doesn't exist
        const jsonData = data ? JSON.parse(data) : {};
        // Add new data to the JSON object
        jsonData[roomcode] = {
            questions
        };

        // Convert the updated JSON object back to a string
        const qdata = JSON.stringify(jsonData, null, 2); // The second argument (null, 2) is used for pretty-printing the JSON data space

        // Write the updated JSON data back to the file
        fs.writeFile(questionPath, qdata, (err) => {
            if (err) {
                throw err;
            }
            console.log("Question is saved.");
        });
    });

    fs.readFile(codePath, (err, data) => {
        if (err && err.code !== 'ENOENT') {
            throw err;
        }
        // Parse existing JSON data, or create an empty object if the file doesn't exist
        const jsonData = data ? JSON.parse(data) : {};

        jsonData.roomcode.push(roomcode);

        // Add new data to the JSON object
        // Convert the updated JSON object back to a string
        const qdata = JSON.stringify(jsonData, null, 2); // The second argument (null, 2) is used for pretty-printing the JSON data

        // Write the updated JSON data back to the file
        fs.writeFile(codePath, qdata, (err) => {
            if (err) {
                throw err;
            }
            console.log("Room code is saved.");
        });
    });
}),

app.post('/result', (req, res) => {
    const result = req.body.result;
    const code = req.body.roomcode;
    const name = req.body.name;
    const resultPath = '../static/result.json';

    fs.readFile(resultPath, (err, data) => {
        if (err && err.code !== 'ENOENT') {
            throw err;
        }
        console.log(result);
        console.log(code);
        console.log(name);
        const jsonData = data ? JSON.parse(data) : {};
        if (!jsonData[code]) {
            jsonData[code] = {};
        }
        jsonData[code][name] = result;
        const qdata = JSON.stringify(jsonData, null, 2);
        // Write the updated JSON data back to the file
        fs.writeFile(resultPath, qdata, (err) => {
            if (err) {
                throw err;
            }
            console.log("Result is saved.");
        });
    });
}),

app.all('*', (req, res) => {
    res.send('<h1>Not found 404!</h1>')
}),

app.listen(3000, () => {
    console.log('listening on http://localhost:3000!');
})



// const fs = require('fs');
// const express = require('express');
// const bodyParser = require('body-parser');

// const app = express();
// app.use(bodyParser.json());

// app.post('/haha', (req, res) => {
//     const roomcode = 'c' + req.body.roomcode;
//     const questionPath = '../static/test.json';

//     // Read existing JSON data from the file
//     fs.readFile(questionPath, (err, data) => {
//         if (err && err.code !== 'ENOENT') {
//             throw err;
//         }

//         // Parse existing JSON data, or create an empty object if the file doesn't exist
//         const jsonData = data ? JSON.parse(data) : {};

//         // Add new data to the JSON object
//         jsonData[roomcode] = {
//             "question": [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}]
//         };

//         // Convert the updated JSON object back to a string
//         const qdata = JSON.stringify(jsonData, null, 2); // The second argument (null, 2) is used for pretty-printing the JSON data

//         // Write the updated JSON data back to the file
//         fs.writeFile(questionPath, qdata, (err) => {
//             if (err) {
//                 throw err;
//             }
//             console.log("JSON data is saved.");
//         });

//         // res.send(`${roomcode}`);
//         // console.log(`${roomcode}`);
//     });
// });

// app.listen(3000, () => console.log('Server running on port 3000'));