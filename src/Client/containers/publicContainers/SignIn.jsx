import React, { Fragment, Component } from 'react'

import SignInForm from '../../forms/publicForm/SignInForm.jsx'

export default class SignIn extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <Fragment>
                <SignInForm/>
            </Fragment>
        )
    }

}
