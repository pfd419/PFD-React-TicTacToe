import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import { statics } from '../statics';

import moveApi from '../api/move';

import './game.css';
import './loadingMask.css';


const mapStateToProps = state => ({ ...state });

const DrawWinningLine = props => {
    let line = [];
    let map = props.winningCombo[3];
    // eslint-disable-next-line 
    var b = document.getElementById("board").getBoundingClientRect();
    // eslint-disable-next-line 
    let [Ax, Ay, Bx, By] = [eval(map.Ax), eval(map.Ay), eval(map.Bx), eval(map.By)];
    const lineLength = Math.sqrt((Ax - Bx) * (Ax - Bx) + (Ay - By) * (Ay - By));
    for (var i = 0; i < lineLength; i++) {
        line.push(
            <div key={i}
                style={{
                    position: "absolute",
                    left: Math.round(Ax + (Bx - Ax) * i / lineLength) + "px",
                    top: Math.round(Ay + (By - Ay) * i / lineLength) + "px",
                    width: "1px",
                    height: "1px",
                    background: "#000"
                }}
            />
        );
    }

    return <div>{line}</div>;
};

const LoadingMask = props => {
    return (
        <div class="loader" style={{ opacity: props.computerMove ? "50%" : "0%" }}>
            <div class="loader-wheel"></div>
        </div>
    );
}

const TurnIndicator = props => {
    const hasWinner = props.winningPiece || props.numMoves === 9;
    const isTie = props.numMoves === 9;
    const computerMove = !hasWinner && props.numPlayers === 1 && props.turn === 1;
    const yourMove = props.numPlayers === 1 && props.turn === 0;

    const tieText = "Tie!!! ";
    const winnerText = yourMove ? "You Win!!! " : props.winningPiece + " Wins!!! ";
    const scoreText = "Score: " + props.score[0] + "-" + props.score[1] +
        ". Click to continue...";
    const winIndicator = <span>
        {isTie ? tieText : winnerText}
        {scoreText}
    </span>;
    const moveIndicator = <span>
        It is {props.players[props.turn]}'s turn {yourMove ? "(You)" : ""}
    </span>

    return (
        <div className="turnIndicator">
            <LoadingMask computerMove={computerMove} />
            {hasWinner ? winIndicator : moveIndicator}
        </div>
    );
};

const Square = props => {
    return (<div id={props.id} onClick={props.moveHandler}>
        {props.board[props.id]}
    </div>)
}

const Board = props => {
    return (
        <table id="board" className="board">
            <tbody>
                <tr>
                    <td>
                        <Square id="0" board={props.board} moveHandler={props.moveHandler}/>
                    </td>
                    <td className="vert">
                        <Square id="1" board={props.board} moveHandler={props.moveHandler}/>
                    </td>
                    <td>
                        <Square id="2" board={props.board} moveHandler={props.moveHandler}/>
                    </td>
                </tr>
                <tr>
                    <td className="hori">
                        <Square id="3" board={props.board} moveHandler={props.moveHandler}/>
                    </td>
                    <td className="vert hori">
                        <Square id="4" board={props.board} moveHandler={props.moveHandler}/>
                    </td>
                    <td className="hori">
                        <Square id="5" board={props.board} moveHandler={props.moveHandler}/>
                    </td>
                </tr>
                <tr>
                    <td>
                        <Square id="6" board={props.board} moveHandler={props.moveHandler}/>
                    </td>
                    <td className="vert">
                        <Square id="7" board={props.board} moveHandler={props.moveHandler}/>
                    </td>
                    <td>
                        <Square id="8" board={props.board} moveHandler={props.moveHandler}/>
                    </td>
                </tr>
            </tbody>
        </table>
    );
}

const Game = props => {
    const calculateComputerMove = async (board, piece) => {
        let apiMappedBoard = "";
        // eslint-disable-next-line
        board.some((p) => { apiMappedBoard += (p === "" ? "-" : p); });
        let data = await moveApi.getMove(apiMappedBoard, piece);

        return data.recommendation.toString()
    }

    useEffect(() => {
        const computerMove = !props.winningPiece &&
            props.numMoves < 9 &&
            props.numPlayers === 1 &&
            props.turn === 1;

        if (computerMove) {
            calculateComputerMove(props.board, props.players[props.turn])
                .then((newPlace) => props.dispatch({ type: statics.MOVE, place: newPlace }));
        }
    });

    const moveHandler = e => {
        const playerMove = (props.numPlayers > 1 || props.turn === 0) &&
            !props.winningPiece &&
            !props.board[e.target.id];

        if (playerMove) {
            props.dispatch({ type: statics.MOVE, place: e.target.id });
        }
    };

    return (
        <div>
            {props.winningPiece && <DrawWinningLine winningCombo={props.winningCombo} />}
            <TurnIndicator {...props} />
            <Board board={props.board} moveHandler={moveHandler} />
        </div>
    );
};

const GameContainer = connect(mapStateToProps)(Game);
export default GameContainer;