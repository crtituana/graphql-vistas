import { Component, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import gql from 'graphql-tag';
import { Courses, Query } from '../types/course';


@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent implements OnInit {

  courses: Observable<Courses[]>;
  /*courses: any[] = [];
  private query: QueryRef<any>;*/

  constructor(private apollo: Apollo) {}

  ngOnInit(): void {
    this.courses = this.apollo.watchQuery<Query>({
      query: gql`
      query courses{
        courses{
          description
          genero
        }
      }`
    })
    .valueChanges
    .pipe(
      map(result => result.data.courses)
    );
  }

   /* this.query.valueChanges.subscribe(result => {
      this.courses = result.data && result.data.employees;
    });

  }

  // tslint:disable-next-line:use-lifecycle-interface
  ngOnDestroy(): void {

  }*/

}
