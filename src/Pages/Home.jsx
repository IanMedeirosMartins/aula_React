import React, { useState } from 'react';
import '../App.css';
import Header from '../Header';
import Produto from '../Produto';

function App() {
  const[contador, setContador]= useState(0);
  function increment(){
    setContador(contador+1);
  }

  var usuario = "Ian";
 const test = [];
  return (
    <div className="App">
      <header className="App-header">
        <Header title={usuario}/>
        <img src="Octocat.png" className="App-logo" alt="logo" />
       <h1>Projeto Aulas 2026.1</h1>
        <p>
          <input type="button" value="Clique" onClick={increment} />
        </p>
        <p>{contador}</p> Cliques!
     
      </header>
      <div>
    <Produto title={test[0]} />
    <Produto title={test[1]} />
    <Produto title={test[2]} />
</div>
    </div>
    

  );
}

export default App;
