import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HerbBoxComponent } from './herb-box.component';

describe('HerbBoxComponent', () => {
  let component: HerbBoxComponent;
  let fixture: ComponentFixture<HerbBoxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HerbBoxComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HerbBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
