import React, { Component, PropTypes } from 'react';
import { Motion, spring } from 'react-motion';

export default class Triangle extends Component {
  static propTypes = {
    hover: PropTypes.bool
  };

  render() {
    const { hover, ...others } = this.props;
    // Animate slower than default spring animation a bit.
    const animate = (val) => spring(val, {
      stiffness: 120,
      damping: 35
    });
    return (
      <Motion style={{ offset: hover ? animate(0) : animate(271) }}>
        {({ offset }) =>
          <svg
            {...others} // To inherit any props
            width="57px"
            height="106px"
            viewBox="-4 -10 57 106">
            <polygon
              strokeDasharray={271} // Oh. I did the math. Turns out, stroke-dasharray can be >= the perimeter of the triangle, or you know, any shape.
              strokeDashoffset={offset}
              stroke="#000000"
              strokeWidth="8"
              fill="none"
              points="0 42.9371985 0 -0.125603023 46.9776016 42.9371985 0 86">
            </polygon>
            <polygon
              stroke="#000000"
              strokeWidth="1"
              fill="none"
              points="0 42.9371985 0 -0.125603023 46.9776016 42.9371985 0 86">
            </polygon>
          </svg>
        }
      </Motion>
    );
  }
}
