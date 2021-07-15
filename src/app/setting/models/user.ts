
export class UserModel {
    id!:       string;
    username!: string;
    email!:    string;
    password!: string;
    roles:Role[]=[];
}

export interface Role {
    id:   string;
    name: string;
}
