import './theme.css';
import './App.css';

import GamesList from './components/gameEntries/GamesList'

function App() {
  return (
    <div className="App">
      <header className="App-header">
     
        <div>
          <GamesList/>
        </div>

        </header>
    </div>
  );
}

export default App;
