import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Observable, Subscriber, Observer } from 'rxjs';
import gql from 'graphql-tag';
import { ApolloQueryResult } from 'apollo-client';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class SignupService {

  constructor(private apollo: Apollo) { }

  public checkForExists(email: string): Observable<boolean> {
    return Observable.create((sub: Subscriber<boolean>) => {
      this.apollo.query({
        query: gql`
          query Find($email: String!) {
            user(email: $email) {
              id
            }
          }`,
        variables: { email }
      })
        .subscribe((value: ApolloQueryResult<any>) => {
          const found: User | null = value.data.user;
          sub.next(found !== null);
          sub.complete();
        });
    });
  }

  public register(data: User): Observable<User> {
    return Observable.create((sub: Subscriber<User>) => {
      this.apollo.mutate({
        mutation: gql`
          mutation signup($name: String!, $email: String, $password: String) {
            createUser(name: $name, email: $email, password: $password) {
              id
              name
              email
              password
            }
          }
        `,
        variables: { data }
      })
        .subscribe((value: ApolloQueryResult<any>) => {
          const created: User = value.data.createUser;
          sub.next(created);
          sub.complete();
        });
    });
  }

}
