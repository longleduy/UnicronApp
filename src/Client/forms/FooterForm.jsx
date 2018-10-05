import React, { Fragment, PureComponent, Component } from 'react'
import Grid from '@material-ui/core/Grid'
export default class FooterForm extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <Fragment>
                <div className="main-footer">
                    <div className="flex-div-col contac-img-div">
                        <label className="logo-footer">Unicon</label>
                        {/* <i className="material-icons">call</i> */}
                    </div>
                    <Grid container className="flex-div-row contac-info-main">
                        <Grid item xs={4} className="flex-div-col contac-info js-unset">
                            <label className="contact">Contact</label>
                            <div className="contact-list flex-div-col">
                                <span className="flex-div-row">
                                    <i className="material-icons">person_pin</i>
                                    <label>LongLD</label>
                                </span>
                                <span className="flex-div-row">
                                    <i className="material-icons">mail_outline</i>
                                    <label>longldseatechit@gmail.com</label>
                                </span>
                                <span className="flex-div-row">
                                    <i className="material-icons">phone_android</i>
                                    <label>0363219295</label>
                                </span>
                                <span className="flex-div-row">
                                    <i className="material-icons">location_on</i>
                                    <label>98A Building, Thanh Xuan, Ha Noi</label>
                                </span>

                            </div>
                        </Grid>
                        <Grid item xs={4} className="flex-div-col contac-info js-unset">
                            <label className="contact">Product's infomation</label>
                            <div className="framework-list flex-div-row">
                                <img src={require(`../../../public/images/footer/nodejs.png`)} className="framework-icon" />
                                <label>+</label>
                                <img src={require(`../../../public/images/footer/graphql.png`)} className="framework-icon" />
                                <label>+</label>
                                <img src={require(`../../../public/images/footer/reactjs.png`)} className="framework-icon" />
                                <label>+</label>
                                <img src={require(`../../../public/images/footer/mongodb.png`)} className="framework-icon" />
                            </div>
                            <label className="auth-api">Social media</label>
                            <div className="auth-api-icon flex-div-row">
                                <i className="mdi mdi-facebook"></i>
                                <i className="mdi mdi-google-plus"></i>
                                <i className="mdi mdi-twitter"></i>
                            </div>

                        </Grid>
                        <Grid item xs={4} className="flex-div-col contact-about js-unset">
                            <label className="contact">Quotes</label>
                            <p> It´s better to wait for a productive programmer to become available than it is to wait for the first available programmer to become productive</p>
                            <i>-Steve McConnell-</i>
            </Grid>
                    </Grid>
                </div>
            </Fragment>
        )
    }

}
