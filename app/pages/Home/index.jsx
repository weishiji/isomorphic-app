import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import { Helmet } from 'react-helmet';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

import Container from 'components/Container';

import { User as UserAction } from 'actions';


const styles = {
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
};

const Home = (props) => {
  const {
    classes,
    userInfo,
    login,
    logout,
  } = props;

  return (
    <Container>
      <Helmet>
        <title>首页</title>
      </Helmet>
      <AppBar position="static">
        <Toolbar>
          <IconButton className={classes.menuButton} color="inherit" aria-label="Menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="title" color="inherit">
            列表
          </Typography>
          <Container flex stretch>
            <Typography
              variant="title"
              color="inherit"
              align="center"
              style={{ flex: 1 }}
            >
              Welcome {userInfo.get('username')}
            </Typography>
          </Container>
          {userInfo.get('userId') ?
            <Button
              color="inherit"
              onClick={logout}
            >
              登出
            </Button> :
            <Button
              color="inherit"
              onClick={login}
            >
              登录
            </Button>
          }

        </Toolbar>
      </AppBar>
      <Container padding={8}>
        <Typography>
          <Link to="/">首页</Link>
        </Typography>
        <Typography>
          <Link to="/profile">profile</Link>
        </Typography>
        <Typography variant="display1">这是首页</Typography>
      </Container>
    </Container>
  );
};

Home.propTypes = {
  // style
  classes: PropTypes.object.isRequired,
  // data
  userInfo: PropTypes.object.isRequired,
  // action
  login: PropTypes.func.isRequired,
  logout: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  userInfo: state.getIn(['entities', 'user', 'info']),
});

const mapDispatchToProps = {
  login: UserAction.login,
  logout: UserAction.logout,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withStyles(styles)(Home));
