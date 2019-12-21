import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder, FormArray } from '@angular/forms';
import { nameValidator } from './name.validator';

@Component({
  selector: 'app-model-driven-form',
  templateUrl: './model-driven-form.component.html',
  styleUrls: ['./model-driven-form.component.css']
})
export class ModelDrivenFormComponent implements OnInit {

  myForm;

  constructor(private fb: FormBuilder) { }

onSubmit() {
  // TODO: Use EventEmitter with form value
  alert(JSON.stringify(this.myForm.value));
}

  ngOnInit() {
    this.myForm = this.fb.group({
      firstName: ['', [Validators.required, nameValidator('Rahul')]],
      lastName: [''],
      address: this.fb.group({
        street: [''],
        city: [''],
        state: [''],
        zip: ['', Validators.required]
      }),
      aliases: this.fb.array([
        this.fb.control(''),
        this.fb.control('')
      ])
    })
  }

  get firstName()
  {
    return this.myForm.get('firstName');
  }

  get zip(){
    return this.myForm.get("address").get("zip");
  }
  get aliases() {
    return this.myForm.get('aliases') as FormArray;
  }

  addAlias() {
    this.aliases.push(this.fb.control(''));
  }

  updateName(){
    this.myForm.patchValue({
      firstName: 'Rohit'
    })
  }
}
