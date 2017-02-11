import React, { Component } from 'react';
// import styled from 'styled-components';
import { LoadingPage, MainPage } from './containers';

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
    const { progress } = this.state;

    return (
      <div>
        {/* <LoadingPage progress={progress}/> */}
        <MainPage/>
      </div>
    );
  }
}

export default App;
