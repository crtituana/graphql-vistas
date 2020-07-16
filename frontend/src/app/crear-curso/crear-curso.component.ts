import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, FormControl } from '@angular/forms';
import { map } from 'rxjs/operators';
import { CourseService } from '../servicios/course.service';
import { Course } from '../models/course';


@Component({
  selector: 'app-crear-curso',
  templateUrl: './crear-curso.component.html',
  styleUrls: ['./crear-curso.component.css']
})
export class CrearCursoComponent implements OnInit {
  suForm: FormGroup;

  constructor(private fb: FormBuilder,
              private courseService: CourseService) { }

  public crearCourse(): void {
    // tslint:disable-next-line:new-parens
    const course = new Course;
    course.description = this.description.value;
    course.genero = this.genero.value;
    this.courseService.crearCourse(course).subscribe((created: Course) => {
      alert('Registro exitoso');
      this.suForm.reset();
    });
  }
  ngOnInit(): void {
    this.suForm = this.fb.group({
      description: new FormControl('', Validators.required),
      genero: new FormControl('', Validators.required)
    });

  }

  get description(): AbstractControl {
    return this.suForm.get('description');
  }

  get genero(): AbstractControl {
    return this.suForm.get('genero');

  }
}
