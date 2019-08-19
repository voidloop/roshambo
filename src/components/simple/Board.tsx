import * as React from "react";
import {Box, createStyles, Theme, WithStyles} from "@material-ui/core";
import withStyles from "@material-ui/core/styles/withStyles";
import Grid from "@material-ui/core/Grid";
import ShapePicker from "./ShapePicker";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faFistRaised} from "@fortawesome/free-solid-svg-icons";
import Transition from "react-transition-group/Transition";
import Typography from "@material-ui/core/Typography";
import {grey} from "@material-ui/core/colors";
import API from "@aws-amplify/api";
import AppBar from "@material-ui/core/AppBar/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import {faHandPaper, faHandRock, faHandScissors} from "@fortawesome/free-regular-svg-icons";


const duration = 150;


const styles = (theme: Theme) => createStyles({
    box: {
      margin: theme.spacing(4, 10),
      paddingBottom: theme.spacing(3),
      [theme.breakpoints.down('xs')]: {
        margin: theme.spacing(4, 5),
      },
    },

    grid: {
      border: '1px solid black'
    },

    iconLeft: {
      transform: 'rotate(90deg) rotateY(180deg)',
    },

    iconRight: {
      transform: 'rotate(270deg)',
    },

    animationDivLeft: {
      transition: `transform ${duration}ms ease-in-out`,
      transformOrigin: 'left center'
    },

    animationDivRight: {
      transition: `transform ${duration}ms ease-in-out`,
      transformOrigin: 'right center'
    },

    boxLeft: {
      height: '200px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: "center",
      [theme.breakpoints.down('xs')]: {
        height: 'auto',
      }
    },

    boxRight: {
      height: '200px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: "center",
      [theme.breakpoints.down('xs')]: {
        height: 'auto',
      }
    },

    divider: {
      marginBottom: theme.spacing(2)
    },

    vsBox: {
      display: "flex",
      justifyContent: "center",
      height: '100%',
      width: '100%',
    },

    vsGrid: {
      [theme.breakpoints.down('xs')]: {
        marginTop: theme.spacing(4),
        marginBottom: theme.spacing(4),
      },
    },

    vsNestedBox: {
      display: "flex",
      justifyContent: "center",
      marginBottom: theme.spacing(2),
      background: `linear-gradient(to left, ${grey[100]} 50%, ${grey[100]} 0)`,
      clipPath: 'polygon(0 0, 100% 0, 50% 90%)',
      height: '100%',
      width: '80px',
      minWidth: '80px',
      paddingTop: theme.spacing(1),
      [theme.breakpoints.down('xs')]: {
        clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)',
        width: '100%',
        alignItems: "center",
        paddingTop: theme.spacing(0),
      }
    },

    appBar: {
      background: 'transparent',
      top: 'auto',
      bottom: 0,
      [theme.breakpoints.down('sm')]: {
        position: 'fixed'
      },
    },

    scoreRight: {
      display: "flex",
      flexDirection: "row-reverse",
      borderBottom: '1px solid',
      [theme.breakpoints.down('xs')]: {
        flexDirection: 'row'
      },
    },

    pointsRight: {
      marginLeft: theme.spacing(2),
      [theme.breakpoints.down('xs')]: {
        marginLeft: theme.spacing(0),
        marginRight: theme.spacing(2),
      },
    }

  }
);

const transitionLeftStyles: any = {
  entering: {
    transform: 'rotate(-45deg)',
  },
  entered: {
    transform: 'rotate(-45deg)',
  },
  exiting: {
    transform: 'rotate(0deg)',
  },
  exited: {
    transform: 'rotate(0deg)',
  },
};

const transitionRightStyles: any = {
  entering: {
    transform: 'rotate(45deg)',
  },
  entered: {
    transform: 'rotate(45deg)',
  },
  exiting: {
    transform: 'rotate(0deg)',
  },
  exited: {
    transform: 'rotate(0deg)',
  },
};


type Shape = 'fist' | 'rock' | 'scissors' | 'paper';

interface State {
  in: boolean;
  buttonsDisabled: boolean;
  shapeP1: Shape;
  shapeP2: Shape;
  pickedShape: Shape;
}


interface Props extends WithStyles<typeof styles> {
  uuid: string;
  playerName: string;
  scoreP1: number;
  scoreP2: number;
  updateScore: (scoreP1: number, scoreP2: number) => void;
}


class Board extends React.Component<Props> {
  state: State;

  constructor(props: Props) {
    super(props);
    this.state = {
      in: false,
      buttonsDisabled: false,
      shapeP1: 'fist',
      shapeP2: 'fist',
      pickedShape: 'fist',
    };
  }

  render() {
    const {classes} = this.props;

    const shapesP1 = {
      fist: <FontAwesomeIcon icon={faFistRaised} size='6x' className={classes.iconLeft}/>,
      rock: <FontAwesomeIcon icon={faHandRock} size='6x' className={classes.iconLeft}/>,
      scissors: <FontAwesomeIcon icon={faHandScissors} size='6x' style={{transform: 'rotate(0deg) rotateY(180deg)'}}/>,
      paper: <FontAwesomeIcon icon={faHandPaper} size='6x' className={classes.iconLeft}/>,
    };

    const shapesP2 = {
      fist: <FontAwesomeIcon icon={faFistRaised} size='6x' className={classes.iconRight}/>,
      rock: <FontAwesomeIcon icon={faHandRock} size='6x' className={classes.iconRight}/>,
      scissors: <FontAwesomeIcon icon={faHandScissors} size='6x' style={{transform: 'rotate(0deg) rotateY(0deg)'}}/>,
      paper: <FontAwesomeIcon icon={faHandPaper} size='6x' className={classes.iconRight}/>,
    };


    return (
      <React.Fragment>
        <Box className={classes.box}>
          <Grid container spacing={3} component='div'>
            <Grid item xs={12} sm={5} component='div'>
              <Grid container component='div'>
                <Grid item xs={6} sm={12} component='div'>
                  <Box display="flex" flexDirection="row" style={{borderBottom: '1px solid'}}>
                    <Box mr={2}>
                      <Typography variant='h2'>{this.props.scoreP1}</Typography>
                    </Box>
                    <Box style={{minWidth: 0}}>
                      <Typography variant='h5' noWrap>{this.props.playerName}</Typography>
                    </Box>
                    <Box style={{flex: 'auto'}}/>
                  </Box>
                </Grid>
                <Grid item xs={6} sm={12} component='div'>
                  <Box className={classes.boxLeft}>
                    <Transition in={this.state.in} timeout={duration}>
                      {(state: any) => (
                        <div className={classes.animationDivLeft} style={transitionLeftStyles[state]}>
                          {shapesP1[this.state.shapeP1]}
                        </div>
                      )}
                    </Transition>
                  </Box>
                </Grid>
              </Grid>
            </Grid>

            <Grid item xs={12} sm={2} component='div' className={classes.vsGrid}>
              <Box className={classes.vsBox}>
                <Box className={classes.vsNestedBox}>
                  <Box>
                    <Typography variant='h4'>VS</Typography>
                  </Box>
                </Box>
              </Box>
            </Grid>

            <Grid item xs={12} sm={5} component='div'>
              <Grid container component='div'>
                <Grid item xs={6} sm={12} component='div'>
                  <Box className={classes.scoreRight}>
                    <Box className={classes.pointsRight}>
                      <Typography variant='h2'>{this.props.scoreP2}</Typography>
                    </Box>
                    <Box style={{minWidth: 0}}>
                      <Typography noWrap variant='h5'>A.I.</Typography>
                    </Box>
                    <Box style={{flex: 'auto'}}/>
                  </Box>
                </Grid>
                <Grid item xs={6} sm={12} component='div'>
                  <Box className={classes.boxRight}>
                    <Transition in={this.state.in} timeout={duration} onEntered={() => {
                      this.state.in && this.doGet()
                    }}>
                      {(state: any) => (
                        <div className={classes.animationDivRight} style={transitionRightStyles[state]}>
                          {shapesP2[this.state.shapeP2]}
                        </div>
                      )}
                    </Transition>
                  </Box>
                </Grid>
              </Grid>
            </Grid>
          </Grid>

        </Box>

        <AppBar position="static" className={classes.appBar}>
          <Toolbar>
            <ShapePicker disabled={this.state.buttonsDisabled} onClick={(shape: string) => {
              this.setState({
                in: true,
                buttonsDisabled: true,
                pickedShape: shape,
                shapeP1: 'fist',
                shapeP2: 'fist'
              });
            }}/>
          </Toolbar>
        </AppBar>
      </React.Fragment>

    );
  }

  doGet() {
    API.put('GamesApi', '/games', {
      body: {
        uuid: this.props.uuid,
        shapeP1: this.state.pickedShape
      }
    }).then((result: any) => {
      const data = result.data;
      this.setState({
        shapeP1: data.shapeP1,
        shapeP2: data.shapeP2,
        buttonsDisabled: false,
        in: false
      });
      this.props.updateScore(data.scoreP1, data.scoreP2);

    });


    // API.get('roshambo', '/match', {})
    //   .then((data: any) => {
    //     this.setState({
    //       shapeP1: this.state.pickedShape,
    //       shapeP2: data.shape,
    //       buttonsDisabled: false,
    //       in: false
    //     });
    //     this.props.calculateScores(this.state.shapeP1, this.state.shapeP2);
    //   });
  }

}

export default withStyles(styles)(Board);