import { InMemoryFile } from "../../core/models/inmemory-file.model";

export interface CategoryFile extends InMemoryFile<CategoryDto> {}

export interface CategoryDto {
  id: number;
  name: string;
}

export interface Category extends CategoryDto {}

export interface Recipe {
  id: number;
  name: string;
  parts: Part[];
  steps: string[];
  category: Category;
}

export interface Part {
  ingridients: string[];
  steps: string[];
}

export interface RecipeDto {
  id: number;
  name: string;
  steps: string[];
  categoryId: number;
}

export interface RecipeFile extends InMemoryFile<RecipeDto> {}

export interface RecipeQuery {
  filters: {
    name: string;
    category: number;
  };
  itemsOnPage: number;
  page: number;
}
