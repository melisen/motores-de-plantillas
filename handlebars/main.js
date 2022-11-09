const express = require('express');
const app = express();
const handlebars = require('express-handlebars');


const Contenedor = require('./clase.js');
const productos = new Contenedor('./productos.txt');

 const hbs = handlebars.engine({
   extname: "hbs",
   layoutsDir: "./views/layouts/",
 });
 app.engine("hbs", hbs);

 app.set("view engine", "hbs")

 app.use(express.urlencoded({extended: true}))

 app.use(express.json())


//' FRONTEND

// a) ver formulario para cargar productos
app.get('/', (req, res)=>{
    res.render("main", { layout: "formulario" });
})

// b) ver vista de productos
app.get('/productos', async (req, res)=>{
    const listaProductos = await productos.getAll();
    if(listaProductos){
        res.render("main", { layout: "vista-productos", productos: listaProductos });
    }else{
        res.render("main", {layout: "error"})
    }
    
})
    

//' BACKEND
//a)
app.post('/productos', async (req, res)=>{
        const {title, price, thumbnail} = req.body;
        let agregarProd = await productos.save({title, price, thumbnail});
        return res.redirect("/");
})


 app.listen(8080, ()=>{
    console.log('servidor de express iniciado')
})