// import { Observer } from 'rxjs/Observable';
import { map, filter, sample } from 'rxjs/operators';
import { Observable, interval } from 'rxjs';
import { of } from 'rxjs/observable/of';
import 'rxjs/add/observable/from';

let numbers = [1, 5, 10];
// function with parametre observer object
let source = Observable.create((observer: any) => {

    let index = 0;
    // produce strim of data
    // Observer provide a logic to react to this changes
    let produceValue = () => {
      observer.next(numbers[index++]);

      if(index < numbers.length) {
        setTimeout(produceValue, 2000);
      }
      else {
        observer.complete();
      }
    }
    produceValue();
});

source.subscribe(
    (value: number) => console.log(`value: ${value}`),
    (e: any) => console.log(`error: ${e}`),
    () => console.log("complete")
);
