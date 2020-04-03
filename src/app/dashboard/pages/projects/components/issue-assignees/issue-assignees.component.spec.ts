import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IssueAssigneesComponent } from './issue-assignees.component';

describe('IssueAssigneesComponent', () => {
  let component: IssueAssigneesComponent;
  let fixture: ComponentFixture<IssueAssigneesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IssueAssigneesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IssueAssigneesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
