
//punto 13
import express from "express";
import fs from "fs";
//punto 14 uso de estructura de carpetas
import { Movie } from "./Class/Movie.js"
import { Libro } from "./Class/Libro.js";

const app = express();
const movie = new Movie();
const libro = new Libro();

app.use(express.json());

//punto 20
app.get("/v1/movies", async (req, res) => {
    try{
        res.json(await movie.listarTodo());
    }catch(e){
        //punto 10
        fs.appendFileSync("./logs/logs.txt", `${Date.now()}: ${e} \n`);
        res.status(500).send("Error al listar");
    }
      
});

app.get("/v1/movies/:id", async (req, res) =>{
    //punto 16
    res.json(await movie.listarId(req.params.id));
});

app.post("/v1/movies", async (req, res)=>{
    //punto 16
     res.status(201).json(await movie.crear(req.body.name));
})

app.delete("/v1/movies/:id", async (req, res)=>{
    //punto 16
    res.send(await movie.eliminar(req.params.id)) //como estamos recuperando de la url usamos el params
    if(!resultado){ //resultado==0 / !resultado==1
        res.sendStatus(404)
    }else{
        res.sendStatus(200)
    }
    //resultado==0?res.sendStatus(404):res.sendStatus(200)
})
app.put("/v1/movies/:id", async (req, res)=>{
    if (req.body.name){
    const resultado = await movie.actualizar(req.body, req.params.id)
    resultado==0?res.sendStatus(404):res.sendStatus(200); //aca uso ternario
    }else{
        res.sendStatus(400);
    }
})



app.get("/v1/libros", async (req,res)=>{
    res.json(await libro.listarTodo());
})

app.listen(3000, ()=>{console.log("Levantado puerto http://localhost:3000")});

//punto 17 Funciona