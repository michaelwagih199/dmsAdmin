
export class UserModel {
    id!:       string;
    username!: string;
    email!:    string;
    password!: string;
    roles:Role[] =[];
}

export class Role {
    id!:   string;
    name!: string;
    description!: string
}

