// import { Observer } from 'rxjs/Observable';
import { map, filter, sample } from 'rxjs/operators';
import { Observable, interval } from 'rxjs';
import { of } from 'rxjs/observable/of';
import 'rxjs/add/observable/from';

let numbers = [1, 5, 10];
// function with parametre observer object
let source = Observable.create(
  (observer: any) => {

    for(let n of numbers) {

/*       if(n === 5) {
        observer.console.error('Something went wrong!');
      } */
      observer.next(n);
    }

    observer.complete();
});

source.subscribe(
    (value: number) => console.log(`value: ${value}`),
    (e: any) => console.log(`error: ${e}`),
    () => console.log("complete")
);
