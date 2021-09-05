import { ElectronService } from "./../../core/services/electron/electron.service";
import { DataInMemory } from "./../../core/classes/data-inmemory";
import { Observable } from "rxjs";
import { Injectable } from "@angular/core";
import { RecipeDto, RecipeQuery } from "../models/recipes.models";
import { map, withLatestFrom } from "rxjs/operators";
import { CategoryService } from "./category.service";

@Injectable({
  providedIn: "root",
})
export class RecipeService extends DataInMemory<RecipeDto> {
  constructor(
    private electron: ElectronService,
    private categoryService: CategoryService
  ) {
    super(electron);
  }

  public load() {
    super.load("data/recipe/recipes.json");
  }

  public save() {
    super.save("data/recipe/recipes.json");
  }

  public getRecipes(query: RecipeQuery): Observable<RecipeDto[]> {
    return this.getFiltered(query)
      .pipe(
        map((i) =>
          i.slice(
            query.itemsOnPage * query.page,
            query.itemsOnPage * (query.page + 1)
          )
        )
      )
      .pipe(
        withLatestFrom(this.categoryService.get()),
        map(([recipes, categories]) => {
          return recipes.map((recipe) => ({
            ...recipe,
            category: categories.find(
              (category) => category.id === recipe.categoryId
            ),
          }));
        })
      );
  }

  public pagesCount(itemsOnPage: number): Observable<number> {
    return this.get().pipe(map((i) => Math.ceil(i.length / itemsOnPage)));
  }

  public page(itemsOnPage: number, page: number) {
    return this.get().pipe(
      map((i) => {
        return i.slice(itemsOnPage * page, itemsOnPage * (page + 1));
      })
    );
  }

  public countFiltered(query: RecipeQuery): Observable<number> {
    return this.getFiltered(query).pipe(map((i) => i.length));
  }

  private getFiltered(query: RecipeQuery): Observable<RecipeDto[]> {
    return super
      .get()
      .pipe(
        map((i) =>
          i.filter(
            (recipe) =>
              this.nameFilter(recipe, query.filters.name) &&
              (query.filters.category === 0 ||
                this.categoryFilter(recipe, query.filters.category))
          )
        )
      );
  }

  private nameFilter(item: RecipeDto, name: string): boolean {
    return item.name.toLowerCase().includes(name.toLowerCase());
  }

  private categoryFilter(item: RecipeDto, category: number): boolean {
    return item.categoryId === category;
  }
}
