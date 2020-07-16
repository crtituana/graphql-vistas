export type Users = {
    id: string

    email: String;

    passwword: String;

    name: String;
};

export type Query = {
    users: Users[];
};
