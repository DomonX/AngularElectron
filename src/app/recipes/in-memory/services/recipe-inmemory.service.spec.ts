import { TestBed } from '@angular/core/testing';

import { RecipeInmemoryService } from './recipe-inmemory.service';

describe('RecipeInmemoryService', () => {
  let service: RecipeInmemoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RecipeInmemoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
