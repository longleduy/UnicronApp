import React, { Fragment, PureComponent, Component } from 'react'
import FooterForm from '../forms/FooterForm.jsx'
export default class Footer extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <Fragment>
                <FooterForm />
            </Fragment>
        )
    }

}
