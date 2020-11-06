import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { UnknownInfectionDeckComponent } from './unknown-infection-deck.component';

describe('UnknownInfectionDeckComponent', () => {
  let component: UnknownInfectionDeckComponent;
  let fixture: ComponentFixture<UnknownInfectionDeckComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UnknownInfectionDeckComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(UnknownInfectionDeckComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
