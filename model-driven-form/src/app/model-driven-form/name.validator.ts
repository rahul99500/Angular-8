import { ValidatorFn, AbstractControl } from '@angular/forms';

export function nameValidator(name: string): ValidatorFn{
    return (control:AbstractControl):{[key:string]:any} | null =>{
        if(control.value === name)
            return {'forbiddednName': {value:control.value}}
        else    
            return null;
        }
}