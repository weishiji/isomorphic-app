import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { renderRoutes } from 'react-router-config';

import CssBaseline from '@material-ui/core/CssBaseline';
import { MuiThemeProvider, withStyles } from '@material-ui/core/styles';

import theme from 'theme';

const styles = {
  '@global': {
    'html, body, #app': {
      height: '100%',
      minHeight: '100%',
    },
  },
  frame: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    height: '100%',
    maxHeight: '100%',
    overflowX: 'hidden',
  },
  progress: {
    margin: 'auto',
  },
};

class Frame extends React.Component {
  componentDidMount() {
  }
  render() {
    const {
      classes,
      route,
    } = this.props;
    return (
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        <main className={classes.frame}>
          {renderRoutes(route.routes)}
        </main>
      </MuiThemeProvider>
    );
  }
}

Frame.propTypes = {
  // style
  classes: PropTypes.object.isRequired,
  // state
  route: PropTypes.object.isRequired,
  // action
};

const mapStateToProps = state => ({
});

const mapDispatchToProps = {
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withStyles(styles)(Frame));
