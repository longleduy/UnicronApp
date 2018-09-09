import React, { Fragment, Component } from 'react'
import Grid from '@material-ui/core/Grid'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import Input from '@material-ui/core/Input'
import InputAdornment from '@material-ui/core/InputAdornment'
export default class NotFoundForm extends Component {
    constructor(props) {
        super(props);
    }
    submitForm = (e) => {
        e.preventDefault();
    }
    render() {
        return (
            <Fragment>
                <div className="main-sign flex-div-col">
                    <Grid container className="sign-title flex-div-col">
                        <label className="sign-lbl-title">
                            We are sorry but the page you are looking for does not exist
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
                            <Grid item xs={6} className="flex-div-col">
                                <form onSubmit={this.submitForm} noValidate autoComplete="off" className="flex-div-col">
                                    <img src={require(`../../../../public/images/not-found-page/page-not-found.png`)} className="page-not-found-img" />                                  
                                </form>
                            </Grid>
                        </Grid>
                    </ReactCSSTransitionGroup>
                </div>
            </Fragment >
        )
    }

}
