"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatSettingsService = void 0;
var chat_setting_schema_1 = require("../schemas/chat-setting.schema");
var internet_provider_service_1 = require("./internet-provider.service");
var ChatSettingsService = /** @class */ (function () {
    function ChatSettingsService() {
    }
    ChatSettingsService.findAll = function () {
        return chat_setting_schema_1.chatSettingsEntity.find();
    };
    ChatSettingsService.create = function (newChatSettings) {
        return chat_setting_schema_1.chatSettingsEntity.create(newChatSettings);
    };
    ChatSettingsService.findByIdPopulateDistricts = function (id) {
        return chat_setting_schema_1.chatSettingsEntity.findById(id)
            .populate({
            path: 'location',
            select: ['districts', 'fileName']
        });
    };
    ChatSettingsService.findById = function (id) {
        return chat_setting_schema_1.chatSettingsEntity.findById(id).populate('location');
    };
    ChatSettingsService.findByIdWithout = function (id) {
        return chat_setting_schema_1.chatSettingsEntity.findById(id).populate({
            path: 'location',
            select: ['districts', 'fileName']
        });
    };
    ChatSettingsService.updateOne = function (update, id) {
        return chat_setting_schema_1.chatSettingsEntity.updateOne({ _id: id }, update);
    };
    ChatSettingsService.addPlan = function (newPlan, id) {
        return chat_setting_schema_1.chatSettingsEntity.updateOne({
            _id: id
        }, {
            $push: {
                plans: newPlan
            }
        });
    };
    ChatSettingsService.addLocationFileData = function (newLocationFileData, id) {
        return chat_setting_schema_1.chatSettingsEntity.updateOne({
            _id: id
        }, {
            $push: {
                location: newLocationFileData.id
            }
        });
    };
    ChatSettingsService.findPlansByInternetProviderId = function (id) {
        return internet_provider_service_1.InternetProviderService.findPlansByInternetProviderId(id);
    };
    ChatSettingsService.findPlans = function (id) {
        return chat_setting_schema_1.chatSettingsEntity.findOne({ _id: id })
            .select('plans');
    };
    return ChatSettingsService;
}());
exports.ChatSettingsService = ChatSettingsService;
