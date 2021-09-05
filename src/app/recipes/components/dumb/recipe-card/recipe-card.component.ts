import { Component, Input, OnInit } from "@angular/core";
import { Recipe } from "../../../models/recipes.models";

@Component({
  selector: "app-recipe-card",
  templateUrl: "./recipe-card.component.html",
  styleUrls: ["./recipe-card.component.scss"],
})
export class RecipeCardComponent implements OnInit {
  @Input() public recipe: Recipe;

  constructor() {}

  ngOnInit(): void {}
}
