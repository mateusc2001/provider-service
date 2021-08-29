import {Schema, model} from 'mongoose'
import {UserModel} from '../model/user.model';

const conversationSchema = new Schema({
    hasDisponibility: Schema.Types.Boolean,
    page: {
        type: Schema.Types.String,
        require: true
    },
    leads: {
        type: Schema.Types.ObjectId,
        ref: 'leads'
    },
    etapas: [
        {
            horario: {
                type: Schema.Types.Date,
                required: true,
                default: Date.now
            },
            etapa: {
                type: Schema.Types.Number,
                require: true
            }
        }
    ]
}, {
    timestamps: true
})

conversationSchema.set('toJSON', {
    virtuals: true
});

export const conversationEntity = model<UserModel>('conversation', conversationSchema);