import { React, Component } from 'react';

export class VoteItem extends Component {

	render() {
		const {
            name,
            color,
        } = this.props;

        return (
            <div className="vote-item">
                <div className="name">{name}</div>
                <div className="color" style={{background: color}}></div>
            </div>
        );
	}
}