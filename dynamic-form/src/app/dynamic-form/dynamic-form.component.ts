import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

import { FormData } from '../shared/form.interface';
import {forbiddenNameValidator} from './unique.directive';
@Component({
  selector: 'app-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.css']
})
export class DynamicFormComponent implements OnInit {

  form: FormGroup;
  mockData: FormData[];
  constructor() { }

  ngOnInit() {
    this.mockData = [
      {
        controlName: 'firstName',
        controlType: 'text',
        valueType: 'text',
        placeholder: 'Enter firstName',
        validators: {
          required: true,
          minlength: 5,
          forbiddenName: 'rahul'
        }
      },
      {
        controlName: 'lastName',
        controlType: 'text',
        valueType: 'text',
        placeholder: 'Enter lastName',
        validators: {
          required: true,
          minlength: 5,
          forbiddenName: 'saini'
        }
      },
      {
        controlName: 'Telephone',
        placeholder: 'Enter Phone',
        valueType: 'tel',
        controlType: 'text',
        validators: {
          required: true,
          minlength: 7,
          maxlength: 10
        }
      },
      {
        controlName: 'Email',
        valueType: 'email',
        placeholder: 'Enter email',
        controlType: 'text',
        validators: {
          required: true
        }
      },
      {
        controlName: 'Gender',
        placeholder: 'Select gender',
        controlType: 'select',
        options: [{
          optionName: 'Male',
          value: 'male'
        }, {
          optionName: 'Female',
          value: 'female'
        }],
        validators: {
          required: true
        }
      },
      {
        controlName: 'Vehicle you own',
        placeholder: 'Select vehicle',
        controlType: 'radio',
        options: [{
          optionName: 'I have a bike',
          value: 'bike'
        }, {
          optionName: 'I have a car',
          value: 'car'
        }],
        validators: {
          required: true,
          
        }
      },
      {
        controlName: 'country',
        placeholder: 'Select country',
        controlType: 'select',
        options: [{
          optionName: 'IN',
          value: 'India'
        }, {
          optionName: 'US',
          value: 'America'
        },
        {
          optionName: 'Pk',
          value: 'Pakistan'
        }],
        validators: {
          required: true
        }
      }

    ]

    const formGroup = {};
    this.mockData.forEach(control =>{
      formGroup[control.controlName] = new FormControl('',[]);
    })

    this.form = new FormGroup(formGroup);

  }

  


}
