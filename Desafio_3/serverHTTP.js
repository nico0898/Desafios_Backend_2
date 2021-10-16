const http = require("http")

const server = http.createServer((req, res) => {
  res.end("Hola, soy un servidor http")
})

const port = process.env.PORT || 8080

server.listen(port, () => {
  console.log(`Servidor HTTP escuchando en el puerto ${port}`)
})