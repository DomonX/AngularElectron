import { CategoryService } from "./../../../services/category.service";
import { CategoryDto, RecipeQuery } from "./../../../models/recipes.models";
import { RecipeService } from "./../../../services/recipe.service";
import { BehaviorSubject, combineLatest, Observable, of } from "rxjs";
import { Component, OnInit } from "@angular/core";
import { RecipeDto } from "../../../models/recipes.models";
import { FormControl } from "@angular/forms";
import {
  debounceTime,
  map,
  shareReplay,
  startWith,
  switchMap,
  tap,
} from "rxjs/operators";

@Component({
  selector: "app-recipe-list",
  templateUrl: "./recipe-list.component.html",
  styleUrls: ["./recipe-list.component.scss"],
})
export class RecipeListComponent implements OnInit {
  public recipes$: Observable<RecipeDto[]> = of([]);
  public categories$: Observable<any[]> = of([]);

  public count$: Observable<number>;

  private nameFilter: FormControl = new FormControl();
  private categoryFilter: FormControl = new FormControl();

  private page: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  private pageSize: BehaviorSubject<number> = new BehaviorSubject<number>(6);

  constructor(
    private recipeService: RecipeService,
    private categoryService: CategoryService
  ) {
    const query$ = combineLatest([
      this.nameFilter.valueChanges.pipe(debounceTime(200), startWith("")),
      this.categoryFilter.valueChanges.pipe(
        debounceTime(200),
        startWith(0),
        map((i) => i ?? 0)
      ),
      this.page,
      this.pageSize,
    ]).pipe(
      shareReplay(1),
      map(
        ([name, category, page, itemsOnPage]) =>
          ({
            filters: { name, category },
            itemsOnPage,
            page,
          } as RecipeQuery)
      )
    );

    this.recipes$ = query$.pipe(
      switchMap((query) => this.recipeService.getRecipes(query))
    );

    this.count$ = query$.pipe(
      switchMap((query) => this.recipeService.countFiltered(query))
    );

    this.categories$ = categoryService.get().pipe(
      map((i) => {
        return i.map((j) => ({ label: j.name, value: j.id }));
      })
    );
  }

  public pageChange(page: number): void {
    this.page.next(page - 1);
  }

  public pageSizeChange(size: number): void {
    this.pageSize.next(size);
  }

  ngOnInit(): void {}
}
