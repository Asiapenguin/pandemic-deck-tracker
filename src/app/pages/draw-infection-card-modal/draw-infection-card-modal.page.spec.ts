import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DrawInfectionCardModalPage } from './draw-infection-card-modal.page';

describe('DrawInfectionCardModalPage', () => {
  let component: DrawInfectionCardModalPage;
  let fixture: ComponentFixture<DrawInfectionCardModalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DrawInfectionCardModalPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DrawInfectionCardModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
