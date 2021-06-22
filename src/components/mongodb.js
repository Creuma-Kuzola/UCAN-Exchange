const path = require('path')
const porta = 9000
const url = "mongodb://localhost/exchange"
const mongoose = require('mongoose')

//require('usuarios')

//const usuario = mongoose.model('usuario')

mongoose.Promise = global.Promise
mongoose.connect(url, {

    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false

}).then(function(){
    console.log("MongoDb conectado")

}).catch(function(err){

    console.log("Erro: "+err )
})