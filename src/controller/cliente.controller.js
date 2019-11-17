
const Cliente = require('../model/cliente.model.js');
//new cadastro
exports.create = (req, res) => {
  
    if(!req.body) {
        
        return res.status(400).send({
            message: "Conteúdo para cadastrar o cliente não pode estar vazio!"
        });
    }
    const cliente = new Cliente(req.body);
    cliente.save()
    .then(data => {
        res.send(data);
    }).catch(err => {        
        if(err.message.indexOf('duplicate key error') !== -1){
            res.status(500).send({
                message: "O código do cliente ou o CPF já existe na base de dados." ||  err.message 
            });
        } else
        res.status(500).send({
            message: err.message || "Foi mal, algo errado não está certo."
        });
    });
};

exports.findAll = (req, res) => {
    Cliente.find()
    .sort({nome:1})  
    .then(clientes => {
        res.send(clientes);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Ops, algo nao deu certo em nossa busca"
        });
    });
};

exports.findByTexto = (req, res) => {
    const termo = req.params.clienteTexto
    Cliente.find({
        $text: { $search: termo }, 
      })
    .sort({nome:1})    
    .then(clientes => {
        res.send(clientes);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Algo não deu certo tentando procurar o cliente na memória"
        });
    });
};

exports.findOne = (req, res) => {
    Cliente.findById(req.params.clienteId).then(cliente => {
        if(!cliente) {
            return res.status(404).send({
                message: "Cliente não encontrado com o código " + req.params.clienteId
            });            
        }
        res.send(cliente);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Cliente não encontrado com o ID " + req.params.clienteId
            });                
        }
        return res.status(500).send({
            message: "Infelizmente algo não saiu certo na nossa busca :(" + req.params.clienteId
        });
    });
};


exports.update = (req, res) => {
       
    if(!req.body) {
        return res.status(400).send({
            message: "Conteúdo para alterar o cliente não pode estar vazio"
        });
    }
    Cliente.findByIdAndUpdate(req.params.clienteId, 
        {
            nome:  req.body.nome,
            endereco: req.body.descricao,
            pacote: req.body.pacote,   
            codcliente: req.body.codcliente,         
            preco: req.body.preco,
            idade: req.body.idade,
            peso: req.body.peso,
            altura: req.body.altura,
            CPF: req.body.CPF
        }, {new: true}) 
    .then(cliente => {
        if(!cliente) {
            return res.status(404).send({
                message: "Cliente não encontrado com o Id " + req.params.clienteId
            });
        }
        res.send(cliente);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Cliente não encontrado com o Id " + req.params.clienteId
            });                
        }
        return res.status(500).send({
            message: "Ops!Algo de errado, aconteceu tentando salvar o cliente ID " + req.params.clienteId
        });
    });
};


exports.delete = (req, res) => {   
    Cliente.findByIdAndRemove(req.params.clienteId)
    .then(cliente => {
        if(!cliente) {
            return res.status(404).send({
                message: "Opa,cliente não encrontrado com o id " + req.params.clienteId
            });
        }
        res.send({message: "Cliente removido com sucesso!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Cliente não encontrado com o Id " + req.params.clienteId
            });                
        }
        return res.status(500).send({
            message: "Não foi possível apagar o cliente com o Id " + req.params.clienteId
        });
    });
};