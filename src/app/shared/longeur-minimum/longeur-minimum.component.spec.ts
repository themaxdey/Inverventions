import { ZonesValidator } from "./longeur-minimum.component";
import { AbstractControl } from '@angular/forms';

describe('Zones Validator', () => {
    it('Chaine avec 10 espaces est invalide', () => {
        //Preparer une variable pour manipuler le validateur
        let validator = ZonesValidator.plage(3);
        let control = { value: '          '};
        // Faire l'appel du validateur
        let result= validator(control as AbstractControl);
        // Comparer le resultat OBTENU avec le resultat PREVU
        expect(result['nbreCaracteresInsuffisants']).toBe(true);
    });

    it('Une phrase avec des mots est valide', () => {
        //Preparer une variable pour manipuler le validateur
        let validator = ZonesValidator.plage(3);
        let control = { value: 'Vive angular'};
        // Faire l'appel du validateur
        let result= validator(control as AbstractControl);
        // Comparer le resultat OBTENU avec le resultat PREVU
        expect(result).toBeNull();
    });
    
    it('Une phrase avec 3 espaces, des mots et ensuite 3 espaces est valide', () => {
        //Preparer une variable pour manipuler le validateur
        let validator = ZonesValidator.plage(3);
        let control = { value: ' je le veux '};
        // Faire l'appel du validateur
        let result= validator(control as AbstractControl);
        // Comparer le resultat OBTENU avec le resultat PREVU
        expect(result).toBeNull();
    });

    it('Une phrase avec 1 espace et 2 caractères est invalide.', () => {
        //Preparer une variable pour manipuler le validateur
        let validator = ZonesValidator.plage(3);
        let control = { value: ' xx'};
        // Faire l'appel du validateur
        let result= validator(control as AbstractControl);
        // Comparer le resultat OBTENU avec le resultat PREVU
        expect(result['nbreCaracteresInsuffisants']).toBe(true);
    });

    it('Une phrase avec 2 espaces et 1 caractère est invalide.', () => {
        //Preparer une variable pour manipuler le validateur
        let validator = ZonesValidator.plage(3);
        let control = { value: '  x'};
        // Faire l'appel du validateur
        let result= validator(control as AbstractControl);
        // Comparer le resultat OBTENU avec le resultat PREVU
        expect(result['nbreCaracteresInsuffisants']).toBe(true);
    });

    it('Une phrase avec 3 espaces et 3 caractères est valide', () => {
        //Preparer une variable pour manipuler le validateur
        let validator = ZonesValidator.plage(3);
        let control = { value: ' xxx' };
        // Faire l'appel du validateur
        let result= validator(control as AbstractControl);
        // Comparer le resultat OBTENU avec le resultat PREVU
        expect(result).toBeNull();
    });

    it('Une phrase avec 5 espaces, 5 caractères et 5 espaces est valide', () => {
        //Preparer une variable pour manipuler le validateur
        let validator = ZonesValidator.plage(3);
        let control = { value: '  xxxxx  ' };
        // Faire l'appel du validateur
        let result= validator(control as AbstractControl);
        // Comparer le resultat OBTENU avec le resultat PREVU
        expect(result).toBeNull();
    });

    it('Une chaîne nulle est invalide.', () => {
        //Preparer une variable pour manipuler le validateur
        let validator = ZonesValidator.plage(3);
        let control = { value: null};
        // Faire l'appel du validateur
        let result= validator(control as AbstractControl);
        // Comparer le resultat OBTENU avec le resultat PREVU
        expect(result['nbreCaracteresInsuffisants']).toBe(true);
    });
});