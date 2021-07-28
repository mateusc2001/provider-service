"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InternetProviderSettingsService = void 0;
var internet_provider_settings_schema_1 = require("../schemas/internet-provider-settings.schema");
var InternetProviderSettingsService = /** @class */ (function () {
    function InternetProviderSettingsService() {
    }
    InternetProviderSettingsService.create = function (newSettings) {
        return internet_provider_settings_schema_1.internetProviderSettingsEntity.create(newSettings);
    };
    InternetProviderSettingsService.findAll = function () {
        return internet_provider_settings_schema_1.internetProviderSettingsEntity.find();
    };
    InternetProviderSettingsService.findById = function (id) {
        return internet_provider_settings_schema_1.internetProviderSettingsEntity.findById(id);
    };
    InternetProviderSettingsService.updateOne = function (update, id) {
        return internet_provider_settings_schema_1.internetProviderSettingsEntity.updateOne({ _id: id }, update);
    };
    return InternetProviderSettingsService;
}());
exports.InternetProviderSettingsService = InternetProviderSettingsService;
