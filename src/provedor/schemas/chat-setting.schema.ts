import { Schema, model } from 'mongoose'
import { ChatSettingsModel } from '../model/chat-settings.model';
const id = new Schema.Types.ObjectId('');
const chatSettingSchema = new Schema({
    title: Schema.Types.String,
    primaryColor: Schema.Types.String,
    image: Schema.Types.String,
    location: [
        {
            type: Schema.Types.ObjectId,
            ref: 'locationFileData'
        }
    ],
    whatsappNumber: Schema.Types.String,
    whatsappMessage: Schema.Types.String,
    clientPageUrl: Schema.Types.String,
    plans: [
        {
            id: Schema.Types.ObjectId,
            title: Schema.Types.String,
            price: Schema.Types.Number,
            periodoDeCobranca: Schema.Types.String,
            speed: Schema.Types.Number,
            color: Schema.Types.String,
            contemplate: [Schema.Types.String],
            notContemplate: [Schema.Types.String]
        }
    ]
}, {
    timestamps: true
})

chatSettingSchema.set('toJSON', {
    virtuals: true
});

export const chatSettingsEntity = model<ChatSettingsModel>('chatSettings', chatSettingSchema);