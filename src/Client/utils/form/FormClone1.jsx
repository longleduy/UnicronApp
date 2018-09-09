import React, { Fragment, Component } from 'react'
import Grid from '@material-ui/core/Grid'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
export default class FormClone1 extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <Fragment>
                <div className="main-sign flex-div-col">
                    <Grid container className="sign-title flex-div-col">
                        <label className="sign-lbl-title">
                            Text here
                        </label>
                    </Grid>
                    <ReactCSSTransitionGroup
                        className="demo"
                        transitionName="example"
                        transitionAppear={true}
                        transitionAppearTimeout={500}
                        transitionEnterTimeout={500}
                        transitionLeaveTimeout={500}>
                        <Grid container className="sign-form flex-div-row">
                            <h3>Your form</h3>
                        </Grid>
                    </ReactCSSTransitionGroup>
                </div>
            </Fragment >
        )
    }

}
