import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailPublicComponent } from './detail-public.component';

describe('DetailPublicComponent', () => {
  let component: DetailPublicComponent;
  let fixture: ComponentFixture<DetailPublicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailPublicComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DetailPublicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
