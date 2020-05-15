const express = require('express')
const app = express()
const data = require('./data.json')
//Verbos HTTP
// GET: receber dados de um resource
// POST: enviar dados ou informações para serem processados por um resource
// PUT: atualizar os dados de um resource
// DELETE: deletar um resource

//http:localhost:3000/clients  -> clients é um resource

app.use(express.json());

app.get("/clients", (req, res) => {
    res.json(data);
})

app.get("/clients/:id", (req, res) => {
    const {id} = req.params
    const client = data.find(cli => cli.id == id);
    res.json(client);
})

app.post("/clients", (req, res) => {
    const {name, email} = req.body;

    //save client

    res.json({name, email});
})

app.put("/clients/:id", (req, res) => {
    const {id} = req.params;
    const client = data.find(cli => cli.id == id);

    if(!client)
        return res.status(404).json();  
    
    const {name} = req.body;

    client.name = name;

    //update client 

    res.json(client);
})

app.delete("/clients/:id", (req, res) => {
    const {id} = req.params;

    const clientsFiltered = data.filter(cli => cli.id != id);

    res.json(clientsFiltered);    
})

app.listen(3000, ()=>console.log('Server is running...'))