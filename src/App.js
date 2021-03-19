import './App.css';
import React from 'react';
import BeatClock from './BeatClock';

class App extends React.Component {
  render() {
    return <div className="App">
      <header className="App-header">
        <BeatClock />
      </header>
    </div>
  }
}

export default App;
