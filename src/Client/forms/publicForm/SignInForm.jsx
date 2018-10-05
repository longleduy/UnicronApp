import React, { Fragment, Component } from 'react'
import { withApollo, Mutation } from "react-apollo"
import { withRouter } from 'react-router-dom'
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
import Snackbar from '@material-ui/core/Snackbar'
import CloseIcon from '@material-ui/icons/Close'
import Slide from '@material-ui/core/Slide'
import CircularProgress from '@material-ui/core/CircularProgress'
import Loader from 'react-loaders'
//Todo: Contants
import * as graphQLContants from '../../utils/contant/graphql_contants'
import * as localStateContants from '../../utils/contant/local_state_contants'
import * as errorHandler from '../../utils/errorHandler'
//Todo: Utils
import * as Validate from '../../utils/js/validate.js'
import * as commonUtils from '../../utils/common'
import MutationPRD from '../../utils/form/props_render_component/MutationPRD.jsx'
function TransitionLeft(props) {
    return <Slide {...props} direction="down" />;
}
class SignInForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            password: 'longkhanh',
            showPassword: false,
            code: 84,
            open: false,
            isPassValidate: true,
            isPassPassword: true,
            dataForm: {
                email: 'longldseatechit@gmail.com',
                password: 'longkhanh',
                repass: 'longkhanh'
            }
        };
    }
    componentDidMount() {
        document.title = "Sign In"
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
    handleChange = (e) => {
        let name = e.target.name;
        let value = e.target.value;
        this.setState({
            dataForm: {
                ...this.state.dataForm,
                [name]: value
            }
        })
    }
    handleClickOpen = () => {
        this.setState({ open: true });
    };
    handleClose = () => {
        this.setState({ open: false });
    };
    validateForm = (e, action, formID) => {
        let isPass = Validate.validateForm(formID);
        if (!this.state.isPassValidate || !isPass || !this.state.isPassPassword) {
            this.setState({ open: true });
        }
        else {
            this.signIn(e, action);
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
    errorHandler = (error) => {
        let name;
        try {
            name = error.graphQLErrors[0].extensions.exception.name;
        } catch (error) { }
        if (name !== 'dataFormInvalid') {
            return errorHandler.errorHandler(this.props.history, error)
        }
        const { field } = error.graphQLErrors[0].extensions.exception.data;
        const { message } = error.graphQLErrors[0];
        if (field != 'email') {
            Validate.cleanErrorById('email', 'Email address')
        }
        return Validate.dataFormInvalid(field, message);
    }
    signIn = async (e, action) => {
        let { email, password } = this.state.dataForm;
        e.preventDefault();
        let signInInfo = {
            email: email,
            password: password
        }
        let status = await action({ variables: { formData: signInInfo } });
        if (status != null && status != '') {
            const userInfo = {
                isAuthen: true,
                jwt: status.data.signIn.jwt,
                profile_name: status.data.signIn.profile_name
            }
            await this.props.client.mutate({
                variables: { userInfo: userInfo },
                mutation: localStateContants.MUTATION_USER_INFO,
            })
            localStorage.setItem('userInfo', JSON.stringify(userInfo))
            this.props.history.push('/index')
        }
    }
    render() {
        return (
            <Fragment>
                <div className="main-sign flex-div-col">
                    <Grid container className="sign-title flex-div-col">
                        <label className="sign-lbl-title">Sign in with Unicron account or 3rd's oAuth API</label>
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
                            <form noValidate id="sign-in-form">
                                <div className="div-text-field div-1-text-field flex-div-row">
                                    <TextField
                                        id="email"
                                        label="Email address"
                                        value={this.state.dataForm.email}
                                        name="email"
                                        className="my-text-field"
                                        onChange={this.handleChange}
                                        onKeyUp={(e) => this.validateEmail(e, 'Email address')}
                                        onKeyPress={e => Validate.cleanError(e, 'Email address')}
                                    />
                                </div>
                                <div className="div-text-field div-2-text-field flex-div-row">
                                    <FormControl className="my-form-control">
                                        <InputLabel htmlFor="adornment-password" className="my-label-input">Password</InputLabel>
                                        <Input
                                            id="password"
                                            type='password'
                                            name="password"
                                            value={this.state.dataForm.password}
                                            className="my-input"
                                            onChange={this.handleChange}
                                            onKeyUp={(e) => this.validatePassWord(e, $('#adornment-password'), 'Password')}
                                            onKeyPress={e => Validate.cleanError(e, 'Password')}
                                        />
                                    </FormControl>
                                    <FormControl className="my-form-control">
                                        <InputLabel htmlFor="adornment-password" className="my-label-input">Confirm Password</InputLabel>
                                        <Input
                                            id="adornment-password"
                                            value={this.state.dataForm.repass}
                                            name="repass"
                                            type={this.state.showPassword ? 'text' : 'password'}
                                            className="my-input"
                                            onChange={this.handleChange}
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
                                    <Mutation mutation={graphQLContants.SIGN_IN_MUTATION} onError={(error) => this.errorHandler(error)}>
                                        {(action, { data, loading, error }) => (
                                            <Fragment>
                                                <Button className="my-btn btn-sign btn-shadow" onClick={(e) => this.validateForm(e, action, 'sign-in-form')}>
                                                    {this.progressBarShow(loading)}
                                                </Button>
                                            </Fragment>
                                        )}
                                    </Mutation>
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
export default withApollo(withRouter(SignInForm))
