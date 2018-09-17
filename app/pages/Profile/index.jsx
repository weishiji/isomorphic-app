import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

import Container from 'components/Container';

const styles = {
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
};

const Profile = (props) => {
  const { classes } = props;
  return (
    <Container scroll>
      <AppBar position="static">
        <Toolbar>
          <IconButton className={classes.menuButton} color="inherit" aria-label="Menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="title" color="inherit" className={classes.flex}>
            Title
          </Typography>
          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>
      <Container padding={8}>
        <Typography>
          <Link to="/">首页</Link>
        </Typography>
        <Typography>
          <Link to="/profile">profile</Link>
        </Typography>
        <Typography variant="display1">这是Profile</Typography>
      </Container>
    </Container>
  );
};

Profile.propTypes = {
  // style
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
});

const mapDispatchToProps = {
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withStyles(styles)(Profile));
