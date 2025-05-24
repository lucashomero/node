const express = require('express')
const app = express()
const port = 3000

const db = require('./db')

app.get('/', (req, res) => {
    res.send ('Servidor funcionando')
})

app.listen(port, () => {
    console.log('Servidor rodando na porta 3000')
})

// http://localhost:3000/
// 
// req - readable - fornece dados
// res - writable - armazena em local de origem