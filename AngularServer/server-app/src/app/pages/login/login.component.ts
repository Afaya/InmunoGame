import { Component, OnInit } from '@angular/core';
import { AuthorizationService } from 'src/app/services/authorization.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl  } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  message: string;
  showMessage: boolean;

  loginForm = this.formBuilder.group({
    username: ['', Validators.required],
    password: ['', Validators.required],
  });
  ruleForm: FormGroup;

  constructor(private router: Router,  private authService: AuthorizationService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    const isAutoLogout = localStorage.getItem('isAutoLogout');

    if (isAutoLogout === 'true') {
      localStorage.setItem('isAutoLogout', 'false');
      this.message = 'Se ha auto cerrado la sesión por tiempo de inactividad. Debe loguearse de nuevo.';
      this.showMessage = true;
    }
  }

  onSubmit() {
    this.authService.userAuthentication(this.loginForm.value.username, this.loginForm.value.password).subscribe(
      response => {
        this.authService.setSession(response);
        this.router.navigate(['/home']);
      }, err => {
        if (err && err.message && err.message.indexOf('401') > -1) {
          this.message = 'Usuario o contraseña incorrectas.';
        } else if (err && err.message && err.message.indexOf('500') > -1) {
          this.message = 'Error de Servidor.';
        } else {
          this.message = 'No se ha podido conectar';
        }

        this.showMessage = true;
      }
    );
  }
}
