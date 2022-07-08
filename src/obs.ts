import { interval, map, Observable, take } from "rxjs";

export const exampleObs = (delayMs: number) => {
  return new Observable((observer) => {
    observer.next({ toto: delayMs });
    setTimeout(() => {
      observer.next({ titi: 456 });
      observer.complete();
    }, 2000);
    return () => {
      console.log("cette fonction desaloue");
    };
  });
};

interval(1000)
  .pipe(
    take(3),
    map((x) => x * 2)
  )
  .subscribe({
    next: (data) => {
      console.log("data: ", data);
    },
    complete: () => {
      console.log("bye");
    },
  });
