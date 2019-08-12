import * as React from "react";
import {Box, createStyles, Theme} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import makeStyles from "@material-ui/core/styles/makeStyles";
import ShapePicker from "./ShapePicker";

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
    shape: {
      textAlign: 'center'
    },
    button: {
      width: '100px',
      height: '100px',
    },
  }),
);


const ShapeStep: React.FC = () => {
  const classes = useStyles();
  const [shape, setShape] = React.useState(undefined);

  const handleChange = (newShape: any) => {
    setShape(newShape)
  };

  return (
    <React.Fragment>
      <Box textAlign='center'>
        <Typography variant="h1" className={classes.title}>
          Fai il tuo gioco
        </Typography>
      </Box>
      <ShapePicker onClick={(shape: string) => handleChange(shape)} state={shape}/>
    </React.Fragment>
  );
};

export default ShapeStep;
