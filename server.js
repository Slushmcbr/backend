
const config = require('./config.js');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

mongoose.Promise = global.Promise;
mongoose.connect(config.urlMongodbLocal, {

    useNewUrlParser: true, 
    useCreateIndex: true, 
    useFindAndModify: false,
    useUnifiedTopology: true  
}).then(() => {
    console.log("Conexão efetuada com sucesso ao MongoDB! :)");
}).catch(err => {
    console.log('Não foi possível estabelecer a conexão ao MongoDb :( Saindo...', err);
    process.exit();
});

app.get('/', (req, res) => {
    res.json({ "message": "Welcome to the " + config.nomeAPI + " versão " + config.versaoAPI });
});
require('./src/routes/cliente.routes.js')(app);

if (require.main === module) { 
    app.listen(config.portaServidor, () => {
        console.log('Prontinho meu caro, rodando na porta ' + config.portaServidor);
    });
}