import React, { Component, PropTypes } from 'react';
import styled from 'styled-components';
import ReactPlayer from 'react-player';
import { Motion, spring, presets } from 'react-motion';
import { Triangle } from '../components';

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-content: center;
  justify-content: center;
  position: relative;
`;

const PlayerContainer = styled.div`
  position: relative;
  margin: auto;
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

export default class MainPage extends Component {
  static propTypes = {};
  constructor(props) {
    super(props);
    this.state = {
      zoom: false,
      hover: false
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

  render() {
    const { zoom, hover } = this.state;
    let motionStyle;
    if (zoom) {
      motionStyle = {
        size: spring(100),
        triangleX: spring(-100)
      };
    } else {
      motionStyle = {
        size: spring(80),
        triangleX: spring(-40, presets.wobbly)
      };
    }

    return (
      <Container>
        <div>
          <Motion
            style={motionStyle}
          >
            {({ size, triangleX }) =>
              <PlayerContainer
                style={{
                  width: `${size}%`,
                  height: `${size}%`
                }}
                onClick={this.zoomInOrOut}>
                <TriangleBlock
                  onMouseLeave={this.onMouseLeaveVideo}
                  onMouseOver={this.onMouseOverVideo}>
                  <Triangle
                    style={{
                      // opacity: zoom ? 0 : 1,
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
                  url={require('../assets/StreetPainter.mp4')}/>
              </PlayerContainer>
            }
          </Motion>
        </div>
      </Container>
    );
  }
}
