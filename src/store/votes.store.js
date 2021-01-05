import { ReplaySubject } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { currentUser$ } from './users.store';
import { db } from './firebase.store';

const refVotes = db.ref('rxjs-demo/votes');

const _votes$ = new ReplaySubject();
export const votes$ = _votes$.asObservable();
export const voteCount$ = votes$.pipe(
  map(votes => votes.length)
);

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

refVotes.on('value', (res) => {
  const data = res.val();
  let votes = [];
  if (data) {
    votes = Object.values(data)
      .sort((a, b) => a.timestamp < b.timestamp ? -1 : 1)
    ;
  }
  console.log('Votes', votes);
  _votes$.next(votes);
});

export const canVote$ = currentUser$.pipe(
  map(user => !!user && !!user.username),
);

export const castVoteForColor = (color) => {
  currentUser$.pipe(
    take(1),
  ).subscribe((user) => {
    refVotes.push().set({
      timestamp: Date.now(),
      username: user.username,
      color,
    });
  })
}

export const clearVotes = () => {
  refVotes.set({});
}
