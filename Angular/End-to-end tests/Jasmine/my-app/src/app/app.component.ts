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
  array = [];
  dataSource;
  constructor() {
    for (let i = 0; i < 100; i++) {
      this.array.push({id: i, text: 'test ' + i});
    }
    this.dataSource = {key: 'id', store: this.array};
  }
}
