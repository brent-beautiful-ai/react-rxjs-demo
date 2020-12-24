import { BehaviorSubject } from 'rxjs';
import { debounceTime, map, shareReplay } from 'rxjs/operators';

const currentUser = {
  username: null,
};
const _currentUser$ = new BehaviorSubject(currentUser);
export const currentUser$ = _currentUser$.asObservable().pipe(
  debounceTime(500),
  shareReplay(1),
);

export const updateCurrentUser = (user) => {
  _currentUser$.next(user);
}
