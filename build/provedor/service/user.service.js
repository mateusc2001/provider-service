"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
var user_schema_1 = require("../schemas/user.schema");
var UserService = /** @class */ (function () {
    function UserService() {
    }
    UserService.create = function (newUser) {
        return user_schema_1.userEntity.create(newUser);
    };
    UserService.findById = function (id) {
        return user_schema_1.userEntity.findById(id);
    };
    UserService.findAll = function () {
        return user_schema_1.userEntity.find();
    };
    return UserService;
}());
exports.UserService = UserService;
