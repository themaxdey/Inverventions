import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ZonesValidator } from '../shared/longeur-minimum/longeur-minimum.component';
import { ProblemeService } from './probleme.service';
import { ITypeProbleme } from './probleme';
import { emailMatcherValidator } from '../shared/email-matcher/email-matcher';


@Component({
  selector: 'Inter-probleme',
  templateUrl: './probleme.component.html',
  styleUrls: ['./probleme.component.css']
})
export class ProblemeComponent implements OnInit {
  
  problemeForm: FormGroup;
  typeProblemes: ITypeProbleme[];
  errorMessage: string;

  constructor(private fb:FormBuilder, private problemes: ProblemeService) { }

  ngOnInit() {
    this.problemeForm = this.fb.group({
      prenom: ['',[ZonesValidator.plage(3), Validators.required]],
      nom: ['',[ZonesValidator.plage(3), Validators.required]],
      noProbleme: ['', Validators.required],
      noTypeProbleme: ['', Validators.required],
      courrielGroup: this.fb.group({
        courriel: [{value: '', disabled: true}],
        courrielConfirmation: [{value: '', disabled: true}],
      }),
      telephone: [{value: '', disabled: true}],
      notification: ['pasnotification']
    });

    this.problemes.obtenirProblemes()
    .subscribe(cat => this.typeProblemes = cat,
               error => this.errorMessage = <any>error);
      
               this.problemeForm.get('notification').valueChanges.subscribe(value => this.gestionNotifications(value));
  }

  gestionNotifications(typeNotification: String): void {
    const telephone = this.problemeForm.get('telephone');
    const courriel = this.problemeForm.get('courrielGroup.courriel');
    const courrielConfirmation = this.problemeForm.get('courrielGroup.courrielConfirmation');
    const courrielGroup = this.problemeForm.get('courrielGroup');

    telephone.clearValidators();
    telephone.reset();
    telephone.disable();

    courriel.clearValidators();
    courriel.reset();
    courriel.disable();

    courrielConfirmation.clearValidators();
    courrielConfirmation.reset();
    courrielConfirmation.disable();

    if(typeNotification == 'telephone'){

      telephone.enable();
      telephone.setValidators([Validators.required]);   
    }

    if(typeNotification == 'courriel'){

      courriel.enable();
      courrielGroup.setValidators([Validators.compose([emailMatcherValidator.courrielDifferents()])]);       
      courriel.setValidators([Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+')]);

      courrielConfirmation.enable();
      courrielConfirmation.setValidators([Validators.required]);

    } else {
      if(typeNotification === "Inconnu"){
        courrielConfirmation.updateValueAndValidity();
        courrielConfirmation.disable();
      }
    }
    
    telephone.updateValueAndValidity();
    courriel.updateValueAndValidity();
    courrielConfirmation.updateValueAndValidity();
  
  }

}
