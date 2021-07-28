import { Schema, model, Types } from 'mongoose'
import { LocationFileDataModel } from '../model/location-file-data.model';

const locationFileDataSchema = new Schema({
    fileName: {
        type: Schema.Types.String,
        require: true
    },
    coordinates: [
        [
            {
                lat: {
                    type: Schema.Types.Number,
                    require: true
                },
                lng: {
                    type: Schema.Types.Number,
                    require: true
                }
            }
        ]
    ],
    districts: [Schema.Types.String]
}, {
    timestamps: true
})

locationFileDataSchema.set('toJSON', {
    virtuals: true
});

export const locationFileDataEntity = model<LocationFileDataModel>('locationFileData', locationFileDataSchema);