import { TestBed } from '@angular/core/testing';

import { WordcountService } from './wordcount.service';

describe('WordcountService', () => {
  let service: WordcountService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WordcountService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
