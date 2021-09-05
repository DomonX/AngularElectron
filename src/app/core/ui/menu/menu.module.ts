import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MenuComponent } from "./menu.component";
import { NzIconModule } from "ng-zorro-antd/icon";
import * as icons from "@ant-design/icons-angular/icons";
import { RouterModule } from "@angular/router";
@NgModule({
  declarations: [MenuComponent],
  imports: [
    CommonModule,
    RouterModule,
    NzIconModule.forRoot([
      icons.HomeFill,
      icons.DownOutline,
      icons.TagsFill,
      icons.SettingFill,
    ]),
  ],
  exports: [MenuComponent],
})
export class MenuModule {}
