import React, { Component, PropTypes } from 'react';
import styled from 'styled-components';
import ReactPlayer from 'react-player';
import { Motion, spring } from 'react-motion';
import { Triangle, SquareCursor } from '../components';

/* Notes:
1. I want the container of the video to be full size of the screen

2. Now let's make the video zoomable. We will do it by adjusting
the size of PlayerContainer.
--> React-Motion comes into play!!!

3. We need to style the Triangle. Triangle's position does NOT depend
on the parent block. Therefore...

When the video is in full screen mode. I want the Triangle to be out of
sight. So I will move it to the left a bit.

4. Let's style SquareCursor. It needs to be position: fixed. The
position must match the cusor's position.
Now. ONLY display the SquareCursor when the video is zoomed.

HOLD ON. We need to animate it. Remember? Silly me... =.="
 */

const Container = styled.div`
  width: 100vw;
  height: 100vh;

  // Flex-box is awesome :)
  display: flex;
  flex-direction: column;
  align-content: center;
  justify-content: center;
`;

const PlayerContainer = styled.div`
  position: relative;
  // We need this because we're gonna
  // have elements with "position: absolute"
  cursor: pointer;
  display: inline-block;

  margin-left: auto;
  margin-right: auto;
`;

const StyledTriangle = styled(Triangle)`
  position: absolute;
  top: 50%;
  left: 0;
`;

const StyledSquareCursor = styled(SquareCursor)`
  position: fixed;
  top: 0;
  left: 0;
  transform: translate(-50%, -50%);

  pointer-events: none;
  // This is CRUCIAL. Since SquareCursor is inside PlayerContainer and the mouse is always on top of SquareCursor. We need this line to say that "Hey, nothing happens when the cursor is on top of SquareCursor. It's like the cursor is not even over the element!"
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
      moveDown: 0,
      cursorPosition: {
        top: 0,
        left: 0
      }
    };
  }

  toggleZoom = () => {
    const { zoom } = this.state;

    // When the video is zoom. Disable scrolling
    document.querySelector('html').style.overflowY = zoom ?
      'initial' :
      'hidden';

    const moveDown = window.scrollY - this.container.offsetTop;

    this.setState({
      zoom: !zoom,
      moveDown: !zoom ? moveDown : 0
    });
  };

  onMouseOver = () => {
    this.setState({
      hover: true
    });
  };

  onMouseLeave = () => {
    this.setState({
      hover: false
    });
  };

  onMouseMove = (e) => {
    this.setState({
      cursorPosition: {
        top: e.clientY,
        left: e.clientX
      }
    });
  };

  render() {
    const { videoUrl } = this.props;
    const { zoom, hover, cursorPosition, moveDown } = this.state;
    const motionStyle = zoom ? {
      videoSize: spring(100),
      triangleLeft: spring(-100)
    } : {
      videoSize: spring(70),
      triangleLeft: spring(-50)
    };

    return (
      <Container innerRef={(elem) => this.container = elem}>
        <Motion style={{ containerTop: spring(moveDown) }}>
          {({ containerTop }) =>
            <Container style={{
              position: 'absolute',
              top: containerTop
            }}>
              <Motion style={motionStyle}>
                {({ videoSize, triangleLeft }) =>
                  <PlayerContainer
                    onMouseMove={this.onMouseMove}
                    onMouseOver={this.onMouseOver}
                    onMouseLeave={this.onMouseLeave}
                    onClick={this.toggleZoom}
                    style={{
                      width: `${videoSize}%`,
                      cursor: zoom ? 'none' : 'pointer'
                      // Hide the cursor when it's zoomed.
                    }}>
                    <StyledSquareCursor show={zoom} style={{
                      top: cursorPosition.top,
                      left: cursorPosition.left,
                    }}/>
                    <StyledTriangle
                      hover={hover}
                      style={{
                        transform: `translate(${triangleLeft}%, -50%)`
                      }}/>
                    <ReactPlayer
                      width={'100%'}
                      height={'auto'}
                      playing
                      loop
                      url={videoUrl} />
                  </PlayerContainer>
                }
              </Motion>
            </Container>
          }
        </Motion>
      </Container>
    );
  }
}
