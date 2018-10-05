
import React, { Fragment, Component } from 'react'
import { withApollo, Mutation } from "react-apollo"
import { withRouter } from 'react-router'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import MenuItem from '@material-ui/core/MenuItem'
import Select from '@material-ui/core/Select'
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
import Snackbar from '@material-ui/core/Snackbar'
import CloseIcon from '@material-ui/icons/Close'
import Slide from '@material-ui/core/Slide'
import CircularProgress from '@material-ui/core/CircularProgress'
import Loader from 'react-loaders'
//Todo: Js
import * as Validate from '../../utils/js/validate.js'
import * as errorHandler from '../../utils/errorHandler'
//Todo: Contants
import * as Status from '../../utils/contant/status_contants'
import * as graphQLContants from '../../utils/contant/graphql_contants'
//Todo: Utils
import * as commonUtils from '../../utils/common'
function TransitionLeft(props) {
    return <Slide {...props} direction="down" />;
}

class SignUpForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            password: '',
            showPassword: false,
            code: 0,
            phone: '1663219295',
            open: false,
            isPassValidate: true,
            emailExist: false,
            isPassPassword: true,
            signUpSuccess: false,
            errorLog: '',
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
    componentDidMount() {
        document.title = "Sign Up"
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
        else if (this.state.errorLog != '') {
            return (<Fragment>
                <div className="div-guard-icon flex-div-col sign-success-div">
                    <label className="sign-success">{this.state.errorLog}</label>
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
    progressBarShow = (loading) => {
        if (loading) {
            return <Loader type="ball-pulse" className="loading-btn" />
            // return <CircularProgress className="my-progress-cicle" thickness={5} size={24} />
        }
        else {
            return 'Submit'
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
    validateForm = async (e, action, formID) => {
        let isPass = Validate.validateForm(formID);
        if (!this.state.isPassValidate || this.state.emailExist || !isPass || !this.state.isPassPassword) {
            this.setState({ open: true });
        }
        else {
            this.addNewUserAccount(e, action);
        }
    }
    validateEmail = (e, text) => {
        let isPass = Validate.validateEmail($(e.target), 'Email address');
        this.setState({ isPassValidate: isPass });
    }
    validatePassWord = (e, ortherPassWord, text) => {
        let isPass = Validate.validatePassWord($(e.target), ortherPassWord, text);
        this.setState({ isPassPassword: isPass });
    }
    verifyEmailAddress = async (e) => {
        let email = $(e.target).val();
        let target = $(e.target);
        let status = await this.verifyEmailAddressGQL(email);
        if (status) {
            Validate.verifyEmailAddress(target, Status.EXIST);
            this.setState({ emailExist: true })
        }
        else {
            Validate.verifyEmailAddress(target, Status.NOT_EXIST)
            this.setState({ emailExist: false })
        }

    }
    //Todo: Graphql
    verifyEmailAddressGQL = async (email) => {
        let result = await this.props.client.query({
            query: graphQLContants.CHECK_EMAIL_QUERY,
            variables: { email },
            fetchPolicy: 'network-only'
        })
        return result.data.checkEmail.status;
    }
    addNewUserAccount = async (e, action) => {
        let { firstName, lastName, emailAddress, password, phoneNumber } = this.state.dataForm;
        e.preventDefault();
        let userAccountInfo = {
            first_name: firstName,
            last_name: lastName,
            email: emailAddress,
            password: password,
            phone_number: phoneNumber
        }
        let data = await action({ variables: { formData: userAccountInfo } });
        if (data != null && data != '') {
            this.setState({ signUpSuccess: true })
        }
    }
    completeSignUp = (fieldId) => {
        $(`#${fieldId}`).addClass('btn-complete');
        $(`#${fieldId}`).html('<i class="material-icons"> done</i>');
        setTimeout(() => {
            $(`#${fieldId}`).removeClass('btn-complete');
            $(`#${fieldId}`).text('Submit')
        }, 5000)
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
                    {/* <ReactCSSTransitionGroup
                        className="demo"
                        transitionName="example"
                        transitionAppear={true}
                        transitionAppearTimeout={100}
                        transitionEnterTimeout={100}
                        transitionLeaveTimeout={100}> */}
                    <Grid container className="sign-form flex-div-row">
                        <Grid item xs={4} className="sign-info flex-div-col">
                            <form noValidate id="sign-up-form">
                                <div className="div-text-field div-2-text-field flex-div-row">
                                    <TextField
                                        id="firstName"
                                        name="firstName"
                                        value={dataForm.firstName}
                                        label="First name"
                                        className="my-text-field"

                                        onChange={this.handleChangeDataForm}
                                    />
                                    <TextField
                                        id="lastName"
                                        name="lastName"
                                        value={dataForm.lastName}
                                        label="Last name"
                                        className="my-text-field"

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
                                    <Mutation mutation={graphQLContants.ADD_NEW_USER_ACCOUNT_MUTATION}
                                        onError={error => { errorHandler.errorHandler(this.props.history, error) }}
                                        onCompleted={() => this.completeSignUp('sign-up')}>
                                        {(addNewUserAccount, { data, loading, error }) => (
                                            <Fragment>
                                                <Button id="sign-up" className="my-btn btn-sign btn-shadow" onClick={(e) => this.validateForm(e, addNewUserAccount, 'sign-up-form')}>
                                                    {this.progressBarShow(loading)}
                                                </Button>
                                            </Fragment>
                                        )}
                                    </Mutation>
                                </div>
                            </form>
                        </Grid>
                        <Grid item xs={4} className="sign-info flex-div-col sign-in-right-div">
                            {this.showRightDiv()}
                        </Grid>
                        <Snackbar className="error-snackbar"
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={this.state.open}
                            autoHideDuration={4000}
                            onClose={this.handleClose}
                            TransitionComponent={TransitionLeft}
                            message={<span id="message-id" className="flex"><i className="material-icons">
                                block
                            </i><labe>Sorry. You need finish this form to continue</labe></span>}
                            action={[
                                <IconButton
                                    key="close"
                                    aria-label="Close"
                                    color="inherit"
                                    onClick={this.handleClose}
                                >
                                    <CloseIcon />
                                </IconButton>,
                            ]}
                        />
                    </Grid>
                    {/* </ReactCSSTransitionGroup> */}
                </div>

            </Fragment >
        )
    }
}
export default withApollo(withRouter(SignUpForm))
