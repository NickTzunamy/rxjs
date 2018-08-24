import { Observable } from 'rxjs/Rx';
// import { load, loadWithFetch } from './loader';

/* let source =Observable.create((observer: any) => {
  observer.next(1);
  observer.next(2);
  // observer.error("Stop!");
  // throw new Error("Stop!");
  observer.next(3);
  observer.complete();
}); */

let source = Observable.merge(
  Observable.of(1),
  Observable.from([2, 3, 4]),
  Observable.throw(new Error("Stop!")),
  Observable.of(5)
).catch(e => {
  console.log(`caught: ${e}`);
  return Observable.of(10);
});

let source2 = Observable.onErrorResumeNext(
  Observable.of(1),
  Observable.from([2, 3, 4]),
  Observable.throw(new Error("Stop!")),
  Observable.of(5)
);

source.subscribe(
  (value: any) => console.log(`value: ${value}`),
  (error: any) => console.log(`error: ${error}`),
  () => console.log(`complete`)
);


