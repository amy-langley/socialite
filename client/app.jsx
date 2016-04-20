import React from 'react'
import { Provider } from 'react-redux'

import { compose, createStore, combineReducers } from 'redux'
import * as reducers from './redux/reducers/index.js'

import Navbar from 'components/navbar'

const reducer = combineReducers(reducers)
const store = createStore(reducer)

export default class App extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <Provider store={store}>
        <div>
          <Navbar />
          {this.props.children}
      	</div>
      </Provider>
    )
  }

}
