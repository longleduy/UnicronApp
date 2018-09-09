import React, { Fragment, PureComponent, Component } from 'react'
import { Link } from 'react-router-dom'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
export default class HomePulic extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <Fragment>
                <ReactCSSTransitionGroup
                        className="demo"
                        transitionName="example"
                        transitionAppear={true}
                        transitionAppearTimeout={500}
                        transitionEnterTimeout={500}
                        transitionLeaveTimeout={500}>
                <div className="main-home-public flex-div">
                    <Grid item xs={10} className="home-public flex-div">
                        <img src={require('../../../../public/images/home-public/home-big-title.png')} />
                        <label className="home-public-title">
                            Click the Sign In button to start our website and learn more about our example,
                            if you don't have account click on "Sign Up" to create free Unicron account !
                        </label>
                    </Grid>
                    <div className="home-public-btn-div btn-div">
                    <Link to='/sign-in'>
                        <Button className="my-btn btn-shadow">
                            Sign In
                        </Button>
                    </Link>
                    <Link to='/sign-up'>
                        <Button className="my-btn btn-border btn-shadow">
                            Sign Up
                        </Button>
                    </Link>
                    </div>
                    <div className="home-public-footer">
                        <div className="home-public-list-icon">
                            <i className="material-icons" style={{fontSize:'23px'}}>
                                verified_user
                            </i>
                            <i className="material-icons">
                                https
                            </i>
                            <i className="material-icons">
                                cloud_upload
                            </i>
                        </div>
                    </div>
                </div>
                </ReactCSSTransitionGroup>
            </Fragment>
        )
    }

}
