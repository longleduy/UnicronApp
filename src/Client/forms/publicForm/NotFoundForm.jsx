import React, { Fragment, Component } from 'react'
import Grid from '@material-ui/core/Grid'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import { withRouter } from 'react-router-dom'
class NotFoundForm extends Component {
    constructor(props) {
        super(props);
    }
    submitForm = (e) => {
        e.preventDefault();
    }
    render() {
        return (
            <Fragment>
                <ReactCSSTransitionGroup
                    className="demo"
                    transitionName="example"
                    transitionAppear={true}
                    transitionAppearTimeout={300}
                    transitionEnterTimeout={300}
                    transitionLeaveTimeout={300}>
                    <div className="main-sign flex-div-col main-height">
                        <Grid container className="flex-div-col not-found margin-header">
                            <label>
                                We are sorry but the page you are looking for does not exist
                                </label>
                            <label>404</label>
                            <label>Page not found</label>
                        </Grid>
                    </div>
                </ReactCSSTransitionGroup>
            </Fragment >
        )
    }
}
export default withRouter(NotFoundForm)
