"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.internetProviderEntity = void 0;
var mongoose_1 = require("mongoose");
var internetProviderSchema = new mongoose_1.Schema({
    users: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: 'user'
        }
    ],
    providerSettings: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'internetProviderSetting'
    },
    chatSettings: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'chatSettings'
    },
    metrics: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'metrics'
    }
}, {
    timestamps: true
});
internetProviderSchema.set('toJSON', {
    virtuals: true
});
exports.internetProviderEntity = mongoose_1.model('internetprovider', internetProviderSchema);
