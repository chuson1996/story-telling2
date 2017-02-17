import React, { Component, PropTypes } from 'react';
import { Video } from '../components';
import ReactZoomy from 'react-zoomy';
import styled from 'styled-components';
import Square from '../components/Square';
import SquareCursor from '../components/SquareCursor';
import { Motion, spring } from 'react-motion';
import ImageParallax from 'react-image-parallax';
import CssToMatrix from 'css-to-matrix';

const Flex = styled.div`
  display: flex;
  flex-direction: ${({ direction }) => direction || 'row'};
  align-content: ${({ align }) => align || 'flex-start'};
  justify-content: ${({ justify }) => justify || 'flex-start'};
`;

const ThumbnailBox = styled.div`
  position: relative;
  cursor: pointer;
`;

const ThumbnailNoOverflowLayer = styled.div`
  overflow: hidden;
`;

const Image = styled.img`
  width: ${({ width }) => width || 'auto'};
  pointer-events: auto;
  transform: scale(1.3) translate(0, -11.5%);
`;

const StyledSquare = styled(Square)`
  position: absolute;
  top: 0;
  left: 0;
  transform: translate(-50%, -50%);
  width: 50px;
  height: 50px;
  z-index: 1;
`;

const StyledSquareCursor = styled(SquareCursor)`
  position: fixed;
  z-index: 99;

  transform: translate(-50%, -50%);

  pointerEvents: none;
`;

const Line = styled.span`
  display: inline-block;
  width: 40px;
  height: 3px;
  background-color: black;

  position: absolute;
  top: 50%;
  left: 50%;
`;

export default class MainPage extends Component {
  static propTypes = {};

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
        <Flex
          justify={'flex-end'}
          direction={'row'}>
          <ReactZoomy
            scale={[1.5, 1.5]}
            renderCursor={({ style, isImageShowed }) =>
              <StyledSquareCursor
                style={style}
                show={isImageShowed}
              />
            }
            imageProps={{
              style: {
                width: '100vw'
              }
            }}
            renderThumbnail={({ showImage }) =>
              <ThumbnailBox
                onMouseOver={this.onMouseOver}
                onMouseLeave={this.onMouseLeave}>
                <StyledSquare hover={hover}/>
                <ImageParallax scale={1.5}>
                  {({y}, onImageLoad) =>
                    <Image
                      style={{
                        transform: new CssToMatrix()
                          .scale(1.5, 1.5)
                          .translate(0, y)
                          .getMatrixCSS()
                        // transform: `scale(1.3) translate(0, ${y}px)`
                      }}
                      onLoad={onImageLoad}
                      width={'100%'}
                      onClick={showImage}
                      src={require('../assets/reading-girl-xs.jpg')}
                      alt="thumbnail"/>
                  }
                </ImageParallax>
              </ThumbnailBox>
            }
            renderLoadingElement={({ isImageShowed, isImageLoaded, done }) =>
              <Motion
                onRest={done}
                style={{ rotate: (isImageShowed && isImageLoaded) ? spring(180) : 0 }}>
                {({ rotate }) =>
                  <Line style={{
                    transform: `translateX(-50%) rotate(${rotate}deg)`
                  }}/>
                }
              </Motion>
            }
            imageUrl={require('../assets/reading-girl-lg.jpg')}/>
        </Flex>
        <h1>3</h1>
        <h1>5</h1>
        <h1>6</h1>
        <h1>7</h1>
        <h1>8</h1>
        <h1>9</h1>
        <h1>6</h1>
        <h1>7</h1>
        <h1>8</h1>
        <h1>9</h1>
        <h1>6</h1>
        <h1>7</h1>
        <h1>8</h1>
        <h1>9</h1>
        <h1>6</h1>
        <h1>7</h1>
        <h1>8</h1>
        <h1>9</h1>
      </div>
    );
  }
}
