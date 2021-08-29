"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.conversationEntity = void 0;
var mongoose_1 = require("mongoose");
var conversationSchema = new mongoose_1.Schema({
    hasDisponibility: mongoose_1.Schema.Types.Boolean,
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
            horario: {
                type: mongoose_1.Schema.Types.Date,
                required: true,
                default: Date.now
            },
            etapa: {
                type: mongoose_1.Schema.Types.Number,
                require: true
            }
        }
    ]
}, {
    timestamps: true
});
conversationSchema.set('toJSON', {
    virtuals: true
});
exports.conversationEntity = mongoose_1.model('conversation', conversationSchema);
