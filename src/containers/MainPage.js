import React, { Component, /* PropTypes */ } from 'react';
// import styled from 'styled-components';
import { Video } from '../components';

export default class MainPage extends Component {
  static propTypes = {};

  render() {
    return (
      <div>
        <Video
          videoUrl={require('../assets/StreetPainter.mp4')}/>
        <h1>Hello guys</h1>
        <h1>Sr for not having 2 videos this week like I promised.</h1>
        <h1>But don't worry I will do a tutorial how to create the video component like above</h1>
        <h1>By Tuesday 14th Feb</h1>
        <h1>Keep coding.</h1>
      </div>
    );
  }
}
