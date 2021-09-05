import { CategoryDto } from "./../models/recipes.models";
import { DataInMemory } from "./../../core/classes/data-inmemory";
import { Injectable } from "@angular/core";
@Injectable({
  providedIn: "root",
})
export class CategoryService extends DataInMemory<CategoryDto> {
  public load() {
    super.load("data/recipe/category.json");
  }

  public save() {
    super.save("data/recipe/category.json");
  }
}
