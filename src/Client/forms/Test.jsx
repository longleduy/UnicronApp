import React, { Fragment, Component } from 'react'
import { withRouter } from 'react-router-dom'
import Grid from '@material-ui/core/Grid'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'

class Test extends Component {
    render() {
        return (
            <Fragment>
                <label>{this.props.title}</label>
            </Fragment >
        )
    }

}
export default withRouter(Test)
