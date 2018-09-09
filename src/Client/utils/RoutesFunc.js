import React, { Fragment, Component } from 'react'
import { BrowserRouter as Router, Route, Link, Redirect } from "react-router-dom"

import * as Routes from '../utils/RoutesContant.js'

export const showPublicRoutes = () => {
    let route = null;
    route = Routes.publicRoutes.map((router, index) => {
        return <Route
            key={index}
            path={router.path}
            render={router.main}
            exact={router.exact}
        />
    })
    return route;
}