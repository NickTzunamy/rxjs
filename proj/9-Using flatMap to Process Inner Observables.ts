

import { Observable } from 'rxjs/Observable';
import { map, filter, sample,  debounceTime, tap, switchAll, delay } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';
import 'rxjs/add/observable/from';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/delay';

let output = document.getElementById("output");
let button = document.getElementById("button");

let click = Observable.fromEvent(button, "click");

function load(url: string) {
  let xhr = new XMLHttpRequest();

  xhr.addEventListener("load", () => {
    let movies = JSON.parse(xhr.responseText);
    movies.forEach((m: any) => {
      let div = document.createElement("div");
      div.innerText = m.title;
      output.appendChild(div);
    });

  });

  xhr.open("GET", url);
  xhr.send();
}

click.subscribe(
    (e: any) => load("movies.json"),
    (e: any) => console.log(`error: ${e}`),
    () => console.log("complete")
);
