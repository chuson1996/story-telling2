import React, { Component, PropTypes } from 'react';
import styled from 'styled-components';
import { Video } from '../components';

const StyledVideo = styled(Video)`
  width: 100vw;
  height: 100vh;
`;

export default class MainPage extends Component {
  static propTypes = {};

  render() {
    return (
      <StyledVideo videoUrl={require('../assets/StreetPainter.mp4')}/>
    );
  }
}
