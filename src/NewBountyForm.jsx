import React, { Component } from 'react';

const initialState = {
    name: '',
    wantedFor: '',
    client: '',
    reward: 0,
    ship: '',
    hunters: [],
    captured: false
}

class NewBountyForm extends Component {
    constructor(props) {
        super(props)
        let current = this.props.current || {};
        console.log(current);
        this.state = {
            name: current.name || '',
            wantedFor: current.wantedFor || '',
            client: current.client || '',
            reward: current.reward || 0,
            ship: current.ship || '',
            hunters: current.hunters || [],
            captured: current.captured || false,
            id: current._id || ''
        }
    }

    submitForm = (e) => {
        e.preventDefault();
        console.log('submitted!', this.state)
        let whichMethod = this.state.id ? 'PUT' : 'POST';
        fetch('https://bounty-hunter-26.herokuapp.com/v1/bounties/' + this.state.id, {
            method: whichMethod,
            body: JSON.stringify(this.state),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(res => res.json())
            .then(result => {
                this.setState(initialState, () => {
                    this.props.refreshBounties();
                })
            })
            .catch(err => {
                console.log('Error:', err);
            })
    }

    storeInput = (e) => {
        if (e.target.name === 'hunters') {
            this.setState({
                hunters: e.target.value.split(',')
            })
        } else if (e.target.name === 'captured') {
            this.setState({
                captured: e.target.checked
            })
        } else {
            this.setState({
                [e.target.name]: e.target.value
            })
        }
    }

    render() {
        return (
            <div className="bounty-form">
                <h2>{this.state.id ? 'Edit Bounty' : 'Add New Bounty'}</h2>
                <form onSubmit={this.submitForm}>
                    <div>
                        <label>Name:</label>
                        <input name="name" value={this.state.name} onChange={this.storeInput} />
                    </div>
                    <div>
                        <label>Wanted For:</label>
                        <input name="wantedFor" value={this.state.wantedFor} onChange={this.storeInput} />
                    </div>
                    <div>
                        <label>Client:</label>
                        <input name="client" value={this.state.client} onChange={this.storeInput} />
                    </div>
                    <div>
                        <label>Reward:</label>
                        <input name="reward" value={this.state.reward} onChange={this.storeInput} />
                    </div>
                    <div>
                        <label>Ship:</label>
                        <input name="ship" value={this.state.ship} onChange={this.storeInput} />
                    </div>
                    <div>
                        <label>Hunters: (Comma-Separated List)</label>
                        <input name="hunters" value={this.state.hunters.join(',')} onChange={this.storeInput} />
                    </div>
                    <div>
                        <label>Captured?</label>
                        <input type="checkbox" name="captured" checked={this.state.captured ? "checked" : ""} onChange={this.storeInput} />
                    </div>
                    <input type="submit" value="Bountify!" />
                </form>
            </div>
        )
    }
}

export default NewBountyForm;