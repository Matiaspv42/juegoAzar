const express = require('express');
const app = express();
const path = require('path');

const nombres = ['Juan','Francisco','Paloma','Matías','Daniel','Valentina','Felipe','Rodrigo']
let numeroAleatorio = ()=>  Math.floor(Math.random() *4) +1 
let numeroAl = numeroAleatorio()

app.listen(3000, ()=>{
    console.log('El serivdor está inicializado en el puerto 3000');
});

app.use(express.static(path.join( __dirname + '/assets')));

app.use('/abracadabra/juego/:usuario', (req,res,next)=>{
    const usuario = req.params.usuario
    nombres.includes(usuario) ? next() : res.redirect('/who.jpeg')
})


app.get('/abracadabra/usuarios',(req,res)=>{
    res.send({nombres});
});

app.get('/abracadabra/juego/:usuario', (req,res)=>{
    res.sendFile(path.join(__dirname + '/index.html'))
})

app.get('/abracadabra/conejo/:n',(req,res)=>{
    const num = req.params.n
    
    if(num == numeroAl) {
        res.redirect('/conejito.jpg') 
        numeroAl = numeroAleatorio()
    } else {
        res.redirect('/voldemort.jpg')
    }
})

app.get('*',(req,res)=>{
    res.send('Esta página no existe...');
});