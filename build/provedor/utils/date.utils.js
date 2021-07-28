"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DateUtils = void 0;
var DateUtils = /** @class */ (function () {
    function DateUtils() {
    }
    DateUtils.getActualDateTimezone = function (date, offset) {
        if (offset === void 0) { offset = -3; }
        return new Date(date.getTime() + offset * 3600 * 1000);
    };
    DateUtils.convertTZ = function (date, tzString) {
        return new Date((typeof date === "string" ? new Date(date) : date).toLocaleString(tzString, { timeZone: 'UTC' }));
        // return new Date(date.toLocaleString(tzString, {timeZone: 'UTC'}));   
    };
    return DateUtils;
}());
exports.DateUtils = DateUtils;
