import './App.css';
import Header from './Header';
import Produto from './Produto';

function App() {
  var usuario = "Ian"
  return (
    <div className="App">
      <header className="App-header">
        <Header title={usuario}/>
        <img src="Octocat.png" className="App-logo" alt="logo" />
       <h1>Hello World!!</h1>
      </header>
    </div>
  );
}

export default App;
