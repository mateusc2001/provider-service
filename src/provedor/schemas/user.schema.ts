import { Schema, model } from 'mongoose'
import { UserModel } from '../model/user.model';

const userSchema = new Schema({
    username: {
        type: Schema.Types.String,
        unique: true,
        require: true
    },
    password: {
        type: Schema.Types.String,
        require: true
    }
}, {
    timestamps: true
})

userSchema.set('toJSON', {
    virtuals: true
});

export const userEntity = model<UserModel>('user', userSchema);