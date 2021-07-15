import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettingComponent } from './components/setting/setting.component';
import { SettingRoutingModule } from './setting-routing.module';
import { SharedModule } from '../shared/shared.module';
import { UserComponent } from './components/user/user.component';


@NgModule({
  declarations: [SettingComponent, UserComponent,],
  imports: [
    CommonModule,
    SettingRoutingModule,
    SharedModule,
  ]
})
export class SettingModule { }
