import Button from "@material-ui/core/Button";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faHandPaper, faHandRock, faHandScissors} from "@fortawesome/free-regular-svg-icons";
import * as React from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import {Box, createStyles} from "@material-ui/core";

import {IconDefinition} from '@fortawesome/fontawesome-common-types';


const useStyles = makeStyles((/*theme: Theme*/) =>
  createStyles({
    button: {
      width: '70px',
      height: '70px',
    },
    buttons: {
      display: 'flex',
      justifyContent: 'center',
      width: "100%",
    },
  }),
);

interface Props {
  onClick: (shape: string) => void;
  disabled?: boolean;
}

const ShapePicker: React.FC<Props> = (props: Props) => {
  const classes = useStyles();

  const renderButton = (shape: string, icon: IconDefinition) => (
    <Box p={1}>
      <Button className={classes.button} disabled={props.disabled} onClick={() => {props.onClick(shape)}}>
        <FontAwesomeIcon icon={icon} size='3x'/>
      </Button>
    </Box>
  );

  return (
    <Box className={classes.buttons}>
      {renderButton('rock', faHandRock)}
      {renderButton('scissors', faHandScissors)}
      {renderButton('paper', faHandPaper)}
    </Box>
  );
};

export default ShapePicker;