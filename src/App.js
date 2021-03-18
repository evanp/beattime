import './App.css';
import React from 'react';

function beatTime(date) {
  if (!date)
    date = new Date();
  let hours = (date.getUTCHours() === 23) ? 0 : date.getUTCHours() + 1;
  let mins = date.getUTCMinutes();
  let secs = date.getUTCSeconds();
  return Math.abs(((((hours * 60) + mins) * 60) + secs) / 86.4);
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {beats: beatTime(new Date())};
  }

  componentDidMount() {
    this.intervalId = setInterval(() => this.updateBeats(), 432)
  }

  componentWillUnmount() {
    clearInterval(this.intervalId)
  }

  updateBeats() {
    this.setState({ beats: beatTime(new Date()) })
  }

  render() {
    return <div className="App">
      <header className="App-header">
        <span data-testid="beat-time">@{this.state.beats.toFixed(2).padStart(6)}</span>
      </header>
    </div>
  }
}

export default App;
