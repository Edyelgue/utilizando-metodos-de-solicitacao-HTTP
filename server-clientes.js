//// POST, DELETE, PUT, GET ALL, GET ID
//TODO: cliente, produto, filmes
// cliente
// {
//     "id": 1,
//     "nome": "Leonardo",
//     "telefone": "XXXXX",
//     "email": "leonardolp@gmail.com",
//     "uf": "RJ",
//     "cep": "99999999"
// }

//========VARIAVEIS E CONSTANTES========

const { response, request } = require('express');
const express = require('express');
const nodemon = require('nodemon');

const app = express();
app.use(express.json())

let clientes = [];
let newId = 1;


//========UTILIZANDO MÉTODO GET========

app.get('/teste', (request, response) => {
    return response.status(200).json({status: 'online'});
})

app.get('/clientes', (request, response) => {
    return response.status(200).json({clientes})
})

app.get('/clientes/:id', (request, response) => {
    const id = request.params.id

    const cliente = clientes.filter(item => item.id == id)
    return response.json(cliente)
})


//========UTILIZANDO MÉTODO POST========

app.post('/cliente', (request, response) => {
    const { nome, telefone, email, uf, cep } = request.body

    const id = newId++

    clientes.push({
        id,
        nome,
        telefone,
        email,
        uf,
        cep
    })

    return response.json({
        id,
        nome,
        telefone,
        email,
        uf,
        cep
    })
})


//========UTILIZANDO MÉTODO PUT========

app.put('/cliente/:id', (request, response) => {
    const id = request.params.id
    const {nome, telefone, email, uf, cep} = request.body

    const i = clientes.findIndex(item => item.id == id);

    clientes[i].nome = nome
    clientes[i].telefone = telefone
    clientes[i].email = email
    clientes[i].uf = uf
    clientes[i].cep = cep

    return response.json(clientes[i])
})


//========UTILIZANDO MÉTODO DELETE========

app.delete('/cliente/:id', (request, response) => {
    const id = request.params.id

    const newClientes = clientes.filter(item => item.id != id);
    clientes = newClientes

    return response.status(200).end()
})

app.listen(3333, () => {
    console.log('*******************')
    console.log(' Server rodando :D')
    console.log('*******************')

})