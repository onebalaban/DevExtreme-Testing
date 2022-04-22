import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import {DxDataGridComponent, DxDataGridModule} from 'devextreme-angular';

describe('AppComponent', () => {
  beforeEach(async () => {
    jasmine.clock().install();
    await TestBed.configureTestingModule({
      declarations: [
        AppComponent, DxDataGridComponent
      ],
      imports: [
        DxDataGridModule
      ]
    }).compileComponents();
  });
  afterEach( () => {
    jasmine.clock().uninstall();
  });

  it('should render DataGrid and switch its page',  () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    jasmine.clock().tick(500);
    const comp = fixture.componentInstance;
    comp.dataGrid.instance.addRow();
    const event = new MouseEvent('click', {
      bubbles: true,
      cancelable: true,
      view: window
    });
    (compiled.querySelectorAll('.dx-page')[5]).dispatchEvent(event);
    jasmine.clock().tick(500);
    expect(comp.dataGrid.instance.pageIndex()).toBe(5);
  });
});
