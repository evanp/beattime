import React from 'react';

class BeatClock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {beats: BeatClock.beatTime(new Date())};
  }

  componentDidMount() {
    this.intervalId = setInterval(() => this.updateBeats(), 432)
  }

  componentWillUnmount() {
    clearInterval(this.intervalId)
  }

  updateBeats() {
    this.setState({ beats: BeatClock.beatTime(new Date()) })
  }

  static beatTime(date) {
    if (!date) {
      date = new Date();
    }
    let hours = (date.getUTCHours() === 23) ? 0 : date.getUTCHours() + 1;
    let mins = date.getUTCMinutes();
    let secs = date.getUTCSeconds();
    return Math.abs(((((hours * 60) + mins) * 60) + secs) / 86.4);
  }

  render() {
    return <span data-testid="beat-time">@{this.state.beats.toFixed(2).padStart(6)}</span>
  }
}

export default BeatClock;
