import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GoalWizzardComponent } from './goal-wizzard.component';

describe('GoalWizzardComponent', () => {
  let component: GoalWizzardComponent;
  let fixture: ComponentFixture<GoalWizzardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GoalWizzardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GoalWizzardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
