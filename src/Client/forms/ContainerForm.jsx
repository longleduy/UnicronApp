import React, { Fragment, Component } from 'react'
import Grid from '@material-ui/core/Grid'
import { Route, Switch } from 'react-router-dom'
import MainDocument from '../forms/privateForm/MainDocumentForm.jsx'
import NotFoundForm from './publicForm/NotFoundForm.jsx'
import Button from '@material-ui/core/Button'
import * as RoutesFunc from '../utils/routes_func.js'
export default class ContainerForm extends Component {
    constructor(props) {
        super(props);
    }
    down = () => {
        const offSetTop = $('.main-height2').eq(0).offset().top - 50;
        const scrollTop = $(window).scrollTop();
        const idx = Math.floor(scrollTop / offSetTop);
        try {
            const scroll = $('.main-height2').eq(idx).offset().top - 50;
            $(window).scrollTop(scroll);
        } catch (error) { }
    }
    up = () => {
        const offSetTop = $('.main-height2').eq(0).offset().top;
        $(window).scrollTop(0);
    }
    render() {
        return (<Fragment>
            <div className="main-container">
                <Grid container spacing={0} style={{ height: '100%' }}>
                    <Grid item xs={12} className="container flex-div js-unset">
                        <Switch>
                            {RoutesFunc.showPublicRoutes()}
                            {RoutesFunc.showPrivateRoutes()}
                            <Route render={() => <NotFoundForm />} />
                        </Switch>
                    </Grid>
                </Grid>
                <Button color="inherit" className="no-upper color-w no-bgc scroll-icon scroll-icon-top" onClick={this.up}>
                    <i className="material-icons">arrow_drop_up</i>
                </Button>
                <Button color="inherit" className="no-upper color-w no-bgc scroll-icon" onClick={this.down}>
                    <i className="material-icons">arrow_drop_down</i>
                </Button>
            </div>
        </Fragment>
        )
    }

}
