import { Schema, model } from 'mongoose'
import { InternetProviderModel } from '../model/internet-provider.model';
import { UserModel } from '../model/user.model';

const internetProviderSchema = new Schema({
    users: [
        {
            type: Schema.Types.ObjectId,
            ref: 'user'
        }
    ],
    providerSettings: {
        type: Schema.Types.ObjectId,
        ref: 'internetProviderSetting'
    },
    chatSettings: {
        type: Schema.Types.ObjectId,
        ref: 'chatSettings'
    },
    metrics: {
        type: Schema.Types.ObjectId,
        ref: 'metrics'
    }
}, {
    timestamps: true
})

internetProviderSchema.set('toJSON', {
    virtuals: true
});

export const internetProviderEntity = model<InternetProviderModel>('internetprovider', internetProviderSchema);