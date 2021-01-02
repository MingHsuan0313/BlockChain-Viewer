import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FoodImageComponent } from './food-image.component';

describe('FoodImageComponent', () => {
  let component: FoodImageComponent;
  let fixture: ComponentFixture<FoodImageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FoodImageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FoodImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
