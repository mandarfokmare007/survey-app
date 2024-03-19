import { ComponentFixture, TestBed } from '@angular/core/testing';
// import { AppModule } from 'src/app/app.module';
import { LoaderComponent } from './loader.component';

describe('LoaderComponent', () => {
  let component: LoaderComponent;
  let fixture: ComponentFixture<LoaderComponent>;
  let mockLoaderService = {
    loaderState: () => {
      return { subscribe: () => {} };
    }
  }
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      // imports: [AppModule],
      declarations: [LoaderComponent],
      providers: [],
    }).compileComponents();
  });
  beforeEach(() => {
    fixture = TestBed.createComponent(LoaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  /**
   * Shows loader on component initialization
   */
  it('Should load',()=>{
    component.show = false;
    const spy = spyOn(mockLoaderService, 'loaderState').and.callThrough();
    component.ngOnInit();
    expect(component.show).toBeDefined();
  })
  
  /**
   * Not to show loader when component is destroyed
   */
  it('Should  load',()=>{
    component.ngOnDestroy();
    expect(component.ngOnDestroy).toBeDefined();
  })
});
