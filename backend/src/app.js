const express = require('express');

const app = express();

app.get('/', (req, res) => {
    res.send("Welcome nodejs");
});

app.get('/user', (req, res) => {
   res.send({ firstName: 'Shiva', lastName: 'Mahesh' });
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