import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StatContainerComponent } from './stat-container.component';

describe('StatContainerComponent', () => {
  let component: StatContainerComponent;
  let fixture: ComponentFixture<StatContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StatContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StatContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
