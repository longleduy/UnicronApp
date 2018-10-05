import React, { Fragment, Component } from 'react'
import { withRouter } from 'react-router-dom'
import Grid from '@material-ui/core/Grid'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'

class ErrorForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            viewLog: false,
            open: false
        }
    }
    componentDidMount(){
        document.title = "Error"
      }
    handleClickOpen = () => {
        this.setState({ open: true });
    };

    viewLog = () => {
        if($('#name').val() === 'longkhanh'){
            this.setState({
                viewLog: true
            })
        }
        this.setState({ open: false });
    };
    show = () => {
        const { log } = this.props.location.state
        if (this.state.viewLog) {
            return (<div className="admin-log flex-div-row">
                <label>{log}</label>
            </div>
            )
        }
        else{
            return (<div className="error-div-img flex-div-row">
            <img src={require(`../../../public/images/error-background2.png`)} className="error-img1" />
            <img src={require(`../../../public/images/Untitled-4.png`)} className="error-img2" />
        </div>)
        }
    }
    render() {
        const { error, log } = this.props.location.state
        return (
            <Fragment>
                <div className="main-sign flex-div-col main-height">
                    <Grid container className="sign-title flex-div-col">
                        <label className="sign-lbl-title" style={{marginBottom:'64px'}}>
                            {error}
                        </label>
                    </Grid>
                </div>
            </Fragment >
        )
    }

}
export default withRouter(ErrorForm)
