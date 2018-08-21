

import { Observable } from 'rxjs/Observable';
import { map, filter, sample,  debounceTime, tap, switchAll, delay } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';
import 'rxjs/add/observable/from';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/delay';

let circle = document.getElementById("circle");
let source = Observable.fromEvent(document, "mousemove")
  .map((e: MouseEvent) => {
    return {
      x: e.clientX,
      y: e.clientY
    }
  }).filter(value => value.x < 1000)
    .delay(300);

// .map((n: any) => n * 2).filter((n: any) => n > 4);

function onNext(value: any) {
  circle.style.left = value.x + `px`;
  circle.style.top = value.y + `px`;
}

source.subscribe(
    onNext,
    (e: any) => console.log(`error: ${e}`),
    () => console.log("complete")
);
