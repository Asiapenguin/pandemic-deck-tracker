import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { InfectionCardRandomComponent } from './infection-card-random.component';

describe('InfectionCardRandomComponent', () => {
  let component: InfectionCardRandomComponent;
  let fixture: ComponentFixture<InfectionCardRandomComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InfectionCardRandomComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(InfectionCardRandomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
