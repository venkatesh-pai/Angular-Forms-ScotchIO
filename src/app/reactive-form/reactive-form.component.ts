import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-reactive-form',
  templateUrl: './reactive-form.component.html',
  styleUrls: ['./reactive-form.component.css']
})
export class ReactiveFormComponent implements OnInit {
  form: FormGroup;

  formErrors = {
    name: '',
    username: ''
  };

  validationMessages = {
    name: {
      required: 'Name is required',
      minlength: 'Name must be at least 3 characters',
      maxlength: 'Name can\'t be longer than 10 characters'
    },
    username: {
      required: 'Username is required',
      minlength: 'Username must be at least 3 characters',
      maxlength: 'Username can\'t be longer than 10 characters'
    }
  };

  nameError: string;
  usernameError: string;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.buildForm();
  }

  buildForm(): void {
    this.form = this.fb.group({
      name: ['', [Validators.minLength(3), Validators.maxLength(10)]],
      username: ['', [Validators.minLength(3), Validators.maxLength(10)]],
      addresses: this.fb.array([
        this.fb.group({
          city: [''],
          country: ['']
        })
      ])
    });

    this.form.valueChanges.subscribe(data => this.validateForm());
  }

  validateForm(): void {
    // tslint:disable-next-line: forin
    for (const field in this.formErrors) {
      // clear input field errors
      this.formErrors[field] = '';

      // grab an iput field by name
      const input = this.form.get(field);

      if (input.invalid && input.dirty) {
        // tslint:disable-next-line: forin
        for (const error in input.errors) {
          this.formErrors[field] = this.validationMessages[field][error];
        }
      }
    }
  }

  processForm(): void {
    console.log('processForm:', this.form.value);
  }
}
