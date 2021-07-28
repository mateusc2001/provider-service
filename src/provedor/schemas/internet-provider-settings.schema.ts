import { Schema, model } from 'mongoose'
import { InternetProviderSettingsModel } from '../model/internet-provider-settings.model';

const internetProviderSettingSchema = new Schema({
    providerName: {
        type: Schema.Types.String,
        require: true
    },
    providerImage: Schema.Types.String
}, {
    timestamps: true
})

internetProviderSettingSchema.set('toJSON', {
    virtuals: true
});

export const internetProviderSettingsEntity = model<InternetProviderSettingsModel>('internetProviderSetting', internetProviderSettingSchema);