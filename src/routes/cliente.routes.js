module.exports = (app) => {
    const clientes = require('../controller/cliente.controller.js');

    // Cria um novo cadastro
    app.post('/clientes', clientes.create)
    // Lista todos os cadastro
    app.get('/clientes', clientes.findAll)
    
    app.get('/clientes/:clienteId', clientes.findOne)
    
    app.get('/clientes/texto/:clienteTexto', clientes.findByTexto)
   
    app.put('/clientes/:clienteId', clientes.update)
  
    app.delete('/clientes/:clienteId', 
                clientes.delete) 
}