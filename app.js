const express = require("express");
const app = express();
const fs = require('fs');
const Jimp = require("jimp");
const { v4: uuidv4 } = require('uuid');


app.listen(3000, () => {
console.log("El servidor está inicializado en el puerto 3000");
});


app.use(express.static("assets"));

app.get("/", (req, res) =>{
    try {
        res.sendFile(__dirname + "/index.html")
    } catch (error) {
        res.send(error)
    }
})

app.get("/imagen", async(req, res) =>{
    try {
         let {url} = req.query
         let nombre = uuidv4().slice(0,6)
         res.setHeader('Content-Type', 'image/jpg')
        const imagen = await Jimp.read(url)
        await imagen
        .resize(350, Jimp.AUTO)
        .greyscale()
        .writeAsync(__dirname + `/assets/${nombre}.jpg`)
        console.log(imagen)
         const imagenData = fs.readFileSync(__dirname + `/assets/${nombre}.jpg`) 
         
         res.send(imagenData)
        
         .catch((err) => {
           console.error(err);
         });
    } catch (error) {
        console.log(error)
        res.send(error)
    }
})

