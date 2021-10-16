const express = require('express')
const app = express()
const port = 8080
const fs = require('fs')

const server = app.listen(port, () => {
    console.log(`Servidor http escuchando en el puerto ${server.address().port}`)
})

server.on("error", error => console.log(`Error en servidor - ${error}`))

app.get('/', (req, res) => {
    res.send({ mensaje : "Hola mundo"})
})

app.get('/productos', (req, res) => {
    fs.promises.readFile("productos.txt", 'utf-8')
    .then(result => {
        if(result === ""){
            res.send({ mensaje: "Archivo vacio" })
        } else {
            res.send(JSON.parse(result))
        }
    })
})

app.get('/productosRandom', (req, res) => {
    fs.promises.readFile("productos.txt", 'utf-8')
    .then(result => {
        let json = JSON.parse(result)
        let id = getRandomInt(1, 4)
        let itemJson;

        json.map(item => {
            if(item.id === id) {
                itemJson = item
            }
        })

        res.send(itemJson)
    })
})

const getRandomInt = (min, max) => {
    return Math.floor(Math.random() * (max - min)) + min;
}