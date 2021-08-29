"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.metricsEntity = void 0;
var mongoose_1 = require("mongoose");
var metricsSchema = new mongoose_1.Schema({
    impressions: [
        {
            createdAt: { type: mongoose_1.Schema.Types.Date, required: true, default: Date.now },
            page: {
                type: mongoose_1.Schema.Types.String,
                require: true
            }
        }
    ],
    conversations: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: 'conversation'
        }
    ]
}, {
    timestamps: true
});
metricsSchema.set('toJSON', {
    virtuals: true
});
exports.metricsEntity = mongoose_1.model('metrics', metricsSchema);
