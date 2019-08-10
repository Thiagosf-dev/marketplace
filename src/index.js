const server = require('./server')
const port = require('./config/config').port

server.listen(process.env.PORT || 3000, () => {
  console.log(`Servidor rodando em http://localhost:${port}`)
})
