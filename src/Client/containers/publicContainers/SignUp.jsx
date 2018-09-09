import React, { Fragment, Component } from 'react'

import SignUpForm from '../../forms/publicForm/SignUpForm.jsx'

export default class SignUp extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <Fragment>
                <SignUpForm/>
            </Fragment>
        )
    }

}
