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

  it('should render five DataGrid rows and should not have edit data',  () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    jasmine.clock().tick(500);
    const comp = fixture.componentInstance;
    comp.dataGrid.instance.addRow();
    jasmine.clock().tick(500);
    comp.dataGrid.instance.saveEditData();
    jasmine.clock().tick(500);
    expect(comp.dataGrid.instance.getVisibleRows().length).toEqual(5);
    expect(comp.dataGrid.instance.hasEditData()).toBe(false);
  });
});
