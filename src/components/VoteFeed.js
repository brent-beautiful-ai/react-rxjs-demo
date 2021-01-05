import { React, Component, createRef } from 'react';
import { reactive } from 'rxjs-react';
import { map } from 'rxjs/operators';
import { votes$, voteCount$ } from '../store/votes.store';
import { VoteItem } from './VoteItem';

export class VoteFeed extends Component {
	listVotes$ = votes$.pipe(map((votes) => {
		this.scrollToBottom();
		return votes.map((vote, index) => {
			return (
				<VoteItem
					key={index}
					name={vote.username}
					color={vote.color}
				></VoteItem>
			);
		});
	}));

	intervalScroll = null;
	scrollToBottom() {
		if (!this.intervalScroll) {
			this.intervalScroll = setInterval(() => {
				if (this._scrollBottom) {
					this._scrollBottom.scrollIntoView({ behavior: "smooth" });
					clearInterval(this.intervalScroll);
					this.intervalScroll = null;
				}
			});
		}
	}

	render() {
		return reactive(
			<div className="vote-feed">
				<div className="vote-count">{voteCount$} Votes</div>
				<div
					ref={this.ref}
					className="vote-list"
				>
					{this.listVotes$}
					<div
						ref={el => this._scrollBottom = el}
						style={{height: '2em'}}
					></div>
				</div>
			</div>
		)
	}
}