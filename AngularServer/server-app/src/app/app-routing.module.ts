import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardService } from './services/auth-guard.service';
import { LoginComponent } from './pages/login/login.component';
import { SensorHomeComponent } from './pages/sensor-home/sensor-home.component';
import { EvolutionDataComponent } from './pages/evolution-data/evolution-data.component';


const routes: Routes = [
  { path: '', component: LoginComponent, canActivate: [AuthGuardService], data: { expectedRole: 'login'} },
  { path: 'login', component: LoginComponent, canActivate: [AuthGuardService], data: { expectedRole: 'login'} },
  { path: 'home', component: SensorHomeComponent, canActivate: [AuthGuardService], data: { expectedRole: ''} },
  { path: 'evolution', component: EvolutionDataComponent, canActivate: [AuthGuardService], data: { expectedRole: ''} }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
