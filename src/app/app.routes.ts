import { Routes } from '@angular/router';
import { ReminderComponent } from './reminder/reminder.component';

export const routes: Routes = [
     { path: '', redirectTo: 'reminder', pathMatch: 'full' },
  { path: 'reminder', component: ReminderComponent }
];
