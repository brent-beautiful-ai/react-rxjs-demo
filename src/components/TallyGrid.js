import { React, Component } from 'react';
import { Subscription } from 'rxjs';
import { voteTally$ } from '../store/votes.store';
import { TallyCounter } from './TallyCounter';

export class TallyGrid extends Component {
  state = {};

  subs = new Subscription();
  
  componentDidMount() {
    this.subs.add(voteTally$.subscribe(tally => this.setState({tally})));
  }

  componentWillUnmount() {
    this.subs.unsubscribe();
  }
  
  render() {
    const {
      tally
    } = this.state;

    let counters;
    if (tally) {
      counters = Object.entries(tally).map(([color, value]) => {
        return (<TallyCounter key={color} color={color} count={value}></TallyCounter>)
      });
    }

    return (
      <div className="tally-grid">
        {counters}
      </div>
    )
  }
}