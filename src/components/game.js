import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import { statics } from '../statics';

import moveApi from '../api/move';

import './game.css';


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

const TurnIndicator = props => {
    const hasWinner = props.winningPiece || props.numMoves === 9;
    const isTie = props.numMoves === 9;
    const isWinner = props.numPlayers === 1 && props.turn === 0;

    const tieText = "Tie!!! ";
    const winnerText = isWinner ? "You Win!!! " : props.winningPiece + " Wins!!! ";
    const scoreText = "Score: " + props.score[0] + "-" + props.score[1] +
        ". Click to continue...";
    const winIndicator = <span>
        {isTie ? tieText : winnerText}
        {scoreText}
    </span>;
    const moveIndicator = <span>
        It is {props.players[props.turn]}'s turn {isWinner ? "(You)" : ""}
    </span>

    return (
        <div className="turnIndicator">
            {hasWinner ? winIndicator : moveIndicator}
        </div>
    );
};

const Board = props => {
    return (
        <table id="board" className="board">
            <tbody>
                <tr>
                    <td>
                        <div id="0" onClick={props.moveHandler}>
                            {props.board[0]}
                        </div>
                    </td>
                    <td className="vert">
                        <div id="1" onClick={props.moveHandler}>
                            {props.board[1]}
                        </div>
                    </td>
                    <td>
                        <div id="2" onClick={props.moveHandler}>
                            {props.board[2]}
                        </div>
                    </td>
                </tr>
                <tr>
                    <td className="hori">
                        <div id="3" onClick={props.moveHandler}>
                            {props.board[3]}
                        </div>
                    </td>
                    <td className="vert hori">
                        <div id="4" onClick={props.moveHandler}>
                            {props.board[4]}
                        </div>
                    </td>
                    <td className="hori">
                        <div id="5" onClick={props.moveHandler}>
                            {props.board[5]}
                        </div>
                    </td>
                </tr>
                <tr>
                    <td>
                        <div id="6" onClick={props.moveHandler}>
                            {props.board[6]}
                        </div>
                    </td>
                    <td className="vert">
                        <div id="7" onClick={props.moveHandler}>
                            {props.board[7]}
                        </div>
                    </td>
                    <td>
                        <div id="8" onClick={props.moveHandler}>
                            {props.board[8]}
                        </div>
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
            <Board board={props.board} moveHandler={moveHandler}/>
        </div>
    );
};

const GameContainer = connect(mapStateToProps)(Game);
export default GameContainer;