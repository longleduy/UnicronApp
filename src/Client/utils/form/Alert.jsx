import React, { Fragment, Component } from 'react'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import Slide from '@material-ui/core/Slide'


function Transition(props) {
  return <Slide direction="up" {...props} />;
}
export default class Dialog extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false
        }
    }
    handleClickOpen = () => {
        this.setState({ open: true });
    };

    handleClose = () => {
        this.setState({ open: false });
    };
    render() {
        return (
            <Fragment>
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
            </Fragment >
        )
    }

}