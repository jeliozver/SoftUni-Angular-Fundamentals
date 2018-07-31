import { Component } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'async-observable-pipe',
  template: `<div>Time: {{ time | async }}</div>`
})
export class AsyncObservablePipeComponent {
  time = new Observable(observer =>
    setInterval(() => observer.next(new Date().toLocaleTimeString()), 1000)
  );
}