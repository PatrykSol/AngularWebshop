import { NgModule } from '@angular/core';
import { HttpClientModule, HttpHandler } from '@angular/common/http';
import { AuthGuardService } from './Auth-guard.service';
import { AuthService } from './Auth.service';
import { AdminComponent } from '../admin/admin.component';

@NgModule({
  declarations: [],
  imports: [HttpClientModule,AdminComponent],
  providers: [AuthGuardService, AuthService, HttpClientModule],
})
export class AuthModule {}