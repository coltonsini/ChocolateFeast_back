const express = require('express');
const path = require('path')
const app = express();

app.use(express.json());

const casos = [
    {id: 1, n: 10, c: 2, m:5, enroll: true},
    {id: 2, n: 10, c: 2, m:5, enroll: false},
    {id: 3, n: 10, c: 2, m:5, enroll: false}
];

app.get('/', (req, res) => {   
    res.send('Chocolate Feast Api');
});

app.get('/api/casos', (req, res) => {
    res.send(casos);
});
    

app.get('/api/casos/:id', (req, res) => {
    const caso = casos.find(c => c.id === parseInt(req.params.id));
    if (!caso) return res.status(404).send('Caso no encontrado');
    else res.send(caso);
})

app.post('/api/casos', (req,res) => {
    const caso = {
        id: casos.length + 1,
        n: req.body.n,
        c: req.body.c,
        m: req.body.m,
        enroll: (req.body.enroll == 'true')
    };

    casos.push(caso);
    res.send(caso);
})

app.delete('/api/casos/:id', (req, res) => {
    const caso = casos.find(c => c.id === parseInt(req.params.id));
    if(!caso) return res.status(404).send('Caso no encontrado');

    const index = casos.indexOf(caso);
    casos.splice(index, 1);
    res.send(caso);
})

const port = process.env.port || 3000;
app.listen(port, () => console.log(`Escuchando el puerto ${port}`));