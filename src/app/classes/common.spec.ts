import { InitInjector, InjectorInstance } from './common';
import { TestBed } from '@angular/core/testing';
import { Injector } from '@angular/core';

describe('Common', () => {
  beforeEach(() => {
    TestBed.configureTestingModule
  })

  it('can set Injector', () => {
    const inj = TestBed.get(Injector);
    InitInjector(inj)
    expect(InjectorInstance).toBe(inj);
  });
});
