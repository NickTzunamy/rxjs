

import { Observable } from 'rxjs/Observable';
import { map, filter, sample,  debounceTime, tap, switchAll, delay } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';
import 'rxjs/add/observable/from';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/mergeMap';

let output = document.getElementById("output");
let button = document.getElementById("button");

let click = Observable.fromEvent(button, "click");

function load(url: string) {

  return Observable.create((observer: any) => {
    let xhr = new XMLHttpRequest();

    xhr.addEventListener("load", () => {
      let movies = JSON.parse(xhr.responseText);
      observer.next();
      observer.complete();
    });
  
    xhr.open("GET", url);
    xhr.send();
  });
  
}

function renderMovies(movies: any) {
  movies.forEach((m: any) => {
    let div = document.createElement("div");
    div.innerText = m.title;
    output.appendChild(div);
  });
}

click.flatMap((e: any) => load("movies.json"))
    .subscribe(
      renderMovies,
      (e: any) => console.log(`error: ${e}`),
      () => console.log("complete")
);
