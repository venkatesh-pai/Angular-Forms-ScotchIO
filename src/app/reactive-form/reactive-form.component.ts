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
      name: [''],
      username: ['']
    });


    this.form.valueChanges.subscribe(
      data => {
        console.log('this.form.valueChanges:', data);
        const name = this.form.get('name');
        const username = this.form.get('username');

        if (name.invalid && name.dirty) {
          this.nameError = 'Name is required';
        }

        if (username.invalid && username.dirty) {
          this.usernameError = 'Username is required';
        }
      }
    );
  }

  processForm(): void {
    console.log('processForm:', this.form.value);
  }
}
