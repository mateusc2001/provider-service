"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InternetProviderService = void 0;
var internet_provider_entity_1 = require("../entity/internet-provider.entity");
var InternetProviderService = /** @class */ (function () {
    function InternetProviderService() {
    }
    InternetProviderService.findPlansByInternetProviderId = function (providerId) {
        return internet_provider_entity_1.InternetProviderEntity.findPlansByInternetProviderId(providerId);
    };
    return InternetProviderService;
}());
exports.InternetProviderService = InternetProviderService;
