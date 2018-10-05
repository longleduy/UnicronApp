import React, { Fragment, PureComponent, Component } from 'react'
import { Link, NavLink, withRouter } from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles'
import { withApollo, Query } from "react-apollo"
import Grid from '@material-ui/core/Grid'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import Drawer from '@material-ui/core/Drawer';
import Tooltip from '@material-ui/core/Tooltip'
//Todo: Contants
import * as localStateContants from '../utils/contant/local_state_contants'
import * as routesContants from '../utils/routes_contant'
//Todo: Utils
import * as routesFunc from '../utils/routes_func'
import * as APIAction from '../utils/API_action'
import { signOut } from '../utils/API_action'
class HeaderForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            left: false,
            completed: 10
        };
    }
    componentDidMount = () => {
        $(window).scroll(function () {
            let scrollTop = $(window).scrollTop();
            if(scrollTop > 50){
                $('.main-header').addClass('box-shadow');
            }
            else{
                if($('.main-header').hasClass('box-shadow')){
                    $('.main-header').removeClass('box-shadow');
                }
            }
        });
    }
    toggleDrawer = (side, open) => () => {
        this.setState({
            [side]: open,
        });
    };
    showButtonSign = (isAuthen) => {
        if (!isAuthen) {
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
            else if (location.pathname == '/') {
                return null;
            }
            else {
                return (<Fragment>
                    <Link to='/sign-in'>
                        <Button color="inherit" className="no-upper color-w no-bgc">Sign In</Button>
                    </Link>
                    <Link to='/sign-up'>
                        <Button color="inherit" className="no-upper color-w no-bgc">Sign Up</Button>
                    </Link>
                </Fragment>)
            }
        }
        else {
            return routesFunc.showMenu();
        }
    }
    sideList = () => {
        return <Fragment>
            <div className="edit-bar">
                {routesContants.userOptions.map(({ to, icon }) => {
                    return <NavLink key={to} to={to}>{icon}</NavLink>
                })}
                <Tooltip title="Sign out" >
                    <a onClick={this.signOut}><i className="material-icons edit-icon"> exit_to_app</i></a>
                </Tooltip>
            </div>
        </Fragment>
    }

    showLeftToolBar = (userInfo) => {
        const { classes } = this.props;
        if (!userInfo.isAuthen) {
            return <Typography variant="title" color="inherit">
                <Link to='/'>
                    <img src={require(`../../../public/images/header/logo.png`)} className="" />
                </Link>
            </Typography>
        }
        else {
            return <Typography variant="title" color="inherit">
                <div className="left-toolbar">
                    <Drawer open={this.state.left} className="my-drawer" onClose={this.toggleDrawer('left', false)}>
                        <div
                            tabIndex={0}
                            role="button"
                            onClick={this.toggleDrawer('left', false)}
                            onKeyDown={this.toggleDrawer('left', false)}
                        >
                            {this.sideList()}
                        </div>
                    </Drawer>
                    <div className="img-div">
                        <img src={require(`../../../public/images/logo/logo.png`)} onClick={this.toggleDrawer('left', true)} />
                        <label className="notification">5</label>
                    </div>
                    <label className="profile-name">{userInfo.profile_name}</label>
                </div>
            </Typography>
        }
    }
    signOut = () => {
        return APIAction.signOut(this.props.client, this.props.history);
    }
    render() {
        return <Query query={localStateContants.QUERY_USER_INFO}>
            {({ loading, error, data }) => {
                return <Fragment>
                    <div className={data.queryUserInfo.isAuthen ? "private-header main-header" : "main-header"}>
                        <Grid container spacing={0}>
                            <Grid item xs={12} className="header flex-div">
                                <AppBar position="static" className="my-app-bar">
                                    <Toolbar>
                                        {this.showLeftToolBar(data.queryUserInfo)}
                                        <div className="sign-btn">
                                            {this.showButtonSign(data.queryUserInfo.isAuthen)}
                                        </div>
                                    </Toolbar>
                                </AppBar>
                            </Grid>
                        </Grid>
                    </div>
                </Fragment>
            }}
        </Query>
    }

}
export default withRouter(withApollo(HeaderForm));
