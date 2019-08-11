import * as React from "react";
import {Box, createStyles, Theme} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Paper from "@material-ui/core/Paper";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import CreateStep from "./CreateStep";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import ShapeStep from "./ShapeStep";


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
    box: {
      margin: theme.spacing(0, 10),
      paddingBottom: theme.spacing(3)
    },
    buttons: {
      display: 'flex',
      justifyContent: 'flex-end',
      marginTop: theme.spacing(3),
    },
    button: {
      marginTop: theme.spacing(3),
      marginLeft: theme.spacing(1),
    },
    stepper: {
      padding: theme.spacing(3, 0, 5),
    },
  }),
);


const steps = ['Crea una sfida', 'Scegli il segno', 'Il tuo avversario'];


const getStepContent = (step: number) => {
  switch (step) {
    case 0:
      return <CreateStep/>;
    case 1:
      return <ShapeStep/>;
    case 2:
      return <CreateStep/>;
    default:
      throw new Error('Unknown step');
  }
};


const Game: React.FC = () => {
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);

  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  return (

    <React.Fragment>

      <Paper className={classes.paper}>
        <AppBar position="static" className={classes.appBar}>
          <Toolbar>
            <Typography variant="h6" color='textPrimary'>
              Roshambo!
            </Typography>
          </Toolbar>
        </AppBar>

        <Box className={classes.box}>
          <Stepper activeStep={activeStep} className={classes.stepper}>
            {steps.map((label: any) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          <React.Fragment>
            {getStepContent(activeStep)}
            <div className={classes.buttons}>
              {activeStep !== 0 && (
                <Button
                  onClick={handleBack}
                  className={classes.button}
                >
                  Back
                </Button>
              )}
              <Button
                variant="contained"
                color="primary"
                onClick={handleNext}
                className={classes.button}
              >
                {activeStep === steps.length - 1 ? 'Invia la sfida!' : 'Avanti'}
              </Button>
            </div>
          </React.Fragment>

        </Box>
      </Paper>
    </React.Fragment>
  );
};

export default Game;
