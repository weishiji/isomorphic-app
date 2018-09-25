import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import { Helmet } from 'react-helmet';

import PerfectScrollbar from 'perfect-scrollbar';
// import scrollbarStyle from 'perfect-scrollbar/css/perfect-scrollbar.css';

const styles = {
  '@global': {
    '.ps': {
      overflow: 'hidden !important',
      overflowAnchor: 'none',
      touchAction: 'auto',
    },
    '.ps__rail-x': {
      display: 'none',
      opacity: '0',
      transition: 'background-color .2s linear, opacity .2s linear',
      height: 15,
      bottom: 0,
      position: 'absolute',
    },
    '.ps__rail-y': {
      display: 'none',
      opacity: '0',
      transition: 'background-color .2s linear, opacity .2s linear',
      width: 15,
      right: '0',
      position: 'absolute',
    },
    '.ps--active-x > .ps__rail-x, .ps--active-y > .ps__rail-y': {
      display: 'block',
      backgroundColor: 'transparent',
    },
    '.ps:hover > .ps__rail-x, .ps:hover > .ps__rail-y, .ps--focus > .ps__rail-x, .ps--focus > .ps__rail-y, .ps--scrolling-x > .ps__rail-x, .ps--scrolling-y > .ps__rail-y': {
      opacity: '0.6',
    },
    '.ps__thumb-x': {
      backgroundColor: '#aaa',
      borderRadius: 6,
      transition: 'background-color .2s linear, height .2s ease-in-out',
      height: 6,
      bottom: 2,
      position: 'absolute',
    },
    '.ps__thumb-y': {
      backgroundColor: '#aaa',
      borderRadius: 6,
      transition: 'background-color .2s linear, width .2s ease-in-out',
      width: 6,
      right: 2,
      position: 'absolute',
    },
    '.ps__rail-x:hover > .ps__thumb-x, .ps__rail-x:focus > .ps__thumb-x, .ps__rail-x.ps--clicking .ps__thumb-x': {
      backgroundColor: '#999',
      height: 11,
    },
    '@media screen and (-ms-high-contrast: active), (-ms-high-contrast: none)': {
      '.ps': {
        overflow: 'auto !important',
      },
    },
  },
  content: {
    maxHeight: '100%',
    overflow: 'hidden',
  },
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
    } = this.props;
    return (
      <div ref={(node) => { this.box = node; }}>
        {/* <Helmet>
          <style>
            {scrollbarStyle}
          </style>
        </Helmet> */}

        {children}
      </div>
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
  scroll: PropTypes.bool,
  onScroll: PropTypes.func,
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
