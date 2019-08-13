import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faHandPaper, faHandRock, faHandScissors} from "@fortawesome/free-regular-svg-icons";
import * as React from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import {createStyles} from "@material-ui/core";

import {IconDefinition} from '@fortawesome/fontawesome-common-types';


const useStyles = makeStyles(() =>
  createStyles({
    shape: {
      textAlign: 'center'
    },
    button: {
      width: '90px',
      height: '90px',
    },
  }),
);

interface Props {
  onClick: (shape: string) => void;
  disabled?: boolean;
}

const ShapePicker: React.FC<Props> = (props: Props) => {
  const classes = useStyles();

  const isEnabled = () => {
    return !props.disabled;
  };

  const renderButton = (shape: string, icon: IconDefinition) => (
    <Grid item component='div' className={classes.shape}>
      <Button className={classes.button} onClick={() => {isEnabled() && props.onClick(shape)}}>
        <FontAwesomeIcon icon={icon} size='3x'/>
      </Button>
    </Grid>
  );

  return (
    <Grid container spacing={1} component='div' justify='center'>
      {renderButton('rock', faHandRock)}
      {renderButton('scissors', faHandScissors)}
      {renderButton('paper', faHandPaper)}
    </Grid>
  );
};

export default ShapePicker;