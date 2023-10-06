import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SplashScreenComponent } from './splash-screen.component';

xdescribe('SplashScreenComponent', () => {
  let component: SplashScreenComponent;
  let fixture: ComponentFixture<SplashScreenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SplashScreenComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SplashScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
