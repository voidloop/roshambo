import React from 'react';
import './App.css';
import Game from "./components/challenge/ChallengeGame";
import Paper from "@material-ui/core/Paper";
import AppBar from "@material-ui/core/AppBar/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import makeStyles from "@material-ui/core/styles/makeStyles";
import {createStyles, Theme} from "@material-ui/core";
import SimpleGame from "./components/simple/Game";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
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
  })
);


const App: React.FC = () => {
  const classes = useStyles();

  return (
    <React.Fragment>
      <Paper className={classes.paper}>
        <AppBar position="static" className={classes.appBar}>
          <Toolbar>
            <Typography variant="h6" color='textPrimary'>
              MORRA CINESE!
            </Typography>
          </Toolbar>
        </AppBar>

        <SimpleGame/>

      </Paper>
    </React.Fragment>

  );
};

export default App;
