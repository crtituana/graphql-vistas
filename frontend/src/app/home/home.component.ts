import { Component, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import gql from 'graphql-tag';
import { Users, Query } from '../types/users';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  users: Observable<Users[]>;
  /*courses: any[] = [];
  private query: QueryRef<any>;*/

  constructor(private apollo: Apollo) {}

  ngOnInit(): void {
    this.users = this.apollo.watchQuery<Query>({
      query: gql`
      query users{
        users{
          name
          email
        }
      }`
    })
    .valueChanges
    .pipe(
      map(result => result.data.users)
    );

  }

}
