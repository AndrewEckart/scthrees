import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MeterContainerComponent } from './meter-container.component';

describe('MeterContainerComponent', () => {
  let component: MeterContainerComponent;
  let fixture: ComponentFixture<MeterContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MeterContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MeterContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
