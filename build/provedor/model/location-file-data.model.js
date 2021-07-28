"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LocationFileDataModel = void 0;
var LocationFileDataModel = /** @class */ (function () {
    function LocationFileDataModel(_id, id, fileName, coodinates, districts) {
        this._id = _id;
        this.id = id;
        this.fileName = fileName;
        this.coodinates = coodinates;
        this.districts = districts;
    }
    return LocationFileDataModel;
}());
exports.LocationFileDataModel = LocationFileDataModel;
