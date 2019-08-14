import * as React from "react";
import Start from "./Start";
import Board from "./Board";
import AppBar from "@material-ui/core/AppBar/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import {Box, createStyles, Theme, WithStyles} from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import withStyles from "@material-ui/core/styles/withStyles";
import Button from "@material-ui/core/Button";


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
  playerName: string;
  scoreP1: number;
  scoreP2: number;
}


class Game extends React.Component<Props> {
  state: State;

  constructor(props: Props) {
    super(props);
    this.state = {
      playerName: '',
      scoreP1: 0,
      scoreP2: 0,
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
        {this.isPlayerNameEmpty() ? this.renderStart() : this.renderBoard()}
      </Paper>
    );
  }

  isPlayerNameEmpty() {
    return this.state.playerName === '';
  }

  renderBoard() {
    return <Board playerName={this.state.playerName}
                  scoreP1={this.state.scoreP1}
                  scoreP2={this.state.scoreP2}
                  calculateScores={(shapeP1: string, shapeP2: string) => this.calculateScores(shapeP1, shapeP2)}
    />;
  }

  incScoreP1() {
    this.setState({scoreP1: this.state.scoreP1 + 1});
  }

  incScoreP2() {
    this.setState({scoreP2: this.state.scoreP2 + 1});
  }

  calculateScores(shapeP1: string, shapeP2: string) {
    if (shapeP1 === 'rock') {
      if (shapeP2 === 'paper') {
        this.incScoreP2()
      }
      else if (shapeP2 === 'scissors') {
        this.incScoreP1()
      }
    }
    else if (shapeP1 === 'scissors') {
      if (shapeP2 === 'paper') {
        this.incScoreP1()
      }
      else if (shapeP2 === 'rock') {
        this.incScoreP2()
      }
    }
    else if (shapeP1 === 'paper') {
      if (shapeP2 === 'scissors') {
        this.incScoreP2()
      }
      else if (shapeP2 === 'rock') {
        this.incScoreP1()
      }
    }
  }

  renderStart() {
    return <Start onClick={(playerName: string) => this.handleClick(playerName)}/>;
  }

  handleClick(playerName: string) {
    this.setState({playerName: playerName});
  }
}

export default withStyles(styles)(Game);