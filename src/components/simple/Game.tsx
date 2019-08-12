import * as React from "react";
import Start from "./Start";
import Board from "./Board";


interface Props {
}


interface State {
  playerName: string;
}


class Game extends React.Component<Props> {
  state: State;

  constructor(props: Props) {
    super(props);
    this.state = {
      playerName: '',
    };
  }

  render() {
    if (this.isPlayerNameEmpty()) {
      return this.renderStart();
    } else {
      return this.renderBoard();
    }
  }

  isPlayerNameEmpty() {
    return this.state.playerName === '';
  }

  renderBoard() {
    return <Board playerName={this.state.playerName}/>;
  }

  renderStart() {
    return <Start onClick={(playerName: string) => this.handleClick(playerName)}/>;
  }

  handleClick(playerName: string) {
    this.setState({playerName: playerName});
  }
}

export default Game;