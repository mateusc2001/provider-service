"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userEntity = void 0;
var mongoose_1 = require("mongoose");
var userSchema = new mongoose_1.Schema({
    username: {
        type: mongoose_1.Schema.Types.String,
        min: 11,
        max: 11,
        unique: true,
        require: true
    },
    password: {
        type: mongoose_1.Schema.Types.String,
        require: true
    },
    firstName: {
        type: mongoose_1.Schema.Types.String,
        require: true
    },
    lastName: {
        type: mongoose_1.Schema.Types.String,
        require: true
    },
    profileImage: {
        type: mongoose_1.Schema.Types.String
    }
}, {
    timestamps: true
});
userSchema.set('toJSON', {
    virtuals: true
});
exports.userEntity = mongoose_1.model('user', userSchema);
