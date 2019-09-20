import React from 'react';
import './App.css';
import NewBountyForm from './NewBountyForm';
import ShowBounty from './ShowBounty';
import Poster from './Poster';

class App extends React.Component {
    state = {
        bounties: [],
        current: {}
    }

    componentDidMount() {
        this.getBounties();
    }

    getBounties = () => {
        fetch('https://bounty-hunter-26.herokuapp.com/v1/bounties')
        .then(res => res.json())
        .then(bounties => {
            this.setState({ bounties, current: {} })
        })
        .catch(err => {
            console.log('Error while fetching bounties', err);
        })
    }

    changeCurrent = bounty => {
        this.setState({ current: bounty })
    }

    render() {
        let posters = this.state.bounties.map((b, idx) => {
            return <Poster key={idx} 
                bounty={b} 
                refreshBounties={this.getBounties} 
                currentId={this.state.current._id}  
                changeCurrent={this.changeCurrent}   
            />
        })

        return (
            <div className="App">
                <header className="App-header">
                    <h1>Wanted Poster Bulletin Board</h1>
                    <p>
                        Reduce crime in your neighborhood! Claim a bounty!
                    </p>
                </header>
                <main>
                    {posters}
                    <ShowBounty refreshBounties={this.getBounties} current={this.state.current} />
                    <NewBountyForm refreshBounties={this.getBounties} />
                </main>
            </div>
        );
    }
}

export default App;
