import React, { Component, PropTypes } from 'react';
import styled from 'styled-components';
import ReactPlayer from 'react-player';
import { Motion, spring, presets } from 'react-motion';
import { Triangle, MouseRectangle } from '../components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-content: center;
  justify-content: center;
  position: relative;
`;

const TriangleBlock = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 1;
  display: flex;
  align-items: center;
`;

const PlayerContainer = styled.div`
  position: relative;
  margin: auto;
  cursor: pointer;
`;

const StyledMouseRectangle = styled(MouseRectangle)`
  position: fixed;
  transform: translate(-50%, -50%);
  pointer-events: none;
`;

export default class Video extends Component {
  static propTypes = {
    videoUrl: PropTypes.string.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      zoom: false,
      hover: false,
      mousePosition: {
        top: 0,
        left: 0
      }
    };
  }

  zoomInOrOut = () => {
    const { zoom } = this.state;
    if (!zoom) {
      this.player.seekTo(0);
    }
    this.setState({ zoom: !zoom });
  };

  onMouseOverVideo = () => {
    this.setState({ hover: true });
  };

  onMouseLeaveVideo = () => {
    this.setState({ hover: false });
  };

  onMouseMove = (e) => {
    this.setState({
      mousePosition: {
        left: e.clientX,
        top: e.clientY
      }
    });
  };

  render() {
    const { zoom, hover, mousePosition: {top, left} } = this.state;
    const { videoUrl, ...others } = this.props;
    let motionStyle;
    if (zoom) {
      motionStyle = {
        size: spring(100),
        triangleX: spring(-120)
      };
    } else {
      motionStyle = {
        size: spring(60),
        triangleX: spring(-40)
      };
    }

    return (
      <Container {...others}>
        <div>
          <Motion
            style={motionStyle}
          >
            {({ size, triangleX }) =>
              <PlayerContainer
                onMouseMove={this.onMouseMove}
                style={{
                  width: `${size}%`,
                  height: `${size}%`,
                  cursor: zoom ? 'none' : 'pointer'
                }}
                onClick={this.zoomInOrOut}>
                <StyledMouseRectangle
                  style={{
                    top,
                    left
                  }}
                  show={zoom}/>
                <TriangleBlock
                  onMouseLeave={this.onMouseLeaveVideo}
                  onMouseOver={this.onMouseOverVideo}>
                  <Triangle
                    style={{
                      transform: `translate(${triangleX}%, 0)`
                    }}
                    hover={hover}/>
                </TriangleBlock>
                <ReactPlayer
                  ref={(player) => this.player = player}
                  width={'100%'}
                  height={'100%'}
                  playing
                  loop
                  url={videoUrl}/>
              </PlayerContainer>
            }
          </Motion>
        </div>
      </Container>
    );
  }
}
