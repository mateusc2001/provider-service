export class UserModel {
    constructor(
        public id: string,
        public _id: string,
        public username: string,
        public password: string,
        public firstName: string,
        public lastName: string
    ) {}
}