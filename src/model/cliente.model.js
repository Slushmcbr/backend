const mongoose = require('mongoose');
const ClienteSchema = mongoose.Schema({
    nome: {
        type: String,
        minlength: [2, 'O nome é muito curto'],
        maxlength: [100, 'O nome é muito longo'],
        required: [true, 'O nome do cliente é obrigatório']
    }, 
    endereco: {
        type: String,
        minlength: [10, 'O Endereço é muito curto'],
        maxlength: [150, 'O Endereço é muito longo'],
        required: [true, 'O Endereço é obrigatório']
    },
    pacote: { 
        type: String,   
        maxlength: [1, 'O pacote deve ser preenchido com letras de A á C'],
        required: [true, 'O pacote é obrigatório'],
        validate: {
            validator: function(pack) {
              return /^([A-C]{1})$/.test(pack);
            },
            message: props => props.value +' não é pacote valido !'
    }    

    },
    codcliente: {
        type: Number,
        unique: true, //Criamos um índice único
        minlength: [4,'O codcliente deve conter no minimo 4 numeros '], 
        maxlength: [5, 'O codcliente deve conter no máximo 5 numeros'],

  
},
    preco: Number,
    idade: Number,
    peso: Number,
    altura: Number,
    
    CPF: {
        type: String,
        unique: true,
        minlenght: [10, 'O CPF está muito curto'],
        maxlenght: [14, 'O CPF está muito longo'],
        validate: {
            validator: function(CPF) { 
              return /^([0-9]{3}[.]?[0-9]{3}[.]?[0-9]{3}[-]?[0-9]{2})$/.test(CPF);
            },
            message: props => props.value +' não é um cpf válido!'
    }    
},
    
}, {
        timestamps: true
    });

ClienteSchema.index({
    nome: 'text',
    endereco: 'text',
    pacote: 'text',
    codcliente: 'text'
}, {
        weights: {
            nome: 5, 
            endereco: 3,
            pacote: 1,
            codcliente: 1,
        },
    });

module.exports = mongoose.model('Cliente', ClienteSchema);

