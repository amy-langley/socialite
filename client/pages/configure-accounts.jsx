import React from 'react'
import { connect } from 'react-redux'

@connect(state=>({dashState: state.feedReducer}))
export default class ConfigureAccounts extends React.Component{
  render(){ return (
    <div className="uk-grid">
      <div className="uk-width-1-5"></div>
      <div className="uk-width-3-5">
        <div className="uk-float-right" style={{position: 'relative', bottom: '-2.5em'}}>
          <button className="uk-button uk-button-primary"><i className="fa fa-plus"></i> Add</button>
        </div>
        <h1>Configure Accounts</h1>
        <hr/>
        <div className="uk-panel uk-panel-box">
          <h3><i className="fa fa-twitter"></i> twitter</h3>
        </div>
      </div>
      <div className="uk-width-1-5"></div>
    </div>
  )}
}
