import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectMeasuresComponent } from './project-measures.component';

describe('ProjectMeasuresComponent', () => {
  let component: ProjectMeasuresComponent;
  let fixture: ComponentFixture<ProjectMeasuresComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectMeasuresComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectMeasuresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
