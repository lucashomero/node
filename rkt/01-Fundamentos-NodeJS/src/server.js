// importando http atraves de ESModules 
// CommonJS -> require (const http = require ('http'))
// ESmodules-> import/export (import http from 'http')

import http from 'node:http'

// GET, POST, PUT, PATCH, DELETE (METODO HTTP + URL)
// GET /users
// POST /users


// GET - Buscar um recurso do back-end
// POST - Criar um recurso no back-end
// PUT - Atualizar um recurso no back-end
// PATCH - Atualizar uma inf unica/especifica de um recurso no back-end
// DELETE - Deletar um recurso do back-end

// Stateful x Stateless
// Stateful - Guarda inf em memoria, aplicacao depende de inf que sao salvas em mem para funcionar
// Stateless - Salva inf em dispostivos ext (db, json), nao salva nada em memoria. N depende de inf que sao salvas em mem

// JSON - JavaScript  Object Notation
// JSON serve para trocar dados entre sistemas, pois é uma linguagem independente baseada em texto. Ele permite representar dados estruturados (como objetos e arrays) em um formato que pode ser facilmente enviado e lido por sistemas que só entendem fluxos de bytes.

// Cabecalhos (Requisicao/resposta) => Metadados

// Http Response Status Code
// Informational Responses (100 – 199)
// Sucessful Responses (200 – 299)
// Redirection messages (300 – 399)
// Client error responses (400 – 499)
// Server error responses (500 – 599)

const users = [] 

const server = http.createServer((request, response)=>{
    const { method, url} = request

    if(method === 'GET' && url === '/users'){
        return response.setHeader('Content-type', 'application/json').end(JSON.stringify(users))
    }
    if(method === 'POST' && url === '/users'){
        users.push({
            id: 1,
            name: 'lucas',
            email: 'lucashomero@gmail.com',
        })

        return response.writeHead(201).end()
    }
    return response.writeHead(404).end()
})

server.listen(3333)

