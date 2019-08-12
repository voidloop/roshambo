import * as React from "react";
import {Box, createStyles, Theme, WithStyles} from "@material-ui/core";
import withStyles from "@material-ui/core/styles/withStyles";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import ShapePicker from "./ShapePicker";


const styles = (theme: Theme) => createStyles({
    box: {
      margin: theme.spacing(4, 10),
      paddingBottom: theme.spacing(3)
    },
  }
);


interface Props extends WithStyles<typeof styles> {
  playerName: string;
}


class Board extends React.Component<Props> {

  constructor(props: Props) {
    super(props);
  }

  render() {
    const {classes} = this.props;
    return (
      <Box className={classes.box}>
        <Grid container spacing={3} component='div'>
          <Grid item xs={12} sm={6} component='div'>
            <TextField
              required
              id="player1"
              name="player1"
              label="Inserisci il tuo nome"
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6} component='div'>
            <TextField
              required
              id="player2"
              name="player2"
              label="Inserisci il nome del tuo avversario"
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6} component='div'>
            <ShapePicker onClick={(shape: string) => {}}/>
          </Grid>

        </Grid>
      </Box>
    );
  }
}

export default withStyles(styles)(Board);