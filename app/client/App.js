import React from 'react'

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {test: 'bar'};
  }
  render() {
    return (
      <div>app here
      </div>)
  }
}
