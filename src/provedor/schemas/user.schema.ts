import { Schema, model } from 'mongoose'
import { UserModel } from '../model/user.model';

const userSchema = new Schema({
    username: {
        type: Schema.Types.String,
        min: 11,
        max: 11,
        unique: true,
        require: true
    },
    password: {
        type: Schema.Types.String,
        require: true
    },
    firstName: {
        type: Schema.Types.String,
        require: true
    },
    lastName: {
        type: Schema.Types.String,
        require: true
    },
    profileImage: {
        type: Schema.Types.String
    }
}, {
    timestamps: true
})

userSchema.set('toJSON', {
    virtuals: true
});

export const userEntity = model<UserModel>('user', userSchema);