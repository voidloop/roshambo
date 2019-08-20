import {Box, createStyles, Theme, WithStyles} from "@material-ui/core";
import * as React from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import AppBar from "@material-ui/core/AppBar/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";

const styles = (theme: Theme) => createStyles({

  box: {
    margin: theme.spacing(4, 12),
    [theme.breakpoints.down('xs')]: {
      margin: theme.spacing(3, 5),
    },

    paddingBottom: theme.spacing(3)
  },


  appBar: {
    background: 'transparent',
    boxShadow: 'none',
    top: 'auto',
    bottom: 0,
    [theme.breakpoints.down('sm')]: {
      position: 'fixed'
    },
  },

  buttonResetBox: {
    display: "flex",
    flexDirection: "row",
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: theme.spacing(3)
  },

  buttons: {
    display: 'flex',
    justifyContent: 'flex-end',
    width: "100%",
  },
  button: {},

});


interface Props extends WithStyles<typeof styles> {
  scoreP1: number;
  scoreP2: number;
  endGame: () => void;
  restartGame: () => void;
}


class Result extends React.Component<Props> {

  // constructor(props: Props) {
  //   super(props);
  // }

  render() {
    const {classes} = this.props;

    return (
      <React.Fragment>
        <Box className={classes.box}>

          <Grid container spacing={3} component='div'>
            <Grid item xs={12} component='div'>
              <Box display='flex' justifyContent='center' alignItems='center' css={{width: '100%'}}>
                <Box>
                  <Typography variant='h1' align='center'>
                    {this.props.scoreP1 > this.props.scoreP2 ? 'Hai vinto' : 'Hai perso!'}
                  </Typography>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={12} component='div'>
              <Box display='flex' justifyContent='center' alignItems='center' css={{width: '100%'}}>
                <Box>
                  <Typography variant='h3'>
                    {this.props.scoreP1}
                  </Typography>
                </Box>
                <Box pl={3} pr={3}>
                  <Typography variant='h3'>{'—'}</Typography>
                </Box>
                <Box>
                  <Typography variant='h3'>
                    {this.props.scoreP2}
                  </Typography>
                </Box>
              </Box>
            </Grid>
          </Grid>


        </Box>

        <AppBar position="static" className={classes.appBar}>
          <Toolbar>
            <Box className={classes.buttons}>
              <Box className={classes.buttons}>
                <Box pr={2}>
                  <Button onClick={() => this.props.endGame()} className={classes.button}>
                    <Typography>Fine</Typography>
                  </Button>
                </Box>


                <Box>
                  <Button variant="contained" color='primary' onClick={() => this.props.restartGame()} className={classes.button}>
                    <Typography>Gioca ancora</Typography>
                  </Button>
                </Box>


              </Box>


            </Box>

          </Toolbar>
        </AppBar>
      </React.Fragment>
    );
  }


}

export default withStyles(styles)(Result);