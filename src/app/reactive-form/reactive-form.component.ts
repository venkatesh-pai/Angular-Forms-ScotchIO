import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';

@Component({
  selector: 'app-reactive-form',
  templateUrl: './reactive-form.component.html',
  styleUrls: ['./reactive-form.component.css']
})
export class ReactiveFormComponent implements OnInit {
  form: FormGroup;

  formErrors = {
    name: '',
    username: '',
    addresses: [
      {
        city: '',
        country: ''
      }
    ]
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
    },
    addresses: {
      city: {
        required: 'City is required',
        minlength: 'City must be at least 3 characters',
        maxlength: 'City can\'t be longer than 10 characters'
      },
      country: {
        required: 'Country is required',
        minlength: 'Country must be at least 3 characters',
        maxlength: 'Country can\'t be longer than 10 characters'
      }
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
      addresses: this.fb.array([])
    });

    this.addAddressForm();

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

    this.validateAddresses();
  }

  validateAddresses(): void {
    const addresses = this.form.get('addresses') as FormArray;
    // Clear existing errors
    this.formErrors.addresses = [];
    for (let n = 0; n < addresses.length; n++) {
      this.formErrors.addresses.push({ city: '', country: '' });
      const address = addresses.at(n) as FormGroup;
      // tslint:disable-next-line: forin
      for (const field in address.controls) {
        const input = address.get(field);
        if (input.invalid && input.dirty) {
          // tslint:disable-next-line: forin
          for (const error in input.errors) {
            this.formErrors.addresses[n][field] = this.validationMessages.addresses[field][error];
          }
        }
      }
    }
  }

  addAddressForm(): void {
    const addresses = this.form.get('addresses') as FormArray;
    addresses.push(this.fb.group({
      city: ['', [Validators.minLength(3), Validators.maxLength(10)]],
      country: ['', [Validators.minLength(3), Validators.maxLength(10)]]
    }));
  }

  removeAddressForm(index: number): void {
    const addresses = this.form.get('addresses') as FormArray;
    addresses.removeAt(index);
  }

  processForm(): void {
    console.log('processForm:', this.form.value);
  }
}
