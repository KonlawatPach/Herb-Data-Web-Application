import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToptwelveherbsContainerComponent } from './toptwelveherbs-container.component';

describe('ToptwelveherbsContainerComponent', () => {
  let component: ToptwelveherbsContainerComponent;
  let fixture: ComponentFixture<ToptwelveherbsContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ToptwelveherbsContainerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ToptwelveherbsContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
