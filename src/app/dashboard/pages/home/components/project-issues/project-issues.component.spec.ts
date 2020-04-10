import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectIssuesComponent } from './project-issues.component';

describe('ProjectIssuesComponent', () => {
  let component: ProjectIssuesComponent;
  let fixture: ComponentFixture<ProjectIssuesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectIssuesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectIssuesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
