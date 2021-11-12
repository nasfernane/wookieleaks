import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthBackgroundComponent } from './auth-background.component';

describe('AuthBackgroundComponent', () => {
  let component: AuthBackgroundComponent;
  let fixture: ComponentFixture<AuthBackgroundComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AuthBackgroundComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthBackgroundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
