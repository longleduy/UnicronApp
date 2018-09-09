import React, { Component } from 'react'

import HomePublic from '../containers/publicContainers/HomePulic.jsx'
import SignUp from '../containers/publicContainers/SignUp.jsx'
import SignIn from '../containers/publicContainers/SignIn.jsx'


export const publicRoutes = [
    {
        path: '/',
        exact: true,
        main: () => <HomePublic />
    },
    {
        path: '/sign-in',
        exact: true,
        main: () => <SignIn />
    },
    {
        path: '/sign-up',
        exact: true,
        main: () => <SignUp />
    },
]
