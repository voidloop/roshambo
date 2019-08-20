import * as React from "react";
import Start from "./Start";
import Board from "./Board";
import AppBar from "@material-ui/core/AppBar/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import {Box, createStyles, Theme, WithStyles} from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import withStyles from "@material-ui/core/styles/withStyles";
import API from "@aws-amplify/api";
import * as uuid from "uuid";
import Result from "./Result";


const styles = (theme: Theme) => createStyles({
  paper: {
    margin: 'auto',
    marginTop: theme.spacing(2),
    maxWidth: '960px',
    [theme.breakpoints.down('sm')]: {
      minHeight: '100vh',
      marginTop: 0,
    },
  },
  appBar: {
    background: 'transparent',
    boxShadow: 'none'
  },
});


interface Props extends WithStyles<typeof styles> {
}


interface State {
  uuid: string;
  playerName: string;
  scoreP1: number;
  scoreP2: number;
  maxScore: number;
  game: 'new' | 'started' | 'over';
}


class Game extends React.Component<Props> {
  state: State;

  constructor(props: Props) {
    super(props);
    this.state = {
      uuid: '',
      playerName: '',
      scoreP1: 0,
      scoreP2: 0,
      maxScore: 5,
      game: 'new',
    };
  }

  render() {
    const {classes} = this.props;

    return (
      <Paper className={classes.paper}>
        <AppBar position="static" className={classes.appBar}>
          <Toolbar>
            <Typography variant="h6" color='textPrimary'>
              <Box fontFamily='Comic'>
                MORRA CINESE!
              </Box>
            </Typography>
          </Toolbar>
        </AppBar>
        {this.renderContent()}
      </Paper>
    );
  }

  renderContent() {
    switch (this.state.game) {
      case "new":
        return this.renderStart();
      case "started":
        return this.renderBoard();
      case "over":
        return this.renderResult();
      default:
        return "unknown game state"
    }
  }


  renderBoard() {
    return <Board uuid={this.state.uuid}
                  playerName={this.state.playerName}
                  scoreP1={this.state.scoreP1}
                  scoreP2={this.state.scoreP2}
                  maxScore={this.state.maxScore}
                  updateScore={(scoreP1: number, scoreP2: number) => this.updateScore(scoreP1, scoreP2)}
                  newGame={() => this.startGame(this.state.playerName)}
    />;
  }

  renderStart() {
    return <Start onClick={(playerName: string) => this.startGame(playerName)}/>;
  }


  renderResult() {
    return (
      <Result scoreP1={this.state.scoreP1}
              scoreP2={this.state.scoreP2}
              restartGame={() => this.startGame(this.state.playerName)}
              endGame={() => this.endGame()}
      />
    );
  }


  updateScore(scoreP1: number, scoreP2: number) {
    this.setState({
      scoreP1: scoreP1,
      scoreP2: scoreP2
    });

    if (scoreP1 >= this.state.maxScore || scoreP2 >= this.state.maxScore) {
      this.setState({game: 'over'})
    }
  }

  endGame() {
    this.setState({
      uuid: '',
      playerName: '',
      scoreP1: 0,
      scoreP2: 0,
      game: 'new',
    });
  }

  startGame(playerName: string) {
    const playerUuid: string = uuid.v4();
    API.post('GamesApi', '/games', {
      body: {
        uuid: playerUuid,
        playerName: playerName,
        scoreP1: 0,
        scoreP2: 0,
        date: Date.now()
      }
    }).then(() => {
      this.setState({
        playerName: playerName,
        uuid: playerUuid,
        scoreP1: 0,
        scoreP2: 0,
        game: 'started'
      });
    });
  }
}

export default withStyles(styles)(Game);