import { BehaviorSubject } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { currentUser$ } from './users.store';

const votes = [
  {
    timestamp: Date.now(),
    username: 'Brent',
    color: 'blue',
  }
];
const _votes$ = new BehaviorSubject(votes);
export const votes$ = _votes$.asObservable();

export const voteTally$ = votes$.pipe(
  map(votes => votes
    .reduce((tally, vote) => {
      const { color } = vote;
      ++tally[color];
      return tally;
    }, {
      'blue': 0,
      'red': 0,
      'limegreen': 0,
      'purple': 0,
    })
  ),
);

export const canVote$ = currentUser$.pipe(
  map(user => !!user && !!user.username),
);

export const castVoteForColor = (color) => {
  currentUser$.pipe(
    take(1),
  ).subscribe((user) => {
    votes.push({
      username: user.username,
      color,
    });
    _votes$.next(votes);
  })
}

export const clearVotes = () => {
  votes = [];
  _votes$.next(votes);
}
