import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FarmReportComponent } from './farm-report.component';

describe('FarmReportComponent', () => {
  let component: FarmReportComponent;
  let fixture: ComponentFixture<FarmReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FarmReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FarmReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
