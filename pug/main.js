const express = require('express');
const app = express();

const Contenedor = require('./clase.js');
const productos = new Contenedor('./productos.txt');

// views
app.set('views', './views')

//view engine
app.engine('pug', require('pug').__express)
app.set("view engine", "pug")

app.use(express.urlencoded({extended: true}))


app.use(express.json())



//' FRONTEND

app.get('/', (req, res)=>{
    res.render("formulario");
})

app.get('/productos', async (req, res)=>{
    const listaProductos = await productos.getAll();
    if (listaProductos){
        res.render("vista-productos", {productos: listaProductos });
    }else{
        res.render("error")
    }
    
})
    


//' BACKEND

app.post('/productos', async (req, res)=>{
        const {title, price, thumbnail} = req.body;
        let agregarProd = await productos.save({title, price, thumbnail});
        return res.redirect("/");
})




 app.listen(8080, ()=>{
    console.log('servidor de express iniciado')
})