export type Courses = {
    id: string
    // tslint:disable-next-line:ban-types
    description: String;
    // tslint:disable-next-line:ban-types
    genero: String;
};

export type Query = {
    courses: Courses[];
};
