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
    InternetProviderService.findConversationsWithEtapaBiggerThan = function (providerId, etapa, start, end) {
        return internet_provider_entity_1.InternetProviderEntity.findConversationsWithEtapaBiggerThan(providerId, etapa, start, end);
    };
    InternetProviderService.findConversationsWithDisponibility = function (providerId, start, end) {
        return internet_provider_entity_1.InternetProviderEntity.findConversationsWithDisponibility(providerId, start, end);
    };
    InternetProviderService.findConversationsWithoutDisponibility = function (providerId, start, end) {
        return internet_provider_entity_1.InternetProviderEntity.findConversationsWithoutDisponibility(providerId, start, end);
    };
    InternetProviderService.findConversationsLeads = function (providerId, start, end, page, count) {
        return internet_provider_entity_1.InternetProviderEntity.findConversationsLeads(providerId, start, end, page, count);
    };
    InternetProviderService.findConversationsWithVenda = function (providerId, start, end, page, count) {
        return internet_provider_entity_1.InternetProviderEntity.findConversationsWithVenda(providerId, start, end, page, count);
    };
    InternetProviderService.findPlansInVenda = function (providerId, start, end, page, count) {
        return internet_provider_entity_1.InternetProviderEntity.findPlansInVenda(providerId, start, end, page, count);
    };
    return InternetProviderService;
}());
exports.InternetProviderService = InternetProviderService;
