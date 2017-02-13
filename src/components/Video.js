import React, { Component, PropTypes } from 'react';
import styled from 'styled-components';
import ReactPlayer from 'react-player';
import { Motion, spring } from 'react-motion';
import { Triangle, MouseSquare } from '../components';

/* Center the video */
const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-content: center;
  justify-content: center;
  position: relative;
`;

/* This is a layer on top of the video */
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

/* Also for centering the video.
   Cursor is pointer when hovering over the video. */
const PlayerContainer = styled.div`
  position: relative;
  margin: auto;
  cursor: pointer;
`;

/* This component is independent in position -> Fixed
   move the shape 50% of its width to the left, 50% of its height
   to the top.

   We have a hover event on the PlayerContainer, the cursor is always
   on top of this component. Without that line, the cursor would
   trigger hover mousemove event all the time. With this line, we say
   that there's no event triggered when the mouse move over this
   component. */
const StyledMouseSquare = styled(MouseSquare)`
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
      playerTopOffset: 0,
      mousePosition: {
        top: 0,
        left: 0
      }
    };
  }

  // componentDidMount() {
  //   // Move video to the center of the screen
  //   setTimeout(() => {
  //     console.log(this.container.offsetTop);
  //     console.log(this.playerWrapper.offsetTop);
  //     console.log(msg)
  //   });
  // }

  zoomInOrOut = () => {
    const { zoom } = this.state;
    if (!zoom) {
      // When the video is zoomed, play the video from the start.
      this.player.seekTo(0);
    }

    // Move video to the center of the screen
    const playerTopOffset = window.scrollY - this.container.offsetTop;

    this.setState({
      zoom: !zoom,
      playerTopOffset: zoom ? 0 : playerTopOffset
    });
    document.body.style.overflow = zoom ? 'initial' : 'hidden';
  };

  onMouseOverVideo = () => {
    this.setState({ hover: true });
  };

  onMouseLeaveVideo = () => {
    this.setState({ hover: false });
  };

  onMouseMove = (e) => {
    // Set position of the cursor to the position of MouseSquare
    this.setState({
      mousePosition: {
        left: e.clientX,
        top: e.clientY
      }
    });
  };

  render() {
    const { zoom, hover, mousePosition: {top, left}, playerTopOffset } = this.state;
    const { videoUrl, ...others } = this.props;
    let motionStyle;
    if (zoom) {
      motionStyle = {
        size: spring(100),
        // Move the triangle out of view (to the left)
        triangleX: spring(-120)
      };
    } else {
      motionStyle = {
        size: spring(60),
        // Move the triangle back to its position
        triangleX: spring(-40)
      };
    }

    return (
      <Container
        innerRef={(elem) => this.container = elem}
        {...others}>
        <Motion style={{ playerTop: spring(playerTopOffset) }}>
          {({ playerTop }) =>
            <Container style={{
              position: 'absolute',
              top: playerTop
            }}>
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
                        // Hide the cursor when the video is zoomed
                        cursor: zoom ? 'none' : 'pointer'
                      }}
                      onClick={this.zoomInOrOut}>
                      <StyledMouseSquare
                        style={{
                          top,
                          left
                        }}
                        show={zoom}/>
                      <TriangleBlock
                        // Animate the triangle when the cursor hovers over
                        // the video
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
                        // The video needs to cover the parent width
                        // and height
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
          }
        </Motion>
      </Container>
    );
  }
}
