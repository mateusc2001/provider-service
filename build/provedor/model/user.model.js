"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModel = void 0;
var UserModel = /** @class */ (function () {
    function UserModel(id, _id, username, password) {
        this.id = id;
        this._id = _id;
        this.username = username;
        this.password = password;
    }
    return UserModel;
}());
exports.UserModel = UserModel;
