import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { withStyles } from '@material-ui/core/styles';

const styles = {
};

const Home = () =>
  <div>hello</div>;

Home.propTypes = {
  // style
  classes: PropTypes.object.isRequired,
  // state
  theme: PropTypes.string.isRequired,
};

const mapStateToProps = state => ({
});

const mapDispatchToProps = {
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withStyles(styles)(Home));
