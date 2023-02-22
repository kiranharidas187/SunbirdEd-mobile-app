import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MentorCardComponent } from './mentor-card.component';

describe('MentorCardComponent', () => {
  let component: MentorCardComponent;
  let fixture: ComponentFixture<MentorCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MentorCardComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MentorCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
