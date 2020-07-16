import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Observable, Subscriber, Observer } from 'rxjs';
import gql from 'graphql-tag';
import { ApolloQueryResult } from 'apollo-client';
import { Course } from '../models/course';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  constructor(private apollo: Apollo) { }

  public crearCourse(data: Course): Observable<Course> {
    return Observable.create((sub: Subscriber<Course>) => {
      this.apollo.mutate({
        mutation: gql`
          mutation course($genero: String!, $description: String!) {
            crearCourse(genero: $genero, description: $description) {
              id
              genero
              description
            }
          }
        `,
        variables: { data }
      })
        .subscribe((value: ApolloQueryResult<any>) => {
          const created: Course = value.data.crearCourse;
          sub.next(created);
          sub.complete();
        });
    });
  }

}
