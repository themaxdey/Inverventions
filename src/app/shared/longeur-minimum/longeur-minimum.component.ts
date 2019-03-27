import { ValidatorFn, AbstractControl } from '@angular/forms';

export class ZonesValidator{
    static plage(longeurMinimum: number): ValidatorFn{
        return (c: AbstractControl): { [key: string]: boolean } | null => {
            if(c.value && c.value.trim().length >= longeurMinimum){
                return null;
            }
            return { 'nbreCaracteresInsuffisants': true };
            //c.value.trim() pour enlever les espaces
            //c.value.lengh longeur de la chaine
        };
    }
}