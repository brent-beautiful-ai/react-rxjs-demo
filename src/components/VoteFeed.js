import { React, Component, createRef } from 'react';
import { Subscription } from 'rxjs';
import { votes$ } from '../store/votes.store';
import { VoteItem } from './VoteItem';

export class VoteFeed extends Component {
    state = {};
    subs = new Subscription();
    ref = createRef();

    componentDidMount() {
      this.subs.add(votes$.subscribe(votes => {
          this.setState({votes});
          if (this.ref) {
            const elem = this.ref.current;
            elem.scrollTo(0, elem.scrollHeight);
          }
      }));
    }
  
    componentWillUnmount() {
      this.subs.unsubscribe();
    }

	render() {
		const {
			votes
        } = this.state;
        
        let listVotes;
        if (votes) {
            let index = 0;
            listVotes = votes.map(vote => {
                return (
                    <VoteItem key={index++} name={vote.username} color={vote.color}></VoteItem>
                );
            })
        }
		
		return (
			<div
                ref={this.ref}
				className="vote-feed"
            >
                {listVotes}
                <div style={{height: '6em'}}></div>
            </div>
		)
	}
}