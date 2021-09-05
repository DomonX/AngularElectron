import { Component, ElementRef, ViewChild } from "@angular/core";
import { ElectronService } from "./core/services";
import { TranslateService } from "@ngx-translate/core";
import { APP_CONFIG } from "../environments/environment";
import { fromEvent } from "rxjs";
import { filter } from "rxjs/operators";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent {
  public navVisible: boolean = false;
  public theme: string = "navy";

  constructor(
    private electronService: ElectronService,
    private translate: TranslateService
  ) {
    this.translate.setDefaultLang("en");
    fromEvent<KeyboardEvent>(document, "keydown").subscribe((i) => {
      if (i.key === "1") {
        this.theme = "navy";
      }
      if (i.key === "2") {
        this.theme = "blue";
      }

      if (i.key === "3") {
        this.theme = "red";
      }
    });
  }
}
