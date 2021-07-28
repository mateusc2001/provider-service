"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userEntity = void 0;
var mongoose_1 = require("mongoose");
var userSchema = new mongoose_1.Schema({
    username: {
        type: mongoose_1.Schema.Types.String,
        unique: true,
        require: true
    },
    password: {
        type: mongoose_1.Schema.Types.String,
        require: true
    }
}, {
    timestamps: true
});
userSchema.set('toJSON', {
    virtuals: true
});
exports.userEntity = mongoose_1.model('user', userSchema);
