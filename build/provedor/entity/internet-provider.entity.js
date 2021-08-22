"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InternetProviderEntity = void 0;
var internet_provider_schema_1 = require("../schemas/internet-provider.schema");
var InternetProviderEntity = /** @class */ (function () {
    function InternetProviderEntity() {
    }
    InternetProviderEntity.findLocationsByInternetProviderId = function (providerId) {
        return internet_provider_schema_1.internetProviderEntity.findById({ '_id': providerId })
            .populate({
            path: 'chatSettings',
            select: 'location',
            populate: {
                path: 'location',
                select: 'coordinates'
            }
        });
    };
    InternetProviderEntity.findPlansByInternetProviderId = function (providerId) {
        return internet_provider_schema_1.internetProviderEntity.findById({ '_id': providerId })
            .populate({
            path: 'chatSettings',
            select: 'plans'
        });
    };
    return InternetProviderEntity;
}());
exports.InternetProviderEntity = InternetProviderEntity;
