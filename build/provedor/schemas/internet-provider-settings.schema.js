"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.internetProviderSettingsEntity = void 0;
var mongoose_1 = require("mongoose");
var internetProviderSettingSchema = new mongoose_1.Schema({
    providerName: {
        type: mongoose_1.Schema.Types.String,
        require: true
    },
    providerImage: mongoose_1.Schema.Types.String
}, {
    timestamps: true
});
internetProviderSettingSchema.set('toJSON', {
    virtuals: true
});
exports.internetProviderSettingsEntity = mongoose_1.model('internetProviderSetting', internetProviderSettingSchema);
