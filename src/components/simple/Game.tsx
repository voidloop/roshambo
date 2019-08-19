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
    return <Board uuid={this.state.uuid}
                  playerName={this.state.playerName}
                  scoreP1={this.state.scoreP1}
                  scoreP2={this.state.scoreP2}
                  updateScore={(scoreP1: number, scoreP2: number) => this.updateScore(scoreP1, scoreP2)}
    />;
  }

  updateScore(scoreP1: number, scoreP2: number) {
    this.setState({
      scoreP1: scoreP1,
      scoreP2: scoreP2
    });
  }

  renderStart() {
    return <Start onClick={(playerName: string) => this.handleClick(playerName)}/>;
  }

  handleClick(playerName: string) {
    const playerUuid: string = uuid.v4();

    API.post('GamesApi', '/games', {
      body: {
        uuid: playerUuid,
        playerName: playerName,
        scoreP1: this.state.scoreP1,
        scoreP2: this.state.scoreP1,
        date: Date.now()
      }
    }).then(() => {
      this.setState({playerName: playerName, uuid: playerUuid});
    });
  }
}

export default withStyles(styles)(Game);