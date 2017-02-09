import React, { Component, PropTypes } from 'react';
import styled from 'styled-components';
import { Motion, spring } from 'react-motion';

const ProgressTextDiv = styled.div`
  position: relative;
  display: inline-block;
  color: ${({color}) => color};
`;

const ProgressDiv = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  color: ${({color}) => color};
`;

export default class ProgressText extends Component {
  static propTypes = {
    springOptions: PropTypes.object,
    progress: PropTypes.number.isRequired,
    renderText: PropTypes.func,
    text: PropTypes.string.isRequired,
    placeholderTextColor: PropTypes.string,
    progressTextColor: PropTypes.string
  };

  static defaultProps = {
    springOptions: {},
    progress: 0
  }

  render() {
    const {
      springOptions,
      progress,
      renderText,
      text,
      placeholderTextColor,
      progressTextColor
    } = this.props;

    const textStyle = {
      overflow: 'hidden',
      whiteSpace: 'nowrap',
      pointerEvents: 'none'
    };

    const _renderText = renderText ?
      renderText :
      (props, text) => <h1 {...props}>{text}</h1>;

    return (
      <ProgressTextDiv color={placeholderTextColor}>
        {_renderText({}, text)}
        <ProgressDiv color={progressTextColor}>
          <Motion
            style={{ width: spring(progress, springOptions) }}>
            {({ width }) =>
              _renderText({ style: {
                ...textStyle,
                width: `${width}%`
              }}, text)
            }
          </Motion>
        </ProgressDiv>
      </ProgressTextDiv>
    );
  }
}
