import { ValidatorFn, AbstractControl } from "@angular/forms";

export function forbiddenNameValidator(name:string): ValidatorFn {
    return (control: AbstractControl): {[key: string]: any} | null => {
        if(control.value)
           return (control.value.toLowerCase() === name.toLowerCase()) ? {'forbiddenName': {value: control.value}}: null;
        else
            return null;
    };
}

// equal-validator.directive.ts

import { Directive, forwardRef, Attribute, Input } from '@angular/core';
import { Validator, NG_VALIDATORS } from '@angular/forms';
import { NgIf } from '@angular/common';
@Directive({
    selector: '[forbiddenName]',
    providers: [
        { provide: NG_VALIDATORS, useExisting: EqualValidator, multi: true }
    ]
})
export class EqualValidator implements Validator {

    @Input('forbiddenName') forbiddenName: string;

    constructor( ) {}

    validate(control: AbstractControl): { [key: string]: any } | null{
        return this.forbiddenName? forbiddenNameValidator(this.forbiddenName)(control):null;
    }
}
