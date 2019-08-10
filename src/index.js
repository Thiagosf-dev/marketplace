const server = require('./server')
const port = require('./config/config').port

server.listen(process.env.port || 3000, () => {
  console.log(`Servidor rodando em http://localhost:${port}`)
})
