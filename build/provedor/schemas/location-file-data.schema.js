"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.locationFileDataEntity = void 0;
var mongoose_1 = require("mongoose");
var locationFileDataSchema = new mongoose_1.Schema({
    fileName: {
        type: mongoose_1.Schema.Types.String,
        require: true
    },
    coordinates: [
        [
            {
                lat: {
                    type: mongoose_1.Schema.Types.Number,
                    require: true
                },
                lng: {
                    type: mongoose_1.Schema.Types.Number,
                    require: true
                }
            }
        ]
    ],
    districts: [mongoose_1.Schema.Types.String]
}, {
    timestamps: true
});
locationFileDataSchema.set('toJSON', {
    virtuals: true
});
exports.locationFileDataEntity = mongoose_1.model('locationFileData', locationFileDataSchema);
