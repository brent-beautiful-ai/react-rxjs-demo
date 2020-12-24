import { BehaviorSubject } from "rxjs";
import { map } from "rxjs/operators";

const _votes$ = new BehaviorSubject([
  {
    userId: "Brent",
    vote: "blue"
  }
]);
export const votes$ = _votes$.asObservable();
export const voteTally$ = votes$.pipe();
