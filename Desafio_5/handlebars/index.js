const express = require('express');
const handlebars = require('express-handlebars');
const app = express();
const router = express.Router(); 

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/productos', router);

app.engine("hbs", handlebars({
      extname: ".hbs",
      defaultLayout: 'index.hbs',
      layoutsDir: __dirname + "/views/layouts",
      partialsDir: __dirname + "/views"
  })
);

app.set("view engine", "hbs");
app.set("views", "./views");
app.use(express.static('public'));

//--------FUNCIONALIDADES

const Productos = require('./productos');

router.get('/', (req, res) => {
  res.render('index')
});

router.get('/listar', (req, res) => {
  try {
    let listaProductos = Productos.listarProductos();
    
    if(listaProductos.length == 0){
      res.render('vista', { hayProductos: false, Mensaje : 'No se encontraron productos' });
    }else{
      res.render('vista', { hayProductos: true, productos: listaProductos });
    }
  }catch (err) {
    console.error({ error : 'metodo listar - ' + err })
    res.status(500).json({ error : 'metodo listar - ' + err });
  }
});

router.post('/guardar', async (req, res) => {
  try {
    let objeto = req.body;

    Productos.guardarProducto(objeto);
    return res.redirect('/');
  } catch (err) {
    console.error({ error : 'metodo guardar - ' + err })
    res.status(500).json({ error : 'metodo guardar - ' + err });
  }
});


//-----------------------------------------------------------------------------------

const puerto = 8080;

const server = app.listen(puerto, () => {
  console.log(`servidor escuchando en http://localhost:${server.address().port}`);
});

server.on('error', error => {
  console.log('error en el servidor:', error);
  res.status(500).json({error : 'ocurrió un error'});
});

app.use(function(err, req, res, next){
  console.error(err.stack);
  res.status(500).json({error : 'ocurrió un error'});
});
