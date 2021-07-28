"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MetricsModel = void 0;
var MetricsModel = /** @class */ (function () {
    function MetricsModel(impressions, conversations) {
        this.impressions = impressions;
        this.conversations = conversations;
    }
    return MetricsModel;
}());
exports.MetricsModel = MetricsModel;
var ImpressionsModel = /** @class */ (function () {
    function ImpressionsModel(page) {
        this.page = page;
    }
    return ImpressionsModel;
}());
var ConversationModel = /** @class */ (function () {
    function ConversationModel(_id, id, hasOportunity, page, etapas) {
        this._id = _id;
        this.id = id;
        this.hasOportunity = hasOportunity;
        this.page = page;
        this.etapas = etapas;
    }
    return ConversationModel;
}());
