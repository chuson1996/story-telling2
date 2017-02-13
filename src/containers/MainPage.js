import React, { Component, PropTypes } from 'react';
import { Video } from '../components';

export default class MainPage extends Component {
  static propTypes = {};

  render() {
    return (
      <div>
        <Video
          videoUrl={require('../assets/StreetPainter.mp4')}/>
        <h1>1</h1>
        <h1>2</h1>
        <h1>3</h1>
        <h1>5</h1>
        <h1>6</h1>
      </div>
    );
  }
}
