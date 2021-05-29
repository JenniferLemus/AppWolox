import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LandingDetailComponent } from './landing-detail.component';

describe('LandingDetailComponent', () => {
  let component: LandingDetailComponent;
  let fixture: ComponentFixture<LandingDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LandingDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LandingDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
