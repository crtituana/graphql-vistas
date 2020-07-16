import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, FormControl } from '@angular/forms';
import { map } from 'rxjs/operators';
import { SignupService } from '../servicios/signup.service';
import { User } from '../models/user';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  suForm: FormGroup;

  constructor(private fb: FormBuilder, private ss: SignupService) { }

  public signup(): void {
    // tslint:disable-next-line:new-parens
    const user = new User;
    user.name = this.name.value;
    user.email = this.email.value;
    user.password = this.password.value;
    this.ss.register(user).subscribe((created: User) => {
      alert('Registro exitoso');
      this.suForm.reset();
    });
  }

  ngOnInit(): void {
    this.suForm = this.fb.group({
      name: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required),
      password: new FormControl('' , Validators.required)
    });
  }

  get name(): AbstractControl {
    return this.suForm.get('name');
  }

  get email(): AbstractControl {
    return this.suForm.get('email');
  }

  get password(): AbstractControl {
    return this.suForm.get('password');
  }

}
