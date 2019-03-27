import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProblemeComponent } from './probleme.component';
import { ReactiveFormsModule } from '@angular/forms';

describe('ProblemeComponent', () => {
  let component: ProblemeComponent;
  let fixture: ComponentFixture<ProblemeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule], //ajouter
      declarations: [ ProblemeComponent ]
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
    expect(errors['minlength']).toBeTruthy();
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
    let zone = component.problemeForm.controls['prenom'];
    zone.setValue(' '.repeat(10))
    expect(zone.valid).toBeTruthy();
  });

  it('Zone PRÉNOM valide avec 2 espaces et 1 caractere', () => {
    let zone = component.problemeForm.controls['prenom'];
    zone.setValue('  a')
    expect(zone.valid).toBeTruthy();
  });

});
