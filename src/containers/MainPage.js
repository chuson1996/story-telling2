import React, { Component, PropTypes } from 'react';
import { Video } from '../components';
import ReactImageParallax from 'react-image-parallax';
import CssToMatrix from 'css-to-matrix';
import ReactZoomy from 'react-zoomy';
import Square from '../components/Square';
import styled from 'styled-components';
import { Motion, spring } from 'react-motion';
import SquareCursor from '../components/SquareCursor';

const StyledSquare = styled(Square)`
  position: absolute;
  right: 30px;
  top: 0;
  transform: translate(0, -50%);
  z-index: 1;
`;

const Line = styled.span`
  display: inline-block;
  width: 20px;
  height: 3px;
  background-color: black;

  position: absolute;
  top: 50%;
  left: 50%;
`;

export default class MainPage extends Component {
  static propTypes = {
  };

  constructor(props) {
    super(props);
    this.state = {
      hover: false
    };
  }

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

  render() {
    const { hover } = this.state;

    return (
      <div>
        <Video
          videoUrl={require('../assets/StreetPainter.mp4')}/>
        <h1>1</h1>
        <h1>2</h1>
        <h1>3</h1>
        <ReactZoomy
          imageUrl={require('../assets/reading-girl-lg.jpg')}
          renderLoadingElement={({ isImageShowed, isImageLoaded, done }) =>
            <Motion
              style={{ rotate: (isImageShowed && isImageLoaded) ? spring(180) : 0 }}
              onRest={done}
            >
              {({ rotate }) =>
                <Line style={{
                  transform: `translate(-50%, -50%) rotate(${rotate}deg)`
                }}/>
              }
            </Motion>
          }
          renderCursor={({ style, isImageShowed }) =>
            <SquareCursor
              show={isImageShowed}
              style={{
                ...style,
                position: 'absolute',
                pointerEvents: 'none',
                transform: 'translate(-50%, -50%)',
                zIndex: 99
              }}
            />
          }
          renderThumbnail={({ showImage }) =>
            <div
              onMouseOver={this.onMouseOver}
              onMouseLeave={this.onMouseLeave}
              style={{
                position: 'relative',
                display: 'inline-block',
                cursor: 'pointer'
              }}>
              <StyledSquare hover={hover}/>
              <ReactImageParallax scale={1.5}>
                {({y}, onImageLoad) =>
                  <img
                    style={{
                      transform: new CssToMatrix()
                        .scale(1.5, 1.5)
                        .translate(0, y)
                        .getMatrixCSS()
                    }}
                    onClick={showImage}
                    onLoad={onImageLoad}
                    src={require('../assets/reading-girl-xs.jpg')}
                    alt="thumbnail"/>
                }
              </ReactImageParallax>
            </div>
          }
          scale={[1.1, 1.1]}
          imageProps={{
            style: {
              width: '100vw',
              height: 'auto'
            }
          }}
        />
        <h1>5</h1>
        <h1>6</h1>
      </div>
    );
  }
}
