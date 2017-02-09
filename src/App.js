import React, { Component } from 'react';
import styled from 'styled-components';
import Circle from './Circle';
import ZigZagLine from './ZigZagLine';
import ProgressText from './ProgressText';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100vh;
`;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      progress: 0
    };
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({ progress: 20 });
    }, 0);
    setTimeout(() => {
      this.setState({ progress: 50 });
    }, 800);
    setTimeout(() => {
      this.setState({ progress: 90 });
    }, 1600);
    setTimeout(() => {
      this.setState({ progress: 100 });
    }, 2400);
  }

  render() {
    const springOptions = { stiffness: 34, damping: 11 };
    const { progress } = this.state;

    return (
      <div>
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
      </div>
    );
  }
}

export default App;
