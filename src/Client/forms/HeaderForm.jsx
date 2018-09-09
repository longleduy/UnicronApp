import React, { Fragment, PureComponent, Component } from 'react'
import { Link } from 'react-router-dom'
import Grid from '@material-ui/core/Grid'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
export default class HeaderForm extends Component {
    constructor(props) {
        super(props);
    }
    showButtonSign = () => {
        if (location.pathname == '/sign-up') {
            return <Link to='/sign-in'>
                        <Button color="inherit" className="no-upper color-w no-bgc">Sign In</Button>
                    </Link>
        }
        else if (location.pathname == '/sign-in') {
            return <Link to='/sign-up'>
                        <Button color="inherit" className="no-upper color-w no-bgc">Sign Up</Button>
                    </Link>
        }
        else if(location.pathname == '/'){
            return null;
        }
        else{
            return <Fragment>
                        <Link to='/sign-in'>
                            <Button color="inherit" className="no-upper color-w no-bgc">Sign In</Button>
                        </Link>
                        <Link to='/sign-up'>
                            <Button color="inherit" className="no-upper color-w no-bgc">Sign Up</Button>
                        </Link>
                    </Fragment>
        }
    }
    render() {
        return (
            <Fragment>
                <div className="main-header">
                    <Grid container spacing={0}>
                        <Grid item xs={12} className="header flex-div">
                            <AppBar position="static" className="my-app-bar">
                                <Toolbar>
                                    <Typography variant="title" color="inherit">
                                        <Link to='/'>
                                            <img src={require(`../../../public/images/header/logo.png`)} className="" />
                                        </Link>
                                    </Typography>
                                    <div className="sign-btn">
                                        {this.showButtonSign()}
                                    </div>
                                </Toolbar>
                            </AppBar>
                        </Grid>
                    </Grid>
                </div>
            </Fragment>
        )
    }

}
