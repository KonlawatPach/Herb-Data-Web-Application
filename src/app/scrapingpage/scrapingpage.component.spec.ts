import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScrapingpageComponent } from './scrapingpage.component';

describe('ScrapingpageComponent', () => {
  let component: ScrapingpageComponent;
  let fixture: ComponentFixture<ScrapingpageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScrapingpageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ScrapingpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
