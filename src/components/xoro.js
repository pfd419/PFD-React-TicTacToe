import React from 'react';
import { connect } from 'react-redux';

import { statics } from '../statics';

const mapStateToProps = state => ({ ...state });

const XorO = props => {
    const pieceHandler = e => {
        props.dispatch({
            type: statics.PIECESELECTION,
            player: props.turn + 1,
            value: e.target.value
        });
        props.history.push("/game");
    };

    return (
        <div className="selection">
            Player 1 Choose:
            &nbsp;
        <input type="radio" name="piece" value="X" onClick={pieceHandler} />X
                &nbsp;
        <input type="radio" name="piece" value="O" onClick={pieceHandler} />O
      </div>
    );
};
const XorOContainer = connect(mapStateToProps)(XorO);
export default XorOContainer;
