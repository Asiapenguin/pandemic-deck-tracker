import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { KnownInfectionDeckComponent } from './known-infection-deck.component';

describe('KnownInfectionDeckComponent', () => {
  let component: KnownInfectionDeckComponent;
  let fixture: ComponentFixture<KnownInfectionDeckComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KnownInfectionDeckComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(KnownInfectionDeckComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
