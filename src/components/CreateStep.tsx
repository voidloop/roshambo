import * as React from "react";
import {Box, createStyles, Theme} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    title: {
      fontSize: '32px',
      marginTop: theme.spacing(2),
      marginBottom: theme.spacing(4),
    },
    container: {
      margin: theme.spacing(0, 10)
    },
  }),
);


const CreateStep: React.FC = () => {
  const classes = useStyles();

  return (
    <React.Fragment>
      <Box textAlign='center'>
        <Typography variant="h1" className={classes.title}>
          Crea una sfida
        </Typography>
      </Box>

      <Grid container spacing={3} component='div'>
        <Grid item xs={12} component='div'>
          <TextField
            required
            id="player1"
            name="player1"
            label="Inserisci il tuo nome"
            fullWidth
          />
        </Grid>
        <Grid item xs={12} component='div'>
          <TextField
            required
            id="player2"
            name="player2"
            label="Inserisci il nome del tuo avversario"
            fullWidth
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default CreateStep;
