
import React, { Fragment, Component } from 'react'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import IconButton from '@material-ui/core/IconButton'
import Input from '@material-ui/core/Input'
import InputAdornment from '@material-ui/core/InputAdornment'
import Visibility from '@material-ui/icons/Visibility'
import VisibilityOff from '@material-ui/icons/VisibilityOff'
import InputLabel from '@material-ui/core/InputLabel'
import FormControl from '@material-ui/core/FormControl'
import TextField from "@material-ui/core/TextField"
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import Tooltip from '@material-ui/core/Tooltip'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import Slide from '@material-ui/core/Slide'
import LinearProgress from '@material-ui/core/LinearProgress'
import CircularProgress from '@material-ui/core/CircularProgress'
//Todo: Js
import * as Validate from '../../utils/js/validate.js'
//Todo: Utils
import * as ApiCaller from '../../utils/api/api_caller'
//Todo: Contants
import * as ApiUriContants from '../../utils/contant/api_uri_contants'
import * as Status from '../../utils/contant/status_contants'
function Transition(props) {
    return <Slide direction="up" {...props} />;
}
export default class SignUpForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            password: '',
            showPassword: false,
            code: 0,
            phone: '1663219295',
            open: false,
            isPassValidate: true,
            signUpSuccess: false,
            loading: false,
            dataForm: {
                firstName: 'Duy',
                lastName: 'Long',
                emailAddress: 'longldseatechit@gmail.com',
                phoneNumber: '01663219295',
                password: 'longkhanh'
            }
        }
    }
    progressBarShow = () => {
        if (this.state.loading) {
            return <CircularProgress className="my-progress-cicle" thickness={5} size={24} />
        }
        else {
            return 'Submit'
        }
    }
    showRightDiv = () => {
        if (this.state.signUpSuccess) {
            return (<Fragment>
                <div className="div-guard-icon flex-div-col sign-success-div">
                    <label className="sign-success">Thanks for Sign Up!</label>
                    <span className="verify-noti" style={{ textAlign: 'center' }}>We now need to verify your email address
                    . We've send an email to <label className="email-lbl">{this.state.dataForm.emailAddress} </label> to verify your address. Please
                                        click the link in that email to continue.
                     </span>
                </div>
            </Fragment>)
        }
        else {
            return <Fragment>
                <div className="div-guard-icon flex-div-col">
                    <img className="guard-icon" src={require(`../../../../public/images/logo/sign-up.png`)} style={{ width: '45%' }} />
                </div>
            </Fragment>
        }

    }
    handleClickShowPassword = () => {
        this.setState(state => ({ showPassword: !state.showPassword }));
    };
    handleChange = event => {
        let name = event.target.name;
        let value = event.target.value;
        this.setState({
            [name]: value,
            dataForm: {
                ...this.state.dataForm,
                phoneNumber: `+${name === 'code' ? value : this.state.code}${name === 'phone' ? value : this.state.phone}`
            }
        });
    };
    handleClickOpen = () => {
        this.setState({ open: true });
    };

    handleClose = () => {
        this.setState({ open: false });
    };
    handleChangeDataForm = (e) => {
        let name = e.target.name;
        let value = e.target.value;
        this.setState({
            dataForm: {
                ...this.state.dataForm,
                [name]: value
            }
        })
    }
    //Todo: Validate Form
    validateForm = async (formID) => {
        this.setState({ loading: true })
        let isPass = Validate.validateForm(formID);
        if (!this.state.isPassValidate === true || !isPass) {
            this.setState({ open: true });
        }
        else {
            let data = await ApiCaller.signUpApi(this.state.dataForm);
            this.setState({ loading: false })
            if (data.status === 200) {
                this.setState({
                    signUpSuccess: true
                })
            }
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
    verifyEmailAddress = async (e) => {
        let email = $(e.target).val();
        let target = $(e.target);
        let status = await ApiCaller.checkEmailAddress(email);
        if (status === 203) {
            Validate.verifyEmailAddress(target, Status.EXIST)
        }
        else if (status === 200) {
            Validate.verifyEmailAddress(target, Status.NOT_EXIST)
        }
    }
    render() {
        let { dataForm } = this.state;
        let phoneNumberShow = dataForm.phoneNumber.substr(3, dataForm.phoneNumber.length - 1)
        return (
            <Fragment>
                <div className="main-sign flex-div-col">
                    <Grid container className="sign-title flex-div-col">
                        <label className="sign-lbl-title">Create your Unicron Account</label>
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
                                <form noValidate autoComplete="off" id="sign-up-form">
                                    <div className="div-text-field div-2-text-field flex-div-row">
                                        <TextField
                                            id="firstName"
                                            name="firstName"
                                            value={dataForm.firstName}
                                            label="First name"
                                            className="my-text-field"
                                            autoComplete="off"
                                            onChange={this.handleChangeDataForm}
                                        />
                                        <TextField
                                            id="lastName"
                                            name="lastName"
                                            value={dataForm.lastName}
                                            label="Last name"
                                            className="my-text-field"
                                            autoComplete="off"
                                            onChange={this.handleChangeDataForm}
                                        />
                                    </div>
                                    <div className="div-text-field div-1-text-field flex-div-row">
                                        <TextField
                                            id="emailAddress"
                                            name="emailAddress"
                                            value={dataForm.emailAddress}
                                            label="Email address"
                                            className="my-text-field"
                                            autoComplete="off"
                                            onKeyUp={(e) => this.validateEmail(e, 'Email address')}
                                            onChange={this.handleChangeDataForm}
                                            onBlur={(e) => this.verifyEmailAddress(e)}
                                        />
                                    </div>
                                    <div className="div-text-field div-2-text-field flex-div-row">
                                        <FormControl className="my-form-control phone-code">
                                            <Select
                                                value={this.state.code}
                                                onChange={this.handleChange}
                                                displayEmpty
                                                name="code"
                                                id="code"
                                                className="select-form-control"
                                            >
                                                <MenuItem value={0}>+84</MenuItem>
                                                <MenuItem value={1}>+80</MenuItem>
                                                <MenuItem value={2}>+81</MenuItem>
                                            </Select>
                                        </FormControl>
                                        <FormControl className="my-form-control phone-number">
                                            <InputLabel htmlFor="phone-number" className="my-label-input">Phone number</InputLabel>
                                            <Input
                                                id="phone"
                                                name="phone"
                                                value={this.state.phone}
                                                type="number"
                                                className="my-input"
                                                onChange={this.handleChange}
                                            />
                                        </FormControl>
                                    </div>
                                    <div className="div-text-field div-2-text-field flex-div-row">
                                        <FormControl className="my-form-control">
                                            <InputLabel htmlFor="adornment-password" className="my-label-input">Password</InputLabel>
                                            <Input
                                                id="password"
                                                name="password"
                                                value={dataForm.password}
                                                type='password'
                                                className="my-input"
                                                onKeyUp={(e) => this.validatePassWord(e, $('#adornment-password'), 'Password')}
                                                onChange={this.handleChangeDataForm}
                                            />
                                        </FormControl>
                                        <FormControl className="my-form-control">
                                            <InputLabel htmlFor="adornment-password" className="my-label-input">Confirm Password</InputLabel>
                                            <Input
                                                id="adornment-password"
                                                name="currentPassWord"
                                                value={dataForm.password}
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
                                    <div className="home-public-btn-div btn-div">
                                        <Button className="my-btn btn-sign btn-shadow" onClick={() => this.validateForm('sign-up-form')}>
                                            {this.progressBarShow()}
                                        </Button>

                                    </div>
                                </form>
                            </Grid>
                            <Grid item xs={4} className="sign-info flex-div-col sign-in-right-div">
                                {this.showRightDiv()}
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
