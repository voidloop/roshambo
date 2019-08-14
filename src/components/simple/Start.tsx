import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import * as React from "react";
import Button from "@material-ui/core/Button";
import {ChangeEvent} from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import {Box, createStyles, Theme} from "@material-ui/core";
import AppBar from "@material-ui/core/AppBar/AppBar";
import Toolbar from "@material-ui/core/Toolbar";


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    box: {
      margin: theme.spacing(4, 12),
      [theme.breakpoints.down('xs')]: {
        margin: theme.spacing(3, 5),
      },

      paddingBottom: theme.spacing(3)
    },
    buttons: {
      display: 'flex',
      justifyContent: 'flex-end',
      width: "100%",
    },
    button: {
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

  }),
);


interface Props {
  onClick: (playerName: string) => void;
}


const Start: React.FC<Props> = (props: Props) => {
  const [playerName, setPlayerName] = React.useState<string>('');
  const classes = useStyles();

  const handleChange = (event: ChangeEvent) => {
    const target = event.target as HTMLInputElement;
    setPlayerName(target.value);
  };

  return (
    <React.Fragment>
      <Box className={classes.box}>
        <Grid container spacing={3} component='div'>
          <Grid item xs={12} component='div'>
            <TextField
              required
              id="playerName"
              name="playerName"
              value={playerName}
              label="Inserisci il tuo nome"
              fullWidth
              onChange={handleChange}
            />
          </Grid>
        </Grid>
      </Box>

      <AppBar position="static" className={classes.appBar}>
        <Toolbar>
          <Box className={classes.buttons}>
            <Box>
              <Button href='' variant="contained" color="primary"
                      onClick={() => props.onClick(playerName)}
                      className={classes.button}
              >
                Gioca!
              </Button>
            </Box>
          </Box>
        </Toolbar>
      </AppBar>
    </React.Fragment>
  );
};

export default Start;