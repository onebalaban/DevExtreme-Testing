import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { DxDataGridModule } from 'devextreme-angular';

describe('AppComponent', () => {
  beforeEach(async () => {
    jasmine.clock().install();
    await TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
      imports: [
        DxDataGridModule
      ]
    }).compileComponents();
  });
  afterEach( () => {
    jasmine.clock().uninstall();
  });

  it('should render DataGrid rows',  () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    jasmine.clock().tick(500);
    expect(compiled.querySelectorAll('.dx-data-row').length).toEqual(4);
  });
});
