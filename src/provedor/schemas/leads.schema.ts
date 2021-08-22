import {Schema, model} from 'mongoose'

const leadsSchema = new Schema({
    nome: Schema.Types.String,
    cpf: Schema.Types.String,
    celular: Schema.Types.String,
    email: Schema.Types.String,
    enderecoCompleto: Schema.Types.String,
    cep: Schema.Types.String,
    logradouro: Schema.Types.String,
    complemento: Schema.Types.String,
    bairro: Schema.Types.String,
    localidade: Schema.Types.String,
    uf: Schema.Types.String,
    ibge: Schema.Types.String,
    gia: Schema.Types.String,
    ddd: Schema.Types.String,
    siafi: Schema.Types.String
}, {
    timestamps: true
})

leadsSchema.set('toJSON', {
    virtuals: true
});

export const leadsEntity = model<any>('leads', leadsSchema);