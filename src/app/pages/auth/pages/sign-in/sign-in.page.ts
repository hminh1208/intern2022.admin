import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AccountAuthRequestDto } from '@core/models/auth.model';
import { ROUTER_UTILS } from '@core/utils/router.utils';
import { AuthService } from '../../services/auth.service';

@Component({
  templateUrl: './sign-in.page.html',
  styleUrls: ['./sign-in.page.css'],
})
export class SignInPage {
  returnUrl: string;
  email: string = "";
  password: string = "";

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private authService: AuthService,
  ) {
    this.returnUrl =
      this.activatedRoute.snapshot.queryParamMap.get('returnUrl') ||
      `/${ROUTER_UTILS.config.base.home}`;
  }

  onClickSignIn(): void {
    var requestDto  = {
        email: this.email,
        password: this.password
    } as AccountAuthRequestDto;

    this.authService.signIn(requestDto).subscribe((value) => {
       this.router.navigate([this.returnUrl]);
    });
  }
}
