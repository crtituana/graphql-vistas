
'use strict';

import gql from 'graphql-tag';

export const createCourse = gql`
    mutation createCourse($description: String!, $genero: String!)
        createCourse(description: $description, genero: $genero) {
            id
            description
            genero
        }
`;

export const Courses = gql`
    query {
        courses{
            id
            description
            genero
        }
}`;

