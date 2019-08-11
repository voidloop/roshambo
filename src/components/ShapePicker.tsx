import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faHandPaper, faHandRock, faHandScissors} from "@fortawesome/free-regular-svg-icons";
import React from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import {createStyles} from "@material-ui/core";
import {red} from "@material-ui/core/colors";


const useStyles = makeStyles(() =>
  createStyles({
    shape: {
      textAlign: 'center'
    },
    unselected: {
      width: '100px',
      height: '100px',
    },
    selected: {
      width: '100px',
      height: '100px',
      backgroundColor: red[500],
      '&:hover': {
        backgroundColor: red[700],
      },
    },
  }),
);

interface IProps {
  onClick: (shape: string) => void;
  state: undefined | 'rock' | 'paper' | 'scissors';
}

const ShapePicker = (props: IProps) => {
  const classes = useStyles();
  const [shape, setShape] = React.useState(props.state);

  const handleChange = (newShape: any) => {
    setShape(newShape);
    props.onClick(newShape);
  };

  const renderButton = (name: string, icon: any) => {
    return (
      <Grid item sm={3} component='div' className={classes.shape}>
        <Button className={shape === name ? classes.selected : classes.unselected}
                onClick={() => handleChange(name)}>
          <FontAwesomeIcon icon={icon} size='6x'/>
        </Button>
      </Grid>
    );
  };

  return (
    <Grid container spacing={5} component='div' justify='center'>
      {renderButton('rock', faHandRock)}
      {renderButton('scissors', faHandScissors)}
      {renderButton('paper', faHandPaper)}
    </Grid>
  );
};

export default ShapePicker;