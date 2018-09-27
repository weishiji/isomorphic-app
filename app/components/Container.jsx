import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import PerfectScrollbar from 'perfect-scrollbar';

import 'perfect-scrollbar/css/perfect-scrollbar.css';

const styles = {
  flex: {
    display: 'flex',
  },
  stretch: {
    flex: 1,
  },
  'direction-column': {
    flexDirection: 'column',
  },
  'direction-column-reverse': {
    flexDirection: 'column-reverse',
  },
  'direction-row-reverse': {
    flexDirection: 'row-reverse',
  },
  'align-items-center': {
    alignItems: 'center',
  },
  'align-items-flex-start': {
    alignItems: 'flex-start',
  },
  'align-items-flex-end': {
    alignItems: 'flex-end',
  },
  'align-items-baseline': {
    alignItems: 'baseline',
  },
  'align-content-center': {
    alignContent: 'center',
  },
  'align-content-flex-start': {
    alignContent: 'flex-start',
  },
  'align-content-flex-end': {
    alignContent: 'flex-end',
  },
  'align-content-space-between': {
    alignContent: 'space-between',
  },
  'align-content-space-around': {
    alignContent: 'space-around',
  },
  'justify-center': {
    justifyContent: 'center',
  },
  'justify-flex-end': {
    justifyContent: 'flex-end',
  },
  'justify-space-between': {
    justifyContent: 'space-between',
  },
  'justify-space-around': {
    justifyContent: 'space-around',
  },
  'max-width-xs': {
    maxWidth: '100%',
  },
  'max-width-sm': {
    maxWidth: 400,
  },
  'max-width-md': {
    maxWidth: 960,
  },
  'max-width-lg': {
    maxWidth: 1280,
  },
  'max-width-xl': {
    maxWidth: 1920,
  },
  'padding-4': {
    padding: 4,
  },
  'padding-8': {
    padding: 8,
  },
  'padding-16': {
    padding: 16,
  },
  'padding-24': {
    padding: 24,
  },
  'padding-40': {
    padding: 40,
  },
};

class Container extends React.Component {
  componentDidMount() {
    /* eslint no-new: "off" */
    new PerfectScrollbar(this.box);
  }
  render() {
    const {
      children,
      classes,
      className: classNameProp,
      component: Component,

      flex,
      stretch,
      direction,
      alignItems,
      alignContent,
      justify,
      padding,
      maxWidth,
    } = this.props;

    const className = classNames(
      {
        [classes.flex]: flex,
        [classes.stretch]: stretch,
        [classes[`direction-${String(direction)}`]]: direction !== Container.defaultProps.direction,
        [classes[`align-items-${String(alignItems)}`]]: alignItems !== Container.defaultProps.alignItems,
        [classes[`align-content-${String(alignContent)}`]]: alignContent !== Container.defaultProps.alignContent,
        [classes[`justify-${String(justify)}`]]: justify !== Container.defaultProps.justify,
        [classes[`padding-${String(padding)}`]]: padding !== 0,
        [classes[`max-width-${String(maxWidth)}`]]: maxWidth !== Container.defaultProps.maxWidth,
      },
      classNameProp,
    );
    return (
      <Component
        ref={(node) => { this.box = node; }}
        className={className}
      >
        {children}
      </Component>
    );
  }
  // handleScroll = (event) => {
  //   const { onScroll } = this.props;
  //   return onScroll && onScroll(event.target.scrollTop);
  // }

  // render() {
  //   const {
  //     classes,
  //     className: classNameProp,
  //     component: Component,
  //     flex,
  //     stretch,
  //     direction,
  //     alignItems,
  //     alignContent,
  //     justify,
  //     scroll,
  //     padding,
  //     maxWidth,
  //     ...other
  //   } = this.props;

  //   const className = classNames(
  //     classes.content,
  //     {
  //       [classes.flex]: flex,
  //       [classes.stretch]: stretch,
  //       [classes[`direction-${String(direction)}`]]: direction !== Container.defaultProps.direction,
  //       [classes[`align-items-${String(alignItems)}`]]: alignItems !== Container.defaultProps.alignItems,
  //       [classes[`align-content-${String(alignContent)}`]]: alignContent !== Container.defaultProps.alignContent,
  //       [classes[`justify-${String(justify)}`]]: justify !== Container.defaultProps.justify,
  //       [classes[`padding-${String(padding)}`]]: padding !== 0,
  //       [classes[`max-width-${String(maxWidth)}`]]: maxWidth !== Container.defaultProps.maxWidth,
  //     },
  //     classNameProp,
  //   );

  //   return scroll
  //     ? <Scrollbars
  //         ref={(component) => { this.scrollView = component; }}
  //         autoHide
  //         autoHeight
  //         autoHeightMax={'100%'}
  //         style={{ flex: 1, position: 'relative' }}
  //         onScroll={this.handleScroll}
  //       >
  //         <Component
  //           ref={(component) => { this.contentView = component; }}
  //           className={className}
  //           {...other}
  //         />
  //       </Scrollbars>
  //     : <Component
  //         ref={(component) => { this.contentView = component; }}
  //         className={className}
  //         {...other}
  //       />;
  // }
// }
}

Container.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired,
  classes: PropTypes.object.isRequired,
  className: PropTypes.string,

  flex: PropTypes.bool,
  stretch: PropTypes.bool,
  direction: PropTypes.oneOf(['row', 'row-reverse', 'column', 'column-reverse']),
  alignItems: PropTypes.oneOf(['flex-start', 'center', 'flex-end', 'stretch', 'baseline']),
  alignContent: PropTypes.oneOf(['stretch', 'center', 'flex-start', 'flex-end', 'space-between', 'space-around']),
  justify: PropTypes.oneOf(['flex-start', 'center', 'flex-end', 'space-between', 'space-around']),
  padding: PropTypes.oneOf([0, 4, 8, 16, 24, 40]),
  maxWidth: PropTypes.oneOf(['xs', 'sm', 'md', 'lg', 'xl']),
  component: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
};

Container.defaultProps = {
  alignContent: 'stretch',
  alignItems: 'stretch',
  component: 'div',
  direction: 'row',
  justify: 'flex-start',
  padding: 0,
  maxWidth: 'xs',
};

export default withStyles(styles)(Container);
