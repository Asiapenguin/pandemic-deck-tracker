import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { InfectionDeckPage } from './infection-deck.page';

describe('InfectionDeckPage', () => {
  let component: InfectionDeckPage;
  let fixture: ComponentFixture<InfectionDeckPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InfectionDeckPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(InfectionDeckPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
