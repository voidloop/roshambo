import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import * as React from "react";
import Button from "@material-ui/core/Button";
import {ChangeEvent} from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import {Box, createStyles, Theme} from "@material-ui/core";


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
      marginTop: theme.spacing(6),
    },
    button: {
      marginTop: theme.spacing(3),
      marginLeft: theme.spacing(1),
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
    console.log(target.value);
  };

  return (
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

      <div className={classes.buttons}>
        <Button
          href=''
          variant="contained"
          color="primary"
          onClick={() => props.onClick(playerName)}
          className={classes.button}
        >
          Gioca!
        </Button>
      </div>
    </Box>
  );
};

export default Start;