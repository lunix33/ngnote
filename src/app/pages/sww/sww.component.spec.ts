import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SwwComponent } from './sww.component';

describe('SwwComponent', () => {
  let component: SwwComponent;
  let fixture: ComponentFixture<SwwComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SwwComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SwwComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
