"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatSettingsModel = void 0;
var ChatSettingsModel = /** @class */ (function () {
    function ChatSettingsModel(title, primaryColor, image, location, whatsappNumber, whatsappMessage, clientPageUrl, plans) {
        this.title = title;
        this.primaryColor = primaryColor;
        this.image = image;
        this.location = location;
        this.whatsappNumber = whatsappNumber;
        this.whatsappMessage = whatsappMessage;
        this.clientPageUrl = clientPageUrl;
        this.plans = plans;
    }
    return ChatSettingsModel;
}());
exports.ChatSettingsModel = ChatSettingsModel;
