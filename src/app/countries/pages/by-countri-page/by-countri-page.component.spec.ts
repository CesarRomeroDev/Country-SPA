import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ByCountriPageComponent } from './by-countri-page.component';

describe('ByCountriPageComponent', () => {
  let component: ByCountriPageComponent;
  let fixture: ComponentFixture<ByCountriPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ByCountriPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ByCountriPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
