import { userEntity } from "../schemas/user.schema";

export class UserService {
    public static create(newUser: any) {
        return userEntity.create(newUser);
    }

    public static findById(id: any) {
        return userEntity.findById(id);
    }

    public static findAll() {
        return userEntity.find();
    }

    public static update(newUser: any, id: string) {
        return userEntity.updateOne({ '_id': id }, newUser);
    }
}