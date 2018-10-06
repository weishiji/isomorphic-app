import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import { Helmet } from 'react-helmet';

import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import Container from 'components/Container';

import { Product as ProductAction } from 'actions';

const imageHost = 'https://www.stylewe.com/image_cache/resize/335x445';


const styles = {
  root: {
    position: 'relative',
    height: '100%',
    flexWrap: 'wrap',
  },
  card: {
    maxWidth: 335,
    minWidth: 335,
    border: '1px solid #ddd',
    marginBottom: 24,
  },
  media: {
    height: 445,
  },
};

class ProductList extends React.Component {
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
    console.log(productList.toJS(), 'this is is');
    return (
      <Container flex justify="space-around" className={classes.root}>
        <Helmet>
          <title>商品列表</title>
        </Helmet>
        {productList.map(item => (
          <Card key={item.get('item_id')} className={classes.card}>
            <CardActionArea>
              <CardMedia
                className={classes.media}
                image={`${imageHost}${item.get('image')}`}
                title={item.get('name')}
              />
              <CardContent>
                <Typography gutterBottom variant="headline" component="h2">
                  {item.getIn(['designer', '0', 'name'])}
                </Typography>
                <Typography component="p">
                  {item.get('name')}
                </Typography>
              </CardContent>
            </CardActionArea>
            <CardActions>
              <Button size="small" color="primary">
                {item.getIn(['price', 'price'])}
              </Button>
            </CardActions>
          </Card>
        ))}

      </Container>
    );
  }
}
ProductList.propTypes = {
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
)(withStyles(styles)(ProductList));
