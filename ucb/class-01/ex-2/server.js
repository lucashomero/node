const http = require('http');
const fs = require('fs');
const path = require('path');

// Tenta usar a porta do package.json ou usa a 3000 como padrão
const PORT = process.env.PORT || 3000;

// Cria o servidor
const server = http.createServer((req, res) => {
  // Serve somente o index.html
  if (req.url === '/' || req.url === '/index.html') {
    const filePath = path.join(__dirname, 'index.html');

    fs.readFile(filePath, (err, data) => {
      if (err) {
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('Erro ao carregar o arquivo HTML.');
      } else {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(data);
      }
    });
  } else {
    // Resposta padrão para outras rotas
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Página não encontrada.');
  }
});

// Inicia o servidor
server.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
