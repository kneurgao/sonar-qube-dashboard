import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectTrendComponent } from './project-trend.component';

describe('ProjectTrendComponent', () => {
  let component: ProjectTrendComponent;
  let fixture: ComponentFixture<ProjectTrendComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectTrendComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectTrendComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
