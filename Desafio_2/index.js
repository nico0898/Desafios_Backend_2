const fs = require('fs')

class Contenedor {
    constructor(file){
        this.file = file
    }

    async save(producto) {
        return await this.fileExist()
        .then(exist => { 
            if(exist){
                fs.promises.readFile(this.file, 'utf-8')
                .then(result => {
                    if(result === ""){
                        let json = [];

                        producto.id = 1;
                        json.push(producto);

                        fs.promises.writeFile(this.file, JSON.stringify(json, null, "\t"))
                    } else{
                        let json = JSON.parse(result);

                        producto.id = json.length+1;
                        json.push(producto);
                        
                        fs.promises.writeFile(this.file, JSON.stringify(json, null, "\t"));
                    }
                    
                    console.log("El archivo se cargo con éxito.")
                })
            } else{
                console.log("El archivo no existe. Debe crear uno.")
            }
        })
    }

    async getAll() {
        return await this.fileExist()
        .then(exist => {
            if(exist){
                fs.promises.readFile(this.file, 'utf-8')
                .then(result => {
                    if(result === ""){
                        console.log("Archivo vacio")
                    } else {
                        console.log(result)
                    }
                })
            } else{
                console.log('Archivo no existente')
            }
        })
    }

    async getFileById(id) {
        return await this.fileExist()
        .then(exist => {
            if(exist){
                fs.promises.readFile(this.file, 'utf-8')
                .then(result => {
                    var json = JSON.parse(result)
                    json.map(item => {
                        if(item.id === id) {
                            console.log(item)
                        }
                    })
                })
            } else{
                console.log('Archivo no existente')
            }
        })
        
    }

    async deleteAll() {
        return await this.fileExist()
        .then(exist => {
            if(exist){
                fs.promises.readFile(this.file, 'utf-8')
                .then(result => {
                    let json = JSON.parse(result)
                    json.splice(0,json.length)
                    
                    fs.promises.writeFile(this.file, JSON.stringify(json, null, "\t"))
                })
            } else{
                console.log('Archivo no existente')
            }
        })
        
    }

    async deleteFileById(id) {
        return await this.fileExist()
        .then(exist => {
            if(exist){
                fs.promises.readFile(this.file, 'utf-8')
                .then(result => {
                    let json = JSON.parse(result)
                    json.map(item => {
                        if(item.id === id) {
                            let index = json.indexOf(item)
                            json.splice(index, 1)
                        }
                    })
                    
                    fs.promises.writeFile(this.file, JSON.stringify(json, null, "\t"))
                })
            } else{
                console.log('Archivo no existente')
            }
        })
        
    }

    fileExist() {
        return new Promise((resolve, rejects) => {
            fs.stat(this.file, (err, stats) => {
                if(err){
                    if(err.code == 'ENOENT'){
                        resolve(false);
                    } else{
                        rejects(err);
                    }
                }

                resolve(true);
            });
        });
    };
}

var content = new Contenedor('productos.txt')

//se guarda un objeto
// var producto = {
//     "title": "Globo Terráqueo",
//     "price": 345.67,
//     "thumbnail": 'url'
// }

// content.save(producto)

//lectura de toda la info del archivo
// content.getAll()

//lectura de un elemento filtrado por su id
// content.getFileById(5)

// borrar elemento por id
// content.deleteFileById(numero) 

// borrar todos los elementos
// content.deleteAll() 