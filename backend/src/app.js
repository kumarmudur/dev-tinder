const express = require('express');

const app = express();

app.get('/', (req, res) => {
    res.send("Welcome nodejs");
});

app.use('/user', (req, res, next) => {
    console.log('Handling Response 1');
    next();
},
    (req, res) => {
        console.log('Handling Response 2');
        res.send(('2nd Response'));
    });

app.get('/hello', (req, res) => {
   res.send("Hello hello!");
});

app.get('/test', (req, res)=> {
   res.send('Hello from server');
});

app.listen(8080, () => {
    console.log('server is successfully listening on port 8080');
});