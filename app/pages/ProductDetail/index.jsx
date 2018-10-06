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

import { Product as ProductAction } from 'actions';


const styles = {
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
};

class ProductDetail extends React.Component {
  componentDidMount() {
    if (global._ASYNC_FETCH) {
      this.props.getList();
    }
  }
  render() {
    const {
      classes,
      productList,
    } = this.props;
    // console.log(productList.toJS(), 'this is is');
    return (
      <Container>
        <Helmet>
          <title>商品</title>
        </Helmet>
      </Container>
    );
  }
}
ProductDetail.propTypes = {
  // style
  classes: PropTypes.object.isRequired,
  // data
  productList: PropTypes.object.isRequired,
  // action
  getList: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  productList: state.getIn(['entities', 'product', 'list']),
});

const mapDispatchToProps = {
  getList: ProductAction.list,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withStyles(styles)(ProductDetail));
