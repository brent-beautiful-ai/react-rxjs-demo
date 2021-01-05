import { React, Component, Fragment } from 'react';
import { Subscription } from 'rxjs';
import { canVote$, clearVotes, testFirebase, voteTally$ } from '../store/votes.store';
import { TallyCounter } from './TallyCounter';

export class TallyGrid extends Component {
  state = {};

  subs = new Subscription();
  
  componentDidMount() {
    this.subs.add(voteTally$.subscribe(tally => this.setState({tally})));
    this.subs.add(canVote$.subscribe(canVote => this.setState({canVote})));
  }

  componentWillUnmount() {
    this.subs.unsubscribe();
  }
  
  render() {
    const {
      tally,
      canVote,
    } = this.state;

    let content;
    if (!canVote) {
      content = (
        <div className="limbo-message">Please input a username before voting</div>
      )
    }
    else
    if (tally) {
      content = Object.entries(tally).map(([color, value]) => {
        return (
          <TallyCounter
            key={color}
            color={color}
            count={value}
          ></TallyCounter>
        )
      });
    }

    return (
      <Fragment>
        <div className="tally-grid">
          {content}
        </div>
        <div>
          <button
            type="button"
            className="btn-wide"
            onClick={() => clearVotes()}
          >Clear votes</button>
        </div>
      </Fragment>
    )
  }
}