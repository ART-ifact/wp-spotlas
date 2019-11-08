import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GeoautofillComponent } from './geoautofill.component';

describe('GeoautofillComponent', () => {
  let component: GeoautofillComponent;
  let fixture: ComponentFixture<GeoautofillComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GeoautofillComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GeoautofillComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
