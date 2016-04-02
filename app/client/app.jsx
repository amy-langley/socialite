import React from 'react'
import {Link} from 'react-router'

export default class App extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div>
        <div className="uk-grid">
          <div className="uk-width-1-1">
            <div className="uk-panel uk-panel-box uk-panel-box-primary">
              <div className="uk-float-right">
                <Link to="/dashboard"><i className="fa fa-newspaper-o fa-lg uk-margin-right"></i></Link>
                <Link to="/accounts"><i className="fa fa-gear fa-lg"></i></Link>
              </div>
              <span className="uk-panel-title"><i className="fa fa-comments"></i> sociali.te</span>
            </div>
          </div>
        </div>
        {this.props.children}
      </div>
    )
  }

}
