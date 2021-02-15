import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CattleInfoComponent } from './cattle-info.component';

describe('CattleInfoComponent', () => {
  let component: CattleInfoComponent;
  let fixture: ComponentFixture<CattleInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CattleInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CattleInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
