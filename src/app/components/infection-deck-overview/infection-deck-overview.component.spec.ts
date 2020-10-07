import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { InfectionDeckOverviewComponent } from './infection-deck-overview.component';

describe('InfectionDeckOverviewComponent', () => {
  let component: InfectionDeckOverviewComponent;
  let fixture: ComponentFixture<InfectionDeckOverviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InfectionDeckOverviewComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(InfectionDeckOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
