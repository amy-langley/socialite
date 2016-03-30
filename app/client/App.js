import React from 'react'

export default class App extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div>
        <h1>Socialite (hi from App)</h1>
        {this.props.children}
      </div>
    )
  }

}
