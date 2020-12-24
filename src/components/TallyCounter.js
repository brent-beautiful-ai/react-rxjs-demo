import { React, Component } from 'react';
import { castVoteForColor } from '../store/votes.store';

export class TallyCounter extends Component {
	render() {
		const {
			color,
			count,
		} = this.props;
		
		return (
			<div
				className="tally-counter"
				style={{background: color}}
				onClick={() => castVoteForColor(color)}
			>{count}</div>
		)
	}
}