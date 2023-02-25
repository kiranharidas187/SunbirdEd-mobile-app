import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SessionConfirmBookingsComponent } from './session-confirm-bookings.component';

describe('SessionConfirmBookingsComponent', () => {
  let component: SessionConfirmBookingsComponent;
  let fixture: ComponentFixture<SessionConfirmBookingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SessionConfirmBookingsComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SessionConfirmBookingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
