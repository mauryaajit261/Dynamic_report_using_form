import { Routes } from '@angular/router';
import { ConsultationFormComponent } from './components/consultation-form/consultation-form.component';
import { ConsultationListComponent } from './components/consultation-list/consultation-list.component';
import { VastuEnergyScanComponent } from './components/vastu-energy-scan/vastu-energy-scan.component';
import { VastuEnergyScanListComponent } from './components/vastu-energy-scan-list/vastu-energy-scan-list.component';
import { VastuVisitFormComponent } from './components/vastu-visit-form/vastu-visit-form.component';
import { VastuVisitListComponent } from './components/vastu-visit-list/vastu-visit-list.component';
import { LoginComponent } from './components/login/login.component';
import { authGuard } from './guards/auth.guard';
import { Vastuvisit2formComponent } from './components/vastuvisit2form/vastuvisit2form.component';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'form', component: ConsultationFormComponent, canActivate: [authGuard] },
  { path: 'form/:id', component: ConsultationFormComponent, canActivate: [authGuard] },
  { path: 'list', component: ConsultationListComponent, canActivate: [authGuard] },
  { path: 'vastu-energy-scan', component: VastuEnergyScanComponent, canActivate: [authGuard] },
  { path: 'vastu-energy-scan/:id', component: VastuEnergyScanComponent, canActivate: [authGuard] },
  { path: 'vastu-energy-scan-list', component: VastuEnergyScanListComponent, canActivate: [authGuard] },
  { path: 'vastu-visit-form', component: VastuVisitFormComponent, canActivate: [authGuard] },
  { path: 'vastu-visit-form/:id', component: VastuVisitFormComponent, canActivate: [authGuard] },
  { path: 'vastu-visit-form2', component: Vastuvisit2formComponent, canActivate: [authGuard] },
  { path: 'vastu-visit-list', component: VastuVisitListComponent, canActivate: [authGuard] }
];
