import React, { Fragment, Component } from 'react'
import Grid from '@material-ui/core/Grid'
import { Route, Switch } from 'react-router-dom'

import NotFoundForm from './publicForm/NotFoundForm.jsx'

import * as RoutesFunc from '../utils/routes_func.js'

export default class ContainerForm extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <Fragment>
                <div className="main-container">
                    <Grid container spacing={0}>
                        <Grid item xs={12} className="container flex-div">
                            <Switch>
                                {RoutesFunc.showPublicRoutes()}
                                <Route render={() => <NotFoundForm />} />
                            </Switch>
                        </Grid>
                    </Grid>
                </div>
            </Fragment>
        )
    }

}
