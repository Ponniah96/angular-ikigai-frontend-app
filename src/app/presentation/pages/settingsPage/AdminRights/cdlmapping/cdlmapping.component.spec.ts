import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CDLMappingComponent } from './cdlmapping.component';

describe('CDLMappingComponent', () => {
  let component: CDLMappingComponent;
  let fixture: ComponentFixture<CDLMappingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CDLMappingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CDLMappingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
