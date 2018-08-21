import { map, filter, sample } from 'rxjs/operators';
import { Observable, Observer, interval } from 'rxjs';
import { of } from 'rxjs/observable/of';
import 'rxjs/add/observable/from';

let numbers = [1, 5, 10];

// First Method to build/create Observable (complex way)

// construct new Observable (new data source)
let source = Observable.from(numbers);

class MyObserver implements Observer<number> {
  // this is the method that the Observable will invoke on my Observer when there is a value to produce
  next(value: any) {
    console.log(`value: ${value}`);
  }

  error(e: any) {
    console.log(`error: ${e}`);
  }

  complete() {
    console.log("complete");
  }

}

source.subscribe(new MyObserver());
