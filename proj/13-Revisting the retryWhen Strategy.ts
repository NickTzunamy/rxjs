import { Observable } from 'rxjs/Rx';
import { load, loadWithFetch } from './loader';


let output = document.getElementById("output");
// 1.create button event
let button = document.getElementById("button");
// 2.prepare to subscribe to click button event
let click = Observable.fromEvent(button, "click");


function renderMovies(movies: any) {
  movies.forEach((m: any) => {
    let div = document.createElement("div");
    div.innerText = m.title;
    output.appendChild(div);
  });
}

loadWithFetch("moviess.json")
    .subscribe(renderMovies,
              e => console.log(`error: ${e}`),
              () => console.log("complete!"));

// 3.subscibe to event 4.recive click event "e" and invoke method load
click.flatMap((e: any) => loadWithFetch("movies.json"))
    .subscribe(
      renderMovies,
      (e: any) => console.log(`error: ${e}`),
      () => console.log("complete")
);


/// in loader.ts
