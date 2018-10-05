import React, { Fragment, Component } from 'react'

import MainDocumentForm from '../../forms/privateForm/MainDocumentForm.jsx'

export default class MainDocument extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <Fragment>
                <MainDocumentForm/>
            </Fragment>
        )
    }

}
