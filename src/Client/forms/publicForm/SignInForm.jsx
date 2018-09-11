import React, { Fragment, Component } from 'react'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import IconButton from '@material-ui/core/IconButton'
import Input from '@material-ui/core/Input'
import InputAdornment from '@material-ui/core/InputAdornment'
import Visibility from '@material-ui/icons/Visibility'
import VisibilityOff from '@material-ui/icons/VisibilityOff'
import InputLabel from '@material-ui/core/InputLabel'
import FormControl from '@material-ui/core/FormControl'
import TextField from "@material-ui/core/TextField"
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import { Link } from 'react-router-dom'
import Tooltip from '@material-ui/core/Tooltip'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import Slide from '@material-ui/core/Slide'
//Todo: Js
import * as Validate from '../../utils/js/validate.js'

function Transition(props) {
  return <Slide direction="up" {...props} />;
}
export default class SignInForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            password: '',
            showPassword: false,
            code: 84,
            open: false,
            isPassValidate: true
        };
    }
    handleClickShowPassword = () => {
        this.setState(state => ({ showPassword: !state.showPassword }));
    };
    handleChange = event => {
        this.setState({ [event.target.name]: event.target.value });
    };
    handleClickOpen = () => {
        this.setState({ open: true });
    };
    handleClose = () => {
        this.setState({ open: false });
    };
    validateForm = (formID) => {
        let isPass = Validate.validateForm(formID);
        if (!this.state.isPassValidate || !isPass) {
            this.setState({ open: true });
        }
        else {
            alert('Success');
        }
    }
    validateEmail = (e, text) => {
        let isPass = Validate.validateEmail($(e.target), 'Email address');
        this.setState({ isPassValidate: isPass });
    }
    validatePassWord = (e, ortherPassWord, text) => {
        let isPass = Validate.validatePassWord($(e.target), ortherPassWord, text);
        this.setState({ isPassValidate: isPass });
    }
    render() {
        return (
            <Fragment>
                <div className="main-sign flex-div-col">
                    <Grid container className="sign-title flex-div-col">
                        <label className="sign-lbl-title">Sign in with Unicron account or 3rd's oAuth API</label>
                    </Grid>
                    <ReactCSSTransitionGroup
                        className="demo"
                        transitionName="example"
                        transitionAppear={true}
                        transitionAppearTimeout={500}
                        transitionEnterTimeout={500}
                        transitionLeaveTimeout={500}>
                        <Grid container className="sign-form flex-div-row">
                            <Grid item xs={4} className="sign-info flex-div-col">
                                <form noValidate autoComplete="off" id="sign-in-form">
                                    <div className="div-text-field div-1-text-field flex-div-row">
                                        <TextField
                                            id="email-addr"
                                            label="Email address"
                                            className="my-text-field"
                                            autoComplete="off"
                                            onKeyUp={(e) => this.validateEmail(e, 'Email address')}
                                        />
                                    </div>
                                    <div className="div-text-field div-2-text-field flex-div-row">
                                        <FormControl className="my-form-control">
                                            <InputLabel htmlFor="adornment-password" className="my-label-input">Password</InputLabel>
                                            <Input
                                                id="password"
                                                type='password'
                                                className="my-input"
                                                onKeyUp={(e) => this.validatePassWord(e, $('#adornment-password'), 'Password')}
                                            />
                                        </FormControl>
                                        <FormControl className="my-form-control">
                                            <InputLabel htmlFor="adornment-password" className="my-label-input">Confirm Password</InputLabel>
                                            <Input
                                                id="adornment-password"
                                                type={this.state.showPassword ? 'text' : 'password'}
                                                className="my-input"
                                                onKeyUp={(e) => this.validatePassWord(e, $('#password'), 'Confirm Password')}
                                                endAdornment={
                                                    <Tooltip title="Show text" >
                                                        <InputAdornment position="end">
                                                            <IconButton
                                                                className="my-view-pass"
                                                                aria-label="Toggle password visibility"
                                                                onClick={this.handleClickShowPassword}
                                                                onMouseDown={this.handleMouseDownPassword}
                                                            >
                                                                {this.state.showPassword ? <VisibilityOff /> : <Visibility />}
                                                            </IconButton>
                                                        </InputAdornment>
                                                    </Tooltip>
                                                }
                                            />
                                        </FormControl>
                                    </div>
                                    <div className="div-support">
                                        <Link className="link-sign" to="/forgot-password">
                                            <Button className="my-btn btn-link">
                                                Forgot password?
                                        </Button>
                                        </Link>

                                    </div>
                                    <div className="home-public-btn-div btn-div flex-div-row">
                                        <Button className="my-btn btn-sign btn-shadow" onClick={() => this.validateForm('sign-in-form')}>
                                            Submit
                                        </Button>
                                        <div className="sign-in-oAuth">
                                            <Tooltip title="Sign in with Facebook API" >
                                                <Button className="btn-icon">
                                                    <i className="mdi mdi-facebook"></i>
                                                </Button>
                                            </Tooltip>
                                            <Tooltip title="Sign in with Google API" >
                                                <Button className="btn-icon">
                                                    <i className="mdi mdi-google-plus"></i>
                                                </Button>
                                            </Tooltip>
                                            <Tooltip title="Sign in with Twitter API" >
                                                <Button className="btn-icon">
                                                    <i className="mdi mdi-twitter"></i>
                                                </Button>
                                            </Tooltip>
                                        </div>
                                    </div>

                                </form>
                            </Grid>

                            <Grid item xs={4} className="sign-info flex-div-col">
                                <div className="div-guard-icon flex-div-col">
                                    <img className="guard-icon" src={require(`../../../../public/images/logo/sign-in.png`)} style={{ width: '60%' }} />
                                </div>
                            </Grid>
                            <Dialog
                                open={this.state.open}
                                TransitionComponent={Transition}
                                keepMounted
                                onClose={this.handleClose}
                                aria-labelledby="alert-dialog-slide-title"
                                aria-describedby="alert-dialog-slide-description"
                                className="my-alert"
                            >
                                <DialogContent className="alert-content-div">
                                    <DialogContentText className="alert-content" id="alert-dialog-slide-description">
                                        Sorry. You need finish this form to continue
                                     </DialogContentText>
                                </DialogContent>
                                <DialogActions>
                                    <Button onClick={this.handleClose} className="my-btn-alert" autoFocus>
                                        Agree
                                    </Button>
                                </DialogActions>
                            </Dialog>
                        </Grid>
                    </ReactCSSTransitionGroup>
                </div>

            </Fragment >
        )
    }

}
