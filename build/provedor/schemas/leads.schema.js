"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.leadsEntity = void 0;
var mongoose_1 = require("mongoose");
var leadsSchema = new mongoose_1.Schema({
    planoSelecionado: {
        id: mongoose_1.Schema.Types.String,
        title: mongoose_1.Schema.Types.String,
        price: mongoose_1.Schema.Types.Number,
        periodoDeCobranca: mongoose_1.Schema.Types.String,
        speed: mongoose_1.Schema.Types.Number,
        color: mongoose_1.Schema.Types.String,
        contemplate: [mongoose_1.Schema.Types.String],
        notContemplate: [mongoose_1.Schema.Types.String]
    },
    nome: mongoose_1.Schema.Types.String,
    cpf: mongoose_1.Schema.Types.String,
    celular: mongoose_1.Schema.Types.String,
    email: mongoose_1.Schema.Types.String,
    enderecoCompleto: mongoose_1.Schema.Types.String,
    cep: mongoose_1.Schema.Types.String,
    logradouro: mongoose_1.Schema.Types.String,
    complemento: mongoose_1.Schema.Types.String,
    bairro: mongoose_1.Schema.Types.String,
    localidade: mongoose_1.Schema.Types.String,
    uf: mongoose_1.Schema.Types.String,
    ibge: mongoose_1.Schema.Types.String,
    gia: mongoose_1.Schema.Types.String,
    ddd: mongoose_1.Schema.Types.String,
    siafi: mongoose_1.Schema.Types.String
}, {
    timestamps: true
});
leadsSchema.set('toJSON', {
    virtuals: true
});
exports.leadsEntity = mongoose_1.model('leads', leadsSchema);
