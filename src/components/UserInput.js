import { React, Component, Fragment } from 'react';
import { Subscription } from 'rxjs';
import { currentUser$, updateCurrentUser } from '../store/users.store';

export class UserInput extends Component {
  state = {};

  subs = new Subscription();
  
  componentDidMount() {
    this.subs.add(currentUser$.subscribe(user => this.setState({user})));
  }

  componentWillUnmount() {
    this.subs.unsubscribe();
  }
  
  render() {
    const {
      user
    } = this.state;

    let userInput;
    if (user) {
      userInput = (
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
      )
    }

    return (
      <div className="user-input">
        {userInput}
      </div>
    )
  }
}