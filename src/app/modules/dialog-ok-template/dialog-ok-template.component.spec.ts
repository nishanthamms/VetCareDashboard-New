import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogOkTemplateComponent } from './dialog-ok-template.component';

describe('DialogOkTemplateComponent', () => {
  let component: DialogOkTemplateComponent;
  let fixture: ComponentFixture<DialogOkTemplateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogOkTemplateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogOkTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
