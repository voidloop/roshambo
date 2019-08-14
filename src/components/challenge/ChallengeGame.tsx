import * as React from "react";
import {Box, createStyles, Theme, WithStyles} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import CreateStep from "./CreateStep";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import ShapeStep from "./ShapeStep";
import withStyles from "@material-ui/core/styles/withStyles";

const styles = (theme: Theme) => createStyles({
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
  }
);


interface State {
  activeStep: number;
}


interface Props extends WithStyles<typeof styles> {
}


class ChallengeGame extends React.Component<Props> {

  readonly steps = ['Crea una sfida', 'Scegli il segno', 'Il tuo avversario'];
  state: State;

  constructor(props: Props) {
    super(props);
    this.state = {
      activeStep: 0,
    }
  }

  render() {
    const {classes} = this.props;
    const activeStep = this.state.activeStep;

    return (
      <Box className={classes.box}>
        <Stepper activeStep={activeStep} className={classes.stepper}>
          {this.steps.map((label: any) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        <React.Fragment>
          {this.getStepContent()}
          <div className={classes.buttons}>
            {this.canGoBack() && this.renderBackButton()}
            <Button
              variant="contained"
              color="primary"
              onClick={() => this.handleNext()}
              className={classes.button}
            >
              {this.isLastStep() ? 'Invia la sfida!' : 'Avanti'}
            </Button>
          </div>
        </React.Fragment>

      </Box>
    );
  }

  renderBackButton() {
    const {classes} = this.props;
    return <Button onClick={() => this.handleBack()} className={classes.button}>
      Indietro
    </Button>
  }

  getStepContent() {
    switch (this.state.activeStep) {
      case 0:
        return <CreateStep/>;
      case 1:
        return <ShapeStep/>;
      case 2:
        return <CreateStep/>;
      default:
        throw new Error('Unknown step');
    }
  }

  handleNext() {
    this.setState({activeStep: this.state.activeStep + 1});
  }

  handleBack() {
    this.setState({activeStep: this.state.activeStep - 1});
  }

  isLastStep() {
    return this.state.activeStep === this.steps.length - 1;
  }

  canGoBack() {
    return this.state.activeStep !== 0;
  }

}

export default withStyles(styles)(ChallengeGame);