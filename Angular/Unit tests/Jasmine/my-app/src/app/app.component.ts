import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'my-app';
  dataSource: any = [{ id: 1, text: 'test' }, { id: 2, text: 'test' }, { id: 3, text: 'test' }, { id: 4, text: 'test' }];
}
