// import { Observable } from 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';
import { map, filter, sample,  debounceTime, tap, switchAll, retryWhen, scan, takeWhile } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';
import 'rxjs/add/observable/from';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/scan';
import 'rxjs/add/operator/takeWhile';
import 'rxjs/add/operator/retryWhen';
import "rxjs/add/operator/retry"
import 'rxjs/add/observable/fromPromise';
import 'rxjs/add/observable/defer';


let output = document.getElementById("output");
// 1.create button event
let button = document.getElementById("button");
// 2.prepare to subscribe to click button event
let click = Observable.fromEvent(button, "click");

function load(url: string) {

  return Observable.create((observer: any) => {
    // 5.directly instantiate an XMLHttpRequest object (allows to communicate back with the web server over HTTP)
    let xhr = new XMLHttpRequest();
    // 6.event will raised when the data has arrived back from the web server
    xhr.addEventListener("load", () => {
      if(xhr.status === 200) {
        // parsing respoanse
        let data = JSON.parse(xhr.responseText);
        observer.next(data);
        observer.complete();
      } else {
        observer.error(xhr.statusText);
      }
    });
  
    xhr.open("GET", url);
    xhr.send();
  }).retryWhen(retryStrategy({attempts: 3, delay: 1500}));
}

function loadWithFetch(url: string) {
  return Observable.defer(() => {
    return Observable.fromPromise(fetch(url).then(r => r.json()));
  });
}

function retryStrategy({attempts = 4, delay = 1000}) {
  return function(errors: any) {
    return errors
      .scan((acc: any, value: any) => {
        console.log(acc, value);
        return acc + 1;
      }, 0)
      .takeWhile((acc: any) => acc < attempts)
      .delay(delay)}
}

function renderMovies(movies: any) {
  movies.forEach((m: any) => {
    let div = document.createElement("div");
    div.innerText = m.title;
    output.appendChild(div);
  });
}

load("movies.json").subscribe(renderMovies);

// 3.subscibe to event 4.recive click event "e" and invoke method load
click.flatMap((e: any) => loadWithFetch("movies.json"))
    .subscribe(
      renderMovies,
      (e: any) => console.log(`error: ${e}`),
      () => console.log("complete")
);
