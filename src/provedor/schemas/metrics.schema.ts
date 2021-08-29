import { Schema, model } from 'mongoose'
import { MetricsModel } from '../model/metrics.model';

const metricsSchema = new Schema({
    impressions: [
        {
            createdAt: { type: Schema.Types.Date, required: true, default: Date.now },
            page: {
                type: Schema.Types.String,
                require: true
            }
        }
    ],
    conversations: [
        {
            type: Schema.Types.ObjectId,
            ref: 'conversation'
        }
    ]
}, {
    timestamps: true
})

metricsSchema.set('toJSON', {
    virtuals: true
});

export const metricsEntity = model<MetricsModel>('metrics', metricsSchema);