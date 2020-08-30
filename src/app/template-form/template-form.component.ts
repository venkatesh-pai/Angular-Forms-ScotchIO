import { Component, OnInit } from '@angular/core';

export class User {
  name: string;
  username: string;
}

@Component({
  selector: 'app-template-form',
  templateUrl: './template-form.component.html',
  styleUrls: ['./template-form.component.css']
})
export class TemplateFormComponent implements OnInit {
  user: User;

  constructor() { }

  ngOnInit(): void {
    this.user = { name: '', username: '' };
  }

  get diagnostic(): string {
    return JSON.stringify(this.user);
  }
}
