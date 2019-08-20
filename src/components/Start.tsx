import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import * as React from "react";
import Button from "@material-ui/core/Button";
import {ChangeEvent} from "react";
import {Box, createStyles, Theme, WithStyles} from "@material-ui/core";
import AppBar from "@material-ui/core/AppBar/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Typography from "@material-ui/core/Typography";
import API from "@aws-amplify/api";
import withStyles from "@material-ui/core/styles/withStyles";


const styles = (theme: Theme) => createStyles({
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
  button: {},

  appBar: {
    background: 'transparent',
    boxShadow: 'none',
    top: 'auto',
    bottom: 0,
    [theme.breakpoints.down('sm')]: {
      position: 'fixed'
    },
  },

  list: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },

  inline: {
    display: 'inline',
  },

  boxGames: {
    marginTop: theme.spacing(8),
    fontWeight: 'bold'
  }
});


interface Props extends WithStyles<typeof styles> {
  onClick: (playerName: string) => void;
}


interface State {
  playerName: string;
  buttonDisabled: boolean;
  isLoading: boolean;
  lastGames: any[];
}


class Start extends React.Component<Props> {
  state: State;

  constructor(props: Props) {
    super(props);

    this.state = {
      playerName: '',
      buttonDisabled: false,
      isLoading: true,
      lastGames: [],
    };

    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount(): void {
    API.get('GamesApi', '/games', {})
      .then((items: any) => {
        console.log(items);

        let selectedItems: any[] = [];
        for (let i = 0; i < Math.min(3, items.length); i++) {
          selectedItems.push(items[i]);
        }

        this.setState({
          lastGames: selectedItems,
          isLoading: false
        });
      })
      .catch(() => {
        this.setState({isLoading: false});
      });
  }


  handleChange(event: ChangeEvent) {
    const target = event.target as HTMLInputElement;
    this.setState({
      playerName: target.value,
    });
  }


  lastGames() {
    const options: Intl.DateTimeFormatOptions = {
      weekday: 'long', year: 'numeric',
      month: 'long', day: 'numeric',
      hour: 'numeric', minute: 'numeric',
    };

    const renderPrimary = (item: any) => {

      interface Result {
        message: string;
        color: 'primary' | 'secondary' | 'textPrimary';
      }

      let result: Result = {message: 'ha pareggiato', color: 'textPrimary'};

      if (item.scoreP1 > item.scoreP2) {
        result = {message: "ha vinto", color: 'primary'}
      } else if (item.scoreP1 < item.scoreP2) {
        result = {message: "ha perso", color: 'secondary'}
      }

      return (
        <Box display='flex'>
          <Box pr={1} maxWidth='33%'><Typography noWrap color='textPrimary'>{item.playerName}</Typography></Box>
          <Box pr={1}><Typography color={result.color}>{result.message}</Typography></Box>
          <Box pr={1}><Typography color='textPrimary'>{item.scoreP1 + " — " + item.scoreP2}</Typography></Box>
        </Box>
      );
    };


    return this.state.lastGames
      .map((item: any, index: number) => {

        const gameDate = new Date(item.date);
        const formattedDate = (new Intl.DateTimeFormat('it-IT', options)).format(gameDate);

        return <ListItem alignItems="flex-start" key={index}>
          <ListItemText
            primary={renderPrimary(item)}
            secondary={formattedDate}
          />
        </ListItem>
      });
  }


  render() {
    const classes = this.props.classes;

    return (
      <React.Fragment>
        <Box className={classes.box}>
          <Grid container spacing={3} component='div'>
            <Grid item xs={12} component='div'>
              <TextField
                required
                id="playerName"
                name="playerName"
                value={this.state.playerName}
                label="Inserisci il tuo nome"
                fullWidth
                onChange={this.handleChange}
              />
            </Grid>
          </Grid>

          <Box className={classes.boxGames}>

            <Typography color='textPrimary' component='div'>
              <Box fontWeight="fontWeightBold">
                Ultime partite giocate
              </Box>
            </Typography>

            <List className={classes.list}>
              {this.lastGames()}
            </List>

          </Box>

        </Box>
        <AppBar position="static" className={classes.appBar}>
          <Toolbar>
            <Box className={classes.buttons}>
              <Box>
                <Button href='' disabled={this.state.buttonDisabled} variant="contained" color="primary"
                        onClick={() => {
                          if (this.state.playerName) {
                            this.setState({buttonDisabled: true});
                          }
                          this.props.onClick(this.state.playerName)
                        }}
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
  }

}

export default withStyles(styles)(Start);