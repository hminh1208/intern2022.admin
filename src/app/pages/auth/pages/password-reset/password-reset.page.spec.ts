import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { PasswordResetPage } from './password-reset.page';

describe('PasswordResetPage', () => {
  let component: PasswordResetPage;
  let fixture: ComponentFixture<PasswordResetPage>;

  beforeEach(
    waitForAsync(async () => {
      await TestBed.configureTestingModule({
        declarations: [PasswordResetPage],
        teardown: { destroyAfterEach: false },
      }).compileComponents();
    }),
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(PasswordResetPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
