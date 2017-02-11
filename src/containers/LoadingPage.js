import React, { Component, PropTypes } from 'react';
import styled from 'styled-components';
import { Circle,
  ZigZagLine,
  ProgressText } from '../components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100vh;
`;

export default class LoadingPage extends Component {
  static propTypes = {
    progress: PropTypes.number.isRequired
  };

  render() {
    const { progress } = this.props;
    const springOptions = { stiffness: 34, damping: 11 };

    return (
      <Container>
        <div style={{
          textAlign: 'center',
          position: 'relative'
        }}>
          <Circle
            style={{
              position: 'absolute',
              right: '20%',
              top: -53
            }}
            placeholderStrokeColor={'rgba(116, 84, 106, 0.4)'}
            progressStrokeColor={'#0B032D'}
            progress={progress}
            springOptions={springOptions}/>
          <ProgressText
            text={'STEAL LIKE AN ARTIST'}
            placeholderTextColor={'rgba(128, 128, 128, 0.25)'}
            progressTextColor={'#0B032D'}
            renderText={(props, text) => <h1 {...props}>{text}</h1>}
            progress={progress}
            springOptions={springOptions}/>
        </div>
        <div style={{
          textAlign: 'center',
          position: 'relative'
        }}>
          <ProgressText
            text={'10 things nobody told you about being creative'}
            placeholderTextColor={'rgba(116, 84, 106, 0.4)'}
            progressTextColor={'#0B032D'}
            renderText={(props, text) => <p {...props}>{text}</p>}
            progress={progress}
            springOptions={springOptions}/>
          <ZigZagLine
            style={{
              position: 'absolute',
              bottom: -31,
              left: '30%'
            }}
            placeholderStrokeColor={'rgba(116, 84, 106, 0.4)'}
            progressStrokeColor={'#0B032D'}
            progress={progress}
            springOptions={springOptions}/>
        </div>
      </Container>
    );
  }
}
