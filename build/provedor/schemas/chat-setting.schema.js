"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.chatSettingsEntity = void 0;
var mongoose_1 = require("mongoose");
var id = new mongoose_1.Schema.Types.ObjectId('');
var chatSettingSchema = new mongoose_1.Schema({
    title: mongoose_1.Schema.Types.String,
    primaryColor: mongoose_1.Schema.Types.String,
    image: mongoose_1.Schema.Types.String,
    location: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: 'locationFileData'
        }
    ],
    whatsappNumber: mongoose_1.Schema.Types.String,
    whatsappMessage: mongoose_1.Schema.Types.String,
    clientPageUrl: mongoose_1.Schema.Types.String,
    plans: [
        {
            id: mongoose_1.Schema.Types.ObjectId,
            title: mongoose_1.Schema.Types.String,
            price: mongoose_1.Schema.Types.Number,
            periodoDeCobranca: mongoose_1.Schema.Types.String,
            speed: mongoose_1.Schema.Types.Number,
            color: mongoose_1.Schema.Types.String,
            contemplate: [mongoose_1.Schema.Types.String],
            notContemplate: [mongoose_1.Schema.Types.String]
        }
    ]
}, {
    timestamps: true
});
chatSettingSchema.set('toJSON', {
    virtuals: true
});
exports.chatSettingsEntity = mongoose_1.model('chatSettings', chatSettingSchema);
