const server = require('./server')
const port = require('./config/config').port

server.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`)
})
