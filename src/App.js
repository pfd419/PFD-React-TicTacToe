import React, { useEffect } from 'react';
import { HashRouter, Route } from 'react-router-dom';
import { Provider, connect } from 'react-redux';
import { createStore } from 'redux';
import reducer from './reducers';
import { statics } from './statics';

import PlayersContainer from './components/players';
import XorOContainer from './components/xoro';
import GameContainer from './components/game';

import './App.css';

const store = createStore(reducer);
const mapStateToProps = state => ({ ...state });

const App = props => {
  useEffect(() => {
    props.winningPiece && props.dispatch({ type: statics.SHOWWINNER });
  });

  const clickHandler = () => {
    if (props.numMoves === 9 || props.showWinner) {
      props.dispatch({ type: statics.RESET });
      //history.back();
    }
  };

  return (
    <HashRouter>
      <div className="game" onClick={clickHandler}>
        <div className="banner">
          Tic-Tac-Toe
          <div className="sub-banner">Would you like to play a game???</div>
        </div>
        <div>
          <Route exact path="/" component={PlayersContainer} />
          <Route path="/xoro" component={XorOContainer} />
          <Route path="/game" component={GameContainer} />
        </div>
      </div>
    </HashRouter>
  );
};
const AppContainer = connect(mapStateToProps)(App);

export default function AppComponent() {
  return (
    <Provider store={store}>
      <AppContainer />
    </Provider>
  )
}