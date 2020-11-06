import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { RemovedDeckComponent } from './removed-deck.component';

describe('RemovedDeckComponent', () => {
  let component: RemovedDeckComponent;
  let fixture: ComponentFixture<RemovedDeckComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RemovedDeckComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(RemovedDeckComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
