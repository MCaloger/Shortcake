import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UrlPageComponent } from './url-page.component';

describe('UrlPageComponent', () => {
  let component: UrlPageComponent;
  let fixture: ComponentFixture<UrlPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UrlPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UrlPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
