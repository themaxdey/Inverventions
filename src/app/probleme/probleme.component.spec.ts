import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProblemeComponent } from './probleme.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ProblemeService } from './probleme.service';
import { HttpClientModule } from '@angular/common/http';

describe('ProblemeComponent', () => {
  let component: ProblemeComponent;
  let fixture: ComponentFixture<ProblemeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, HttpClientModule], //ajouter
      declarations: [ ProblemeComponent ],
      providers:[ProblemeService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProblemeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });

  it('Zone PRÉNOM invalide avec 2 caractères', () => {
    let errors = {};
    let zone = component.problemeForm.get('prenom');
    zone.setValue('a'.repeat(2))
    errors = zone.errors || {};
    expect(errors['nbreCaracteresInsuffisants']).toBeTruthy();
  });

  it('Zone PRÉNOM valide avec 3 caractères', () => {
    let zone = component.problemeForm.controls['prenom'];
    zone.setValue('a'.repeat(3))
    expect(zone.valid).toBeTruthy();
  });

  it('Zone PRÉNOM valide avec 200 caractères', () => {
    let zone = component.problemeForm.controls['prenom'];
    zone.setValue('a'.repeat(200))
    expect(zone.valid).toBeTruthy();
  });
  
  it('Zone PRÉNOM invalide avec aucun caractères', () => {
    let errors = {};
    let zone = component.problemeForm.get('prenom');
    errors = zone.errors || {};
    expect(errors['required']).toBeTruthy();
  });

  it('Zone PRÉNOM valide avec 10 espaces', () => {
    let errors = {};
    let zone = component.problemeForm.controls['prenom'];
    zone.setValue(' '.repeat(10))
    errors = zone.errors || {};
    expect(errors['nbreCaracteresInsuffisants']).toBeTruthy();
  });

  it('Zone PRÉNOM valide avec 2 espaces et 1 caractere', () => {
    let errors = {};
    let zone = component.problemeForm.controls['prenom'];
    zone.setValue('  a')
    errors = zone.errors || {};
    expect(errors['nbreCaracteresInsuffisants']).toBeTruthy();
  });

  it(' Zone TELEPHONE est désactivée quand ne pas me notifier', () => { //wertyuiop;
    component.gestionNotifications('pasNotif');

    let zone = component.problemeForm.get('courrielGroup.telephone');
    expect(zone.status).toEqual('DISABLED');
  });

  it('Zone TELEPHONE est vide quand ne pas me notifier ', () => {
    component.gestionNotifications('pasNotif');

    let zone = component.problemeForm.get('courrielGroup.telephone');
    expect(zone.status).toEqual('DISABLED');
  });

  it(' Zone ADRESSE COURRIEL est désactivée quand ne pas me notifier ', () => {
    component.gestionNotifications('pasNotif');

    let zone = component.problemeForm.get('courrielGroup.courriel');
    expect(zone.status).toEqual('DISABLED');
  });

  it(' Zone CONFIRMER COURRIEL est désactivée quand ne pas me notifier ', () => {
    component.gestionNotifications('pasNotif');

    let zone = component.problemeForm.get('courrielGroup.courrielConfirmation');
    expect(zone.status).toEqual('DISABLED');
  });

  it('#19 | Zone TELEPHONE est désactivée quand notifier par courriel', () => {
    component.gestionNotifications('couriel');

    let zone = component.problemeForm.get('courrielGroup.telephone');
    expect(zone.status).toEqual('DISABLED');
  });

  it('#20 | Zone ADRESSE COURRIEL est activée quand notifier par courriel ', () => {
    component.gestionNotifications('courriel');

    let zone = component.problemeForm.get('courrielGroup.courriel');
    expect(zone.enabled).toBeTruthy();
  });

  it('#21 | Zone CONFIRMER COURRIEL est activée quand notifier par courriel ', () => {
    component.gestionNotifications('courriel');

    let zone = component.problemeForm.get('courrielGroup.courrielConfirmation');
    expect(zone.enabled).toBeTruthy();
  });

  it('#22 | Zone ADRESSE COURRIEL est invalide sans valeur quand notifier par courriel ', () => {
    component.gestionNotifications('courriel');

    let zone = component.problemeForm.get('courrielGroup.courriel');
    zone.setValue('')
    expect(zone.status).toEqual('INVALID');
  });

  it('#23 | Zone CONFIRMER COURRIEL est invalide sans valeur quand notifier par courriel ', () => {
    component.gestionNotifications('courriel');

    let zone = component.problemeForm.get('courrielGroup.courrielConfirmation');
    zone.setValue('')
    expect(zone.status).toEqual('INVALID');
  });

  it('#24 | Zone ADRESSE COURRIEL est invalide avec un format non conforme', () => {
    component.gestionNotifications('courriel');

    let zone = component.problemeForm.get('courrielGroup.courriel');
    zone.setValue('ee')

    expect(zone.status).toEqual('INVALID');
  });

  it('#25 | Zone ADRESSE COURRIEL sans valeur et Zone CONFIRMER COURRIEL avec valeur valide retourne null ', () => {
    component.gestionNotifications('courriel');
    let errors = {};

    let zone = component.problemeForm.get('courrielGroup.courriel');
    let zone01 = component.problemeForm.get('courrielGroup.courrielConfirmation');

    zone.setValue('')
    zone01.setValue('jeansebastien@yahoo.fr');

    let groupe = component.problemeForm.get('courrielGroup');
    errors = groupe.errors || {};

    expect(errors['match']).toBeUndefined();
  });

  it('#26 | Zone ADRESSE COURRIEL avec valeur valide et Zone CONFIRMER COURRIEL sans valeur retourne null ', () => {
    component.gestionNotifications('courriel');
    let errors = {};

    let zone = component.problemeForm.get('courrielGroup.courriel');
    let zone01 = component.problemeForm.get('courrielGroup.courrielConfirmation');

    zone.setValue('jeansebastien@yahoo.fr')
    zone01.setValue('');

    let groupe = component.problemeForm.get('courrielGroup');
    errors = groupe.errors || {};

    expect(errors['match']).toBeUndefined();
  });

  it('#27 | Zones ADRESSE COURRIEL et CONFIRMER COURRIEL sont invalides si les valeurs sont différentes quand notifier par courriel ', () => {
    component.gestionNotifications('courriel');
    let errors = {};

    let zone = component.problemeForm.get('courrielGroup.courriel');
    let zone01 = component.problemeForm.get('courrielGroup.courrielConfirmation');

    zone.setValue('eeee')
    zone01.setValue('aaa');

    let groupe = component.problemeForm.get('courrielGroup');
    errors = groupe.errors || {};

    expect(errors['match']).toBe(true);
  });

  it('#28 | Zones ADRESSE COURRIEL et CONFIRMER COURRIEL sont valides si les valeurs sont identiques quand notifier par courriel', () => {
    component.gestionNotifications('courriel');
    let errors = {};

    let zone = component.problemeForm.get('courrielGroup.courriel');
    let zone01 = component.problemeForm.get('courrielGroup.courrielConfirmation');

    zone.setValue('jeansebastien@yahoo.fr')
    zone01.setValue('jeansebastien@yahoo.fr');

    let groupe = component.problemeForm.get('courrielGroup');
    errors = groupe.errors || {};

    expect(errors['match']).toBeUndefined();
  });


});
