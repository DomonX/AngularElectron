import { Component, EventEmitter, OnInit } from "@angular/core";
import { fromEvent } from "rxjs";
import { filter } from "rxjs/operators";

@Component({
  selector: "app-menu",
  templateUrl: "./menu.component.html",
  styleUrls: ["./menu.component.scss"],
})
export class MenuComponent implements OnInit {
  public navVisible: boolean = false;

  public items: { label: string; icon: string; routerLink?: string }[];

  constructor() {
    this.items = [
      { label: "Strona Główna", icon: "home", routerLink: "home" },
      { label: "Przepisy", icon: "tags", routerLink: "recipes" },
      { label: "Ustawienia", icon: "setting", routerLink: "settings" },
    ];
  }

  public itemClicked(index: number): void {}

  public footerClicked(): void {
    this.navVisible = !this.navVisible;
  }

  ngOnInit(): void {}
}
