import { React, Component, Fragment } from 'react';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { reactive } from 'rxjs-react';
import { currentUser$, updateCurrentUser } from '../store/users.store';

export class UserInput extends Component {
  userInput$ = currentUser$.pipe(
    map(user => {
      return (
        <input
          type="text"
          placeholder="Username..."
          onInput={(evt) => {
            updateCurrentUser({
              ...user,
              username: evt.target.value,
            });
          }}
        />
      );
    })
  );
  
  render() {
    return reactive(
      <div className="user-input">
        {this.userInput$}
      </div>
    )
  }
}