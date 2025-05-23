// Streams
// Streams em Node.js são interfaces que permitem ler ou escrever dados de forma contínua, ou seja, em pedaços (chunks), sem precisar carregar tudo de uma vez na memória. Isso é útil para manipular arquivos grandes, transferências de rede, etc

// Readable Streams -> Ler dados (fs.createReadStream) "lendo inf vinda do usuario aos poucos"
// Writable Streams -> Escrever dados (fs.createWriteStream) "enviando inf aos poucos"

// process.stdin.pipe(process.stdout)
// stdin - entrada / stream de leitura (readable)
// stdout - saida / stream de escrita (writable)
// pipe - encaminhar


import { Readable, Writable, Transform, Duplex} from 'node:stream'

// Stream de Leitura tem como proposito enviar dados/fornecer inf
// Criando Stream de Leitura
class OneToHundredStream extends Readable {
    index = 1

    _read() {
        const i = this.index++

        if (i > 100){
            this.push(null)
        } else {
            const buf = Buffer.from(String(i))
            this.push(buf)
        }
    }
}
// push - metodo usado por uma readable stream, p/ fornecer informações p quem estiver consumindo ela
// O pedaço de dados/chunk que esta sendo consumido, lido, escrito NÃO pode estar em formato primitivo
// Ou seja, dentro de streams nao podemos trabalhar com dados primitivos (string, number, boolean)
// Para trabalhar com stream devemos utilizar o buffer


// Criando Stream de Escrita
// Stream de Escrita tem como proposito escrever/gravar dados em algum destino
// O destino pode ser arquivo, banco, buffer, etc.
class MultiplyByTenStream extends Writable {
    _write(chunk, encoding, callback){
        console.log(Number(chunk.toString( )) * 10)
        callback()
    }
}

// chunk - pedaço de dados que esta sendo escrito ou lido de uma stream
// pedaço que a gente leu da stream de leitura (enviado da stream de leitura atraves de this.push(buf))
// chunk é essencial para evitar sobrecarregar a memória, permite processar dados enquanto eles ainda estão chegando e é essencial para manipular arquivos grandes, respostas HTTP, etc
// encoding - como essa informação ta codificada
// callback - função que a stream de escrita precisa chamar, quando ela terminou o que precisava fazer com aquela informação
// stream de escrita NÃO RETORNA nada, ela somente processa o dado


// Criando Transform Stream
// Transform Stream -> le dados(readable), processa dados(transform), escreve(writable)
// soma de readable + transform + writable
class InverseNumberStream extends Transform {
    _transform(chunk, encoding, callback){
        const transformed = Number(chunk.toString( )) * -1
        
        callback(null, Buffer.from(String(transformed)))
    }
}

// Buffer é uma forma de transicionar dados entre streams
// Modelo que o Node usa para não tem que usar string, int (tipos primitivos)


// Stream Duplex
// Stream que pode ler ou escrever (readable ou writable)

new OneToHundredStream().pipe(new InverseNumberStream()).pipe(new MultiplyByTenStream)


// O Buffer é usado no Node.js porque ele é construído sobre o C++, uma linguagem de baixo nível que lida diretamente com memória binária.
// Como o JavaScript não lida nativamente com dados binários, o Buffer funciona como uma ponte eficiente entre o JavaScript (alto nível) e o C++ (baixo nível).
// Além disso, ele é muito mais rápido e leve do que manipular strings ou objetos ao transferir dados entre streams, arquivos ou redes.

// Node roda JavaScript no backend; Buffer transita dados binários em streams; Chunk são pedaços desses dados que evitam sobrecarregar a memória.
// Buffer = transitar dados em uma stream
// Chunk = pedaço dos dados em uma stream

// Fetch API - permite que você busque (fetch) dados de servidores usando requisições HTTP/HTTPS, de forma simples e baseada em promises
// permite fazer requisições de uma aplicação p outra, endereço p outro, front end p back end, back end p outro back end
