import React, { Component } from 'react';
import {
  Link,
  BrowserRouter as Router,
  withRouter,
  Route,
  Switch,
} from 'react-router-dom';
import {
  Button,
  Card,
  CardContent,
  createMuiTheme,
  Grid,
  Hidden,
  responsiveFontSizes,
  Typography,
  ThemeProvider,
} from '@material-ui/core';
import IntroCarousel from '../components/IntroCarousel';
import IntroCard from '../components/IntroCard';
import '../App.css';
import NavBar from '../components/NavBar';

let theme = createMuiTheme();
theme = responsiveFontSizes(theme);

class Main extends Component {
  render() {
    return (
      <ThemeProvider theme={theme}>
        <div className="full-container">
          <NavBar />
          <Grid
            container
            style={{
              height: '95%',
            }}
          >
            <Grid item xs={12} sm={8} id="explain">
              <IntroCarousel />
            </Grid>{' '}
            <Grid
              item
              container
              xs={12}
              sm={4}
              id="loginBox1"
              direction="column"
              justify="center"
              alignItems="center"
            >
              <IntroCard />
            </Grid>{' '}
          </Grid>{' '}
        </div>{' '}
      </ThemeProvider>
    );
  }
}

export default withRouter(Main);
