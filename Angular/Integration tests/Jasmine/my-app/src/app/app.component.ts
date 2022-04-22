import { Component, ViewChild } from '@angular/core';
import { DxDataGridComponent } from 'devextreme-angular';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  @ViewChild(DxDataGridComponent, { static: false }) dataGrid: DxDataGridComponent;
  title = 'my-app';
  dataSource = {key: 'id', store: [{ id: 1, text: 'test' }, { id: 2, text: 'test' }, { id: 3, text: 'test' }, { id: 4, text: 'test' }]};
}
