import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { RecipeAddComponent } from "./components/smart/recipe-add/recipe-add.component";
import { RecipeDetailComponent } from "./components/smart/recipe-detail/recipe-detail.component";
import { RecipeListComponent } from "./components/smart/recipe-list/recipe-list.component";

const routes: Routes = [
  { path: "", component: RecipeListComponent },
  { path: "add", component: RecipeAddComponent },
  { path: ":id/edit", component: RecipeDetailComponent },
  { path: ":id", component: RecipeDetailComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RecipesRoutingModule {}
