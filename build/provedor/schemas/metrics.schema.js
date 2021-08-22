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
            id: mongoose_1.Schema.Types.ObjectId,
            hasOportunity: mongoose_1.Schema.Types.Boolean,
            page: {
                type: mongoose_1.Schema.Types.String,
                require: true
            },
            leads: {
                type: mongoose_1.Schema.Types.ObjectId,
                ref: 'leads'
            },
            etapas: [
                {
                    horario: { type: mongoose_1.Schema.Types.Date, required: true, default: Date.now },
                    etapa: {
                        type: mongoose_1.Schema.Types.Number,
                        require: true
                    }
                }
            ]
        }
    ]
}, {
    timestamps: true
});
metricsSchema.set('toJSON', {
    virtuals: true
});
exports.metricsEntity = mongoose_1.model('metrics', metricsSchema);
