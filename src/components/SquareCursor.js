import React, { Component, PropTypes } from 'react';
import { Motion, spring } from 'react-motion';

export default class SquareCursor extends Component {
  static propTypes = {
    show: PropTypes.bool
  };

  render() {
    const { show, ...others } = this.props;
    const motionStyle = {
      lineStrokeOffset: show ? spring(0) : spring(34),
      rectangleStrokeOffset: show ? spring(0) : spring(216)
    };
    return (
      <Motion style={motionStyle}>
        {({ lineStrokeOffset, rectangleStrokeOffset }) =>
          <svg
            {...others}
            width="50px"
            height="50px"
            viewBox="0 0 54 54">
            <defs>
              <rect id="path-1" x="0" y="0" width="54" height="54"></rect>
              <mask id="mask-2" maskContentUnits="userSpaceOnUse" maskUnits="objectBoundingBox" x="0" y="0" width="54" height="54" fill="white">
                  <use xlinkHref="#path-1"></use>
              </mask>
            </defs>
            <use
              stroke="#000000"
              mask="url(#mask-2)"
              strokeWidth="2"
              strokeDasharray={216}
              strokeDashoffset={rectangleStrokeOffset}
              fill="none"
              xlinkHref="#path-1"></use>
            <path
              d="M14.3589255,14.8085949
              L38.8021816,38.3465452"
              stroke="#000000"
              strokeWidth="1"
              strokeDasharray={34}
              strokeDashoffset={lineStrokeOffset}
              strokeLinecap="square"
              fill="none"></path>
            <path
              d="M14.2,38.35 L38.62,14.8"
              stroke="#000000"
              strokeWidth="1"
              strokeDasharray={34}
              strokeDashoffset={lineStrokeOffset}
              strokeLinecap="square"
              fill="none"></path>
          </svg>
        }
      </Motion>
    );
  }
}
