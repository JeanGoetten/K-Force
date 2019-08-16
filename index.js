const express = require('express')
const handlebars = require('express-handlebars')
const bodyParser = require('body-parser')
const app = express()
const admin = require('./routes/admin')
const path = require("path")
//const mongoose = require('mongoose')
const session = require("express-session")
const flash = require("connect-flash")

//CONFIGURAÇÕES 
//SESSÃO
app.use(session({
    secret: "algoseguro",
    resave: true,
    saveUninitialized: true
}))
app.use(flash())
//MIDDLEWARE
app.use((req, res, next)=>{
res.locals.success_msg = req.flash("success_msg")
res.locals.error_msg = req.flash("error_msg")
next()
})
//BODY PARSER
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
//HANDLEBARS
app.engine('handlebars', handlebars({defaultLayout: 'main'}))
app.set('view engine', 'handlebars')
//MONGOOSE
// mongoose.Promise = global.Promise    
// mongoose.connect("mongodb://localhost/tecshop", {useNewUrlParser: true}).then(()=>{
//         console.log("O banco de dados está funcionando")
//     }).catch((err)=>{
//         console.log("Erro: " + err)
//     })
//PUBLIC
app.use(express.static(path.join(__dirname, "public")))
//ROTAS
app.use('/', admin)
//OUTROS
const PORT = 8088
app.listen(PORT, ()=>{
    console.log("Olá. O Servidor está funcionando em localhost:" + PORT)
})