import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-reactive-form',
  templateUrl: './reactive-form.component.html',
  styleUrls: ['./reactive-form.component.css']
})
export class ReactiveFormComponent implements OnInit {
  form: FormGroup;
  nameError: string;
  usernameError: string;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      name: ['', [Validators.minLength(3), Validators.maxLength(10)]],
      username: ['', [Validators.minLength(3), Validators.maxLength(10)]]
    });


    this.form.valueChanges.subscribe(
      data => {
        console.log('this.form.valueChanges:', data);
        const name = this.form.get('name');
        const username = this.form.get('username');
        this.nameError = '';
        this.usernameError = '';

        if (name.invalid && name.dirty) {
          if (name.errors.required) {
            this.nameError = 'Name is required';
          }
          else if (name.errors.minlength) {
            this.nameError = 'Name must be at least 3 characters';
          }
          else if (name.errors.maxlength) {
            this.nameError = 'Name cannot be more than 10 characters';
          }
        }

        if (username.invalid && username.dirty) {
          if (username.errors.required) {
            this.usernameError = 'Username is required';
          }
          else if (username.errors.minlength) {
            this.usernameError = 'Username must be at least 3 characters';
          }
          else if (username.errors.maxlength) {
            this.usernameError = 'Username cannot be more than 10 characters';
          }
        }
      }
    );
  }

  processForm(): void {
    console.log('processForm:', this.form.value);
  }
}
