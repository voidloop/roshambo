import * as React from "react";
import {Box, createStyles, Theme, WithStyles} from "@material-ui/core";
import withStyles from "@material-ui/core/styles/withStyles";
import Grid from "@material-ui/core/Grid";
import ShapePicker from "./ShapePicker";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faFistRaised} from "@fortawesome/free-solid-svg-icons";
import Transition from "react-transition-group/Transition";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import {deepOrange, lightBlue} from "@material-ui/core/colors";


const duration = 150;


const styles = (theme: Theme) => createStyles({
    box: {
      margin: theme.spacing(4, 10),
      paddingBottom: theme.spacing(3)
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
    },
    boxRight: {
      height: '200px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: "center",
    },

    divider: {
      marginBottom: theme.spacing(2)
    },

    vs: {

        backgroundColor: lightBlue[200],
        marginBottom: theme.spacing(2)


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


interface State {
  in: boolean;
  buttonsDisabled: boolean;
}


interface Props extends WithStyles<typeof styles> {
  playerName: string;
}


class Board extends React.Component<Props> {
  state: State;

  constructor(props: Props) {
    super(props);
    this.state = {
      in: false,
      buttonsDisabled: false,
    };
  }

  render() {
    const {classes} = this.props;

    return (
      <Box className={classes.box}>
        <Grid container spacing={3} component='div'>

          <Grid item xs={12} sm={5} component='div'>

            <Box display="flex" flexDirection="row"  style={{borderBottom: '1px solid'}}>
              <Box mr={2}>
                <Typography variant='h2'>0</Typography>
              </Box>
              <Box  style={{minWidth: 0}}>
                <Typography variant='h5' noWrap>{this.props.playerName}</Typography>
              </Box>
              <Box style={{flex: 'auto'}}/>

            </Box>


            <Box className={classes.boxLeft}>

              <Transition in={this.state.in} timeout={duration}>
                {(state: any) => (
                  <div className={classes.animationDivLeft} style={transitionLeftStyles[state]}>
                    <FontAwesomeIcon icon={faFistRaised} size='6x' className={classes.iconLeft}/>
                  </div>
                )}
              </Transition>


            </Box>
          </Grid>

          <Grid item xs={12} sm={2} component='div' className={classes.vs}>
            <Typography align='center' variant='h4'>VS</Typography>
          </Grid>

          <Grid item xs={12} sm={5} component='div'>

            <Box display="flex" flexDirection="row-reverse" style={{borderBottom: '1px solid'}}>
              <Box ml={2}>
                <Typography variant='h2'>0</Typography>
              </Box>

              <Box style={{minWidth: 0}}>
                <Typography noWrap variant='h5'>A.I.</Typography>
              </Box>

              <Box style={{flex: 'auto'}}/>

            </Box>

            <Box className={classes.boxRight}>
              <Transition in={this.state.in} timeout={duration} onEntered={() => {
                this.state.in && this.doGet()
              }}>
                {(state: any) => (
                  <div className={classes.animationDivRight} style={transitionRightStyles[state]}>
                    <FontAwesomeIcon icon={faFistRaised} size='6x' className={classes.iconRight}/>
                  </div>
                )}
              </Transition>

            </Box>
          </Grid>
        </Grid>

        <Divider component='hr' className={classes.divider}/>

        <ShapePicker disabled={this.state.buttonsDisabled} onClick={(shape: string) => {
          this.setState({in: true, buttonsDisabled: true});
        }}/>



      </Box>
    );
  }

  doGet() {
    this.setState({in: false, buttonsDisabled: false})
  }


}

export default withStyles(styles)(Board);