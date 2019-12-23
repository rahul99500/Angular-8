import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder, FormArray } from '@angular/forms';
import { nameValidator } from './name.validator';
import { MustMatch } from './matchPassword.directive';
import { minSelectedCheckboxes } from './min-selected-checkboxes.validator';
import { of } from 'rxjs';

@Component({
  selector: 'app-model-driven-form',
  templateUrl: './model-driven-form.component.html',
  styleUrls: ['./model-driven-form.component.css']
})
export class ModelDrivenFormComponent implements OnInit {

  registerForm: FormGroup;
  submitted: boolean = false;

  selectedHobbiesNames: [string];

  skillsData = [{ id: 6, name: 'ml' }];
  genderData = [];


  constructor(private fb: FormBuilder) {

  }

  ngOnInit() {
    this.registerForm = this.fb.group({
      title: ['', Validators.required],
      firstName: ['', [Validators.required, nameValidator('Rahul')]],
      lastName: [''],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
      accept: [false, Validators.requiredTrue],
      address: this.fb.group({
        street: [''],
        city: [''],
        state: [''],
        zip: ['', Validators.required]
      }),
      skillsArray: this.fb.array([], minSelectedCheckboxes(2)),
      gender: [''],
      aliases: this.fb.array([
        this.fb.control(''),
        this.fb.control('')
      ])
    }, { validators: MustMatch("password", "confirmPassword") })


    // synchronous skills
    // this.skillsData = this.getSkills();
    // this.addSkillsCheckboxes();


    // async orders (could be a http service call)
    of(this.getSkills()).subscribe(orders => {
      console.log("################");
      this.skillsData = orders;
      this.addSkillsCheckboxes();
    });

    // synchronous genders
    this.genderData = this.getGenders();
    this.registerForm.controls.gender.patchValue(this.genderData[0].name)

    // asynchronous genders
    // of(this.getGenders()).subscribe(genders => {
    //   this.genderData = genders;
    //   this.registerForm.controls.gender.patchValue(this.genderData[0].name);
    // });
  }

  getSkills() {
    return [{ id: 1, name: 'java' },
    { id: 2, name: 'python' },
    { id: 3, name: 'angulra' },
    { id: 4, name: 'spark' }];
  }

  getGenders() {
    return [
      { id: '1', name: 'male' },
      { id: '2', name: 'female' },
      { id: '3', name: 'other' }
    ];
  }

  // adds the skill checkboxes dynamically to form using skilldata
  private addSkillsCheckboxes() {
    this.skillsData.forEach((skill, index) => {
      const control = new FormControl(skill.name === 'java');
      (this.registerForm.controls.skillsArray as FormArray).push(control);
    });
  }

  get aliases() {
    return this.registerForm.get('aliases') as FormArray;
  }

  addAlias() {
    this.aliases.push(this.fb.control(''));
  }

  updateName() {
    this.registerForm.patchValue({
      firstName: 'Rohit'
    })
  }

  get f() { return this.registerForm.controls; }


  onSubmit() {
    this.submitted = true;

    const selectedSkills = this.registerForm.value.skillsArray.map((isSelected, index) => {
      return isSelected ? this.skillsData[index].name : null;
    }).filter(name => {
      return !!name;
    });

    console.log("$$$$$$$$$$$$$$$$$$", selectedSkills);
    console.log("####", this.registerForm.value)
    // stop here if form is invalid
    if (this.registerForm.invalid) {
      return;
    }

    // display form values on success
    alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.registerForm.value, null, 4));
  }

  onReset() {
    this.submitted = false;
    this.registerForm.reset();
  }

  isValid(controlName: string) {
    const control = this.registerForm.get(controlName);
    return this.submitted && control.errors || ((control.touched || control.dirty) && control.errors)
  }

  hasError(controlName: string) {
    const control = this.registerForm.get(controlName);
    return (this.submitted && control.errors) || ((control.touched || control.dirty) && control.errors);
  }
}
