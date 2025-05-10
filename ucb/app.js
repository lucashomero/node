// app.js

const http = require('http');

// Cria o servidor
const server = http.createServer((req, res) => {
  res.statusCode = 200; // Código de sucesso
  res.setHeader('Content-Type', 'text/plain'); // Tipo de resposta
  res.end('Hello, World!\n'); // Mensagem enviada
});

// Define a porta do servidor
const PORT = 3000;

// Inicia o servidor
server.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
