import React, { Component, PropTypes } from 'react';
import { Motion, spring, presets } from 'react-motion';

export default class Triangle extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hover: false
    };
  }

  render() {
    const { hover, ...others } = this.props;
    const animate = (val) => spring(val, {
      stiffness: 34,
      damping: 18
    });

    return (
      <Motion style={{ offset: hover ? animate(0) : animate(500) }}>
        {({ offset }) =>
          <svg
            {...others}
            width="159px"
            height="158px"
            viewBox="-9 -14 159 158">
            <polygon
              stroke="#000000"
              strokeWidth="1"
              fill="none"
              points="130 65 0 130 0 0"></polygon>
            <polygon
              strokeDashoffset={offset}
              strokeDasharray={500}
              stroke="#000"
              strokeWidth="17"
              fill="none"
              points="0 64 0 0 130 65 0 130"></polygon>
          </svg>
        }
      </Motion>
    );
  }
}
