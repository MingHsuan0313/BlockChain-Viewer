import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FoodImageReplaceComponent } from './food-image-replace.component';

describe('FoodImageReplaceComponent', () => {
  let component: FoodImageReplaceComponent;
  let fixture: ComponentFixture<FoodImageReplaceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FoodImageReplaceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FoodImageReplaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
