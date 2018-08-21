import { map, filter, sample } from 'rxjs/operators';
import { Observable, Observer, interval } from 'rxjs';
import { of } from 'rxjs/observable/of';
import 'rxjs/add/observable/from';

let numbers = [1, 5, 10];

// Second Method to build/create Observable (eazy way)

let source = Observable.from(numbers);

source.subscribe(
    value => console.log(`value: ${value}`),
    e => console.log(`error: ${e}`),
    () => console.log("complete")
);
