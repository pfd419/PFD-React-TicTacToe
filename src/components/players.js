import React from 'react';
import { connect } from 'react-redux';

import { statics } from '../statics';

const mapStateToProps = state => ({ ...state });

const Players = props => {
    const playersHandler = e => {
        props.dispatch({ type: statics.NUMPLAYERS, value: e.target.value });
        props.history.push("/xoro");
    };

    return (
        <div className="selection">
            How many players?
            &nbsp;
        <input
                type="radio"
                name="numPlayers"
                value="1"
                onClick={playersHandler}
            />1
            &nbsp;
        <input
                type="radio"
                name="numPlayers"
                value="2"
                onClick={playersHandler}
            />2
      </div>
    );
};

const PlayersContainer = connect(mapStateToProps)(Players);

export default PlayersContainer;