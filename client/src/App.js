import React from 'react';
import GameWindow from './components/GameWindow/GameWindow';
import Intro from './components/Intro/Intro';
import { BrowserRouter, Route, Switch } from "react-router-dom";


function App() {
  return (
    <BrowserRouter>      
      <Switch>
        <Route path="/" exact component={Intro} />
        <Route path="/game" exact component={GameWindow} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
