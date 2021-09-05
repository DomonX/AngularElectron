import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { RecipesRoutingModule } from "./recipes-routing.module";
import { RecipesComponent } from "./recipes.component";
import { NzInputModule } from "ng-zorro-antd/input";
import { NzSelectModule } from "ng-zorro-antd/select";
import { ReactiveFormsModule } from "@angular/forms";
import { RecipeListComponent } from "./components/smart/recipe-list/recipe-list.component";
import { RecipeDetailComponent } from "./components/smart/recipe-detail/recipe-detail.component";
import { RecipeAddComponent } from "./components/smart/recipe-add/recipe-add.component";
import { RecipeCardComponent } from "./components/dumb/recipe-card/recipe-card.component";
import { NzPaginationModule } from "ng-zorro-antd/pagination";

@NgModule({
  declarations: [
    RecipesComponent,
    RecipeListComponent,
    RecipeDetailComponent,
    RecipeAddComponent,
    RecipeCardComponent,
  ],
  imports: [
    CommonModule,
    RecipesRoutingModule,
    NzInputModule,
    NzSelectModule,
    NzPaginationModule,
    ReactiveFormsModule,
  ],
})
export class RecipesModule {}
