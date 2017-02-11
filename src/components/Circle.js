import React, { Component, PropTypes } from 'react';
import { Motion, spring } from 'react-motion';

export default class Circle extends Component {
  static propTypes = {
    springOptions: PropTypes.object,
    progress: PropTypes.number.isRequired,
    placeholderStrokeColor: PropTypes.string,
    progressStrokeColor: PropTypes.string
  };

  static defaultProps = {
    springOptions: {},
    progress: 0
  }

  render() {
    const {
      springOptions,
      progress,
      placeholderStrokeColor,
      progressStrokeColor,
      ...others
    } = this.props;

    return (
      <Motion
        style={{ progress: spring(progress, springOptions) }}>
        {({ progress }) =>
          <svg {...others} width="32px" height="32px" viewBox="-1 -1 32 32">
            <circle id="full" stroke={placeholderStrokeColor} strokeWidth="1" fill="none" cx="14.75" cy="15" r="14.75"></circle>
            <path
              d="M24.6965283,25.6965283 C27.4196747,22.9947413 29.3965283,19.6965283 29.3965283,14.6965283 C29.3965283,7.69652833 23.0684539,0.150000006 14.8327319,0.150000006 C10.644064,0.150000006 6.85875551,1.87698677 4.15000001,4.65776667" id="half1"
              stroke={progressStrokeColor}
              strokeWidth="1"
              fill="none"
              transform="translate(16.773264, 12.923264) scale(-1, 1) rotate(-90.000000) translate(-16.773264, -12.923264) "
              style={{
                strokeDasharray: 47,
                strokeDashoffset: (100 - progress) / 100 * 47
              }}></path>
            <path
              d="M20.5948257,29.7999992 C23.3179721,27.0980248 25.5948257,23.3525256 25.5948257,19.2131276 C25.5948257,10.9768343 18.9184539,4 10.6827319,4 C6.494064,4 2.70875551,6.02710581 -1.77635684e-14,8.80807864"
              id="half2"
              stroke={progressStrokeColor}
              strokeWidth="1"
              fill="none"
              transform="translate(12.797413, 16.900000) scale(-1, -1) translate(-12.797413, -16.900000) "
              style={{
                strokeDasharray: 47,
                strokeDashoffset: (100 - progress) / 100 * 47
              }}></path>
          </svg>
        }
      </Motion>
    );
  }
}
