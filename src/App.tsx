import React from 'react';
import './App.css';
import SimpleGame from "./components/Game";
import {ThemeProvider} from '@material-ui/styles';
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";
import Comic from './fonts/Comic_Book.otf';
import CssBaseline from "@material-ui/core/CssBaseline";
import awsmobile from './aws-exports';
import Amplify from 'aws-amplify';

//Amplify.Logger.LOG_LEVEL = 'DEBUG';
Amplify.configure(awsmobile);


const comic: any = {
  fontFamily: 'Comic',
  fontStyle: 'normal',
  fontDisplay: 'swap',
  fontWeight: 400,
  src: `url(${Comic})`,
};


const theme = createMuiTheme({
  overrides: {
    MuiCssBaseline: {
      '@global': {
        '@font-face': [comic],
      },
    },
  },
});


const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline/>
      <SimpleGame/>
    </ThemeProvider>
  );
};

export default App;
